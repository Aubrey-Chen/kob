import { createRouter, createWebHistory } from 'vue-router'; 
import PkIndexView from '../views/pk/PkIndexView'; 
import RecordIndexView from '../views/record/RecordIndexView'; 
import RanklistIndexView from '../views/ranklist/RanklistIndexView'; 
import UserBotIndexView from '../views/user/bot/UserBotIndexView'; 
import NotFound from '../views/error/NotFound';
import UserAccountLoginView from '../views/user/account/UserAccountLoginView';
import UserAccountRegisterView from '../views/user/account/UserAccountRegisterView';
import store from '../store/index';

const routes = [
  // home根路径重定向至pk对战界面
  {
    path: "/", 
    name: "home", 
    redirect: "/pk/", 
    meta: {
      requestAuth: true,  // 存放是否需要授权信息
    }, 
  }, 
  {
    path: "/pk/", 
    name: "pk_index", 
    component: PkIndexView, 
    meta: {
      requestAuth: true,  // 存放是否需要授权信息
    }, 
  }, 
  {
    path: "/record/", 
    name: "record_index", 
    component: RecordIndexView, 
    meta: {
      requestAuth: true,  // 存放是否需要授权信息
    }, 
  }, 
  {
    path: "/ranklist/", 
    name: "ranklist_index", 
    component: RanklistIndexView, 
    meta: {
      requestAuth: true,  // 存放是否需要授权信息
    }, 
  }, 
  {
    path: "/user/bot/", 
    name: "user_bot_index", 
    component: UserBotIndexView, 
    meta: {
      requestAuth: true,  // 存放是否需要授权信息
    }, 
  }, 
  {
    path: "/user/account/login/", 
    name: "user_account_login", 
    component: UserAccountLoginView, 
    meta: {
      requestAuth: false,  // 存放是否需要授权信息
    }, 
  }, 
  {
    path: "/user/account/register/", 
    name: "user_account_register", 
    component: UserAccountRegisterView, 
    meta: {
      requestAuth: false,  // 存放是否需要授权信息
    }, 
  }, 
  {
    path: "/404/", 
    name: "404", 
    component: NotFound, 
    meta: {
      requestAuth: false,  // 存放是否需要授权信息
    }, 
  }, 
  // 非法路径重定向至404页面
  {
    path: "/:catchAll(.*)",  // 正则表达式表示：可以匹配任意字符串
    redirect: "/404/", 
  }, 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 前端页面授权
router.beforeEach((to, from, next) => {
  // 跳转页面需要授权且是未登录状态时，重定向到登录页面；不需要授权则跳转到默认页面即可。
  if (to.meta.requestAuth && !store.state.user.is_login) {
    next({name: "user_account_login"});
  } else {
    next();
  }
})

export default router
