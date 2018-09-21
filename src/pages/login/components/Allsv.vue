<template>
        <div id="query" class="allsv">
          <div style=" line-height: 158px; font-size: 22px;">

 此功能暂未开放
          </div>
         
            <!-- <canvas class="qr" id="canvas"></canvas>
            <p class="wsv">链工作扫码登录</p> -->
        </div>   
</template>
<script>
import QRCode from 'qrcode'
export default {
    name:'LoginAllsv',
      data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        config: {
            value: 'https://www.baidu.com',
            imagePath: './examples/assets/logo.png',
            filter: 'color'
        },
        downloadButton: false
      }
    },
      mounted() {
    //   console.log('执行到这了')
      // this.useqrcode();
    },
      methods:{
        useqrcode(){ 
      //生成的二维码内容，可以添加变量
　　　　this.QueryDetail='http://www.kspxzx.com/#/guard'+"?unique_code="+this.QueryDetail;var canvas = document.getElementById('canvas')
        QRCode.toCanvas(canvas, this.QueryDetail, function (error) {
        if (error) console.error(error)
        // console.log('success!');
        })
    }
    },
}
</script>

<style>
.allsv{
    width: 100%;
    text-align: center;
}
.qr {
  width: 123px;
  height: 123px;
  background: #379ffe;
  margin: 0 auto; 
 
}
.wsv {
  margin-top: 17px;
  text-align: center;
  font-size: 14px;
  color: #21232e;
}
 #canvas{
    width: 40%!important;
    height: auto!important;
  }

</style>

