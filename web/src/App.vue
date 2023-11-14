<template>
  <NavBar />
  <router-view/>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import NavBar from '@/components/NavBar.vue';
import $ from 'jquery';

export default {
  components: {
    NavBar, 
  }, 
  
  setup() {
    $.ajax({
      url: "http://localhost:3000/user/account/register/", 
      type: "POST", 
      data: {
        username: "ljy", 
        password: "pljy", 
        confirmedPassword: "pljy"
      }, 
      success(resp) {
        console.log(resp);
      }, 
      error(resp) {
        console.log(resp);
      }
    });
  }
}
</script>

<style>
body {
  background-image: url("@/assets/images/background.png");  /* @/···表示在当前目录的根目录 */
  background-size: cover;
}
</style>
