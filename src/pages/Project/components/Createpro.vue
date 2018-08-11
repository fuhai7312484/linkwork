<template>
  <div>

    <!-- <left-menu></left-menu> -->

    <div class="remarkBox" :style="{height:sWHeight}">
      <div class="proTitleBox">
        <h1>
         创建项目中
        </h1>
<step-box :active="active"></step-box>
      </div>
    </div>
    <div class="contentBox">
      <div class="content" 
      :style="{maxHeight:sWHeight}"
      >
      {{active}}
      <step1 @next="next" v-if="active===0"></step1>
      <step2 @next="next" v-if="active===1"></step2>
      <step3 @next="next" v-if="active===2"></step3>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { autodivheight } from "../../../assets/lib/myStorage.js";
import StepBox from './StepBox'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import { mapState } from "vuex";
export default {
  name: "CreatePro",
  components:{
    StepBox,
    Step1,
     Step2,
      Step3,
  },
  data() {
    return {
      active: 0,
    };
  },

  computed: {
    ...mapState({
      sWHeight: state => state.sWHeight
    })
  },
  methods: {

    next() {
      //  this.active++;
      if (this.active++ > 2) this.active = 0;
      console.log(this.active);
     

      //     if(this.active===1){
      //       this.stpe1 = false;
      //       this.stpe2 = true;
      //     }else if(this.active===2){
      //        this.stpe1 = false;
      //       this.stpe2 = false;
      //  this.stpe3 = true;
      //     }else if(this.active===3){
      //        this.stpe1 = false;
      //       this.stpe2 = false;
      //        this.stpe3 = false;
      //        console.log('这来是输入完了在提交')
      //     }
    }
  }
};
</script>
<style>
</style>