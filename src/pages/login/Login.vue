<template>
    <div class="bgImage" :style="{backgroundImage:'url(' + require('../../assets/images/loginBg.png')+')'}">
        <p class="logo"><img src="../../assets/images/logo.png"></p>
        <div class="login">
            <div class="loginBox">
             <el-tabs v-model="activeName" @tab-click="handleClick" class="el-tabs_bor" :stretch="true">
                  <el-tab-pane label="密码登录" name="first">
                         <login-allpw :delivery="delivery"></login-allpw>
                      </el-tab-pane>
             <el-tab-pane label="扫码登录" name="second">
<login-allsv :delivery="delivery"></login-allsv>


                 </el-tab-pane>
                 </el-tabs>
                    <div class="footSign">
                        <div class="footLeftSwitch">
    <el-switch v-model="delivery"></el-switch>
 

    允许自动登录

                        </div>
                        <div class="footRightSign">
                            <a href="#/resetPw"><span class="forgetPw">忘记密码 </span><span class="forgetPw">马上注册</span></a>
                        </div>
                    </div>
        
    </div>
        </div>
    </div> 
</template>

<script>
import { strPhone } from '../../assets/lib/myStorage.js'
import LoginAllpw from "./components/Allpw";
import LoginAllsv from "./components/Allsv"
export default {
  name: "LoginIndex",
  data() {
    return {
      activeName: "first",
       delivery: true,
    };
  },
  methods: {
    handleClick(tab, event) {
        // console.log(strPhone(12321212112))
    //   console.log(tab, event);
    }
  },
  components: {
    LoginAllpw,
   LoginAllsv

  }
};
</script>
<style>
/* @import 'src/assets/style/login.css'; */

.bgImage {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 972px;
  height: 752px;
  margin: -378px 0 0 -514px;

}
.footLeftSwitch{
    float: left;
}
.loginBox{
    width: 334px;
    height: 100%;

    margin: 0 auto;
    overflow: hidden;
}
.logo {
  margin-top: 196px;
  text-align: center;
}
.login {
  position: relative;
  width: 418px;
  height: 302px;
  margin-top: 12px;
  background: white;
  margin-left: 276px;
}
.el-tabs__item{
    height: 50px;
    font-size: 16px;
    margin-top:10px; 
    color: #b5b5b5;

}
.el-tabs_bor{
height: 5px;
}
.svSign,
.pwSign {
  display: inline-block;
  line-height: 44px;
  font-size: 16px;
  border-bottom: 4px solid #b5b5b5;
  width: 166px;
  text-align: center;
  color: #b5b5b5;
  opacity: 1;
}
.svSign {
  margin-left: 44px;
  color: #379ffe;
  border-color: #379ffe;
}
.pwSign {
  margin-left: -5px;
}


.telPrompt {
  position: absolute;
  top: 91px;
  left: 78px;
  border-radius: 6px;
  opacity: 1;
  text-indent: 18px;
  padding-right: 18px;
  height: 38px;
  font-size: 14px;
  background: #e1e1e1;
  line-height: 38px;
  color: #666666;
  display: none;
}

.footSign {
  color: #999999;
  font-size: 14px;
  position: absolute;
  bottom: 0;
  width: 334px;
  margin-bottom: 20px;
}
.checkSign {
  background: red;
}
.footLeftSign {
  clear: both;
  float: left;
}
.footRightSign {
  float: right;
}

.forgetPw {
  float: left;
  margin-right: 13px;
  color: #999999;
}

.regAway {
  margin-left: 13px;
  float: right;
  color: #999999;
}
</style>

