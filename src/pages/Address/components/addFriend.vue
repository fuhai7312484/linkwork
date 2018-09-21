<template>
    <div class="addFriendBox">

       <!-- {{orgInfoObj}} -->

      
      <div class="proMeOrgBox">
        <div class="proMeOrgMainPicImg fl">
  <img :src="InvitePeople.mainPic"/>
        </div>
   
   <div class="fl">
     <div class="proMeOrgTitle">
       我在本项目中的角色
     </div>
      <div>
  
      {{InvitePeople.orgName}}(单位)-{{InvitePeople.departmentName}}(部门)-{{InvitePeople.levelName}}
      
     </div>

     </div>   
        

      </div>
      <el-form :model="dynamicValidateForm" ref="ruleForm" label-width="100px" class="demo-dynamic">
        <div class="addFriendTitle">邀请Ta:</div>
         <div class="addFriendPad addFriendPro" v-if="orgLeaderIsMe" >
<el-radio v-model="radio" label="1">邀请在本项目<span class="addFriendTagColor"> 创建新单位 </span></el-radio>
 </div>
        <div class="addFriendPad addFriendPro">
<el-radio v-model="radio" label="2">邀请直接加入<span class="addFriendTagColor"> 本单位 </span></el-radio>
 </div>
 <div class="addFriendPad addFriendDep">
  <el-radio v-model="radio" label="3">邀请加入<span class="addFriendTagColor"> 部门 </span></el-radio>
        <el-select v-model="value" size="mini" style="width:100px;" placeholder="请选择" v-if="radio==3" @change="getValue">
   
    <el-option
      v-for="(item,index) in options"
      :key="index"
      :label="item.label"
      :value="item.value"
       :class="item.cl"
      >
    </el-option>
   
  </el-select>
      <el-select v-model="value1" size="mini" style="width:100px;" placeholder="请选择" v-if="radio==3">
    <el-option
      v-for="(item,index) in options1"
      :key="index"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        <div class="addPersonsBox">
          <div class="addPersonsBtn" @click="addDomain">
<span class="el-icon-circle-plus-outline"></span>添加被邀请人
          </div>
        </div>

<el-row :gutter="12" class="FriendList" v-if="dynamicValidateForm.domains.length!=0">
<el-col :span="24"  v-for="(domain, index) in dynamicValidateForm.domains" :key="index" >
    <el-card shadow="hover" class="FriendListItme">

{{domain.phone}}
<br/>
<div v-if="domain.code==200" :style="{color:'#009944'}" class="addFirendMsgInfo">
  <span class="el-icon-success"></span>
{{domain.msg}}
</div>

<div v-if="domain.code==1008" :style="{color:'red'}" class="addFirendMsgInfo">
  <span class="el-icon-question"></span>
{{domain.msg}}
</div>

<div v-if="domain.code==1009" class="addFirendMsgInfo" :style="{color:'red'}">
  <span class="el-icon-success" :style="{color:'#009944'}"></span><span class="el-icon-question" :style="{color:'red'}"></span>
{{domain.msg}}
</div>


      <span class="el-icon-error removeFriend" @click="handleClose(index)"></span>
    </el-card>
  </el-col>
</el-row>

<div class="stepBtnStyle" v-if="dynamicValidateForm.domains.length!=0">
  <el-button tag="el-button" @click="submitForm('ruleForm')" type="primary">
       完成
      </el-button>
</div>
       </el-form>
    </div>
