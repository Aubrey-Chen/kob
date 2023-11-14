import $ from 'jquery';

export default {
  state: {
    id: "", 
    username: "", 
    photo: "", 
    token: "", 
    is_login: false, 
  },
  getters: {
  },
  mutations: {
    updateUser(state, user) {
        state.id = user.id; 
        state.username = user.username;
        state.photo = user.photo;
        state.is_login = user.is_login;
    }, 
    updateToken(state, token) {
        state.token = token;
    }, 
    logout(state) {
      state.id = ""; 
      state.username = ""; 
      state.photo = ""; 
      state.token = ""; 
      state.is_login = false; 
    }, 
  },
  actions: {
    login(context, data) {
      $.ajax({
        url: "http://localhost:3000/user/account/token/", 
        type: "POST", 
        data: {
          username: data.username, 
          password: data.password, 
        }, 
        success(resp) {
          if (resp.error_message === "success") {
            // 将token存下来(在actions里面调用mutations里面的函数时，需要用commit+字符串)
            context.commit("updateToken", resp.token);
            data.success(resp);
          } else {
            data.error(resp);
          }
        }, 
        error(resp) {
          data.error(resp);
        }
      });
    }, 
    getInfo(context, data) {
      $.ajax({
        url: "http://localhost:3000/user/account/info/", 
        type: "GET", 
        headers: {
          Authorization: "Bearer " + context.state.token, 
        }, 
        success(resp) {
          if (resp.error_message === "success") {
            context.commit("updateUser", {
              // 将resp里的信息解构出来，放在当前的对象里
              ...resp, 
              is_login: true, 
            });
            // 更新数据完成之后再调用回调函数
            data.success(resp);
          } else {
            data.error(resp);
          }
        }, 
        error(resp) {
          data.error(resp);
        }
      });
    }, 
    logout(context) {
      context.commit("logout");
    }, 
  },
  modules: {
  }
}