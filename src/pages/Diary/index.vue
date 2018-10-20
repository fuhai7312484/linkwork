<template>
  <el-row>
      <g-header></g-header>
    <left-menu></left-menu>

    <div class="remarkBox" :style="{height:sWHeight}">
      <div class="proTitleBox">
           <ul class="DiaryTabs">

            <!-- <router-link tag="li" class="DiaryLiTab iconfont icon-dian" to="/diary/e">
                  日程计划
                
          </router-link> -->

           <router-link tag="li" class="DiaryLiTab iconfont icon-dian" to="/diary/EditDiary">
                  编辑记事
                
          </router-link>
            <router-link tag="li" class="DiaryLiTab iconfont icon-dian" to="/diary/MyDiary">
                  我的记事
                
          </router-link>

           <router-link tag="li" class="DiaryLiTab iconfont icon-dian" to="/diary/TaDiary">
                  他人记事
                
          </router-link>

            
            </ul> 
      </div>
    </div>
    

    <!-- <div class="remarkBox" :style="{height:sWHeight}">
      <div class="proTitleBox">
           <ul class="DiaryTabs">
            <li class="DiaryLiTab iconfont icon-dian" v-for="(item,index) in tabsParam"
                  @click="toggleTabs(index)"
                  :class="{active:index===nowIndex}" :key="index">
                  
                  {{item}}
            </li>
            </ul> 
      </div>
    </div> -->

      <div class="contentBox">
        <!-- <div class="content" :class="nowIndex===2 || nowIndex===3?'content_dairy':''"
      :style="{maxHeight:sWHeight}"
      > -->
         <router-view></router-view>

      

<!--          
<div v-if="nowIndex===0">日程日志</div>
  <edit-diary v-if="nowIndex===1"></edit-diary>
  <my-diary @toggleTabs="toggleTabs" v-if="nowIndex===2"></my-diary>
  <ta-diary v-if="nowIndex===3">
    
      </ta-diary>     -->

<!-- <div class="clear"></div> -->
 <!-- </div> -->
      </div>

    <!-- <right-menu></right-menu> -->
       <g-footer></g-footer>
  </el-row>

</template>
<script>
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import GHeader from "@/components/Header.vue";
import GFooter from "@/components/Footer.vue";
import MyDiary from "./components/myDiaryList.vue";
import TaDiary from "./components/TaDiaryList.vue";
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
    EditDiary,
    TaDiary
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