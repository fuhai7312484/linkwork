import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from '@/components/HelloWorld'
import LoginIndex from "../pages/login/Login";
import Home from "../pages/home/Index";
import ResetPass from '../pages/login/components/ResetPw'
import Register from '../pages/login/components/register'
import router from '../router'

Vue.use(Router);



export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Home
    },
    {
      path: "/login",
      name: "LoginIndex",
      component: LoginIndex
    },
    {
      path: "/resetpw",
      name: "ResetPass",
      component: ResetPass
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    
  ]
});
