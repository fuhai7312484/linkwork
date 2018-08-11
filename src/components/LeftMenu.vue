<template>



    <div class="leftMenu" :style="{height:modHeight}">
      <ul class="leftMenuListBox">
          <router-link tag="li" class="leftMenuList" to="/home" >
<span class="iconfont LeftIcon">&#xe658;</span>
<span class="LeftMenuTitle">
首页
</span>

    </router-link>

    <router-link tag="li" class="leftMenuList" to="/project" >
<span class="iconfont LeftIcon">&#xe658;</span>
<span class="LeftMenuTitle">
项目总览
</span>

    </router-link>
<router-link tag="li" class="leftMenuList" to="/cc" >
<span class="iconfont LeftIcon">&#xe657;</span>
<span class="LeftMenuTitle">
业务·审批
</span>
    </router-link>
     <router-link tag="li" class="leftMenuList" to="/a" >
<span class="iconfont LeftIcon">&#xe658;</span>
<span class="LeftMenuTitle">
项聊
</span>
    </router-link>
     <router-link tag="li" class="leftMenuList" to="/b" >
<span class="iconfont LeftIcon">&#xe61c;</span>
<span class="LeftMenuTitle">
成员
</span>
    </router-link>
   

    
     </ul>

    
    </div>


</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {getStorage,autodivheight,stoRemove,stClear} from '../assets/lib/myStorage.js'
import router from "../router";
export default {
  name: 'LeftMenu',
      data(){
        return {
            userData:{},
            modHeight:'',
            menuList:[
              {title:'标题',icon:'',path:''}
            ]
        }
    },
    computed:{
        ...mapState(
            {userInfo:state=>state.userInfo,
            sWHeight:state=>state.sWHeight
            }),
          
    },
    methods: {
          ...mapMutations(
                ['changeLogin','getScrllH']),


    },
   
    mounted(){
      this.userData = getStorage('userInfo')
      this.modHeight = (autodivheight()-60)+'px';
       this.getScrllH((autodivheight()-60)+'px')
      let _that = this;
      window.onresize = function(){
        let scrllWindow = autodivheight();
        scrllWindow<=590?scrllWindow=590:scrllWindow;
            _that.modHeight = (scrllWindow-60)+'px';
              _that.getScrllH((scrllWindow-60)+'px')

      }
    },
}
</script>

<style>
.el-badge__content.is-fixed{
    top: 5px;
}


</style>
