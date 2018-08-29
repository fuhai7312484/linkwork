<template>
<div>
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
        <div class="content" :class="nowIndex===2 || nowIndex===3?'content_dairy':''"
      :style="{maxHeight:sWHeight}"
      >
<div v-if="nowIndex===0">日程日志</div>
  <edit-diary v-if="nowIndex===1"></edit-diary>
  <my-diary @toggleTabs="toggleTabs" v-if="nowIndex===2"></my-diary>
  <ta-diary v-if="nowIndex===3">
    
      </ta-diary>    

<div class="clear"></div>
 </div>
      </div>
      </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:'DiaryPublic',
      data() {
    return {
      tabsParam: ["日程计划", "编辑日志", "我的日志", "他人日志"],
      activeName: "third",
      nowIndex: 1,
      isShow: false
    };
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
}
</script>
<style>

</style>

