<template>
  <NavBar />
  <router-view/>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar, 
  }, 
  
  setup() {
  }
}
</script>

<style>
body {
  background-image: url("@/assets/images/background.png");  /* @/···表示在当前目录的根目录 */
  background-size: cover;
}
</style>
