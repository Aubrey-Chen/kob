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
  }

  start() {

  }

  // 定义统一的输入接口，用来设置方向
  set_direction(d) {
    this.direction = d;
    
  }

  // 将蛇的状态变为走下一步
  next_step() {
    const d = this.direction;
    this.next_cell = new Cell(this.cells[0].r + this.dr[d], this.cells[0].c + this.dc[d]);
    this.direction = -1;  // 清空操作
    this.status = "move";
    this.step ++ ;
  }

  // 更新蛇的移动
  update_move() {
    
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
    // 在JS里面，如果是in的话，遍历的是下标；如果是of的话，遍历的是值。 
    for (const cell of this.cells) {
      ctx.beginPath();  // 先开启一个路径
      // 画圆弧：圆弧的前两个参数参数是每一个小圆的终点坐标，第三个参数是圆的半径，后两个参数是画圆弧的起始角度和终止角度，要花整个圆弧，所以起始和终止分别是0和2π。
      ctx.arc(cell.x * L, cell.y * L, L / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
