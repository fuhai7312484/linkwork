<template>
<el-row>
    <g-header></g-header>
        <left-menu></left-menu>
       <!-- 11111111 {{fiaworkfiow}}<br/> -->
     
        <el-col :span="5"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple">
          
            {{ProList}}
          
          </div></el-col>
<right-menu></right-menu>
  <g-footer></g-footer>
</el-row>


</template>
<script>
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import GHeader from '@/components/Header.vue';
import GFooter from '@/components/Footer.vue'
  import { getPostInfo,commonApi } from "../../assets/lib/myStorage.js";
import {mapState,mapActions,mapMutations} from 'vuex';

export default {
    name:"Home",
    data(){
      return {
        goods:[null],
      }

    },
    computed:{
 ...mapState(['fiaworkfiow','ProList']),
 },
 methods: {
  //  ...mapMutations(['getWorkCount']),
   ...mapActions(['getWorkCount'])

 },
    components:{
        LeftMenu,
        GHeader,
        GFooter,
        RightMenu,

    },
    //    async created() {
    //   let params =  {url:'yq_api/user/login',objs:{mobile:'13051376806',password:'123456',type:'1'}}
    //   await this.getWorkCount(params);
    //   this.goods = this.fiaworkfiow;
    // },

    mounted() {
     
    },
 
}
</script>
<style>

.el-row {
    margin-bottom: 20px;
    
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    /* border-radius: 4px; */
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>

