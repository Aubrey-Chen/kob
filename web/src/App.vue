<template>
  <div>
    <div>Bot昵称： {{ bot_name }}</div>
    <div>Bot战力： {{ bot_rating }}</div>
  </div>
  <router-view/>
</template>

<script>
import $ from 'jquery';
// 接受一个参数值并返回一个响应式且可改变的ref对象。rdf对象拥有一个指向内部值的单一属性.value。
import { ref } from 'vue';  // Vue3中通过ref来声明变量

// export default相当于创建了一个vue实例
export default {
  name: "App", 
  setup: () => {  // setup是将里面的变量函数中返回的对象暴露给模板和组件实例
    let bot_name = ref("");
    let bot_rating = ref("");

    // 访问后端链接，用Ajax来写
    $.ajax({
      url: "http://127.0.0.1:3000/pk/getbotinfo/",  // 函数地址
      type: "get",   // 获取一个数据
      // 成功后获取resp对象
      success: resp => {
        // console.log(resp);  // 获取后端数据
        bot_name.value = resp.name;
        bot_rating.value = resp.rating;
      }
    });

    return {
      bot_name, 
      bot_rating
    }
  }
}
</script>

<style>
body {
  background-image: url("@/assets/background.png");  /* @/···表示在当前目录的根目录 */
  background-size: cover;
}
</style>
