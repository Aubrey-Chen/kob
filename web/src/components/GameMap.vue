<template>
  <!-- 游戏计分板 -->
  <div ref="parent" class="gamemap">    <!-- 将parent指向<div>，使两者产生关联 -->
    <!-- 画布 -->
    <canvas ref="canvas" tabindex="0"></canvas>      <!-- 将canvas指向<canvas>，使两者产生关联。添加tabindex="0"输入用户操作 -->
  </div>
</template>

<script>
import { GameMap } from '@/assets/scripts/GameMap';
import { ref, onMounted } from 'vue';  // onMounted是当组件挂载完之后需要执行哪些操作

export default {
  setup() {
    let parent = ref(null);
    let canvas = ref(null);

    // 组件挂载完之后创建游戏对象
    onMounted(() => {
        new GameMap(canvas.value.getContext('2d'), parent.value);
    });

    return {
        parent, 
        canvas, 
    }
  },    
};
</script>

<style scoped>
.gamemap {
  /* 与父元素等长 */
  width: 100%;
  height: 100%;
  /* 居中 */
  display: flex;
  /* flex 里的内容水平居中 */
  justify-content: center;
  /* flex 里的内容垂直居中 */
  align-items: center;
}
</style>
