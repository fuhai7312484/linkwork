<template>
  <el-row>
    <g-header></g-header>
    <left-menu></left-menu>


    <div class="demo-split" :style="{height:sWHeight}">
      <Split v-model="split1" min="190px" max="700px">
        <div slot="left" class="demo-split-pane splitLeft">


<div class="inviteBox">

<div class="approval">
  <span class="el-icon-bell"></span>   邀请审批
</div>
<div class="friends">
  <span class="el-icon-plus">
 
  </span>
邀请好友加入项目
</div>


</div>


          <div v-for="(itme,index) in data" :key="index">
            <div v-for="(oneItme,index) in itme.children" :key="index" v-if="oneItme.creator==='Y'" class="creatorBox">
              <img :src="oneItme.mainPic" /> {{oneItme.label}}
              <span class="LeveTag" :style="{background:'#029cff',}">创建人
              </span>

            </div>
          </div>
          <el-tree :data="data" :props="defaultProps" accordion node-key="$treeNodeId" 
          :default-expanded-keys="[1]"
            :default-checked-keys="[5]" 
            :expand-on-click-node="false"
            @node-click="handleNodeClick" class="AddressUserListBox">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span class="custom-treeImgBox" :style="titleColor(data.pid)">
                <i v-if="data.pid==1" class="GPid1Cl">
                  G{{data.serNum}}
                </i>

                <i v-else-if="data.pid==2" class="DPid2Cl">
                  D{{data.serNum}}
                </i>

                <!-- {{data}} -->
                <img :src="data.mainPic" v-if="data.mainPic" />{{ node.label }}
                <span v-if="data.level==1 || data.level==3" class="LeveTag" :style="{background:data.level==1?'#07a816':data.level==3?'#fd7100':'',}">{{levelChange(data.level)}}</span>
                {{data.peopleNum?'('+data.peopleNum+')人':''}}
              </span>

              <el-button v-if="data.pid==1" type="text" size="mini" @click="() => gotoDetil(node, data)">
                查看
              </el-button>

              <!-- <span>
          <el-button type="text" size="mini" @click="() => append(data)">
            Append
          </el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>  -->
            </span>
          </el-tree>

        </div>
        <div slot="right" class="demo-split-pane splitRinght">
          <!-- <router-view></router-view> -->
          <add-details v-if="UserShow" :userData="userData">

          </add-details>
          <org-details v-if="!UserShow" :userData="userData">


          </org-details>
         
          <!-- {{userData}} -->

          <!-- {{data}} -->
          <!-- {{proTitle}} -->
        </div>
      </Split>
    </div>




    <!-- <div class="remarkBox" :style="{height:sWHeight}">
      <div class="proTitleBox">
           <ul class="DiaryTabs">
通讯录
            </ul> 
      </div>
    </div>
    


      <div class="contentBox">
    
        

      </div> -->

    <right-menu></right-menu>
    <g-footer></g-footer>
  </el-row>

</template>
<script>
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import GHeader from "@/components/Header.vue";
import GFooter from "@/components/Footer.vue";
import AddDetails from "./components/AddDetails.vue";
import OrgDetails from "./components/OrgDetails.vue";
import { getPostInfo, getStorage } from "../../assets/lib/myStorage.js";
import { mapState, mapMutations } from "vuex";

