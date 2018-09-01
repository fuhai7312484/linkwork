// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/iconfont.css';
import {getStorage} from './assets/lib/myStorage'

import store from './store'

import iView from 'iview';
import 'iview/dist/styles/iview.css';

//视频播放器公用组件
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);

// import store from './store'

import vuex from 'vuex'
Vue.use(vuex);
Vue.use(iView);

Vue.use(ElementUI);

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 判断该路由是否需要登录权限    
    
    if (getStorage('userName') || store.state.isLogin==100) {
      // 判断当前的token是否存在
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
