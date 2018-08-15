// import Vue from 'vue'
// import Vuex from 'vuex'

// // import actions from './actions'
// import mutations from './mutations'
// Vue.use(Vuex)

// export default new Vuex.Store({

//     actions:{
//         changeCity(ctx,city){
//             ctx.commit('changeCity',city)
//         }
//     },
//     mutations,
// })

import Vue from "vue";
import vuex from "vuex";
import testStore from "./testStore.js";
Vue.use(vuex);

export default new vuex.Store({
  state: {
    show: false,
    isLogin: 0,
    userInfo: localStorage.userInfo,
    sWHeight: "590px",
    isLoding: false,
    proTitle:localStorage.proTitle?localStorage.proTitle:'示例项目'
  },
  mutations: {
    showLoading(state,data){
        state.isLoding = data    
    },
    // hideLoading (state) {
    //     state.isLoding = false
    // },
    updateState(state, message) {
      state.message = message;
    },
    changeLogin(state, data) {
      state.isLogin = data;
    },
   setUserInfo(state, data) {
      //   localStorage.userInfo = data;
      state.userInfo = data;
    },
    getScrllH(state, data) {
      state.sWHeight = data;
    },
    proTitleChang(state, data){
        state.proTitle = data;
        localStorage.proTitle = data;
    },
  },
  actions: {
    updateState({ commit }) {
      commit("updateState", "new");
    }
  },
  modules: {
    testStore
  }
});
