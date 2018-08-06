<template>
    <div class="bgImage" :style="{backgroundImage:'url(' + require('../../../assets/images/loginBg.png')+')'}">



        <p class="logo">
            <img src="../../../assets/images/logo.png">
        </p>
        <div class="reset">
            <div class="resetHeader">
                <a href="#/">
                    <img src="../../../assets/images/return2.png" class="returnImg">
                </a>
                用户注册
            </div>
            <div class="allReset">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
                    <el-form-item prop="username">
                        <el-input class="iconfont" prefix-icon="icon-dianhua" 
                        v-model.number="ruleForm2.username" placeholder="请输入手机号">
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="dxcode" class="dxpos">
                        <div class="dxCodebox">
                            | <span class="codestylus" v-if="isdxCode" @click="dxCodeBt">获取验证码</span>
                            <span v-if="!isdxCode">{{time}}秒后重新获取</span>
                        </div>
                        <el-input
                         class="iconfont"
                         prefix-icon="icon-shuru" 
                         v-model.number="ruleForm2.dxcode"
                         placeholder="请输入验证码">
                         </el-input>
                    </el-form-item>


                    <el-form-item prop="pass">
                        <el-input class="iconfont"
                         prefix-icon="icon-suo" 
                         type="password" 
                         v-model="ruleForm2.pass" 
                         auto-complete="off"
                          placeholder="请输入新密码"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button 
                        :type="buttonType?'primary':'info'" 
                        :disabled="!buttonType" 
                        :loading="loading" 
                        class="signInBtn" 
                        @click="submitForm('ruleForm2')">{{loading?'注册中...':'注册'}}</el-button>
                    </el-form-item>
                

                       <div class="footSign">
                        <div class="footLeftSwitch">

    <div class="TermsInfo">
        <el-checkbox v-model="ruleForm2.checked"></el-checkbox>
 已阅读并同意“链工作”
 <el-button type="text"
  class="retPadding" 
 @click="open5('a')"
 >《服务条款》</el-button>和<el-button type="text" class="retPadding" @click="open5('b')">《隐私条款》</el-button>
    </div>

                        </div>
                        <!-- <div class="footRightSign">
                         
                           <router-link to="/login">
                            <span class="forgetPw">登录 </span>
                        </router-link>
                        </div> -->
                    </div>


</el-form>



            </div>
        </div>
    </div>
</template>
<script>
import { getPostInfo, PhoneReg } from "../../../assets/lib/myStorage.js";
import router from "../../../router";
export default {
  name: "ResetPass",
  data() {
    return {
      buttonType: false,
      loading: false,
      isdxCode: true,
      time: 120,

      ruleForm2: {
        username: "",
        pass: "",
        dxcode: "",
        checked:false,
      
      },
      rules2: {
        username: [{ validator: this.checkUsername, trigger: "blur" }],
        pass: [{ validator: this.validatePass, trigger: "blur" }],
        dxcode: [{ validator: this.checkdxCode, trigger: "blur" }],
        checked:[],
     
      },
      popUps: {
        a: {
          title: "服务条款",
          msg: `<strong>这里是服务条款内容 <i>HTML</i> 片段</strong><h1>html1内容1111111111<h1>`,
          attr: {
            dangerouslyUseHTMLString: true,
            confirmButtonText: "已阅读",
            callback: action => {
            //   this.$message({
            //     type: "info",
            //     message: `action: ${action}`
            //   });
            }
          }
        },
        b: {
          title: "隐私条款",
          msg: `<h1>这里是隐私条款<h1>`,
          attr: {
            dangerouslyUseHTMLString: true,
            confirmButtonText: "已阅读",
            callback: action => {
            //   this.$message({
            //     type: "info",
            //     message: `action: ${action}`
            //   });
            }



          }
        }
      }
    };
  },
  methods: {
    dxCodeBt() {
      if (PhoneReg(this.ruleForm2.username)) {
        // this.isdxCode = false;
        let isdxCoedObj = {
          mobile: this.ruleForm2.username + "",
          type: "register"
        };
       
        let _that = this;
        getPostInfo("yq_api/user/sms", isdxCoedObj).then(function(res) {
        
          if (res.data.code === 1001) {
            _that.open4(res.data.msg);
          } else if (res.data.code === 200) {
            _that.isdxCode = false;
            let dx_djs = setInterval(() => {
              if (_that.time-- <= 0) {
                _that.time = 120;
                _that.isdxCode = true;
                clearInterval(dx_djs);
              }
            }, 2000);
          } else if (res.data.code === 0) {
            _that.open4("短信验证码已发送！请勿重复发送");
          }
        });
      } else {
        this.open4("请先正确填写手机号");
      }
    },
    open2(msg) {
      this.$message({
        message: msg,
        type: "success"
      });
    },

    open4(msg) {
      this.$message({
        message: msg,
        type: "error"
      });
    },

    open5(type) {
      switch (type) {
        case "a":
           this.$alert(
            this.popUps.a.msg,
            this.popUps.a.title,
            this.popUps.a.attr
          );
          break;
        case "b":
          this.$alert(
            this.popUps.b.msg,
            this.popUps.b.title,
            this.popUps.b.attr
          );
          break;
      }
    },
    
    checkUsername(rule, value, callback) {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (PhoneReg(value)) {
            callback();
          } else {
            callback(new Error("手机号格式不正确！请正确填写11位手机号码！"));
          }
        }
      }, 1000);
    },


    checkdxCode(rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入验证码"));
      } else {
        if ((value + "").length == 6) {
          callback();
        } else {
          callback(new Error("验证码格式不正确！"));
        }
      }
    },


    validatePass(rule, value, callback) {
     
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6) {
          callback(new Error("密码不能小于6位"));
        } else if (value.length > 12) {
          callback(new Error("密码不能大于12位"));
        } else {
          callback();
        }
      }
    },
    

    submitForm(formName) {
      this.loading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
        
          let resetPwObj = {
            mobile: this.ruleForm2.username + "",
            mobileCode: this.ruleForm2.dxcode + "",
            password: this.ruleForm2.pass
          };

          let _that = this;
        


          getPostInfo('yq_api/user/register',resetPwObj).then(
            function(res){
            

              if(res.data.code === 1004){
              
                 _that.loading = false;
              _that.open4(res.data.msg);
                _that.ruleForm2.pass = "";
                 _that.ruleForm2.dxcode = "";
              }else if(res.data.code === 200){
                   _that.open2('注册成功！请重新登录');
                     router.push("/login");
                       _that.loading = false;
                    _that.buttonType = false;
                  _that.ruleForm20.dxcode =  _that.ruleForm2.username = _that.ruleForm2.pass = "";

              }
            }
          )

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
          (newValue.username + "").length == 11 &&
           (newValue.pass + "").length <= 12 &&
          (newValue.pass + "").length >= 6 &&
          (newValue.dxcode + "").length == 6 && newValue.checked === true
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
@import "../../../assets/style/login.css";
.dxpos {
  position: relative;
}

.dxCodebox {
  width: 130px;
  height: 30px;
  color: #349ffd;
  line-height: 30px;
  position: absolute;
  right: 0;
  top: 5px;
  z-index: 1;
}
.codestylus {
  cursor: pointer;
}
.TermsCheckbox {
  float: left;
  margin-right: 10px;
  vertical-align: top;
  margin-top: -1px;
}
.TermsInfo {
  float: left;
  font-size: 12px;
}
.retPadding {
  padding: 0;
  font-size:12px; 
}
.el-message-box{
width: 640px;
}
/* .el-button{
        padding: 0;
    } */
</style>