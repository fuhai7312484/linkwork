<template>
<el-row>
    <g-header></g-header>
        <left-menu></left-menu>
        <el-col :span="5"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
<right-menu></right-menu>
  <g-footer></g-footer>
</el-row>


</template>
<script>
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import GHeader from '@/components/Header.vue';
import GFooter from '@/components/Footer.vue'

export default {
    name:"Home",
    components:{
        LeftMenu,
        GHeader,
        GFooter,
        RightMenu,

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

