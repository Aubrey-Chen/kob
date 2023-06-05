import { AcGameObject } from "./AcGameObject";  // 蛇需要每一帧都重画一遍
import { Cell } from "./Cell";

export class Snake extends AcGameObject {
  constructor(info, gamemap) {
    super();

    this.id = info.id;
    this.color = info.color;
    this.gamemap = gamemap;

    this.cells = [new Cell(info.r, info.c)];  // 存放蛇的身体，cell[0]存放蛇头

    this.speed = 5;  // 蛇每秒走5个格子
  }

  start() {

  }

  update_move() {
    // 实现让蛇每秒钟向右移动5格：每一帧里面将蛇头的横坐标加上它每一帧移动的距离
    // this.cells[0].x += this.speed * this.timedelta / 1000;  // 每秒速度 * 每帧秒数
    // 实现让蛇每秒钟向上移动5格：每一帧里面将蛇头的纵坐标减去它每一帧移动的距离
    this.cells[0].y -= this.speed * this.timedelta / 1000;  // 每秒速度 * 每帧秒数
  }

  // 每一帧调用一次
  update() {
    this.update_move();
    this.render();
  }

  render() {
    const L = this.gamemap.L;
    const ctx = this.gamemap.ctx;
    
    ctx.fillStyle = this.color;
    // 在JS里面，如果是in的话，遍历的是下标；如果是of的话，遍历的是值。 
    for (const cell of this.cells) {
      ctx.beginPath();  // 先开启一个路径
      // 画圆弧：圆弧的前两个参数参数是每一个小圆的终点坐标，第三个参数是圆的半径，后两个参数是画圆弧的起始角度和终止角度，要花整个圆弧，所以起始和终止分别是0和2π。
      ctx.arc(cell.x * L, cell.y * L, L / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
