import { AcGameObject } from "./AcGameObject";
import { Wall } from "./Wall";

export class GameMap extends AcGameObject {
  // 构造函数的两个参数：1. 画布；2. 画布的父元素--用来动态修改画布的长宽。
  constructor(ctx, parent) {
    // 构造函数里应先执行基类的构造函数
    super();

    this.ctx = ctx;
    this.parent = parent;

    // 存每个格子的绝对距离
    this.L = 0;     // L表示1个单位的长度，整个地图是 13个单位 × 13个单位 
    this.rows = 13;     // 行数rows初始值为13
    this.cols = 13;     // 列数cols初始值为13

    // 开辟数组用来存储所有的障碍物墙体
    this.walls = [];
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

    // 遍历整个数组g
    for (let r = 0; r < this.rows; r ++ ) {
      for (let c = 0; c < this.cols; c ++ ) {
        if (g[r][c]) {
          this.walls.push(new Wall(r, c, this));
        }
      }
    }
  }

  start() {
    this.create_walls();
  }

  // 每一帧都更新一下边长
  update_size() {
    // 求一个能被格子框包含的rows行cols列的最大面积的矩形，边长为 min { h/rows, w/cols }
    // this.parent.clientWidth和this.parent.clientHeight是求<div>的长、宽
    this.L = Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows); 
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

    // // 绘制地图
    // this.ctx.fillStyle = 'green';
    // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);  // 前两个参数是绘制的坐标，后两个参数是绘制的长宽
  }
}
