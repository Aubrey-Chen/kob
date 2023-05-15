// 定义全局数组用来存储所有游戏对象
const AC_GAME_OBJECTS = [];

// 定义一个基类，将新创建的对象存储到一个全局数组 AC_GAME_OBJECTS 中
export class AcGameObject {
  constructor() {
    // 在创建新的游戏对象时将其存储在全局数组中，便于管理和遍历所有游戏对象。
    AC_GAME_OBJECTS.push(this);

    // 当前帧执行的时刻，距离上一帧执行时刻的时间间隔Δ
    this.timedelta = 0;

    // 记录方法是否执行过
    this.has_called_start = false;
  }

  start() {     // 只执行一次，第一帧执行

  }

  update() {    // 每一帧执行一次，除了第一帧之外

  }

  on_destory() {    // 删除之前执行

  }

  destroy() {   // 调用时将对象从全局数组 AC_GAME_OBJECTS 中删除
    for (let i in AC_GAME_OBJECTS) {
      this.on_destory();

      const obj = AC_GAME_OBJECTS[i];
      if (obj === this) {
        AC_GAME_OBJECTS.splice(i);  // js中从数组里面删除第i个元素
        break;
      }
    }
    
  }
}

let last_timestamp; // 上一次执行的时刻

const step = timestamp => {
  // 在JS里面用of遍历的是值，用in遍历的是下标
  for (let obj of AC_GAME_OBJECTS) {
    if (!obj.has_called_start) {
      obj.has_called_start = true;
      obj.start();
    } else {
      obj.timedelta = timestamp - last_timestamp;
      obj.update();
    }
  }

  last_timestamp = timestamp;  // 更新上一次执行的时刻

  // 继续执行动画回调函数
  requestAnimationFrame(step);
}

// 执行动画回调函数：会在下一帧浏览器刷新之前执行一遍
requestAnimationFrame(step); 