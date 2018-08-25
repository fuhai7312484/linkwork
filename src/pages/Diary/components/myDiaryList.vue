<template>
    <div v-loading="loading"
         element-loading-text="拼命加载中">
<div class="myDiaryInfoCountBox">
我共有{{myDiaryList.length}}条日志

</div>
<ul class="diaryListUlBox" >
<li class="resourceList pad20" v-for="(itme,index) in myDiaryList" :key="index">
<div class="diaryListTop">
    <div class="diary-left-pic fl">
        <div class="diary-pic fl">
<img :src="itme.mainPic"/>
        </div>
        <div class="diary-title-Box fl">
            <div class="diary-username">
                {{itme.orgName}}--{{itme.userName}}

            </div>
            <div class="diary-title-input">
               <span class="iconfont fl">&#xe71f;</span> 
                     <span v-if="activeIndex!==index" @click="handTitleChange(index,itme.diaryId)">
                   添加标题
                   </span>
                    <span class="fl">
                  <el-input v-if="activeIndex===index" class="titleInput" @blur="handTitleBlur(index,itme.diaryId)" placeholder="请输入内容"></el-input>
                   </span>

                   

            </div>

        </div>


    </div>
    <div class="diary-right-icons fr">
        <div class="diaryTime">
           {{changeTime(itme.createTime,'-')}}
        </div>
        <div class="diaryIcons">
<span class="iconfont" :style="{color:itme.resourceList.length?'#4c91e2':''}">&#xe615;</span> 
<span class="iconfont" :style="{color:itme.imageList.length?'#4c91e2':''}">&#xe601;</span> 
<span class="iconfont font16" :style="{color:itme.videoList.length?'#4c91e2':''}">&#xe604;</span> 
<span class="iconfont font16" :style="{color:itme.locationList.length?'#4c91e2':''}">&#xe633;</span> 
<span class="iconfont font16">&#xe732;</span> 
        </div>
    </div>
   
</div>

<el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>

 <!-- {{itme}} -->
<!-- {{itme.locationList.length}} -->
<p class="diaryText" v-for="(contents,i) in itme.resourceList" :key="i">
   {{contents.content}}
</p>
<span v-show="lengthShow">
   
    {{itme.imageList.length>3?itme.imageList.length=3:itme.imageList.length}}


</span>



<el-row :gutter="20" class="flexibleUlBox" v-if="itme.imageList.length">
  <el-col class="resourceImgList" :span="8" v-for="(images,k) in itme.imageList" :key="k"><div class="grid-content bg-purple">
     <div class="resourceImg">
<img :src="images.url" @click="LargeImage(images.url)"/>
     </div>
     
     <div class="imagesInfo">
 {{images.name}}
     </div>
      </div></el-col>
</el-row>




<el-row :gutter="20" class="flexibleUlBox" v-else-if="itme.videoList.length">
  <el-col class="resourceImgList" :span="8" v-for="(video,j) in itme.videoList" :key="j"><div class="grid-content bg-purple">
     <div class="resourceImg">

        <div class="resourceImgvdieoMak">
            <i class="iconfont" @click="LargeImage(video.url)">&#xe605;</i>

    </div>

<img :src="video.content" @click="LargeImage(video.url)"/>
     </div>
     
     <div class="imagesInfo">
 {{video.name}}
     </div>
      </div></el-col>
</el-row>


<!-- v-else-if="itme.accessoryList.length" -->

<el-row :gutter="12" class="annexListBox" >
  <el-col :span="12" class="annexList" v-for="(acces,j) in itme.accessoryList" :key="j">
    <el-card shadow="always">
         
     <span class="isCurrentMap">
       <!-- <img :src="fileTypeImgChange(acces.name)"/>
          <img :src="require(fileTypeImgChange(acces.name))"/> -->
         <!-- <img :src="fileTypeImgChange(acces.name)"/> -->
        

<!-- {{fileTypeImgChange(acces.name)}} -->
         
         <!-- {{locat.isCurrentMap==='Y'?'&#xe6e7;':'&#xe633;'}} -->
          </span>

         <span>
         {{acces.name}}  {{acces.size}} 
     </span>


    </el-card>
  </el-col>
  
</el-row>

<!-- v-else-if="itme.locationList.length" -->
<el-row :gutter="12" class="annexListBox" >
  <el-col :span="24" class="annexList" v-for="(locat,j) in itme.locationList" :key="j">
    <el-card shadow="always">
     <span class="isCurrentMap iconfont">
         {{locat.isCurrentMap==='Y'?'&#xe6e7;':'&#xe633;'}}
          </span>
         <span>
         {{locat.name}} 
     </span>


    </el-card>
  </el-col>
  
</el-row>







<div class="InfoOperating">
    <span>可见人：15</span> 
     <span> | </span>
      <span><i class="iconfont iconfont18">&#xe682;</i> 15</span>
       <span><i class="iconfont">&#xe603;</i>  15</span>
        <span><i class="iconfont">&#xe779;</i> 15</span>
</div>


</li>

</ul>






      
        <!-- <ul v-loading="loading"
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

           </span><br/>
           imageList:<span v-for="(images,k) in itme.imageList" :key="(k+2)">
               <img :src="images.url" :style="{width:'120px',}" /><br/>
               {{images.name}}
           </span><br/>
           locationList:<span v-for="(locats,j) in itme.locationList" :key="(j+1)">
{{locats.name}}
           </span>
           <br/>
            videoList:<span v-for="(videos,q) in itme.videoList" :key="(q+1)">
                <img :src="videos.content"/>
                {{videos.content}}
                {{videos.url}}
                
            </span>
            <br/>
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         </li>


        </ul> -->

    </div>
</template>
<script>
  import {getPostInfo,getStorage,getToTime,setFileTyleImge} from "../../../assets/lib/myStorage.js";
   import { mapState } from "vuex";
   import '../../../assets/images/PDF.png';
export default {
    name:'MyDiary',
    data(){
        return {
            loading:true,
            lengthShow:false,
            myDiaryList:[],
            activeIndex: -1,

             dialogImageUrl: "",
        dialogVisible: false,

             imgList: [{url:'初始需回填的图片url', status: 'finished'}],
        }
    },
     
    computed: {
      ...mapState(
        ['sWHeight','proTitle','userInfo']
        ),
      

    },
    methods: {
        handTitleChange(index,id){
         this.activeIndex = index;
         console.log(id)
           
        },
        handTitleBlur(index,id){
            this.activeIndex = -1;
            console.log(index,id)
        },
        changeTime(time,y){
               return getToTime(time,y)
        },

        fileTypeImgChange(fileName){
      return  setFileTyleImge(fileName)

        },
     
       
            LargeImage(imagesUrl) {
                this.dialogImageUrl = imagesUrl;
                this.dialogVisible = true;
                  },
        
    },

        mounted() {
            console.log(getStorage("userInfo").id,this.proTitle.proId)
    this.loading = true;
      let obj = {
        page:'1',
        size:'999',
        userId:getStorage("userInfo").id,
        projectId:this.proTitle.proId,

      }

   
      console.log(obj)
      getPostInfo('yq_api/projectDiary/searchMyDariyList',obj)
      .then(res=>{
        //   console.log(obj)
        this.myDiaryList =res.data.data;
        console.log(res.data.data)
        // console.log(this.myDiaryList)
        this.loading = false;
        // console.log(res.data.data)
      })
    },

    directives: {
      focus: {
        inserted: function (el, {value}) {
          if (value) {
            el.focus()
          }
        }
      }
    }
}
</script>
<style>

</style>


