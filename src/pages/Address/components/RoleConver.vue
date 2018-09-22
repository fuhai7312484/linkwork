<template>
    <div class="userDataDetil" :style="{height:sWHeight}">
          <div class="inviteListBox">
              <div class="Role-Info-box">
               <h2 class="Role-title" @click="PendingShow=!PendingShow">
                   待审核<span :class="PendingShow?'el-icon-arrow-up':'el-icon-arrow-down'"></span>
               </h2>
  <el-collapse-transition>
<div v-show="PendingShow">
    <div v-for="(unItme,index) in RoleList" :key="index">
      <el-row>
        <el-col :span="10">
            <div class="Role-PendingLeft">
                <div class="Role-main-PicBox">
                  <img :src="unItme.purSend.mainPic" :style="{width:'24px',height:'24px',}" class="Role-mainPic"/> <span class="Role029cff">您</span>原来的角色

                </div>
                <div class="Role-mainInfo">
                    {{unItme.purSend.shortName}}-{{unItme.purSend.orgName}}(单位)-{{unItme.purSend.userName}}-<span class="Rolefd7100">{{unItme.purSend.level===3?'部门负责人':unItme.purSend.level===4?'单位成员':'单位成员'}}</span>
                </div>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="Role-main-arrowBox">
           <span class="iconfont RoleRightArrow">&#xe60c;</span>
           <span class="iconfont RoleLeftArrow">&#xe60b;</span>
            </div>
        </el-col>
        <el-col :span="10">

 <div class="Role-PendingLeft">
                <div class="Role-main-PicBox">
                  <img :src="unItme.purOriginator.mainPic" :style="{width:'24px',height:'24px',}" class="Role-mainPic"/><span class="Rolefd7100">TA</span>原来的角色

                </div>
                <div class="Role-mainInfo">
                    {{unItme.purOriginator.shortName}}-{{unItme.purOriginator.orgName}}(单位)-{{unItme.purOriginator.userName}}-<span class="Rolefd7100">{{unItme.purOriginator.level===3?'部门负责人':unItme.purOriginator.level===4?'部门成员':'部门负责人'}}</span>
                </div>
            </div>

        </el-col>
       
    </el-row>
   
      <div class="Role-btns">
            <span class="I-ListBtn i-turn-down" @click="getAuthor('0',unItme.mailId,index)" >驳回</span>
              <span class="I-ListBtn i-turn-agree" @click="getAuthor('1',unItme.mailId,index)">同意</span>
      </div>
    
    </div>
</div>
         </el-collapse-transition>   
               </div>
          </div>
        














            <div class="inviteListBox">
              <div class="Role-Info-box">
               <h2 class="Role-title" @click="AuditedShow=!AuditedShow">
                   已审核<span :class="AuditedShow?'el-icon-arrow-up':'el-icon-arrow-down'"></span>
               </h2>
  <el-collapse-transition>
<div v-show="AuditedShow">
    <div v-for="(ConsenItme,index) in RoleConsentList" :key="index">
     <el-row>
        <el-col :span="10">
            <div class="Role-PendingLeft">
                <div class="Role-main-PicBox">
                  <img :src="ConsenItme.purSend.mainPic" :style="{width:'24px',height:'24px',}" class="Role-mainPic"/> <span class="Role029cff">您</span>原来的角色

                </div>
                <div class="Role-mainInfo">
                    {{ConsenItme.purSend.shortName}}-{{ConsenItme.purSend.orgName}}(单位)-{{ConsenItme.purSend.userName}}-<span class="Rolefd7100">{{ConsenItme.purSend.levelName}}</span>
                </div>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="Role-main-arrowBox">
           <span class="iconfont RoleRightArrow">&#xe60c;</span>
           <span class="iconfont RoleLeftArrow">&#xe60b;</span>
            </div>
        </el-col>
        <el-col :span="10">

 <div class="Role-PendingLeft">
                <div class="Role-main-PicBox">
                  <img :src="ConsenItme.purOriginator.mainPic" :style="{width:'24px',height:'24px',}" class="Role-mainPic"/> <span class="Rolefd7100">TA</span>原来的角色

                </div>
                <div class="Role-mainInfo">
                    {{ConsenItme.purOriginator.shortName}}-{{ConsenItme.purOriginator.orgName}}(单位)-{{ConsenItme.purOriginator.userName}}-<span class="Rolefd7100">{{ConsenItme.purOriginator.level===3?'部门负责人':'单位成员'}}</span>
                </div>
            </div>

        </el-col>
       
    </el-row>
   
    
    </div>


    
</div>



         </el-collapse-transition>   


               </div>




          </div>



    </div>
</template>
<script>
  import {
        getPostInfo,
        transDate,
        character,
        getStorage
    } from "../../../assets/lib/myStorage.js";
        import { mapState } from "vuex";
        
export default {
       props:['RoleConsentList','RoleList'],
    name:'RoleConver',
    data(){
        return{
            PendingShow:true,
            AuditedShow:false,
        }
    },
    methods: {
                open2(msg) {
        this.$message({
          message: msg,
          type: 'success'
        });
      },
           getAuthor(type,id,index){
                let AuthorizedObj={
                    userId:getStorage("userInfo").id,
                    projectId:this.proTitle.proId,
                    mailId:id,
                    agree:type,
                }
           
                   getPostInfo("yq_api/authority/agreeOrRefuseRoleConversion", AuthorizedObj).then(res=>{
                   
                       if(res.data.code===200){
                          
                           this.RoleList.splice(index, 1)
                           this.open2(res.data.data)
                                  
                       }
                      
                   })

            },
    },
      computed: {
            ...mapState(["sWHeight", "proTitle"])
        }
}
</script>
<style>

</style>
