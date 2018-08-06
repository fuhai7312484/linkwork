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



import Vue from 'vue'
import vuex from 'vuex'
import testStore from './testStore.js'
Vue.use(vuex);

export default new vuex.Store({
    state:{
        show:false,
        isLogin:0, 
    },
    mutations:{
        updateState(state,message){
            state.message = message;
        },
        changeLogin(state,data){
            state.isLogin = data;
          }

    },
    actions:{
        updateState({commit}){
            commit('updateState','new')
        }
    },
    modules:{
        testStore
    }
})