export default {
  name: "AddressIndex",
  data() {
    return {
      UserShow:true,
      userData:{},
      split1: 0.3,
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
        id: "id",
        mainPic: "mainPic",
        level: "level",
        projectId: "projectId",
        peopleNum: "peopleNum",
        serNum: "serNum",
        creator: "creator"
      }
    };
  },
  components: {
    LeftMenu,
    RightMenu,
    GHeader,
    GFooter,
    AddDetails,
    OrgDetails,

  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      sWHeight: state => state.sWHeight,
      proTitle: state => state.proTitle,
      AddressUid:state=>state.AddressUid
    })
  },
  methods: {
    ...mapMutations(["changeLogin", "getScrllH","setAddressUid"]),
    gotoDetil(node,data){
        this.UserShow= false;
        console.log(data)
    
    },
    handleNodeClick(data) {
      if (data.pid === 3) {
        this.UserShow=true
             let addDe = {
            lookUserId:data.userId,
            projectId: this.proTitle.proId,
             userId: getStorage("userInfo").id,
        }
         getPostInfo("/yq_api/projectUserRef/searchProjectUser",addDe).then(
           res=>{
               if(res.data.code===200){
                let data = res.data.data
               this.userData = data
               if(data.userId===getStorage("userInfo").id){
                 this.userData.isMySelf = true;
               } 
               }
               
           }
         )
    
      }

      // console.log(data);
    },
    levelChange(level) {
      switch (level) {
        case 1:
          return "代表人";
          break;
        case 3:
          return "负责人";
          break;
      }
    },
    titleColor(pid) {
      switch (pid) {
        case 1:
          return { color: "#ff6700" };
          break;
        case 2:
          return { color: "#029cff" };
          break;
      }
    }
  },
  mounted() {
  let addObj = {
      userId: getStorage("userInfo").id,
      projectId: this.proTitle.proId
    };
       getPostInfo("yq_api/projectUserRef/findByProjectIdAndUseId",addObj).then(resd=>{
         if(resd.data.code===200){
           let newDataId = resd.data.data.userId
         let addDe = {
                  lookUserId:newDataId,
                  projectId: this.proTitle.proId,
                  userId: getStorage("userInfo").id,
              }
           
              getPostInfo("/yq_api/projectUserRef/searchProjectUser",addDe).then(
                res=>{
                    if(res.data.code===200){
                      let data = res.data.data
                    this.userData = data
                    
                    }
                   
                }
              )


        
         }
       })


         


  
    // console.log(addObj);
    getPostInfo("/yq_api/orgDepartment/searchLinkmanList", addObj).then(res => {
      if (res.data.code === 200) {
        let data = res.data.data.orgList;
        console.log(data);
        let newData = [];
        //第一层循环
        data.forEach((e, index) => {
          let pObj = {
            label: e.shortName + (e.typeName ? "-(" + e.typeName + ")" : ""),
            children: [],
            projectId: e.projectId,
            peopleNum: 1,
            id: e.id,
            serNum: index + 1,
            orgId:e.orgId,
            pid: 1,
          };
          // pObj.serNum++;
          //代表人循环
          let creUserObj = {
            label: e.orgLeader[0].userName,
            mainPic: e.orgLeader[0].mainPic,
            level: e.orgLeader[0].level,
            userId: e.orgLeader[0].userId,
            projectId: e.orgLeader[0].projectId,
            pid: 3,
            id: e.orgLeader[0].id,
            creator: e.orgLeader[0].creator,
            orgId:e.orgLeader[0].orgId,
          };
          pObj.children.push(creUserObj);

          //部门循环
          e.departmentList.forEach((el, index) => {
            // let children =[]

            let cobj = {
              label: el.departmentName,
              children: [],
              id: el.id,
              peopleNum: el.purList.length != 0 ? el.purList.length : "0",
              serNum: index + 1,
              pid: 2
            };
            // console.log(el.purList.length)
            // 用户循环
            el.purList.forEach(ele => {
              pObj.peopleNum++;
              let eleObj = {
                label: ele.userName,
                mainPic: ele.mainPic,
                level: ele.level,
                userId: ele.userId,
                projectId: ele.projectId,
                id: ele.id,
                pid: 3,
                orgId:ele.orgId,
                creator: ele.creator
              };
              // ele.label = ele.userName;
              cobj.children.push(eleObj);
            });
            pObj.children.push(cobj);
          });
          //无部门用户组循环
          e.orgMember.forEach(ue => {
            pObj.peopleNum++;
            let ueObj = {
              label: ue.userName,
              mainPic: ue.mainPic,
              level: ue.level,
              userId: ue.userId,
              projectId: ue.projectId,
              id: ue.id,
              creator: ue.creator,
              orgId:ue.orgId,
              pid: 3
            };
            pObj.children.push(ueObj);
          });
          newData.push(pObj);
        });
        console.log(newData);
        this.data = newData;

        // this.data = data;
        // console.log(this.data);
      }
    });
  }
};
</script>
<style>
</style>