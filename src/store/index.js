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
import {getPostInfo,setStorage,getStorage} from "../assets/lib/myStorage"

Vue.use(vuex);

export default new vuex.Store({
  state: {
    show: false,
    isLogin: 0,
    userInfo: localStorage.userInfo,
    sWHeight: "590px",
    isLoding: false,
    // proTitle:localStorage.proTitle?localStorage.proTitle:'示例项目',
    proTitle:{},
    fiaworkfiow:[],
    ProList:[],
    DraftBox:[],
    AddressUid:{},
    MessageUnreadCount:0,
    // create1proId:{},
    // create2orgId:'',

  },
 getters: {
    // 请求数据时加载状态
    isLoding: state => state.isLoding
   },
  mutations: {
   setAddressUid(state,data){
    state.AddressUid = data;
   },
    getWorkCount(state,data){
      state.fiaworkfiow = data;
  },
  getMessageUnreadCount(state){
      let count = 0 
    var chatData = JSON.parse(localStorage.getItem("chatData"));
    if(chatData){
        if(chatData.chatHistoryData){
        
Object.keys(chatData.chatHistoryData).forEach(function(key){
  count += chatData.chatHistoryData[key].count
  state.MessageUnreadCount += chatData.chatHistoryData[key].count
});     
        }else{
          count = 0;
        }
        
    }else{
      count = 0;
    }
    state.MessageUnreadCount = count
  },
  getProList(state,data){
    state.ProList = data;
},
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
    proTitleChang(state){
        // state.proTitle = data;
        state.proTitle = getStorage('proInfo')
        // localStorage.proTitle = data;
    },
    // setcreate1proId(state,data){
    //   state.create1proId = data;
     
    // },
    // setcreate2orgId(state,data){
    //   state.create1proId.orgId = data;

    // }
  },
  actions: {
    updateState({ commit }) {
      commit("updateState", "new");
    },

    showLoading({commit},data){
      commit("showLoading", data);
  
  },
    
    async getWorkCount({state,commit},params){
      let url = params.url;
      let ret = await getPostInfo(url,params.objs);
    
      commit('getWorkCount',ret.data.data)
      return ret;
    },
    async getProList({state,commit},params){
      let url = params.url;
      let ret = await getPostInfo(url,params.objs);
   
      commit('getProList',ret.data.data)
      return ret;
    }
  },
  modules: {
    testStore
  }
});