</template>
<script>
import { getPostInfo, getStorage } from "../../../assets/lib/myStorage.js";
import { mapState, mapMutations } from "vuex";
export default {
  name: "addFriend",
  props: [
    "orgLeaderIsMe",
    "InvitePeople",
    "isMeOrgId",
    "isMeShortName",
    "orgInfoObj"
  ],
  data() {
    return {
      //  dynamicTags: ['标签一', '标签二', '标签三'],
      //   inputVisible: false,
      //   inputValue: '',

      radio: "2",
      dynamicValidateForm: {
        domains: [
          // {
          //   code: 200,
          //   msg: "当前用户已存在于当前项目中，无法重复邀请",
          //   phone: "13051376806"
          // }
        ],
        email: ""
      },
      options: [
        // {
        //   value: "0",
        //   label: "部门A"
        // },
      ],
      options1: [
        //  {
        //   value: "0",
        //   label: "负责人"
        // }
      ],
      value: "0",
      value1: "0"
    };
  },
  computed: {
    ...mapState(["proTitle"])
  },
  methods: {
    getValue(value) {
      console.log(value)
     
      if (this.options.length === value * 1) {
        this.addDepartment();
      }
    },
    addDepartment() {
      this.$prompt("请输入部门名称", "提示", {
        confirmButtonText: "确定"
      })
        .then(({ value }) => {
          console.log("这里调用新创建部门", value);

          let obj = {
            projectId: this.proTitle.proId,
            userId: getStorage("userInfo").id,
            orgId: this.isMeOrgId,
            secrecy: "N",
            shortName: this.isMeShortName,
            orgName: this.orgInfoObj.orgName,
            classifyName: this.orgInfoObj.classifyName,
            nickName: this.orgInfoObj.nickName,
            title: ""
          };

          let optNum = this.options.length - 1;
          let departmentList = [];
          for (let i = 0; i < 1; i++) {
            departmentList.push({});
            departmentList[i].orgId = this.isMeOrgId;
            departmentList[i].departmentName = value;
            departmentList[i].operation = "add";
            departmentList[i].createPerson = getStorage("userInfo").id;
          }

          for (let i = 0; i < 1; i++) {
            for (let key in departmentList[i]) {
              obj["departmentList[" + i + "]." + key] = departmentList[i][key];
            }
          }

          getPostInfo("/yq_api/orgDepartment/editeOrg", obj).then(res => {
            if (res.data.code === 200) {
              let newV = this.options.length - 1 + "";
              this.options.splice(this.options.length - 1, 0, {
                label: value,
                value: "" + (this.options.length - 1),
                len: 0,
                cl: ""
              });
              (this.value = newV),
                this.$message({
                  type: "success",
                  message: "部门创建成功！"
                });
            }
          });
        })
        .catch(() => {
          console.log("取消了");
          this.value = "0";
        });
    },

    addDomain() {
      if(this.dynamicValidateForm.domains[0]){
        if(this.dynamicValidateForm.domains[0].code){
            this.dynamicValidateForm.domains=[]
        }
      
      }
      // console.log(this.dynamicValidateForm.domains[0])
      this.$prompt("请输入邀请人手机号", "提示", {
        confirmButtonText: "确定",
        inputPattern: /^1[3|4|5|7|8][0-9]{9}$/,
        inputErrorMessage: "手机号格式不正确"
      })
        .then(({ value }) => {
          this.dynamicValidateForm.domains.push({phone:value});
          this.$message({
            type: "success",
            message: "邀请的手机号是: " + value
          });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '取消输入'
          // });
        });
    },

    handleClose(tag) {
      this.dynamicValidateForm.domains.splice(
        this.dynamicValidateForm.domains.indexOf(tag),
        1
      );
      // console.log(tag)
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          // console.log(this.radio);
           
          let mobiles=''
           this.dynamicValidateForm.domains.forEach(e => {
            mobiles +=  e.phone + ','
          });
        
          let opeType = "member";
          switch (this.radio) {
            case "1":
              opeType = "createorg";
              break;
            case "2":
              opeType = "member";
              break;
            case "3":
            if(this.options[this.value * 1].len===0){
            opeType = "joinorg";
            }else{
               opeType = "joindepartment";
            }
              break;
          }

          let addFrindObj = {
            userId: getStorage("userInfo").id,
            projectId: this.proTitle.proId,
            mobile: mobiles,
            operationType: opeType,
          };
          
          if(this.radio==='3'){
            addFrindObj.departmentId=this.options[this.value * 1].departmentId;
            addFrindObj.orgId=this.options[this.value * 1].orgId;
          }
          // console.log(addFrindObj);

          getPostInfo(
            "yq_api/authority/inviteJoinProjectForAugust",
            addFrindObj
          ).then(res => {
            if(res.data.code===200){
              this.dynamicValidateForm.domains = res.data.bizList;
              // console.log(res);

            }
            
          });


        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    let addObj = {
      orgId: this.isMeOrgId,
      projectId: this.proTitle.proId,
      userId: getStorage("userInfo").id
    };
    getPostInfo("/yq_api/orgDepartment/detail", addObj).then(res => {
      if (res.data.code === 200) {
        //  console.log(res.data)
        let depart = res.data.data.departmentList;

        let arr = [];

        depart.forEach((e, index) => {
          arr.push({
            label: e.departmentName,
             orgId:e.orgId,
             departmentId:e.departmentId,
            value: index + "",
            len: e.purList.length,
            cl: ""
          });
        });

        if (this.orgLeaderIsMe) {
          arr.push({
            label: "创建新部门",
            value: depart.length + 1,
            len: 0,
            cl: "createNew"
          });
        }
        this.options = arr;

        this.value = "0";
        this.value1 = "0";
      }
    });
  },
  watch: {
    radio(newVal, oldVal) {
      // console.log(newVal);
      if (newVal === "3") {
        let addObj = {
          orgId: this.isMeOrgId,
          projectId: this.proTitle.proId,
          userId: getStorage("userInfo").id
        };
        getPostInfo("/yq_api/orgDepartment/detail", addObj).then(res => {
          if (res.data.code === 200) {
            let depart = res.data.data.departmentList;
           
            let arr = [];
            depart.forEach((e, index) => {
              arr.push({
                label: e.departmentName,
                orgId:e.orgId,
                departmentId:e.departmentId,
                value: index + "",
                len: e.purList.length,
                cl: ""
              });
            });

            if (depart[0].purList.length == 0) {
              this.options1 = [
                {
                  value: "0",
                  label: "负责人"
                }
              ];
            } else {
              this.options1 = [
                {
                  value: "0",
                  label: "成员"
                }
              ];
            }

            if (this.orgLeaderIsMe) {
              arr.push({
                label: "创建新部门",
                value: depart.length + 1,
                len: 0,
                cl: "createNew"
              });
            }
            this.options = arr;
          }
        });
      }
    },
    value(n, o) {
      if (this.options[n * 1]) {
        if (this.options[n * 1].len == 0) {
          this.options1 = [
            {
              value: "0",
              label: "负责人"
            }
          ];
        } else if (this.options[n * 1].len > 0) {
          this.options1 = [
            {
              value: "0",
              label: "成员"
            }
          ];
        }
      }
    }
  }
};
</script>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

