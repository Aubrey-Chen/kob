import { AcGameObject } from "./AcGameObject";
import { Wall } from "./Wall";
import { Snake } from "./Snake";

export class GameMap extends AcGameObject {
  // 构造函数的两个参数：1. 画布；2. 画布的父元素--用来动态修改画布的长宽。
  constructor(ctx, parent) {
    // 构造函数里应先执行基类的构造函数
    super();

    this.ctx = ctx;
    this.parent = parent;
    // 存每个格子的绝对距离
    this.L = 0;     // L表示1个单位的长度，整个地图是 14个单位 × 13个单位 
    
    this.rows = 13;     // 行数rows初始值为13（↓：纵坐标）
    this.cols = 14;     // 列数cols初始值为14（→：横坐标）

    this.inner_walls_count = 30;  // 内部随机障碍物墙体的数量
    this.walls = [];  // 开辟数组用来存储所有的障碍物墙体

    this.snakes = [
      new Snake({id: 0, color: "#4876EC", r: this.rows - 2, c: 1}, this), 
      new Snake({id: 1, color: "#F94848", r: 1, c: this.cols - 2}, this), 
    ];
  }

  // Flood Fill洪水覆盖算法：判断所生成地图的连通性
  check_connectivity(g, sx, sy, tx, ty) {
    if (sx == tx && sy == ty)  // 如果发现起点已经等于终点了，返回true
      return true;
    g[sx][sy] = true;  // 否则把当前位置标记为已经走过了

    // 定义上、右、下、左（顺时针）四个方向的偏移量
    let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];

    // 枚举一下四个方向，求当前方向的下一个点的坐标是什么
    for (let i = 0; i < 4; i ++ ) {
      let x = sx + dx[i], y = sy + dy[i];
      if (!g[x][y] && this.check_connectivity(g, x, y, tx, ty))   // 如果没有撞墙并且可以搜到终点的话，返回true
        return true;
    }
    // 如果搜不到终点的话，返回false
    return false;
  }

  create_walls() {
    // 定义一个bool类型的数组，用来判断当前格子是否添加障碍物
    const g = [];
    // 初始化障碍物数组
    for (let r = 0; r < this.rows; r ++ ) {
      g[r] = [];
      for (let c = 0; c < this.cols; c ++ ) {
        g[r][c] = false;
      }
    }

    // 给四周加上障碍物
    for (let r = 0; r < this.rows; r ++ ) {
      g[r][0] = g[r][this.cols - 1] = true;  // 左右两边界加上墙体
    }

    for (let c = 0; c < this.cols; c ++ ) {
      g[0][c] = g[this.rows - 1][c] = true;  // 上下两边界加上墙体
    }

    // 实现中心对称地创建随机障碍物
    for (let i = 0; i < this.inner_walls_count / 2; i ++ ) {  // 每次随机放两个相互中心对称的障碍物，故循环条件需要除以2
      // 循环1000次，只要有重复的格子就继续随机生成障碍物
      for (let j = 0; j < 1000; j ++ ) {
        // 获取行的随机值：得到(0, this.rows - 1]里的任意一个值
        let r = parseInt(Math.random() * this.rows);
        // 获取列的随机值：得到(0, this.cols - 1]里的任意一个值
        let c = parseInt(Math.random() * this.cols);

        // 如果取到的随机障碍物覆盖掉左下角或右上角蛇的初始位置，则继续随机获取
        if (r == this.rows - 2 && c == 1 || r == 1 && c == this.cols -2)
          continue;
        // 如果获取的随机值已重复，则继续随机获取
        if (g[r][c] || g[this.rows - 1 - r][this.cols - 1 - c]) 
          continue;
        
        g[r][c] = g[this.rows - 1 - r][this.cols - 1 - c] = true;
        break;
      }
    }

    // 传状态时需要把状态复制一遍，防止把当前状态给修改掉
    const copy_g = JSON.parse(JSON.stringify(g));  // 先转化成JSON，再把JSON给解析出来

    // 如果所生成的地图不连通的话，则返回false
    if (!this.check_connectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2))
      return false;

    // 遍历整个数组g
    for (let r = 0; r < this.rows; r ++ ) {
      for (let c = 0; c < this.cols; c ++ ) {
        if (g[r][c]) {
          this.walls.push(new Wall(r, c, this));
        }
      }
    }

    return true;
  }

  start() {
    // 随机生成1000次，如果发现成功了就break，否则将会继续循环
    for (let i = 0; i < 1000; i ++ )
      if (this.create_walls())
        break;
  }

  // 每一帧都更新一下边长
  update_size() {
    // 求一个能被格子框包含的rows行cols列的最大面积的矩形，边长为 min { h/rows, w/cols }
    // this.parent.clientWidth和this.parent.clientHeight是求<div>的长、宽
    this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows)); 
    // 求<canvas>的长width（宽height）：小正方形的边长L × 列数cols（行数rows）
    this.ctx.canvas.width = this.L * this.cols;
    this.ctx.canvas.height = this.L * this.rows;
  }

  update() {
    // update()函数里每一帧都需要渲染
    this.update_size();
    this.render();  // 每一帧都需要执行一次
  }

  // 渲染
  render() {
    // 奇数color_even画深色格子，偶数color_odd画浅色格子
    const color_even = "#AAD751", color_odd = "#A2D149";
    for (let r = 0; r < this.rows; r ++ ) {
      for (let c = 0; c < this.cols; c ++ ) {
        if ((r + c) % 2 == 0) {
          this.ctx.fillStyle = color_even;
        } else {
          this.ctx.fillStyle = color_odd;
        }
        // 绘制地图：前两个参数是绘制的坐标，后两个参数是绘制的长宽
        this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
      }
    }

  }
}
