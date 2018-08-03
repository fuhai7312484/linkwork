<template>
   <div class="allpw">
                <input type="text" class="telWrite icon-dianhua" placeholder="请输入手机号">
                <input type="password" class="pwWrite" placeholder="请输入密码">
                <div class="closeEye">&#xe901;</div>
                <!-- <el-button type="primary" :loading="true">加载中</el-button> -->
                 <el-button class="signInBtn" type="info" :loading="true" disabled>登录</el-button>
                <!-- <button class="signInBtn" disabled="disabled">登录</button> -->
            </div>
</template>
<script>
export default {
    name:'LoginAllpw',
}
</script>
<style scoped>
.allpw{
    
    width:329px;
    height:188px;
    margin-left: 44px;
    position: relative;
}
.telWrite{
    width: 100%;
    height:42px;
    margin-top: 24px;
    text-indent: 50px;
    /* background: url(../images/tell4.png) 11px 7px no-repeat; */
    font-size: 14px;
    color: #999999;
    border:1px solid #999999;
    opacity: 1;
}

.pwWrite{
    width: 100%;
    height:42px;
    margin-top: 24px;
    text-indent: 50px;
    /* background: url(../images/password2.png) 11px 7px no-repeat; */
    font-size: 14px;
    color: #999999;
    border:1px solid #999999;
    opacity: 1;
}


.openEye{
    position: absolute;
    top: 100px;
    left: 270px;
    display: none;
}
.closeEye{
    position: absolute;
    top: 100px;
    left: 270px;
}
.signInBtn{
    width: 100%;
    height: 42px;
    margin-top: 24px;
    font-size: 16px;
    color: #FFFFFF;
    border:none;
    background: #B5B5B5;
    opacity: 1;
}


</style>

