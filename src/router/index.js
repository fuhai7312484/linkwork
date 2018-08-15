import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from '@/components/HelloWorld'
import LoginIndex from "../pages/login/Login";
import Home from "../pages/home/Index";
import ResetPass from '../pages/login/components/ResetPw'
import Register from '../pages/login/components/register'
import InformAtc from '../pages/login/components/Information'
import ProList from '../pages/Project/components/ProList.vue'
import PorIndex from '../pages/Project/index.vue'
import CreatePro from '../pages/Project/components/Createpro.vue'
import Step1 from '../pages/Project/components/Step1.vue'
import Step2 from '../pages/Project/components/Step2.vue'
import Step3 from '../pages/Project/components/Step3.vue'
import router from '../router'
import store from '../store'

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
      path: "/home",
      name: "Home",
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Home
    },
    {
      path: "/project",
      name: "PorIndex",
      meta: {
        requireAuth: true 
      },
      redirect: '/project/prolist',
      component: PorIndex,
      children:[
        {
          path: "/project/createpro",
          name: "CreatePro",
          redirect: '/project/step_1',
          children:[
            {
              path: "/project/step_1",
              name: "Step1",
              component: Step1
            },
            {
              path: "/project/step_2",
              name: "Step2",
              component: Step2
            },
            {
              path: "/project/step_3",
              name: "Step3",
              component: Step3
            },
          ],
          component: CreatePro
        },
        {
          path: "/project/prolist",
          name: "ProList",
          component: ProList
        },
      ]
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
    {
      path: "/informatc",
      name: "InformAtc",
      component: InformAtc
    },
   
    
  ]
});
// 路由跳转前的钩子
router.beforeEach(function (to, from, next) {
  // console.log(store.state.isLoding)
  // console.log(to)
  store.commit('showLoading',true)
  next()
})

// 路由跳转后的钩子
router.afterEach(function (to) {
  // console.log(store.state.isLoding)
  store.commit('showLoading',false)

  // setTimeout(function(){
  //   store.commit('showLoading',false)
  // },1000)
 
})