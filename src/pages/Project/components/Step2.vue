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
            <el-option v-for="item in UnitPositList" :key="item.value" :label="item.label" :value="item.value" class="speLabelLists" >
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
  import { character, getStorage } from "../../../assets/lib/myStorage.js";
  import router from "../../../router";
  export default {
    name: "Step2",
    data() {
      return {
          UnitPositList: [
            {
              value: "政府机构",
              label: "政府机构"
            },
            {
              value: "协会",
              label: "协会"
            },
            {
              value: "民间组织",
              label: "民间组织"
            },
            {
              value: "临时组织",
              label: "临时组织"
            },
            {
              value: "甲方",
              label: "甲方"
            }
          ],
        ruleForm: {
          titleAttr: "",
          companyName: "",
          UnitName: "",
          phone: "18868877893",
          nickname: "张三",
          UnitPosit:'',
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
            console.log(this.ruleForm);
            //   console.log(this.$refs.uploada.uploadFiles);
            // console.log(this.$refs)

            // let fileList = this.ruleForm.fileList;
            // console.log(this.ruleForm.fileList)
            // console.log(valid)
            //  this.$refs.upload.submit();
            // console.log(this.$refs.upload)

            // alert('您填写的内容是：' + this.ruleForm.name);
            router.push("/project/step_3");
            this.$emit("next", 2);
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
      this.ruleForm.nickname = getStorage("userInfo").name;
      this.ruleForm.phone = getStorage("userInfo").mobile;

      this.$emit("next", 1);
    }
  };
</script>
<style>
</style>