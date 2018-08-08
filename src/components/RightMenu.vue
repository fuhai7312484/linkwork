<template>
<div class="rightMenu" :style="{height:sWHeight}">
    <ul class="RightMenuListBox">
    <router-link tag="li" class="RightMenuList" to="/x" >
<span class="iconfont">&#xe61c;</span>
<p>
微寻
</p>
  </router-link>
   <router-link tag="li" class="RightMenuList" to="/c" >
<span class="iconfont">&#xe60e;</span>
<p>
微聊
</p>
  </router-link>
   <router-link tag="li" class="RightMenuList" to="/v" >
<span class="iconfont">&#xe647;</span>
<p>
微知识
</p>
  </router-link>
     <router-link tag="li" class="RightMenuList" to="/b" >
<span class="iconfont">&#xebbb;</span>
<p>
微发布
</p>
  </router-link>
  
</ul>

    </div>
</template>

<script>
import { mapState } from "vuex";
import { autodivheight } from "../assets/lib/myStorage.js";
export default {
  name: "RightMenu",
  data() {
    return {
      modHeight: ""
    };
  },
     computed:{
        ...mapState(
            {
            sWHeight:state=>state.sWHeight
            }),
          
    },
  mounted() {
    // this.modHeight = this.sWHeight;
    // this.modHeight = autodivheight() + "px";
 
    
  }
};
</script>


<style>
</style>
