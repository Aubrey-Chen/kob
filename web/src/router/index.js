import { createRouter, createWebHistory } from 'vue-router'; 
import PkIndexView from '../views/pk/PkIndexView'; 
import RecordIndexView from '../views/record/RecordIndexView'; 
import RanklistIndexView from '../views/ranklist/RanklistIndexView'; 
import UserBotIndexView from '../views/user/bot/UserBotIndexView'; 
import NotFound from '../views/error/NotFound';

const routes = [
  // home根路径重定向至pk对战界面
  {
    path: "/", 
    name: "home", 
    redirect: "/pk/", 
  }, 
  {
    path: "/pk/", 
    name: "pk_index", 
    component: PkIndexView, 
  }, 
  {
    path: "/record/", 
    name: "record_index", 
    component: RecordIndexView, 
  }, 
  {
    path: "/ranklist/", 
    name: "ranklist_index", 
    component: RanklistIndexView, 
  }, 
  {
    path: "/user/bot/", 
    name: "user_bot_index", 
    component: UserBotIndexView, 
  }, 
  {
    path: "/404/", 
    name: "404", 
    component: NotFound, 
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

export default router
