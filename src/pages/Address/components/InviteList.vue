<template>
    <div class="userDataDetil" :style="{height:sWHeight}">
<!-- {{unReadList}} -->

          <div class="inviteListBox" v-if="unReadList.length!=0" v-for="(itme,index) in unReadList" :key="index">
            <div class="inviteListTop">
                <div class="inviteListTopTitle">
                    <h2 class="fl"> {{itme.purOriginator.shortName}}</h2>
                    <div class="inviteListTime fr">
                         {{changeTime(itme.lookTime)}}
                    </div>
                   
                </div>
                <el-row class="inviteListTopCenten">
                    <el-col :span="24" class="inviteListCentenLeft">
                        邀请人：{{itme.purOriginator.userName}} ({{itme.purOriginator.orgName}})
                    </el-col>
                   
                </el-row>
                <el-row class="inviteListTopCenten">
                    <el-col :span="24" class="inviteListCentenLeft">
                        被邀请人：{{itme.purTarget.userName}}
                    </el-col>
                    
                </el-row>
                <el-row class="inviteListTopCenten">
                    <el-col :span="24" class="inviteListCentenLeft">
                        申请事项：<span class="LeveTag" :style="{background:'#029cff',}">非成员</span> <span class="el-icon-minus"></span><span class="el-icon-caret-right"></span> <span class="LeveTag" :style="{background:'#029cff',}">成员</span>
                    </el-col>
                    
                </el-row>
                <div class="inviteListInfo">
                    注： {{itme.body}}
                    <!-- 注：“{{itme.purOriginator.shortName}}-{{itme.purOriginator.departmentName}}-{{itme.purOriginator.userName}}”邀请“{{itme.purTarget.shortName}}-{{itme.purTarget.departmentName}}-{{itme.purTarget.userName}}”成为“成员” -->
                </div>
            </div>

             <el-collapse-transition>
            <div class="inviteListBottom" v-show="itme.tarnState">
                <div class="inviteOrgInfo">
                    <h2 class="inviteColorfd7100">
                        申请人（被邀请人）本项目中的角色
                    </h2>
                    <div class="inviteOrgName">{{itme.purTarget.orgName}}（单位）</div>
                    <div class="inviteDepName">{{itme.purTarget.departmentName}}（部门）</div>
                    <div class="inviteDepName">{{itme.purTarget.userName}}（成员）</div>

                </div>

                 <div class="inviteOrgInfo">
                    <h2 class="inviteColor029cff">
                        邀请人本项目中的角色
                    </h2>
                    <div class="inviteOrgName">{{itme.purOriginator.orgName}}（单位）</div>
                    <div class="inviteDepName">{{itme.purOriginator.departmentName}}（部门）</div>
                    <div class="inviteDepName">{{itme.purOriginator.userName}}（{{itme.purOriginator.levelName}}）</div>

                </div>

                 <div class="inviteOrgInfo">
                    <h2 class="inviteColor029cff">
                       我在本项目中的角色
                    </h2>
                    <div class="inviteOrgName">{{itme.purSend.orgName}}（单位）</div>
                    <div class="inviteDepName">{{itme.purSend.userName}}（{{itme.purSend.level===3?'部门负责人':itme.purSend.level===4?'部门成员':'部门负责人'}}）</div>

                </div>
            </div>

             </el-collapse-transition>
            <div class="inviteListBtns">
         
                <el-row>
                    <div class="I-ListBtn-Info">
                        以上信息确认
                    </div>
                    <el-col :span="6">
                        <span class="I-ListBtn i-turn-down" @click="getAuthor('1',itme.mailId,index)">驳回</span>
                    </el-col>
                    <el-col :span="6">
                        <span class="I-ListBtn i-turn-determined" @click="gotoback">待定</span>

                    </el-col>
                    <el-col :span="6">
                        <span class="I-ListBtn i-turn-agree" @click="getAuthor('0',itme.mailId,index)">同意</span>

                    </el-col>
                    <el-col :span="6" class="i-status-Expand">
                       <span @click="itme.tarnState = !itme.tarnState" class="i-status-ExpandBtn"> {{itme.tarnState?'收起':'展开详情'}}<span class="el-icon-arrow-up"></span></span>

                    </el-col>
                </el-row>
            </div>
        </div>

        
        <div v-if="unReadList==0" class="noData">
            暂无需要您审批“加入项目”的消息
        </div>

 <div class="clear"></div>



    </div>
</template>
<script>
    import { mapState } from "vuex";
    import {
        getPostInfo,
        transDate,
        character,
        getStorage
    } from "../../../assets/lib/myStorage.js";
    export default {
        name: "InviteList",
        props:['unReadList'],
        data(){
            return{
                transhow3: true,
            }
        },
        methods: {
               open2(msg) {
        this.$message({
          message: msg,
          type: 'success'
        });
      },
      gotoback(){
        //    this.$router.push('/address')
          this.$router.go(0)
      },
         changeTime(time){
              return transDate(time)
         },
            getAuthor(type,id,index){
                let AuthorizedObj={
                    userId:getStorage("userInfo").id,
                    projectId:this.proTitle.proId,
                    mailId:id,
                    isAuthorized:type,
                }
                   getPostInfo("yq_api/authority/authorityJoinProjectForAugust", AuthorizedObj).then(res=>{
                       if(res.data.code===200){
                             this.unReadList.splice(index, 1)
                           this.open2(res.data.msg)
                                  
                       }
                      
                   })

            },
        },
        computed: {
            ...mapState(["sWHeight", "proTitle"])
        }
    };
</script>

<style>
</style>