<template>



    <div class="leftMenu" :style="{height:modHeight}">
      <ul class="leftMenuListBox">

    <router-link tag="li" class="leftMenuList" to="/proList" >
<span class="iconfont">&#xe658;</span>
<p>
项目总览
</p>

    </router-link>
<router-link tag="li" class="leftMenuList" to="/cc" >
<span class="iconfont">&#xe657;</span>
<p>
业务·审批
</p>
    </router-link>
     <router-link tag="li" class="leftMenuList" to="/a" >
<span class="iconfont">&#xe60e;</span>
<p>
项聊
</p>
    </router-link>
     <router-link tag="li" class="leftMenuList" to="/b" >
<span class="iconfont">&#xe61c;</span>
<p>
成员
</p>
    </router-link>
    <router-link tag="li" class="leftMenuList" to="/c" >
<span class="iconfont">&#xe6de;</span>
<p>
计·记·发布
</p>
    </router-link> 

    
     </ul>

     <el-popover
    placement="right"
    width="400"
    trigger="hover">
<div>
        这里是登录成功后跳转到首页
        <div>
            当前登录的用户信息：
             <p>
                用户ID：{{userData.id}}
            </p>
            <p>
                用户名称：{{userData.name}}
            </p>
              <p>
                手机号：{{userData.mobile}}
            </p>
              <p>
                accessToken：{{userData.accessToken}}
            </p>
               <p>
               邮箱：{{userData.email}}
            </p>
            头像：<img :src="userData.mainPic" :style="{width:'50px',height:'50px'}"/>
        </div>
    </div>


  <button slot="reference" class="mainPicBox">
      <!-- <el-badge is-dot class="item"> -->
     <img :src="userData.mainPic" :style="{width:'50px',height:'50px'}"/> 
     <!-- </el-badge> -->
  <p>{{userData.name}}</p>

 
  </button>
</el-popover>  
     {{sWHeight}}
    </div>


</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {getStorage,autodivheight} from '../assets/lib/myStorage.js'
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
                ['getScrllH'])
    },
    mounted(){
      this.userData = getStorage('userInfo')
      this.modHeight = autodivheight()+'px';
       this.getScrllH(autodivheight()+'px')
      let _that = this;
      window.onresize = function(){
        let scrllWindow = autodivheight();
        scrllWindow<=590?scrllWindow=590:scrllWindow;
            _that.modHeight = scrllWindow+'px';
              _that.getScrllH(scrllWindow+'px')

      }
    },
}
</script>

<style>
.el-badge__content.is-fixed{
    top: 5px;
}


</style>
