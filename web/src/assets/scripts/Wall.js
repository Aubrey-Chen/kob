import { AcGameObject } from "./AcGameObject";

export class Wall extends AcGameObject {
  constructor(r, c, gamemap) {
    super();

    this.r = r;
    this.c = c;
    this.gamemap = gamemap;
    this.color = "#B37226";
  }

  update() {
    this.render();  // 每一帧都需要执行一次
  }

  // 渲染
  render() {
    const L = this.gamemap.L;
    const ctx = this.gamemap.ctx;

    // 绘制障碍物
    ctx.fillStyle = this.color;
    ctx.fillRect(this.c * L, this.r * L, L, L);
  }
}