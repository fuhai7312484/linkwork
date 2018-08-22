<template>
  <el-row>
      <g-header></g-header>
    <left-menu></left-menu>

    <div class="remarkBox" :style="{height:sWHeight}">
      <div class="proTitleBox">

<ul class="DiaryTabs">
      <li class="DiaryLiTab iconfont icon-dian" v-for="(item,index) in tabsParam"
            @click="toggleTabs(index)"
            :class="{active:index===nowIndex}" :key="index">
            
            {{item}}
      </li>
 </ul>

 

  
      </div>
    </div>
      <div class="contentBox">
 <div class="content" 
      :style="{maxHeight:sWHeight}"
      >


<div v-if="nowIndex===0">日程日志</div>
  <edit-diary v-if="nowIndex===1"></edit-diary>
  <my-diary v-if="nowIndex===2"></my-diary>
  <div v-if="nowIndex===3">他人日志</div>    




     
<!-- <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
  <el-tab-pane name="first">
    <span slot="label"><i class="el-icon-date"></i>日程计划</span>
    日程计划
  </el-tab-pane>
  <el-tab-pane label="编辑日志" name="second">{{proTitle}}{{userInfo}}</el-tab-pane>
  <el-tab-pane label="我的日志" name="third">
    <my-diary>

    </my-diary>
   
    </el-tab-pane>
  <el-tab-pane label="他人日志" name="fourth">他人日志</el-tab-pane>
</el-tabs> -->

<div class="clear"></div>
 </div>
      </div>

    <right-menu></right-menu>
       <g-footer></g-footer>
  </el-row>

</template>
<script>
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import GHeader from "@/components/Header.vue";
import GFooter from "@/components/Footer.vue";
import MyDiary from "./components/myDiaryList.vue";
import EditDiary from "./components/EditDiary.vue";
import { autodivheight, getPostInfo } from "../../assets/lib/myStorage.js";
import { mapState } from "vuex";
export default {
  name: "DiaryIndex",
  data() {
    return {
      tabsParam: ["日程计划", "编辑日志", "我的日志", "他人日志"],
      activeName: "third",
      nowIndex: 1,
      isShow: false
    };
  },
  components: {
    LeftMenu,
    RightMenu,
    GHeader,
    GFooter,
    MyDiary,
    EditDiary
  },

  computed: {
    ...mapState(["sWHeight", "proTitle", "userInfo"])
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    //切换tab项
    toggleTabs(index) {
      this.nowIndex = index;
      //  $(window).resize();
    }
  }
};
</script>
<style>
</style>