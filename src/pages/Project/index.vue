<template>
  <el-row>
      <g-header></g-header>
    <left-menu></left-menu>
     <router-view></router-view>
    <!-- <right-menu></right-menu> -->
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
    name: "PorIndex",
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
      indexMethod(index) {
        return (index * 1) + 1;
      },
      handleCommand(command) {
        console.log(command)
        // this.$message('click on item ' + command);
      },
      setTaskState(state) {
        switch (state) {
          case 1:
            return { color: "#edc800" }
            break;
          case 2:
            return { color: "#3db2ea" }
            break;
          case 3:
            return { color: "#181818" }
            break;
          case 4:
            return { color: "#676767" }
            break;
          case 5:
            return {
              color: "#a9a9a9",
              textDecoration: "line-through",
            }
            break;
        }
        // console.log(state)

      },

    }
  };
</script>
<style>
  /* .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  } */
</style>