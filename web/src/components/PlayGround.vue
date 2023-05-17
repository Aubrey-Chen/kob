<template>
  <div class="playground">
    <GameMap />
  </div>
</template>

<script>
import GameMap from './GameMap.vue';

export default {
  components: {
    GameMap, 
  }, 
};
</script>

<style scoped>
.playground {
  /* 屏幕宽度的60% */
  width: 60vw;
  /* 屏幕高度的70% */
  height: 70vh;
  /* 距离上边距40px居中 */
  margin: 40px auto;
  background: lightblue;
}
</style>
