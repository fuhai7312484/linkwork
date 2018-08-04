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
                找回密码
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


                    <el-form-item prop="newpass">
                        <el-input class="iconfont"
                         prefix-icon="icon-suo" 
                         type="password" 
                         v-model="ruleForm2.newpass" 
                         auto-complete="off"
                          placeholder="请输入新密码"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button 
                        :type="buttonType?'primary':'info'" 
                        :disabled="!buttonType" 
                        :loading="loading" 
                        class="signInBtn" 
                        @click="submitForm('ruleForm2')">{{loading?'提交中...':'提交'}}</el-button>
                    </el-form-item>
                </el-form>
                <div class="footSign">
                    <div class="footRightSign">
                        <router-link to="/login">
                            <span class="forgetPw">登录 </span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getPostInfo,PhoneReg} from "../../../assets/lib/myStorage.js";
    export default {
        name: "ResetPass",
        data() {
            return {
                buttonType: false,
                loading: false,
                isdxCode: true,
                time: 120,
                ruleForm2: {
                    username: '',
                    newpass: '',
                    dxcode: '',
                },
                rules2: {
                    username: [{ validator: this.checkUsername, trigger: "blur" }],
                    newpass: [{ validator: this.validatePass, trigger: "blur" }],
                    dxcode: [{ validator: this.checkdxCode, trigger: "blur" }]
                }
            };
        },
        methods: {
            dxCodeBt() {
                if(PhoneReg(this.ruleForm2.username)){
                        this.isdxCode = false;
                        let isdxCoedObj = {
                            mobile:this.ruleForm2.username+'',
                            type:'repassword',
                        };
                console.log(isdxCoedObj)
                //   getPostInfo('yq_api/user/repassword',resetPwObj).then()


                let dx_djs = setInterval(() => {
                    if (this.time-- <= 0) {
                        this.time = 120;
                        this.isdxCode = true;
                        clearInterval(dx_djs);
                    }
                }, 2000);

                }else{
                    this.open4('请先正确填写手机号')
                    // console.log('请先填写手机号')

                }

            
            },

   open2(){
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
     
      },

        open4(msg) {
        this.$message({
           message:msg,
          type: 'error'
        })
      },

    checkUsername(rule, value, callback) {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {

        if(PhoneReg(value)){
            callback();
        }else{
             callback(new Error("手机号格式不正确！请正确填写11位手机号码！"));
        }
        }
      }, 1000);
    },
    checkdxCode(rule,value,callback){
        if(!value){
             return callback(new Error("请输入验证码"));
        }else{
           
            if((value+'').length == 6){
                 callback();
            }else{
                  callback(new Error("验证码格式不正确！"));
            }
        }


    },
      validatePass(rule, value, callback) {
      //   console.log(value);
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
            console.log(
              this.ruleForm2.username+'',
              this.ruleForm2.dxcode,
              this.ruleForm2.newpass,
            
            );
            let resetPwObj = {
              mobile: this.ruleForm2.username+'',
              mobileCode:this.ruleForm2.dxcode +'',
              newPassword: this.ruleForm2.newpass,
            }
      
               let _that = this;
                    getPostInfo('yq_api/user/repassword',resetPwObj).then(
                      function(res){
                        console.log(res.data)
                        if(res.data.code === 1004){
                          console.log(res.data.msg)
                           _that.loading = false;
                        _that.open4(res.data.msg);
                          _that.ruleForm2.newpass = "";
                           _that.ruleForm2.dxcode = "";
                        }
                        
                        // else if(res.data.code === 200){
                        //   if(_that.delivery){
                        //     console.log(_that.delivery)
                        //     setStorage("userName", _that.ruleForm2.username);
                        //   }
                          
                        //   _that.open2(res.data.msg);
                        //   setTimeout(function(){
                        //      router.push("/");
                        //       _that.loading = false;
                        //       _that.buttonType = false;
                        //   _that.ruleForm2.username = _that.ruleForm2.pass = "";
                        //   },1000)
                        
                        // }




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
          (newValue.username + "").length >= 11 &&
          (newValue.newpass + "").length >= 6 &&
           (newValue.dxcode + "").length >= 6
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
    .codestylus{
        cursor: pointer;
    }
</style>