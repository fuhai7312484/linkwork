<template>
    <div class="userDataDetil" :style="{height:sWHeight}">
<div class="clear"></div>
 <el-row :gutter="20">
 <el-col :span="7" class="addDet_textLeft">
<h3>
    单位信息
</h3>

 </el-col>
  <el-col :span="17" class="addDet_textRigth">

        <div class="addDet_textInfoBox">
        <span>单位简称：</span>
        <span>{{userData.shortName}}</span>
        </div>
        <div class="addDet_textInfoBox">
        <span>单位全称：</span>
        <span>{{userData.orgName}}</span>
        </div>
         <div class="addDet_textInfoBox">
        <span>单位在项目中的定位：</span>
        <span>{{userData.typeName}}</span>
        </div>

        <div class="addDet_textInfoBox">
        <span>昵称：</span>
        <span>{{userData.createPersonName}}</span>
        </div>
        <div class="addDet_textInfoBox">
        <span>创建人账号：</span>
        <span>{{userData.createPersonMobile}}</span>
        </div>

  </el-col>
 </el-row>

 
 <el-row :gutter="20">
 <el-col :span="7" class="addDet_textLeft">
<h3>
    部门信息
</h3>

 </el-col>
  <el-col :span="17" class="addDet_textRigth">

    

        <div v-for="(itme,index) in userData.departmentList" :key="index" class="addDet_textInfoBox">
        <!-- <p v-if="index<1"> 标题名称：{{itme.title}}</p> -->
     
        <span>部门：</span> <span>{{itme.departmentName}} ({{itme.purList.length}}人)</span>
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
    name:'OrgDetails',
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
  
    },
    mounted () {
        
    },

}
</script>
<style>

</style>

