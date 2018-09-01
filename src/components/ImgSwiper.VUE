<template>
 <div ref="root">
     <!-- {{imagesUrl}}	 -->
    <div class="sliderPanel">
      <div v-for="(item,index) in imagesUrl" class="verticalCenter picbox" :key="index">
      	<transition name="slide-fade">
             
      		<img :style="{width:width,top:top}" @mouseover="clearAuto" @mouseout="slideAuto" v-show="index===selectIndex"  :src="item.url" style="min-height: 100%">
      	</transition>
      </div>
    </div>
    <div @click="clickLeft" @mouseover="clearAuto" @mouseout="slideAuto" class="arrowLeft verticalCenter horizaCenter ">
     	 <i class="el-icon-arrow-left">


        </i>
    </div>
    <div @click="clickRight" @mouseover="clearAuto" @mouseout="slideAuto"  class="arrowRight verticalCenter horizaCenter">
        <i class="el-icon-arrow-right">


        </i>
      
    </div>
    <div class="sliderBar horizaCenter">
      <div v-for="(item,index) in imagesUrl" @mouseover="clearAuto" @mouseout="slideAuto" @click="setIndex(index)"  class="circle" :class="{circleSelected:index===selectIndex}" :key="index">
      </div>
    </div>
  </div>

</template>
<script>
 const SCREEN_WIDTH=document.body.clientWidth//网页可见区域宽
  const SCREEN_HEIGHT=document.body.scrollHeight//网页正文全文高
  var selectIndex=0
  var timer=null

export default {
    name:'ImgSwiper',
    props:{
        imagesUrl:Array,
    },
 data() {
		return {
				  selectIndex:0,
					width:'100%',
	        height:SCREEN_HEIGHT+'px',
	        top:0,
		}
	},
	methods:{
		 slideAuto:function () {
			var that=this;
     	timer=setInterval(function(){ 
            that.clickRight();     
      },3000)
       	//clearInterval(timer);
      },
      clearAuto:function(){
      	clearInterval(timer);
      },
		  clickLeft:function(){
		  	if(this.selectIndex==0){
		  		this.selectIndex=this.imagesUrl.length-1;
		  	}else{
		  		this.selectIndex--;
		  	}
		  	console.log(this.selectIndex);
          
      },
      clickRight:function(){
        if(this.selectIndex==this.imagesUrl.length-1){
		  		this.selectIndex=0;
		  	}else{
		  		this.selectIndex++;
		  	}
      },
      setIndex:function (index) {
       this.selectIndex=index;
      }
   },
   mounted:function(){
    this.slideAuto();    
	}

}
</script>
<style>

</style>


