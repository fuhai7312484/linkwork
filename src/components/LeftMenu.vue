<template>



    <div class="leftMenu" :style="{height:modHeight}">
      <ul class="leftMenuListBox">
          <!-- <router-link tag="li" class="leftMenuList" to="/home" >
<span class="iconfont LeftIcon">&#xe77e;</span>
<span class="LeftMenuTitle">
首页
</span>
    </router-link> -->


  <router-link tag="li" class="leftMenuList" to="/message" >
<span class="iconfont LeftIcon">&#xe626;</span>
<span class="LeftMenuTitle">
  
消息<el-badge v-if="MessageUnreadCount!=0" class="mark" :value="MessageUnreadCount" size="small" />
</span>
    </router-link>

<router-link tag="li" class="leftMenuList" to="/diary" >
<span class="iconfont LeftIcon">&#xe636;</span>
<span class="LeftMenuTitle">
记事
</span>
    </router-link>

    <!-- <router-link tag="li" class="leftMenuList" to="/g" >
<span class="iconfont LeftIcon">&#xe640;</span>
<span class="LeftMenuTitle">
管理
</span>
    </router-link> -->

    
     <router-link tag="li" class="leftMenuList" to="/address" >
<span class="iconfont LeftIcon">&#xe62b;</span>
<span class="LeftMenuTitle">
通讯录
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
            MessageUnread:0,
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
            sWHeight:state=>state.sWHeight,
            MessageUnreadCount:state=>state.MessageUnreadCount
            }),
          
    },
    methods: {
          ...mapMutations(
                ['changeLogin','getScrllH','getMessageUnreadCount']),
    },
   
    mounted(){
        this.getMessageUnreadCount()
        // this.getMessageUnread()
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
