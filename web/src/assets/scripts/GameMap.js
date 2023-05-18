import { AcGameObject } from "./AcGameObject";

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
  }

  start() {

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
    // 绘制地图
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);  // 前两个参数是绘制的坐标，后两个参数是绘制的长宽
  }
}
