<template>



<div>

  <div class="FriendDataBox">
      
          <div style="padding:10px 10px;">
            <el-input
  placeholder="搜索好友..."
  v-model="filterText">
</el-input>
          </div>
        
<el-tree
  :data="FriendData"
  show-checkbox
  :default-expanded-keys="[2, 3]"
  :default-checked-keys="[5]"
           ref="tree2"
            accordion 
            node-key="$treeNodeId"
            :expand-on-click-node="false"
            @check-change="handleCheckChange"
             :filter-node-method="filterNode"
  :props="defaultProps">
    <span class="custom-tree-node" slot-scope="{ node, data }">
              <span class="custom-treeImgBox" :style="titleColor(data.pid)">
                <i v-if="data.pid==1" class="GPid1Cl">
                  D{{data.serNum}}
                </i>

                <i v-else-if="data.pid==2" class="DPid2Cl">
                  B{{data.serNum}}
                </i>
                
                 <span class="deleteUserMakbox">
                  <span v-if="data.status==='2'" class="deleteUserMak iconfont">
                   &#xe64b;
                  </span>
                   <span v-if="data.status==='1'" class="deleteUserMak"></span>
                  <!-- <img :src="data.mainPic" v-if="data.mainPic" /> -->
                  <img :src="data.mainPic?data.mainPic:require('../assets/images/mainpic.jpg')" v-if="data.pid===3" />
                  </span> <span :class="data.status==='2'?'deleteColor':data.status==='1'?'deleteColor':''">{{ node.label }}</span>

                <!-- <img :src="data.mainPic" v-if="data.mainPic" />{{ node.label }} -->
                <span v-if="data.level==1 || data.level==3" class="LeveTag" :style="{background:data.level==1?'#07a816':data.level==3?'#fd7100':'',}">{{levelChange(data.level)}}</span>
                {{data.peopleNum?'('+data.peopleNum+')人':''}}
              </span>
            </span>
</el-tree>
    </div>


  <span slot="footer" class="dialog-footer">
    <el-button @click="handShutdown">取 消</el-button>
    <el-button type="primary" @click="onClickMe">确 定</el-button>
  </span>


</div>



  
</template>
<script>
import { getPostInfo, getStorage } from "../assets/lib/myStorage.js";
import { mapState } from "vuex";
export default {
  name: "FriendsList",
  props:['FriendsVisible'],
  data() {
    return {
      filterText: "",
      userIdChecked: [],
      FriendData: [],
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
         status:'status',
      }
    };
  },
  computed: {
    ...mapState(["proTitle"])
  },
  methods: {
      handShutdown(){
          this.$emit('handleClose')
         
      },
      onClickMe(){
        //   console.log(this.userIdChecked);
            this.$emit('handFriendArr',this.userIdChecked);
      },
    handleCheckChange(data, checked, indeterminate) {
      if (data.pid === 3) {
        if (checked) {
          this.userIdChecked.push(data.userId);
        } else {
          var index = this.userIdChecked.indexOf(data.userId);
          this.userIdChecked.splice(index, 1);
        }
      }
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
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getFriendList() {
      let addObj = {
        userId: getStorage("userInfo").id,
        projectId: this.proTitle.proId
      };
      getPostInfo("/yq_api/orgDepartment/searchLinkmanList", addObj).then(
        res => {
          if (res.data.code === 200) {
            let data = res.data.data.orgList;
            let newData = [];
            data.forEach((e, index) => {
              //第一层循环（循环获取单位）
              let pObj = {
                label:
                  e.shortName + (e.typeName ? "-(" + e.typeName + ")" : ""),
                children: [],
                projectId: e.projectId,
                peopleNum: 1,
                id: e.id,
                serNum: index + 1,
                orgId: e.orgId,
                pid: 1,
                orgIsMe: false
              };
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
                  status:e.orgLeader[0].status,
              };
               if(e.orgLeader[0].userId===getStorage("userInfo").id || e.orgLeader[0].status ==='2'|| e.orgLeader[0].status==='1'){
                    creUserObj.disabled =true;
                  }
               
              pObj.children.push(creUserObj);

              //部门循环
              e.departmentList.forEach((el, index) => {
                let cobj = {
                  label: el.departmentName,
                  children: [],
                  id: el.id,
                  peopleNum: el.purList.length != 0 ? el.purList.length : "0",
                  serNum: index + 1,
                  pid: 2
                };

                //部门内用户循环
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
                    isMySelf:false,
                     status:ele.status,
                  };
                  if(ele.userId===getStorage("userInfo").id || ele.status ==='2'|| ele.status==='1'){
                    eleObj.disabled =true;
                  }

               

                  cobj.children.push(eleObj);
                  cobj.children.sort(function(a, b) {
                    return a.level - b.level;
                  });
                });

                pObj.children.push(cobj);
              });

              //无部门用户遍历

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
                   isMySelf:false,
                   status:ue.status,
                };
                 if(ue.userId===getStorage("userInfo").id || ue.status ==='2'|| ue.status==='1' ){
                    ueObj.disabled =true;
                  }
                pObj.children.push(ueObj);
              });

              newData.push(pObj);
            });
            this.FriendData = newData;
           
          }
        }
      );
    }
  },
  watch: {
    filterText(val) {
      // console.log(this.$refs.tree2.filter(val))
      this.$refs.tree2.filter(val);
    }
  },
  mounted() {
    this.getFriendList();
  }
};
</script>

<style>
.dialog-footer{
    text-align: right;
    display: block;
    margin-top:20px;
}
</style>
