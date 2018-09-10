<template>
  <div>
    <div class="stepH1Title">
      <h1>单位信息填写</h1>

    </div>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <div class="stepH1Info">
        单位信息
      </div>
      <el-form-item label="标题属性">
        <el-input v-model="ruleForm.titleAttr" placeholder="请输入标题属性"></el-input>
      </el-form-item>
       <el-form-item label="单位简称" prop="UnitName">
        <el-input v-model="ruleForm.UnitName" placeholder="请输入公司简称（必填）"></el-input>
      </el-form-item>
      <el-form-item label="单位全称">
        <el-input v-model="ruleForm.companyName" placeholder="请输入公司全称"></el-input>
      </el-form-item>
     

      <el-form-item label="单位在项目中的定位" class="speLabel">
        <el-select v-model="ruleForm.UnitPosit" :multiple="false" filterable allow-create default-first-option :style="{width:'200px'}"
          placeholder="选择单位在项目中的定位/或自己创建">
          <div class="speLabelUlBox">
            <el-option v-for="(item,index) in UnitPositList" :key="index" :label="item.name" :value="item.name" class="speLabelLists" >
            </el-option>
          </div>
        </el-select> (选填)
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="ruleForm.nickname" placeholder="昵称"></el-input>
      </el-form-item>

      <el-form-item label="创建人手机号">
        <el-input v-model="ruleForm.phone" :disabled="true" placeholder="请填写手机号" :style="{width:'200px'}"></el-input>
      </el-form-item>
      <div class="hr"></div>




      <div class="stepH1Info">
        <div class="stepH1InfoLeft">
          部门信息
        </div>
        <div class="stepH1InfoRigth" @click="addDomain">
          <span class="iconfont addproIcon">&#xe659;</span>新增部门</div>
      </div>

      <el-form-item prop="department" label="标题属性">
        <el-input v-model="ruleForm.department" placeholder="部门" :style="{width:'200px'}"></el-input>
      </el-form-item>

      <el-form-item v-for="(domain, index) in ruleForm.domains" :label="'部门'" :key="domain.key" :prop="'domains.' + index + '.value'"
        :rules="{
      required: true, message: '部门不能为空', trigger: 'blur'
    }">
        <el-input v-model="domain.value" :style="{width:'200px'}"></el-input>
        <i class="el-icon-delete removeBtn" @click.prevent="removeDomain(domain)"></i>
        <!-- <el-button >删除</el-button> -->
      </el-form-item>
    </el-form>
    <div class="stepBtnStyle">
      <el-button tag="el-button" @click="submitForm('ruleForm')" type="primary">
        编辑完成，继续编辑个人信息
      </el-button>
    </div>

  </div>
</template>
<script>
import {
  character,
  getStorage,
  getPostInfo
} from "../../../assets/lib/myStorage.js";
import router from "../../../router";
export default {
  name: "Step2",
  data() {
    return {
      UnitPositList: [],
      ruleForm: {
        titleAttr: "",
        companyName: "",
        UnitName: "",
        phone: "18868877893",
        nickname: "张三",
        UnitPosit: "",
        department: "部门",
        domains: [
          {
            value: "部门A",
            charaName: "A"
          }
        ]
      },
      rules: {
        UnitName: [
          { required: true, message: "请输入单位简称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.ruleForm);
          let uploadInfo = {
            title: this.ruleForm.titleAttr,
            shortName: this.ruleForm.UnitName,
            userId: getStorage("userInfo").id,
            orgName: this.ruleForm.companyName,
            classifyName: this.ruleForm.UnitPosit,
            // typeName: this.ruleForm.nickname,
            createPersonMobile: this.ruleForm.phone,
            projectId:this.$route.query.projectId,
          };

          let departmentList = [];
          for (let i = 0; i < this.ruleForm.domains.length; i++) {
            departmentList.push({});
            departmentList[i].title = this.ruleForm.department;
            departmentList[i].departmentName = this.ruleForm.domains[i].value;
            departmentList[i].operation = 'add';
          }

          for (let i = 0; i < this.ruleForm.domains.length; i++) {
            for (let key in departmentList[i]) {
              uploadInfo["departmentList[" + i + "]." + key] =
                departmentList[i][key];
            }
          }
          // console.log(uploadInfo);
          getPostInfo("/yq_api/orgDepartment/addOrg", uploadInfo).then(res => {
            if (res.data.code === 200) {
              // console.log(res.data.data)
              router.push({
            path: '/project/step_3',
            query: {
            projectId: this.$route.query.projectId,
            shortName:this.$route.query.shortName,
            orgId:res.data.data
                }
             })
              this.$emit("next", 2);
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
    },
    removeDomain(item) {
      var index = this.ruleForm.domains.indexOf(item);
      if (index !== -1) {
        this.ruleForm.domains.splice(index, 1);
      }
    },
     open4(msg) {
        this.$message.error(msg);
      },
    addDomain() {
      let charaName = character(this.ruleForm.domains.length);
      this.ruleForm.domains.push({
        value: "部门" + charaName,
        key: Date.now(),
        charaName
      });
    }
  },
  mounted() {
    if(!this.$route.query.projectId){
     this.open4('创建项目请先填写项目信息！')
       router.push('/project/step_1')
    }
    this.ruleForm.nickname = getStorage("userInfo").name;
    this.ruleForm.phone = getStorage("userInfo").mobile;
    this.$emit("next", 1);
    let classifyType = {
      type: "projectorg"
    };
    getPostInfo("yq_api/classify/type", classifyType).then(res => {
      if (res.data.code === 200) {
        this.UnitPositList = res.data.data;
      }
    });
  
  }
};
</script>
<style>
</style>