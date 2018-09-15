<template>
    <div class="addFriendBox">
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">

        <div class="addFriendTitle">邀请Ta:</div>
         <div class="addFriendPad addFriendPro" v-if="orgLeaderIsMe" >
<el-radio v-model="radio" label="1">邀请在本项目<span class="addFriendTagColor"> 创建新单位 </span></el-radio>
 </div>
        <div class="addFriendPad addFriendPro">
<el-radio v-model="radio" label="2">邀请直接加入<span class="addFriendTagColor"> 本单位 </span></el-radio>
 </div>
 <div class="addFriendPad addFriendDep">
  <el-radio v-model="radio" label="3">邀请加入<span class="addFriendTagColor"> 部门 </span></el-radio>


        <el-select v-model="value" size="mini" style="width:100px;" placeholder="请选择" v-if="radio==3">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

      <el-select v-model="value1" size="mini" style="width:100px;" placeholder="请选择" v-if="radio==3">
    <el-option
      v-for="item in options1"
      :key="item.value"
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



        <!-- <el-tag
  :key="tag"
  v-for="tag in dynamicTags"
  closable
  :disable-transitions="false"
  @close="handleClose(tag)">
  {{tag}}
</el-tag>
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput"></el-button> -->



      
<el-row :gutter="12" class="FriendList" v-if="dynamicValidateForm.domains.length!=0">
<el-col :span="12"  v-for="(domain, index) in dynamicValidateForm.domains" :key="index" >
    <el-card shadow="hover" class="FriendListItme">
{{domain}}
      <span class="el-icon-error removeFriend" @click="handleClose(index)"></span>
    </el-card>

   
  </el-col>
</el-row>

<div class="stepBtnStyle" v-if="dynamicValidateForm.domains.length!=0">
  <el-button tag="el-button" @click="submitForm('ruleForm')" type="primary">
       完成
      </el-button>
</div>

<!-- <el-form-item
    v-for="(domain, index) in dynamicValidateForm.domains"
    :label="'域名' + index"
    :key="domain.key"
    :prop="'domains.' + index + '.value'"
    :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
  >
    <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
  </el-form-item> -->


    
       </el-form>
    </div>
</template>
<script>
export default {
  name: "addFriend",
  props:['orgLeaderIsMe'],
  data() {
    return {

      //  dynamicTags: ['标签一', '标签二', '标签三'],
      //   inputVisible: false,
      //   inputValue: '',



      radio: "2",
            dynamicValidateForm: {
          domains: [],
          email: ''
        },
      options: [
        {
          value: "0",
          label: "部门A"
        },
  
      ],
       options1: [
        {
          value: "0",
          label: "成员"
        },
  
      ],
      value: "0",
      value1: "0"
    };
  },

  methods: {

  // handleClose(tag) {
  //       this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
  //     },

  //     showInput() {
  //       this.inputVisible = true;
  //       this.$nextTick(_ => {
  //         this.$refs.saveTagInput.$refs.input.focus();
  //       });
  //     },

  //     handleInputConfirm() {
  //       let inputValue = this.inputValue;
  //       if (inputValue) {
  //         this.dynamicTags.push(inputValue);
  //       }
  //       this.inputVisible = false;
  //       this.inputValue = '';
  //     },




      addDomain() {
          this.$prompt('请输入邀请人手机号', '提示', {
          confirmButtonText: '确定',
          inputPattern: /^1[3|4|5|7|8][0-9]{9}$/,
          inputErrorMessage: '手机号格式不正确'
        
        }).then(({ value }) => {
          this.dynamicValidateForm.domains.push(value)
          this.$message({
            type: 'success',
            message: '邀请的手机号是: ' + value
          });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '取消输入'
          // });       
        });
      },

      handleClose(tag) {
        this.dynamicValidateForm.domains.splice(this.dynamicValidateForm.domains.indexOf(tag), 1);
        console.log(tag)
      },

         submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
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

