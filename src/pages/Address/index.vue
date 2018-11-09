<template>
  <el-row>
    <g-header></g-header>
    <left-menu></left-menu>


    <div class="demo-split" :style="{height:sWHeight}">
      <Split v-model="split1" min="190px" max="700px">
        <div slot="left" class="demo-split-pane splitLeft" :style="{height:sWHeight}">


          <div class="inviteBox">

            <div class="approval" @click="approval = !approval">
              <span class="el-icon-bell"></span> 

     邀请审批
      <el-badge v-if="inveUnlook+RoleUnlook!=0" class="mark" :value="inveUnlook+RoleUnlook" />

            </div>
             
            <div>
              <el-collapse-transition>
         <ul class="inviteChangeMenu" v-show="approval">
           <li @click="inviteChange" :class="this.UserShow ==='3'?' approvalAct':' '">
             好友加入审批 
             <el-badge v-if="inveUnlook!=0" class="mark" :value="inveUnlook" />
           </li>
         <li @click="RoleConver">
           角色转换通知
           <el-badge v-if="RoleUnlook!=0" class="mark" :value="RoleUnlook" />
           </li>           
         </ul>
            </el-collapse-transition>
            </div>
           
            <div class="friends" @click="addInvitees">
              <span class="el-icon-plus">

              </span>

              邀请好友加入项目
              <i :class="addInv?'el-icon-arrow-up':'el-icon-arrow-down'"></i>

            </div>

            <div>
              <el-collapse-transition>
                <div v-show="addInv">
                  <div class="addInv-box">
                    <add-friend :orgInfoObj="orgInfoObj" :orgLeaderIsMe="orgLeaderIsMe" :InvitePeople="InvitePeople" :isMeOrgId="isMeOrgId" :isMeShortName="isMeShortName" :addInv="addInv" >


                    </add-friend>



                  </div>

                </div>
              </el-collapse-transition>
            </div>


          </div>


          <div v-for="(itme,index) in data" :key="index" class="LeveTagBoxFounder">
            <div v-for="(oneItme,index) in itme.children" :key="index" v-if="oneItme.creator==='Y'" class="creatorBox">
              <img :src="oneItme.mainPic" /> {{oneItme.label}}
              <span class="LeveTag" :style="{background:'#029cff',}">创建人
              </span>

            </div>
            
          </div>
          <div style="padding:0 10px;">

            <el-input
  placeholder="搜索好友..."
  v-model="filterText">
</el-input>
          </div>

           <!-- <div style="padding:0 20px;">
            <el-input
  placeholder="搜索好友..."
  v-model="filterText">
</el-input>
          </div> -->
          
          <el-tree :data="data"
           :props="defaultProps" 
           ref="tree2"
            accordion 
            node-key="$treeNodeId"
           :default-expanded-keys="[1]"
            :default-checked-keys="[5]" 
            :expand-on-click-node="false"
             @node-click="handleNodeClick" 
             :filter-node-method="filterNode"
            class="AddressUserListBox">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span class="custom-treeImgBox" :style="titleColor(data.pid)">
                <i v-if="data.pid==1" class="GPid1Cl">
                  D{{data.serNum}}
                </i>

                <i v-else-if="data.pid==2" class="DPid2Cl">
                  B{{data.serNum}}
                </i>
            

                <!-- {{data.id}} -->
                <span class="deleteUserMakbox">
                  <span v-if="data.status==='2'" class="deleteUserMak iconfont">
                   &#xe64b;
                  </span>
                   <span v-if="data.status==='1'" class="deleteUserMak"></span>
                
                  <img :src="data.mainPic?data.mainPic:require('../../assets/images/mainpic.jpg')" v-if="data.pid===3"/>
                  </span> <span :class="data.status==='2'?'deleteColor':data.status==='1'?'deleteColor':''">{{ node.label }}</span>
               
                <span v-if="data.level==1 || data.level==3" class="LeveTag" :style="{background:data.level==1?'#07a816':data.level==3?'#fd7100':'',}">{{levelChange(data.level)}}</span>
                {{data.peopleNum?'('+data.peopleNum+')人':''}}
              </span>
              <el-button v-if="data.pid==1" type="text" size="mini" @click="() => gotoDetil(node, data)">
                查看
              </el-button>
           
              <span v-if="data.pid===3&&data.level!=1&&data.orgId===isMeOrgId&&isMeOrgLeader">

                <el-dropdown>
  <span class="el-dropdown-link" >
    操作<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown" class="Archive-dropdown">
    <div @click="ArchiveChange('1',{userId:data.userId,orgId:data.orgId,level:data.level,departmentId:data.departmentId})">移除(归档)</div>
    <div @click="ArchiveChange('2',{userId:data.userId,orgId:data.orgId,level:data.level,departmentId:data.departmentId})">调整到其他部门</div>
    
  </el-dropdown-menu>
