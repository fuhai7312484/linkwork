<template>
  <el-row>
      <g-header></g-header>
    <left-menu></left-menu>


    这里是日程日志
    <right-menu></right-menu>
       <g-footer></g-footer>
  </el-row>

</template>
<script>
  import LeftMenu from "@/components/LeftMenu";
  import RightMenu from "@/components/RightMenu";
  import GHeader from '@/components/Header.vue'
  import GFooter from '@/components/Footer.vue'
  import { autodivheight } from "../../assets/lib/myStorage.js";
  import { mapState } from "vuex";
  export default {
    name: "DiaryIndex",
    data() {
      return {
   
      }
    },
    components: {
      LeftMenu,
      RightMenu,
      GHeader,
      GFooter,
    },
    computed: {
      ...mapState({
        sWHeight: state => state.sWHeight
      })
    },
    methods: {



    }
  };
</script>
<style>
 
</style>