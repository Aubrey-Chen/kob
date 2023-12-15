<template>
    <ContentField v-if="!$store.state.user.pulling_info">
      <div class="row justify-content-md-center">
        <div class="col-3">
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="username" class="form-label">用户名</label>
              <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">密码</label>
              <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
            </div>
            <div class="error-message">{{ error_message }}</div>
            <button type="submit" class="btn btn-primary">提交</button>
          </form>
        </div>
      </div>
    </ContentField>
</template>

<script>
import ContentField from '@/components/ContentField.vue';
import router from '@/router/index';
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
  components: {
    ContentField, 
  }, 
  setup() {
    const store = useStore();
    let username = ref('');
    let password = ref('');
    let error_message = ref('');

    const jwt_token = localStorage.getItem("jwt_token");
    if (jwt_token) {
      // 调用user.js里mutations中更新token的函数
      store.commit("updateToken", jwt_token);
      // 验证token的合法性：从云端获取一遍用户信息（actions里的getInfo()函数，传入的两个参数分别为成功/失败后的回调函数）
      store.dispatch("getInfo", {
        success() {
          router.push({ name: "home" });
          store.commit("updatePullingInfo", false);
        }, 
        error() {
          // 更新 正在拉取信息的状态 为false
          store.commit("updatePullingInfo", false);
        }, 
      });
    } else {
      store.commit("updatePullingInfo", false);
    }

    // 触发函数login()
    const login = () => {
      error_message.value = "";
      // 调用actions里的函数用store.dispatch，ref取值是通过.value
      store.dispatch("login", {
        username: username.value, 
        password: password.value, 
        success() {
          store.dispatch("getInfo", {
            success() {
              router.push({name: 'home'});
            }
          });
        }, 
        error() {
          error_message.value = "用户名或密码错误";
        },  
      });
    };

    return {
      username, 
      password, 
      error_message, 
      login, 
    };
  }, 
}; 
</script>

<style scoped>
button {
  width: 100%;
}
div.error-message {
  color: red;
}
</style>
