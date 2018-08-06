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
                          <router-link to="/resetpw">
                            <span class="forgetPw">忘记密码 </span>
                          </router-link>
                           <router-link to="/register">
                            <span class="forgetPw">马上注册</span>
                            </router-link>
                        </div>
                    </div>
        
    </div>
        </div>
    </div> 
</template>

<script>
import { strPhone } from '../../assets/lib/myStorage.js'
import LoginAllpw from "./components/Allpw";
import LoginAllsv from "./components/Allsv";
import Register from "./components/register";
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
   LoginAllsv,
   Register

  }
};
</script>
<style>
/* @import 'src/assets/style/login.css'; */
@import '../../assets/style/login.css';


</style>

