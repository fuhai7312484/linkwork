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

         </li>


        </ul>

    </div>
</template>
<script>
  import {getPostInfo,getStorage} from "../../../assets/lib/myStorage.js";
   import { mapState } from "vuex";
export default {
    name:'MyDiary',
    data(){
        return {
            loading:true,
            myDiaryList:[],
        }
    },
     
    computed: {
      ...mapState(
        ['sWHeight','proTitle','userInfo']
        )
    },
        mounted() {
            
    this.loading = true;
      let obj = {
        page:'1',
        size:'999',
        userId:getStorage("userInfo").id,
        projectId:this.proTitle.proId,

      }
      getPostInfo('yq_api/projectDiary/searchMyDariyList',obj)
      .then(res=>{
        //   console.log(obj)
        this.myDiaryList =res.data.data;
        // console.log(res.data.data)
        // console.log(this.myDiaryList)
        this.loading = false;
        // console.log(res.data.data)
      })
    },
}
</script>
<style>

</style>


