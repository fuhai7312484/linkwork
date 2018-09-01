<template>
  <div class="content content_dairy"
      :style="{maxHeight:sWHeight}"
      >

    <div v-loading="loading"
         element-loading-text="拼命加载中">
<div class="myDiaryInfoCountBox" v-if="myDiaryList.length !=0">
     <el-alert
    :title="myDiaryList?'我共有'+ myDiaryList.length+'条日志':'你还没有发布过日志'"
    type="success">
  </el-alert>


</div>




 <div class="myDiaryInfoCountBox" v-else-if="myDiaryList.length==0">
                    <div class="DiaryMsg">
                    您当前没有发布任何日志！<span @click="goToEdit">去发布日志</span>
                    </div>
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
               <span class="iconfont fl" @click="handTitleChange(index)">&#xe71f;</span> 
                     <span class="addTitleBox fl" v-if="activeIndex!==index" @click="handTitleChange(index)">
                  {{itme.title?itme.title:'添加标题'}} 
                   </span>
                    <span class="fl">
                  <el-input v-if="activeIndex===index" 
                  @keyup.enter.native="handTitleBlur(itme.title,itme.diaryId)"
                   v-focus="true"
                   v-model="itme.title"
                  data-index="0"
                   @focus="setFocusIndex(index)"
                   @blur="handTitleBlur(itme.title,itme.diaryId)"
                  class="titleInput" 
                   placeholder="请输入标题">
                   </el-input>
                   </span>
            </div>
        </div>
    </div>



    <div class="diary-right-icons fr">
        <div class="diaryTime">
           {{changeTime(itme.createTime)}}
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

<!-- {{itme.diaryId}} -->

    <router-link tag="div" class="TaDiaryDetail" :to="{path:'/diary/MyDiary/'+itme.diaryId,query: {diaryId:itme.diaryId}}">

<el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
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




<el-row :gutter="12" class="annexListBox" v-else-if="itme.accessoryList.length" >
  <el-col :span="12" class="annexList" v-for="(acces,j) in itme.accessoryList" :key="j">
    <el-card shadow="always">
     <div class="annexTypeImg fl">
        <img :src="fileTypeImgChange(acces.name)"/>
          </div>
         <div class="annexTitle fl">
         {{acces.name}}  {{acces.size}} 
     </div>
    </el-card>
  </el-col>
</el-row>


<el-row :gutter="12" class="annexListBox" v-else-if="itme.locationList.length" >
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
    <span>可见人：{{itme.lookUserList.length+1}}</span> 
     <span> | </span>
      <span><i class="iconfont iconfont18">&#xe682;</i> {{itme.lookCount?itme.lookCount:'0'}}</span>
       <span><i class="iconfont">&#xe603;</i>  {{itme.projectDiaryLikeCount?itme.projectDiaryLikeCount:'0'}}</span>
        <span><i class="iconfont">&#xe779;</i> {{itme.projectDiaryCommentCount?itme.projectDiaryCommentCount:'0'}}</span>
</div>
</router-link>
</li>
</ul>

    </div>

    <div class="clear"></div>
  </div>
</template>
<script>
  import {getPostInfo,getStorage,getToTime,setFileTyleImge,transDate} from "../../../assets/lib/myStorage.js";
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
            focusState:false,
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

 goToEdit() {
       this.$emit('toggleTabs',1); 
    },

        handTitleChange(index){
         this.activeIndex = index;
          this.focusState = true
     
        },
         setFocusIndex(index) {
                this.currentIndex = index
            },
            myDiaryDetail(){

            },
              open2(msg) {
        this.$message({
          message: msg,
          type: 'success'
        });
      },


        handTitleBlur(value,id){
            this.activeIndex = -1;
            // console.log(value,id,getStorage("userInfo").id)
            let titleObj = {
                diaryId:id,
                userId:getStorage("userInfo").id,
                title:value,
            }
             getPostInfo('yq_api/projectDiary/addDiaryTitle',titleObj)
            .then(res=>{
                if(res.data.code===200){
                   this.open2(res.data.msg)
                
                }
               
            })
        },

 focusclick () {
      this.focusState = true
    },

        changeTime(time){
            return transDate(time)
        //    return getTimeText(time)
            //    return getToTime(time,y)
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
           
    this.loading = true;

// 删除日志接口
//   let delObj = {
//                 diaryId:'2C9136AE6579FC1B01657A42DC5A000E',
//                 userId:'2C9136AE655B671001655B75312F0008',
              
//             }
//  console.log(delObj)
//              getPostInfo('yq_api/projectDiary/delete',delObj)
//             .then(res=>{
//                 console.log(res)
//             })


      let obj = {
        page:'1',
        size:'999',
        userId:getStorage("userInfo").id,
        projectId:this.proTitle.proId,

      }
      getPostInfo('yq_api/projectDiary/searchMyDariyList',obj)
      .then(res=>{
        this.myDiaryList =res.data.data==null?res.data.data=[]:res.data.data;
       
        this.loading = false;
      })
    },
    directives: {
    focus: {
        inserted: function (el,option) {
            var defClass = 'el-input', defTag = 'input';
            var value = option.value || true;
            if (typeof value === 'boolean')
                value = { cls: defClass, tag: defTag, foc: value };
            else
                value = { cls: value.cls || defClass, tag: value.tag || defTag, foc: value.foc || false };
            if (el.classList.contains(value.cls) && value.foc)
                el.getElementsByTagName(value.tag)[0].focus();
        }
 
    }

},


}
</script>
<style>

</style>


