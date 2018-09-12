<template>
    <div class="userDataDetil" :style="{height:sWHeight}">






        
这里是查看单位详情





<div class="clear"></div>
    </div>
</template>
// <script>
// import {getPostInfo,getStorage} from "../../../assets/lib/myStorage.js";
  import { mapState} from "vuex";
 import ShowbaiduMap from "../../../components/ShowbaiduMap.vue";
export default {
    name:'OrgDetails',
    props:['userData'],
    data(){
        return{
           
        }
    },
    computed: {
    ...mapState(['sWHeight'])
  },
   components: {
            ShowbaiduMap
        },
    //   computed: {
    //       ...mapState(['AddressUid','proTitle'])
   
    // },
    methods: {
        levelChange(level){
            switch(level){
                case 3:
                return '负责人'
                break;
                  case 1:
                return '代表人'
                break;
            }
        

        }
    },
    mounted () {
        
    },

}
</script>
<style>

</style>

