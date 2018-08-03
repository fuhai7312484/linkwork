<template>
   <div class="allpw">
<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2"  class="demo-ruleForm" >
     <el-form-item prop="username">
    <el-input class="iconfont" prefix-icon="icon-dianhua" v-model.number="ruleForm2.username" placeholder="请输入手机号"></el-input>
    </el-form-item>
  <el-form-item prop="pass">
    <el-input class="iconfont" prefix-icon="icon-suo"  type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入密码"></el-input>
  </el-form-item> 
        <el-form-item> 
      <el-button :type="buttonType?'primary':'info'" :disabled="!buttonType" class="signInBtn" @click="submitForm('ruleForm2')">提交</el-button> 
        </el-form-item> 
        </el-form>
            </div>
</template>
<script>
import { setStorage } from '../../../assets/lib/myStorage.js'
import router from '../../../router'

export default {
  name: "LoginAllpw",
  props: {
    delivery: Boolean
  },
  data() {
    return {
      buttonType: false,
      ruleForm2: {
        pass: "",
        username: ""
      },
      rules2: {
        pass: [{ validator: this.validatePass, trigger: "blur" }],
        username: [{ validator: this.checkUsername, trigger: "blur" }]
      }
    };
  },
  methods: {
    //axios get请求接口
    // getCityInfo(){
    //     axios.get('/api/city.json')
    //     .then(this.getCityInfoSucc)
    //   },
    // getCityInfoSucc(res){
    //     res = res.data;
    //     if(res.ret && res.data){
    //         let data = res.data;
    //     this.cities = data.cities;
    //     this.hotCities = data.hotCities;
    //     }
    //   },

    checkUsername(rule, value, callback) {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          //    console.log(value.length)

          if ((value + "").length < 11) {
            callback(new Error("请输入11位手机号"));
          } else {
            callback();
          }
        }
      }, 1000);
    },
    validatePass(rule, value, callback) {
    //   console.log(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 8) {
          callback(new Error("密码不能小于8位"));
        } else if (value.length > 20) {
          callback(new Error("密码不能大于20位"));
        } else {
          callback();
        }
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        //   console.log(
        //     this.ruleForm2.username,
        //     this.ruleForm2.pass,
        //     this.delivery
        //   );
          if(this.delivery){
            setStorage('userName',this.ruleForm2.username)
           
            setTimeout(function(){
                console.log('这里登录成功！！')
                   
                    // this.$store.commit('changeLogin',100)
                    // console.log(this.$store)
                   
                router.push('/')
                
                // this.$router.push('/')
            },3000)
          }
          this.ruleForm2.username = this.ruleForm2.pass = "";

          // alert('submit!',this.delivery);
        } else {
        //   console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // console.log(this.$refs[formName])
    }
  },
  watch: {
    ruleForm2: {
      handler(newValue, oldValue) {
        if (
          (newValue.username + "").length >= 11 &&
          (newValue.pass + "").length >= 8
        ) {
          this.buttonType = true;
          
        } else {
          this.buttonType = false;
        }
      },
      deep: true
    }
  }
};
</script>
<style>
.allpw {
  width: 329px;
  height: 188px;

  position: relative;
  color: #000;
}
.el-form-item {
  margin-bottom: 26px;
}
.telWrite {
  width: 100%;
  height: 42px;
  margin-top: 24px;
  text-indent: 50px;

  font-size: 14px;
  color: #999999;
  border: 1px solid #999999;
  opacity: 1;
}

.pwWrite {
  width: 100%;
  height: 42px;
  margin-top: 24px;
  text-indent: 50px;

  font-size: 14px;
  color: #999999;
  border: 1px solid #999999;
  opacity: 1;
}
.el-input--prefix .el-input__inner {
  padding-left: 40px;
  font-size: 14px;
}
.icon-dianhua:before,
.icon-suo:before {
  font-style: normal;
  font-size: 20px;
  margin: 0 10px;
  color: #379ffe;
  vertical-align: middle;
}

.openEye {
  position: absolute;
  top: 100px;
  left: 270px;
  display: none;
}
.closeEye {
  position: absolute;
  top: 100px;
  left: 270px;
}
.signInBtn {
  width: 100%;
  height: 42px;
  font-size: 16px;
  color: #ffffff;
  border: none;

  opacity: 1;
}
</style>