</el-dropdown>



              </span>

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






<el-dialog title="当前归档人员有职位请选择替代人" :visible.sync="dialogFormVisible" width="30%">
  
      <ul v-for="(ulItme,index) in userdepartArr" :key="index">
        <li v-for="(Itme,index) in ulItme.children" :key="index" class="ConversionList" @click="ConversionChange(Itme)">
        <img :src="Itme.mainPic" />  {{Itme.label}}
        </li>
      </ul>


  <!-- <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div> -->
</el-dialog>





<el-dialog title="调整到部门" :visible.sync="TransferVisible" width="30%">

  <!-- {{TransUser}} -->
  
    <ul v-for="(TransItme,index) in TransUser" :key="index"> 
      <!-- {{TransItme.children}} -->
     
        <li v-for="(TrItme,index) in TransItme.children" :key="index" v-if="TrItme.pid===2" class="ConversionList" @click="TransItmeChange(TrItme)">
        {{TrItme.label}}
        </li>
      </ul> 


</el-dialog>














          <div class="clear" style=" background: #f5f5f8;"></div>

        </div>
        <div slot="right" class="demo-split-pane splitRinght">
          <!-- <router-view></router-view> -->

           
         
         
          <add-details v-if="UserShow==='1'" :userData="userData">

          </add-details>
          <org-details v-if="UserShow==='2'" :userData="userData">


          </org-details>

          <invite-list v-if="UserShow==='3'" :unReadList="unReadList">

          </invite-list>
          <role-conver v-if="UserShow==='4'" :RoleConsentList="RoleConsentList" :RoleList="RoleList">


          </role-conver>
          
    
         

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

    <!-- <right-menu></right-menu> -->
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
import addFriend from "./components/addFriend.vue";
import InviteList from "./components/InviteList.vue";
import RoleConver from "./components/RoleConver.vue";
import { getPostInfo, getStorage } from "../../assets/lib/myStorage.js";
import { mapState, mapMutations } from "vuex";

