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
import DiaryIndex from '../pages/Diary/index.vue'
import DiaryPublic from '../pages/Diary/components/DiaryPublic.vue'
import EditdiaryIndex from '../pages/Diary/components/EditDiaryIndex.vue'
import EditDiary from '../pages/Diary/components/EditDiary.vue'

import DraftIndex from '../pages/Diary/components/DraftIndex'
import DraftboxList from '../pages/Diary/components/DraftBoxList'
import DraftDetail from '../pages/Diary/components/DraftDetail'
import mytext from '../pages/Diary/components/mytext'


import MydiaryIndex from '../pages/Diary/components/MyDiaryIndex.vue'
import MyDiary from '../pages/Diary/components/myDiaryList.vue'
// import MyDetail from '../pages/Diary/Mydetail/MyDetail.vue'

import TadiaryIndex from '../pages/Diary/components/TaDiaryIndex.vue'
import TaDiary from '../pages/Diary/components/TaDiaryList.vue'
import TaDetail from '../pages/Diary/Tadetail/Detail.vue'


import CreatePro from '../pages/Project/components/Createpro.vue'
import Step1 from '../pages/Project/components/Step1.vue'
import Step2 from '../pages/Project/components/Step2.vue'
import Step3 from '../pages/Project/components/Step3.vue'
import router from '../router'
import store from '../store'


import messageIndex from '../pages/message/index'


import AddressIndex from '../pages/Address/index'
// import addDetails from '../pages/Address/AddDetails.vue'
Vue.use(Router);


export default new Router({
  routes: [

    {
      path: "/",
      name: "AddressIndex",
      redirect: '/address',
      meta: {
        requireAuth: true 
      },
      component: AddressIndex,
    },
    {
      path: "/home",
      name: "Home",
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Home
    },


    // {
    //   path: "/",
    //   name: "Home",
    //   meta: {
    //     requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    //   },
    //   component: Home
    // },
    // {
    //   path: "/home",
    //   name: "Home",
    //   meta: {
    //     requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    //   },
    //   component: Home
    // },
    //日程日志路由
    {
      path: "/diary",
      name: "DiaryIndex",
      redirect: '/diary/EditDiary',
      meta: {
        requireAuth: true 
      },
      component: DiaryIndex,
      children:[
            {
              path:"/diary/EditDiary",
              name:"EditDiary",
              component:EditdiaryIndex,
              redirect: '/diary/EditDiary',
              children:[
                {
                  path:"/diary/EditDiary",
                  name:"EditDiary",
                 component:EditDiary,
                },
                {
                  path:"/diary/EditDiary/DraftboxList",
                  name:"DraftIndex",
                  redirect: '/diary/EditDiary/DraftboxList',
                  component:DraftIndex, 
                  children:[
                    {
                      path:"/diary/EditDiary/DraftboxList",
                      name:"DraftboxList",
                      component:DraftboxList, 
                    },
                    {
                      path:"/diary/EditDiary/DraftboxList/:id",
                      name:"DraftDetail",
                      component:DraftDetail, 
                    },

                  ]
                },

              ],
            },
            {
              path:"/diary/MyDiary",
              name:"MydiaryIndex",
              component:MydiaryIndex,
              redirect: '/diary/MyDiary',
              children:[
                {
                  path:"/diary/MyDiary",
                  name:"MyDiary",
                  component:MyDiary, 
                },
                {
                  path:"/diary/MyDiary/:id",
                  name:"mytext",
                  component:mytext,
                },
              ]
        
            },
            {
              path:"/diary/TaDiary",
              name:"TadiaryIndex",
              component:TadiaryIndex,
              redirect: '/diary/TaDiary',
              children:[
                {
                  path:"/diary/TaDiary",
                  name:"TaDiary",
                  component:TaDiary,
                },
                {
                  path:"/diary/TaDiary/:id",
                  name:"TaDetail",
                  component:TaDetail,
                },
              ]
        
            },
       
      ]
    },

     //消息
     {
      path: "/message",
      name: "messageIndex",
      meta: {
        requireAuth: true 
      },
      component: messageIndex,
    },
    //通讯录
    {
      path: "/address",
      name: "AddressIndex",
      // redirect: '/diary/EditDiary',
      meta: {
        requireAuth: true 
      },
      component: AddressIndex,
      // children:[
      //    {
      //           path:"/address/:id",
      //           name:"addDetails",
      //           component:addDetails,
      //         },
      // ],
    },


    // {
    //   path:"/diary/TaDiary",
    //   name:"TadiaryIndex",
    //   component:TadiaryIndex,
    //   redirect: '/diary/TaDiary',
    //   children:[
    //     {
    //       path:"/diary/TaDiary",
    //       name:"TaDiary",
    //       component:TaDiary,
    //     },
    //     {
    //       path:"/diary/TaDiary/:id",
    //       name:"TaDetail",
    //       component:TaDetail,
    //     },
    //   ]

    // },


  

    //项目列表创建项目步骤等路由
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
    //登录、注册、找回密码路由
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
// router.beforeEach(function (to, from, next) {
//   // console.log(store.state.isLoding)
//   // console.log(to)

//   if(to.path !='/login' && to.path !='/resetpw' && to.path !='/register' ){
//     store.commit('showLoading',true)
//   }
//   next()
// })

// // 路由跳转后的钩子
// router.afterEach(function (to) {
//   // console.log(store.state.isLoding)
//   // store.commit('showLoading',false)

//   setTimeout(function(){
//     store.commit('showLoading',false)
//   },1000)
 
// })