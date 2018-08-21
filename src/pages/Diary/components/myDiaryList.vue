<template>
    <div>
      
        <ul v-loading="loading"
         element-loading-text="拼命加载中">
         <li v-for="(itme,index) in myDiaryList" :key="index">
            mainPic: <img :src="itme.mainPic" :style="{width:'50px',height:'50px'}"/>
             <br/>
            orgName和userName： {{itme.orgName}}--{{itme.userName}}
            <br/>
            createTime:{{itme.createTime}}<br/>
           resourceList:
           <span v-for="(contents,i) in itme.resourceList" :key="i">
               {{contents.content}}

           </span>
           imageList:<span v-for="(images,k) in itme.imageList" :key="(k+1)">
               <img :src="images.url" :style="{width:'120px',}" /><br/>
               {{images.name}}
           </span>

           locationList:<span v-for="(locats,j) in itme.locationList" :key="(j+1)">

{{locats.name}}
           </span>

<!-- {{itme.locationList[0].name}} -->


           
          
             <!-- {{itme.resourceList}} -->
 <!-- {{myDiaryList}} -->
        <!-- 我的日志列表 -->

        <!-- {{itme}} -->

         </li>


        </ul>

    </div>
</template>
<script>
  import {getPostInfo } from "../../../assets/lib/myStorage.js";
export default {
    name:'MyDiary',
    data(){
        return {
            loading:true,
            myDiaryList:[],
        }
    },
        mounted() {
    this.loading = true;
      let obj = {
        page:'1',
        size:'999',
        userId:'2C9136AE655B671001655B75312F0008',
        projectId:'2C9136AE655B671001655BAD8104003E',

      }
      getPostInfo('yq_api/projectDiary/searchMyDariyList',obj)
      .then(res=>{
        this.myDiaryList =res.data.data;
      
        console.log(this.myDiaryList)
        this.loading = false;
        // console.log(res.data.data)
      })
    },
}
</script>
<style>

</style>


