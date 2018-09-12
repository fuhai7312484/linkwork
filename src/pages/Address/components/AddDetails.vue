<template>
    <div class="userDataDetil" :style="{height:sWHeight}">

         <div class="proUserInfoBox">

  <el-row :gutter="20">
  <el-col :span="6" class="addDet_avatarBox">
    <img :src="userData.mainPic" />

     </el-col>
  <el-col :span="18">
      <h2 class="addDet_TitleName">
          {{userData.userName}} <span v-if="userData.level==3" class="addDet_tag3">{{levelChange(userData.level)}}</span> 
          <span v-else-if="userData.level==1" class="addDet_tag1">{{levelChange(userData.level)}}</span> 
      </h2>
      <div class="addDet_Title_Icon">
          <span class="el-icon-tickets" title="日志">
          </span>
          <span class="iconfont" title="消息">&#xe779;</span>
      </div>
  </el-col>
</el-row>



      

         </div>

 <el-row :gutter="20">
 <el-col :span="7" class="addDet_textLeft">
<h3>
    基本信息
</h3>

 </el-col>
  <el-col :span="17" class="addDet_textRigth">
        <div class="addDet_textInfoBox">
        <span>账号：</span>
        <span>{{userData.account}}</span>
        </div>


        <div class="addDet_textInfoBox">
        <span>昵称：</span>
        <span>{{userData.userName}}</span>
        </div>

         <div class="addDet_textInfoBox">
        <span>性别：</span>
        <span>{{userData.sex==1?'男':'女'}}</span>
        </div>

        <div class="addDet_textInfoBox">
        <span>联系方式：</span>
        <span>{{userData.mobile}}</span>
        </div>

        <div class="addDet_textInfoBox">
        <span>邮箱：</span>
        <span>{{userData.email}}</span>
        </div>

        <div class="addDet_textInfoBox">
        <span>职称：</span>
        <span>{{userData.levelName}}</span>
        </div>

  </el-col>
 </el-row>

 <el-row :gutter="20">
 <el-col :span="7" class="addDet_textLeft">
<h3>
    本项目中角色
</h3>
 </el-col>

  <el-col :span="17" class="addDet_textRigth">

<div class="addDet_textInfoBox">
        <span>单位(团队或组织)：</span>
        <span>{{userData.orgName}}</span>
        </div>
        <div class="addDet_textInfoBox">
        <span>部门：</span>
        <span>{{userData.departmentName}}</span>
        </div>

        <div class="addDet_textInfoBox">
        <span>Ta的角色：</span>
        <span>{{userData.levelName}}</span>
        </div>
  </el-col>
</el-row>

<el-row :gutter="20">
   <el-col :span="2" class="addDet_textLeft">
   <div class="grid-content"></div>

 </el-col>
 <el-col :span="22" class="addDet_textRigth">
     <h3>
技能标签(爱好、擅长点、推销亮点)
     </h3>
 </el-col>

</el-row>

<el-row :gutter="20">
<el-col :span="7" class="addDet_textLeft">

<div class="grid-content"></div>

 </el-col>


   <el-col :span="17" class="addDet_textRigth">
<div>
    <span v-for="(topItme,index) in userData.topicList" :key="index" class="addDet_TagsList">
             {{topItme.name}}
         </span><br/>
      
        </div>
  </el-col>

</el-row>
 <el-row :gutter="20">
 <el-col :span="7" class="addDet_textLeft">
<h3>
    工作地址
</h3>
 </el-col>
  <el-col :span="17" class="addDet_textRigth">
<div class="addDet_textInfoBox">
       {{userData.positionDesc}}
        </div>
        <div class="showBaiduMap">
            <showbaidu-map :coordinate="{lat:userData.positionBdLatitude,lon:userData.positionBdLongitude}"></showbaidu-map>
        </div>
  </el-col>
</el-row>
<el-row :gutter="20">
 <el-col :span="7" class="addDet_textLeft">
<h3>
    个人说明
</h3>
 </el-col>
  <el-col :span="17" class="addDet_textRigth">
<div class="addDet_textInfoBox">
     {{userData.content==null?'当前用户还没有任何个人说明':userData.content}}
        </div>
  </el-col>
</el-row>
<div class="clear"></div>
    </div>
</template>
// <script>
// import {getPostInfo,getStorage} from "../../../assets/lib/myStorage.js";
  import { mapState} from "vuex";
 import ShowbaiduMap from "../../../components/ShowbaiduMap.vue";
export default {
    name:'AddDetails',
    props:['userData'],
    data(){
        return{
           
        }
    },
    computed: {
    ...mapState(['sWHeight'])
  },
   components: {
            ShowbaiduMap
        },
    //   computed: {
    //       ...mapState(['AddressUid','proTitle'])
   
    // },
    methods: {
        levelChange(level){
            switch(level){
                case 3:
                return '负责人'
                break;
                  case 1:
                return '代表人'
                break;
            }
            console.log(level)

        }
    },
    mounted () {
        
    },

}
</script>
<style>

</style>

