import { AcGameObject } from "./AcGameObject";

export class GameMap extends AcGameObject {
  // 构造函数的两个参数：1. 画布；2. 画布的父元素--用来动态修改画布的长宽。
  constructor(ctx, parent) {
    // 构造函数里应先执行基类的构造函数
    super();

    this.ctx = ctx;
    this.parent = parent;

    // 存每个格子的绝对距离
    this.L = 0;  // L表示1个单位的长度，整个地图是 13个单位 × 13个单位 
  }

  start() {

  }

  update() {
    // update()函数里每一帧都需要渲染
    this.render();  // 每一帧都需要执行一次
  }

  // 渲染
  render() {

  }
}
