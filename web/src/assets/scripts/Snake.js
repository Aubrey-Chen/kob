import { AcGameObject } from "./AcGameObject";  // 蛇需要每一帧都重画一遍
import { Cell } from "./Cell";

export class Snake extends AcGameObject {
  constructor(info, gamemap) {
    super();

    this.id = info.id;
    this.color = info.color;
    this.gamemap = gamemap;

    this.cells = [new Cell(info.r, info.c)];  // 存放蛇的身体，cell[0]存放蛇头

    this.next_cell = null;  // 下一步的目标位置

    this.speed = 5;  // 蛇每秒走5个格子
    // 蛇下一步指令
    this.direction = -1;  // -1表示没有指令，0、1、2、3表示上、右、下、左四个方向
    // 蛇的当前状态
    this.status = "idle";  // idle表示静止，move表示正在移动，die表示死亡

    this.dr = [-1, 0, 1, 0];  // 上、右、下、左四个方向上行的偏移量
    this.dc = [0, 1, 0, -1];  // 上、右、下、左四个方向上列的偏移量

    this.step = 0;  // 表示当前的回合数
    this.eps = 1e-2;  // 设置允许的误差：当两个点的误差小于0.01以内时，就认为两个点已经重合了
  }

  start() {

  }

  // 定义统一的输入接口，用来设置方向
  set_direction(d) {
    this.direction = d; 
  }

  // 判断当前是否移动蛇尾
  check_tail_increasing() {  // 检查当前回合，蛇的长度是否增加
    if (this.step <= 10)  // 前10步，每步移动1位
      return true;
    if (this.step % 3 === 1)  // 大于10步，每3步移动1位
      return true;
    return false;
  }

  // 将蛇的状态变为走下一步
  next_step() {
    const d = this.direction;
    // 目标点的坐标
    this.next_cell = new Cell(this.cells[0].r + this.dr[d], this.cells[0].c + this.dc[d]);
    this.direction = -1;  // 清空操作
    this.status = "move";
    this.step ++ ;

    // 蛇头前加一个新球，便于蛇的下一步移动
    const k = this.cells.length;  // 存储组成蛇的所有小球的数量
    // 把每个小球都向后移动一位
    for (let i = k; i > 0; i -- ) {
      // JS里的深层复制：先通过JSON.stringfy()转化成JSON，再通过JSON.parse将JSON解析出来，一定会创建一个新的对象，不会产生重复的问题。
      this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]));  // 为了避免JS里赋值时直接赋引用，多个元素是一个引用，相互之间干扰。
    }

    // 下一步操作非法撞了，蛇瞬间去世
    if (!this.gamemap.check_valid(this.next_cell)) {
      this.status = "die";
    }
  }

  // 更新蛇的移动
  update_move() {
    const dx = this.next_cell.x - this.cells[0].x;  // dx = 目标点的横坐标-蛇头的横坐标
    const dy = this.next_cell.y - this.cells[0].y;  // dy = 目标点的横坐标-蛇头的横坐标
    const distance = Math.sqrt(dx * dx + dy * dy);  // 欧几里得距离 = 开根号√（横坐标之差的平方 + 纵坐标之差的平方）

    // 算一下距离有没有走到终点：因为有误差，故当两个点足够接近时，就判断它们走到一起了
    if (distance < this.eps) {  // 走到目标点了
      // 重合：移动到目标点就停下来
      this.cells[0] = this.next_cell;  // 将目标点作为新的蛇头
      this.next_cell = null;
      this.status = "idle";  // 走完了，停下来

      // 如果蛇没有变长
      if (!this.check_tail_increasing()) {
        this.cells.pop();// 删掉旧的蛇尾
      }
    } else {
      // 移动
      const move_distance = this.speed * (this.timedelta / 1000);  // 每两帧之间走的距离
      // x方向上的偏移量 = md * cos θ = md * (dx / d);
      this.cells[0].x += move_distance * dx / distance;
      // y方向上的偏移量 = md * cos θ = md * (dy / d);
      this.cells[0].y += move_distance * dy / distance;

      // 如果蛇没有变长
      if (!this.check_tail_increasing()) {
        const k = this.cells.length;
        const tail = this.cells[k - 1];
        const tail_target = this.cells[k - 2];  // 蛇尾的目标，即下一个蛇尾target
        // 把tail移动到tail_target
        const tail_dx = tail_target.x - tail.x;  // 两个点之间横坐标的差值
        const tail_dy = tail_target.y - tail.y;  // 两个点之间纵坐标的差值

        tail.x += move_distance * tail_dx / distance;
        tail.y += move_distance * tail_dy / distance;
      }
    }
  }

  // 每一帧调用一次，每秒钟执行60次
  update() {
    if (this.status === 'move') {
      this.update_move();
    }

    this.render();
  }

  render() {
    const L = this.gamemap.L;
    const ctx = this.gamemap.ctx;
    
    ctx.fillStyle = this.color;
    // 如果蛇去世，颜色变成惨白色
    if (this.status === "die") {
      ctx.fillStyle = "#FFFFFF";
    }

    // 在JS里面，如果是in的话，遍历的是下标；如果是of的话，遍历的是值。 
    for (const cell of this.cells) {
      ctx.beginPath();  // 先开启一个路径
      // 画圆弧：圆弧的前两个参数参数是每一个小圆的终点坐标，第三个参数是圆的半径，后两个参数是画圆弧的起始角度和终止角度，要花整个圆弧，所以起始和终止分别是0和2π。
      ctx.arc(cell.x * L, cell.y * L, L / 2 * 0.8, 0, Math.PI * 2);  // 蛇瘦身：半径变成80%
      ctx.fill();
    }

    // 优化蛇的身体：填充相邻两球中心点切线与直径组成的矩形
    for (let i = 1; i < this.cells.length; i ++ ) {
      const a = this.cells[i], b = this.cells[i - 1];  // 枚举相邻两个球
      if (Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps)  // 两个球重合时continue
        continue;
      if (Math.abs(a.x - b.x) < this.eps) {  // 如果是竖直方向上的画法
        // 待画矩形的左上角横坐标：(x - 0.5 + 0.1) * L，纵坐标：a、b纵坐标的最小值 * L，水平方向的长度：2R * 0.8 = L * 0.8，竖直方向上的长度：a、b纵坐标相差的绝对值 * L
        ctx.fillRect((a.x - 0.4) * L, Math.min(a.y, b.y) * L, L * 0.8, Math.abs(a.y - b.y) * L);
      } else {  // 如果是水平方向上的画法
        // 待画矩形的左上角横坐标：a、b纵坐标的最小值 * L，纵坐标：(y - 0.5 + 0.1) * L，水平方向的长度：a、b横坐标相差的绝对值 * L，竖直方向上的长度：2R * 0.8 = L * 0.8
        ctx.fillRect(Math.min(a.x, b.x) * L, (a.y - 0.4) * L, Math.abs(a.x - b.x) * L, L * 0.8);
      }
    }
  }
}
