// 蛇里面的一个格子
export class Cell {
  constructor(r, c) {
    this.r = r;
    this.c = c;
    // 格子的中心点坐标
    this.x = c + 0.5;
    this.y = r + 0.5;
  }
}
