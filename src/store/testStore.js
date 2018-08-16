
import axios from "axios";
export default{
    state:{
        // count:11,
        fiaworkfiow:[],

    },
    mutations: {
        // changeCount(state){
        //     state.count++
        // }

        getWorkCount(fiaworkfiow){
            var qs = require("qs");
            axios.post("http://39.107.254.60:8081/yq_api/user/login", qs.stringify({mobile:'13051376806',password:'123456',type:'1'}))
            .then(res => {
                fiaworkfiow = res.data.data
          })
        },

    },
    actions:{

        increment(count){
            context.commit('getWorkCount')
        }
      
        // newJson(obj){
        //     obj.commit('getWorkCount');
        // }

      }
      

}