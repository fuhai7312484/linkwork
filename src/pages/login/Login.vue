<template>
    <div class="bgImage">
        <p class="logo"><img src="../../assets/images/logo.png"></p>
        <div class="login">
            <a class="svSign">密码登录</a>
            <a class="pwSign">扫码登录</a>


            <div class="allsv">
                <div class="qr"></div>
                <p class="wsv">链工作扫码登录</p>
            </div>
        <login-allpw></login-allpw>


         
            <div class="footSign">
                <div class="footRightSign">
                    <a href="#/resetPw"><span class="forgetPw">忘记密码</span></a>
                </div>
            </div>
        </div>
        
    </div> 
    

</template>

<script>
import LoginAllpw from './components/Allpw';

export default {
    name:"LoginIndex",
    components:{
        LoginAllpw,
    },
}
</script>
<style scoped>
/* @import 'src/assets/style/login.css'; */


.bgImage{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 972px;
    height: 752px;
    margin:-378px 0 0 -514px;
    /* background: url(../images/login.png) 0 0 no-repeat; */
}
.logo{
    margin-top:196px;
    text-align: center;
}
.login{
    position: relative;
    width: 418px;
    height: 302px;
    margin-top:12px;
    background: white;
    margin-left: 276px;
}
.svSign,.pwSign{
    display: inline-block;
    line-height: 44px;
    font-size: 16px;
    border-bottom:4px solid #B5B5B5;
    width: 166px;
    text-align: center;
    color:#B5B5B5;
    opacity: 1;
}
.svSign{
    margin-left: 44px;
    color:#379FFE;
    border-color: #379FFE;
}
.pwSign{
    margin-left: -5px;
    
}
.qr{
    width: 123px;
    height: 123px;
    background:#379FFE;
    margin-top: 33px;
    margin-left: 147px;
}
.wsv{
    margin-top: 17px;
    text-align: center;
    font-size: 14px;
    color: #21232E;
}
.allsv{
    display: none;
}
.telPrompt{
    position: absolute;
    top: 91px;
    left: 78px;
    border-radius: 6px;
    opacity: 1;
    text-indent: 18px;
    padding-right: 18px; 
    height: 38px;
    font-size: 14px;
    background: #E1E1E1;
    line-height: 38px;
    color:#666666;
    display: none;
}


.footSign{
    color:#999999;
    font-size: 14px;
    position: absolute;
    bottom: 0;
    width: 374px;
    margin-bottom: 20px;
}
.checkSign{
    background: red;
}
.footLeftSign{
    clear: both;
    float: left;
}
.footRightSign{
    float: right;
}

.forgetPw{
    float: left;
    margin-right: 13px;
    color: #999999;
}

.regAway{
    margin-left: 13px;
    float: right;
    color: #999999;
}

</style>