export default {
  name: "AddressIndex",
  data() {
    return {
      inveUnlook: 0,
      RoleUnlook: 0,
      filterText: "",
      isMeOrgId: "",
      isMeShortName: "",
      isMeOrgLeader: false,
      orgInfoObj: {},
      InvitePeople: {},
      UserShow: "1",
      userData: {},
      split1: 0.3,
      addInv: false,
      approval: false,
      data: [],
      userdepartArr: [],
      TransUser: [],
      unReadList: [],
      RoleConsentList: [],
      RoleList: [],
      orgLeaderIsMe: false,
      dialogFormVisible: false,
      TransferVisible: false,
      commandUserId: "",
      commandDepartmentId: "",
      defaultProps: {
        children: "children",
        label: "label",
        id: "id",
        mainPic: "mainPic",
        level: "level",
        projectId: "projectId",
        peopleNum: "peopleNum",
        serNum: "serNum",
        creator: "creator",
        orgIsMe: "orgIsMe",
        status: "status",
        departmentId: "departmentId"
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
    addFriend,
    InviteList,
    RoleConver
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      sWHeight: state => state.sWHeight,
      proTitle: state => state.proTitle,
      AddressUid: state => state.AddressUid
    })
  },
  methods: {
 
    ...mapMutations(["changeLogin", "getScrllH", "setAddressUid"]),
    ConversionChange(obj) {
      if (obj.userId === this.commandUserId) {
        this.open4("不能选择归档人为替代人");
      } else {
        let QuiteObj = {
          userId: this.commandUserId,
          projectId: this.proTitle.proId,
          operationPeople: getStorage("userInfo").id,
          operationType: "1",
          replaceDepartmentPeople: obj.userId
        };
        console.log("选择代替人然后归档");
        getPostInfo("yq_api/projectUserRef/operationQuite", QuiteObj).then(res => {
            if(res.data.code===200){
                this.open2('归档成功！')
                this.dialogFormVisible =false;
                  let _that = this;
              setTimeout(function(){
                _that.$router.go(0)
              },500)
            }
        })
      }
    },

    TransItmeChange(obj) {
      // console.log(obj.id,this.commandDepartmentId)
      if (obj.id == this.commandDepartmentId) {
        this.open4("当前用户已在本部门！");
      } else {
        let TranObj = {
          userId: getStorage("userInfo").id,
          orgId: obj.orgId,
          projectId: this.proTitle.proId,
          departmentId: obj.id,
          forUser: this.commandUserId
        };

        getPostInfo("yq_api/orgDepartment/editOrgMember", TranObj).then(res => {
          if (res.data.code === 200) {
            this.open2(res.data.msg);
            this.TransferVisible = false;
            let _that = this;
            setTimeout(function() {
              _that.$router.go(0);
            }, 300);
          }
        });
      }
    },

    //归档
    ArchiveChange(command, obj) {
      this.commandUserId = obj.userId;
      this.commandDepartmentId = obj.departmentId;
      if (command === "1") {
        let QuiteObj = {
          userId: obj.userId,
          projectId: this.proTitle.proId,
          operationPeople: getStorage("userInfo").id,
          operationType: "1"
        };
        if (obj.level === 3) {
          let newArr = this.data.filter((e, index) => {
            return e.orgId === obj.orgId;
          });
          let departArr = newArr[0].children.filter(el => {
            return el;
          });
          this.userdepartArr = departArr.filter(ue => {
            return ue.id === obj.departmentId;
          });
          if (this.userdepartArr[0].children.length > 1) {
            this.dialogFormVisible = true;
          } else {
            console.log("归档");
            getPostInfo("yq_api/projectUserRef/operationQuite", QuiteObj).then(
              res => {
                if (res.data.code === 200) {
                  this.open2("归档成功！");
                  let _that = this;
                  setTimeout(function() {
                    _that.$router.go(0);
                  }, 500);
                }
              }
            );
          }

          //  this.commandUserId = obj.userId

          // console.log('负责人',obj.userId,obj.departmentId)
        } else if (obj.level === 4 || obj.level === 6) {
          // console.log(QuiteObj)
          getPostInfo("yq_api/projectUserRef/operationQuite", QuiteObj).then(
            res => {
              if (res.data.code === 200) {
                this.open2("成员归档成功！");
                let _that = this;
                setTimeout(function() {
                  _that.$router.go(0);
                }, 500);
              }
            }
          );
        }
      } else if (command === "2") {
        // this.commandUserId = obj.userId
        this.TransferVisible = true;
        let TransObj = {};
        let newArr = this.data.filter((e, index) => {
          return e.orgId === obj.orgId;
        });
        this.TransUser = newArr;

        // console.log(newArr,'转换部门',this.commandUserId)
        //  console.log(obj.userId)
      }
    },
    //获取角色转换通知列表
    getRoleList() {
      let RoleObj = {
        status: "0,1",
        projectId: this.proTitle.proId,
        type: "roleconvert",
        userId: getStorage("userInfo").id,
        isAuthority: "0,1"
      };

      // console.log(RoleObj)
      getPostInfo("/yq_api/mail/getMailListForType", RoleObj).then(res => {
        //  console.log(res)
        if (res.data.code === 200) {
          let unReadList = res.data.data.unReadList;
          let consentList = res.data.data.consentList;
          this.RoleList = unReadList;

          this.RoleConsentList = consentList;
          this.RoleUnlook = unReadList.length;
          //  console.log(unReadList,consentList)
        }
      });
    },
    //获取好友加入审批数据
    getInveList() {
      let invObj = {
        userId: getStorage("userInfo").id,
        type:
          "createdepartment,joindepartment,inviteproject,joinorg,joinorglooker,createorg,member",
        projectId: this.proTitle.proId,
        status: "0,1",
        isAuthority: "0,1"
      };

      getPostInfo("/yq_api/mail/getMailListForType", invObj).then(res => {
        if (res.data.code === 200) {
          let unData = res.data.data.unReadList;
          this.inveUnlook = unData.length;
          unData.forEach((e, index) => {
            e.tarnState = false;
          });
          //  console.log(unData)
          this.unReadList = unData;
        }
      });
    },
    //
    inviteChange() {
      this.UserShow = "3";
      // this.getInveList()
    },
    open4(msg) {
      this.$message.error(msg);
    },
    open2(msg) {
      this.$message({
        message: msg,
        type: "success"
      });
    },
    RoleConver() {
      this.UserShow = "4";
    },
    gotoDetil(node, data) {
      this.addInv = false;
      this.approval = false;
      this.UserShow = "2";
      let orgObj = {
        userId: getStorage("userInfo").id,
        projectId: this.proTitle.proId,
        orgId: data.orgId
      };

      getPostInfo("/yq_api/orgDepartment/detail", orgObj).then(res => {
        if (res.data.code === 200) {
          let orgData = res.data.data;
          // console.log(data.orgId)

          this.userData = orgData;
          this.userData.orgId = data.orgId;
          this.userData.orgIsMe = data.orgIsMe;
        }
      });
    },
    handleNodeClick(data) {
      console.log(data)
      this.addInv = false;
      this.approval = false;
      if (data.pid === 3) {
        this.UserShow = "1";
        // this.UserShow = true;
        let addDe = {
          lookUserId: data.userId,
          projectId: this.proTitle.proId,
          userId: getStorage("userInfo").id
        };
        getPostInfo("/yq_api/projectUserRef/searchProjectUser", addDe).then(
          res => {
            if (res.data.code === 200) {
              let data = res.data.data;
              // console.log(data)
              this.userData = data;
              if (data.userId === getStorage("userInfo").id) {
                this.userData.isMySelf = true;
              }
            }
          }
        );
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
    },
    addInvitees() {
      this.addInv = !this.addInv;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getUsersStatus(){
      // let 
         let addDe = {
              lookUserId: getStorage("userInfo").id,
              projectId: this.proTitle.proId,
              userId: getStorage("userInfo").id
            };
            getPostInfo("/yq_api/projectUserRef/searchProjectUser", addDe).then(
              res => {
                if (res.data.code === 200) {
                //  console.log(res)
               
                }
              }
            );

    },
  },
  watch: {
    filterText(val) {
      // console.log(this.$refs.tree2.filter(val))
      this.$refs.tree2.filter(val);
    }
  },
  mounted() {

 
this.getUsersStatus()

    this.getInveList();
    this.getRoleList();
    let inveUnlookObj = {
      userId: getStorage("userInfo").id,
      projectId: this.proTitle.proId
    };

    let addObj = {
      userId: getStorage("userInfo").id,
      projectId: this.proTitle.proId
    };
    getPostInfo("/yq_api/orgDepartment/searchLinkmanList", addObj).then(res => {
      //  console.log(status.code)
      if (res.data.code == 200) {
        // console.log(res.data.data)
        let data = res.data.data.orgList;

        let newData = [];
        //第一层循环
        data.forEach((e, index) => {
          // if(e.orgLeader[0].userId===getStorage("userInfo").id){
          //   let addDe = {
          //     lookUserId: e.orgLeader[0].userId,
          //     projectId: this.proTitle.proId,
          //     userId: getStorage("userInfo").id
          //   };
          // getPostInfo("/yq_api/projectUserRef/searchProjectUser", addDe).then(
          //   res => {
          //     if (res.data.code === 200) {
          //       let data = res.data.data;

          //       console.log(data)
          //       this.userData = data
          //       if (data.userId === getStorage("userInfo").id) {
          //           this.userData.isMySelf = true;
          //         }

          //     }
          //   }
          // );
          // }
          let pObj = {
            label: e.shortName + (e.typeName ? "-(" + e.typeName + ")" : ""),
            children: [],
            projectId: e.projectId,
            peopleNum: 1,
            id: e.id,
            serNum: index + 1,
            orgId: e.orgId,
            pid: 1,
            orgIsMe: false
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
            orgId: e.orgLeader[0].orgId,
            status: e.orgLeader[0].status,
            departmentId: e.orgLeader[0].departmentId
          };

          if (e.orgLeader[0].userId === getStorage("userInfo").id) {
            this.isMeOrgLeader = true;
            let addDe = {
              lookUserId: e.orgLeader[0].userId,
              projectId: this.proTitle.proId,
              userId: getStorage("userInfo").id
            };
            getPostInfo("/yq_api/projectUserRef/searchProjectUser", addDe).then(
              res => {
                if (res.data.code === 200) {
                  let data = res.data.data;
                  this.userData = data;
                  if (data.userId === getStorage("userInfo").id) {
                    // console.log(data)
                    this.userData.isMySelf = true;
                  }
                }
              }
            );

            this.orgInfoObj = {
              orgId: e.orgLeader[0].orgId,
              shortName: e.orgLeader[0].shortName,
              userId: e.orgLeader[0].userId,
              orgName: e.orgLeader[0].orgName,
              classifyName: e.typeName,
              nickName: e.orgLeader[0].nickName
            };
            this.isMeOrgId = e.orgLeader[0].orgId;
            // console.log(e.orgLeader[0])
            this.isMeShortName = e.orgLeader[0].shortName;
            
            this.InvitePeople = {
              mainPic: e.orgLeader[0].mainPic,
              userId: e.orgLeader[0].userId,
              orgName: e.orgLeader[0].orgName,
              departmentName: e.orgLeader[0].departmentName,
              levelName: e.orgLeader[0].levelName,
              mobile:e.orgLeader[0].mobile,
            };
            pObj.orgIsMe = true;
          }

          if (
            e.orgLeader[0].creator == "Y" &&
            e.orgLeader[0].userId === getStorage("userInfo").id
          ) {
            this.orgLeaderIsMe = true;
          }
          pObj.children.push(creUserObj);

          //部门循环
          e.departmentList.forEach((el, index) => {
            //  console.log(el)

            let cobj = {
              label: el.departmentName,
              children: [],
              id: el.id,
              peopleNum: el.purList.length != 0 ? el.purList.length : "0",
              serNum: index + 1,
              pid: 2,
              orgId: el.orgId
            };
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
                orgId: ele.orgId,
                creator: ele.creator,
                status: ele.status,
                departmentId: ele.departmentId
              };
              //  console.log(ele.userId === e.orgLeader[0].userId )

              if (ele.userId === getStorage("userInfo").id) {
                let addDe = {
                  lookUserId:
                    e.orgLeader[0].orgId === ele.orgId
                      ? e.orgLeader[0].userId
                      : console.log("没有"),
                  projectId: this.proTitle.proId,
                  userId: getStorage("userInfo").id
                };
                getPostInfo(
                  "/yq_api/projectUserRef/searchProjectUser",
                  addDe
                ).then(res => {
                  if (res.data.code === 200) {
                    let data = res.data.data;
                    this.userData = data;
                    if (data.userId === getStorage("userInfo").id) {
                      //  console.log(data)
                      this.userData.isMySelf = true;
                    }
                  }
                });
              }
              // if(e.orgLeader[0].userId===getStorage("userInfo").id && ele.orgId===e.orgLeader[0].orgId){
              //   console.log(e.orgLeader[0].userId,getStorage("userInfo").id,ele.orgId,e.orgLeader[0].orgId)

              // }

              if (ele.userId === getStorage("userInfo").id) {
                this.isMeOrgId = ele.orgId;

                this.InvitePeople = {
                  mainPic: ele.mainPic,
                  userId: ele.userId,
                  orgName: ele.orgName,
                  departmentName: ele.departmentName,
                  levelName: ele.levelName,
                  mobile:ele.mobile,
                };
              }
              cobj.children.push(eleObj);
              cobj.children.sort(function(a, b) {
                return a.level - b.level;
              });
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
              orgId: ue.orgId,
              pid: 3,
              status: ue.status,
              departmentId: ue.departmentId
            };
            // console.log(ue.orgId===e.orgLeader[0].orgId&&ue.userId===e.orgLeader[0].userId)

            //  console.log(e.orgId,ue.orgId,e.orgLeader)

            if (ue.userId === getStorage("userInfo").id) {
              //  console.log(e.orgLeader[0].orgId,ue.orgId)
              let addDe = {
                lookUserId:
                  e.orgLeader[0].orgId === ue.orgId
                    ? e.orgLeader[0].userId
                    : console.log("没有"),
                projectId: this.proTitle.proId,
                userId: getStorage("userInfo").id
              };
              getPostInfo(
                "/yq_api/projectUserRef/searchProjectUser",
                addDe
              ).then(res => {
                if (res.data.code === 200) {
                  let data = res.data.data;

                  this.userData = data;
                  if (data.userId === getStorage("userInfo").id) {
                    console.log(data);
                    this.userData.isMySelf = true;
                  }
                }
              });
            }

            if (ue.userId === getStorage("userInfo").id) {
              this.isMeOrgId = ue.orgId;
              this.InvitePeople = {
                mainPic: ue.mainPic,
                userId: ue.userId,
                orgName: ue.orgName,
                departmentName: ue.departmentName,
                levelName: ue.levelName,
                 mobile:ue.mobile,
              };
            }
            pObj.children.push(ueObj);
          });
          newData.push(pObj);
        });
        this.data = newData;
        // console.log(this.data)
      }
    });
  }
};
</script>
<style>
</style>