<template>
   <div class="allpw">
   
     <!-- <el-button :plain="true" @click="open2">成功</el-button> -->
<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2"  class="demo-ruleForm" >
     <el-form-item prop="username">
    <el-input class="iconfont" prefix-icon="icon-dianhua" v-model.number="ruleForm2.username" placeholder="请输入手机号"></el-input>
    </el-form-item>
  <el-form-item prop="pass">
    <el-input class="iconfont" prefix-icon="icon-suo"  type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入密码"></el-input>
  </el-form-item> 
        <el-form-item> 
      <el-button :type="buttonType?'primary':'info'" :disabled="!buttonType" :loading="loading" class="signInBtn" @click="submitForm('ruleForm2')">{{loading?'登录中...':'提交'}}</el-button> 
        </el-form-item> 
        </el-form>
            </div>
</template>
<script>
import { setStorage,getPostInfo,PhoneReg } from "../../../assets/lib/myStorage.js";
import router from "../../../router";
import {mapState, mapMutations} from 'vuex'
import axios from 'axios'

export default {
  name: "LoginAllpw",
  computed:{
    ...mapState({
      count:state => state.testStore.count,
      show:state =>state.show,
      isLogin:state=>state.isLogin,
      userInfo:state=>state.userInfo,
    })

  },
  props: {
    delivery: Boolean
  },
  data() {
    return {
      buttonType: false,
      loading:false,
      resData:{},
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
    mounted() {
        // this.getHomeInfo()  
    },
  methods: {


    ...mapMutations(['changeLogin','getUserInfo']),
    // axios get请求接口
    // getCityInfo() {
    //   // axios.get('/api/city.json')
    //   // .then(this.getCityInfoSucc)

    //   axios.post("http://39.107.254.60:8081/yq_api/user/login", {
    //       mobile: "Fred",
    //       password: "Flintstone",
    //       type:'',
    //     })
    //     .then(this.getCityInfoSucc)
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },
    // getCityInfoSucc(res) {
    //   console.log(res)
    //   res = res.data;
     
    //   this.resData = res;

    //   // console.log(this.resData)
    //   // console.log(res)
    //   // if (res.ret && res.data) {
    //   //   let data = res.data;
    //   //   this.cities = data.cities;
    //   //   this.hotCities = data.hotCities;
    //   // }
    // },

   open2(msg){
        this.$message({
          message: msg,
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
           
        
         
            let loginObj = {
              mobile: this.ruleForm2.username+'',
              password: this.ruleForm2.pass,
              type:'1',
            }
               let _that = this;
                    getPostInfo('yq_api/user/login',loginObj).then(
                      function(res){
                     
                        if(res.data.code === 1003){
                      
                           _that.loading = false;
                        _that.open4(res.data.msg);
             
                          _that.ruleForm2.pass = "";
                        }else if(res.data.code === 200){
                         
                         
                          // console.log(res.data.data)
                         let data = res.data.data
                         if(data.data){
                            _that.open4('登录成功！但还未完善个人信息');
                          setTimeout(function(){
                             router.push("/informatc");
                              _that.loading = false;
                              _that.buttonType = false;
                          _that.ruleForm2.username = _that.ruleForm2.pass = "";
                          },1000)

                          console.log('这里是还没完善页面')
                         }else{
                           
                           if(_that.delivery){
                            setStorage("userName", _that.ruleForm2.username);
                          }
                          _that.changeLogin(100)
                          setStorage("userInfo",data);
                          _that.getUserInfo(data)
                            //  console.log(date)
                          _that.open2('登录成功！');
                          setTimeout(function(){
                             router.push("/home");
                              _that.loading = false;
                              _that.buttonType = false;
                          _that.ruleForm2.username = _that.ruleForm2.pass = "";
                          },1000)
                         }
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
     
    }
  },
  
  watch: {
    ruleForm2: {
      handler(newValue, oldValue) {
        if (
           (newValue.username + "").length == 11 &&
         (newValue.pass + "").length <= 12 &&
          (newValue.pass + "").length >= 6
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

