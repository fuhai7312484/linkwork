<template>
   <div class="content content_dairy"
      :style="{maxHeight:sWHeight}"
      >

        <div v-loading="loading"
         element-loading-text="拼命加载中" >
      

        

         <ul class="diaryListUlBox"  >
             <li class="resourceList pad20">


<div class="diaryListTop">

    <div class="diary-left-pic fl">

        <div class="diary-pic fl">
        <img :src="detailList.mainPic"/>
        </div>

          <div class="diary-title-Box fl">
              <div class="diary-username">
                {{detailList.orgName}}--{{detailList.userName}}
            </div>
            <div class="diary-title-input">
                <span class="iconfont fl" @click="handTitleChange">&#xe71f;</span> 
            <span class="addTitleBox fl" v-if="activeIndex" @click="handTitleChange">
                  {{detailList.title?detailList.title:'添加标题'}} 
                   </span>

                    <span class="fl">
                  <el-input v-if="!activeIndex" 
                  @keyup.enter.native="handTitleBlur(detailList.title,detailList.diaryId)"
                   v-focus="true"
                   v-model="detailList.title"
                  data-index="0"
                  
                   @blur="handTitleBlur(detailList.title,detailList.diaryId)"
                  class="titleInput" 
                   placeholder="请输入标题">
                   </el-input>
                   </span>
             </div>
          </div>
        </div>


  <div class="diary-right-icons fr">
        <div class="diaryTime">
           {{changeTime(detailList.createTime)}}
        </div>
        <div class="diaryIcons">
           
<span class="iconfont" :style="{color:detailList.resourceList?'#4c91e2':''}">&#xe615;</span> 
<span class="iconfont" :style="{color:detailList.imageList?'#4c91e2':''}">&#xe601;</span> 
<span class="iconfont font16" :style="{color:detailList.videoList?'#4c91e2':''}">&#xe604;</span> 
<span class="iconfont font16" :style="{color:detailList.locationList?'#4c91e2':''}">&#xe633;</span> 
<span class="iconfont font16">&#xe732;</span> 
        </div>
    </div>



</div>


            <div class="editDiaryShow fontH15" v-if="detailList.resourceList">
            <div class="editDiaryType iconfont">
            &#xe615;
            </div>
            <p class="diaryText" v-for="(contents,i) in detailList.resourceList" :key="i">
            {{contents.content}}
            </p>
            </div>



        <div class="editDiaryShow fontH15"  v-if="imgLength != 0">
          <div class="editDiaryType maxFont iconfont">
            &#xe6a5;
          </div>
          <el-row :gutter="20" class="flexibleUlBox">
        <el-col class="resourceImgList" :span="8" v-for="(images,k) in detailList.imageList" :key="k">
            <div class="grid-content bg-purple">
            <div class="resourceImg">
        <img :src="images.url" @click="LargeImage(images.url)"/>
            </div>
            <div class="imagesInfo">
        {{images.name}}
            </div>
            </div></el-col>
        </el-row>
                <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>





            <div class="editDiaryShow fontH15" v-if="videoLength!=0">
          <div class="editDiaryType maxFont iconfont">
          &#xe604;
          </div>
          <el-row :gutter="20" class="flexibleUlBox">
        <el-col class="resourceImgList" :span="8" v-for="(video,k) in detailList.videoList" :key="k">
            <div class="grid-content bg-purple">
            <div class="resourceImg">
        <img :src="video.content" @click="LargeImage(video.content)"/>
            </div>
            <div class="imagesInfo">
        {{video.name}}
            </div>
            </div></el-col>
        </el-row>
                <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>


        <div class="editDiaryShow fontH15" v-if="acceLength !=0">
             <div class="editDiaryType maxFont iconfont">
            &#xe732;
          </div>

          <el-row :gutter="12" class="annexListBox">
            <el-col :span="12" class="annexList" v-for="(acces,j) in detailList.accessoryList" :key="j">
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

            </div>
 <!-- {{detailList.videoList.length?detailList.videoList.length:0}} -->

  <div class="editDiaryShow fontH15" v-if="locationLength != 0" >
             <div class="editDiaryType maxFont iconfont">
            &#xe633;
          </div>

         <el-row :gutter="12" class="annexListBox" >
  <el-col :span="24" class="annexList" v-for="(locat,j) in detailList.locationList" :key="j">
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

            </div>
            
            </li>

              <li class="resourceList pad20">

<div class="detailTitle fl">统计</div>

<div class="InfoOperating fr">
    <span>可见人：{{lookUserLength}}</span> 
     <span> | </span>
      <span><i class="iconfont iconfont18">&#xe682; </i> {{detailList.lookCount?detailList.lookCount:'0'}}</span>
       <span><i class="iconfont">&#xe603; </i>  {{detailList.projectDiaryLikeCount?detailList.projectDiaryLikeCount:'0'}}</span>
        <span><i class="iconfont">&#xe779;</i> {{detailList.projectDiaryCommentCount?detailList.projectDiaryCommentCount:'0'}}</span>
</div>

                   </li>

                   <li class="resourceList pad20">

<div class="detailTitle fl">评分</div>

<div class="InfoOperating fr">

    <span>可见人：{{lookUserLength}}</span> 
 
</div>

                   </li>

         </ul>









 </div>
 <div class="clear"></div>
        </div>

</template>
<script>
import {
  getPostInfo,
  getStorage,
  getToTime,
  setFileTyleImge,
  transDate
} from "../../../assets/lib/myStorage.js";
import { mapState } from "vuex";
export default {
  name: "mytext",
  data() {
    return {
      loading: true,
      detailList: {},
      activeIndex: true,
      focusState: false,
      dialogImageUrl: "",
        dialogVisible: false,

        imgLength:0,
        videoLength:0,
        acceLength:0,
        locationLength:0,
        lookUserLength:0,
    };
  },
  computed: {
    ...mapState(["sWHeight", "proTitle", "userInfo"])
  },
  methods: {
    open2(msg) {
      this.$message({
        message: msg,
        type: "success"
      });
    },

    handTitleChange() {
      this.activeIndex = false;
      this.focusState = true;
    },

    focusclick() {
      this.focusState = true;
    },

       changeTime(time){
            return transDate(time)
        },
         fileTypeImgChange(fileName){
                    return  setFileTyleImge(fileName)

        },

    handTitleBlur(value, id) {
      this.activeIndex = true;
      // console.log(value,id,getStorage("userInfo").id)
      let titleObj = {
        diaryId: id,
        userId: getStorage("userInfo").id,
        title: value
      };
      
      getPostInfo("yq_api/projectDiary/addDiaryTitle", titleObj).then(res => {
        if (res.data.code === 200) {
          this.open2(res.data.msg);
        }
      });
    },

       LargeImage(imagesUrl) {
        this.dialogImageUrl = imagesUrl;
        this.dialogVisible = true;
      },

  },
  mounted() {
    this.loading = true;
    console.log(this.$route.query.diaryId);
    let obj = {
      diaryId: this.$route.query.diaryId,
      userId: getStorage("userInfo").id,
      projectId: this.proTitle.proId
    };

    getPostInfo("yq_api/projectDiary/detail", obj).then(res => {
      if (res.data.code === 200) {
        // console.log(res.data)
        this.detailList =
          res.data.data == null ? (res.data.data = []) : res.data.data;
        console.log(this.detailList);
      }

      this.loading = false;
    });
  },
  watch: {
    detailList:{

         handler(newValue, oldValue) {
 this.imgLength = newValue.imageList.length;
 this.videoLength = newValue.videoList.length;
  this.acceLength = newValue.accessoryList.length;
  this.locationLength = newValue.locationList.length;
    this.lookUserLength = newValue.lookUserList.length;

           console.log(newValue.videoList.length)

             console.log(newValue);
             console.log(oldValue)

         },
          deep:true

    }  
  },

  directives: {
    focus: {
      inserted: function(el, option) {
        var defClass = "el-input",
          defTag = "input";
        var value = option.value || true;
        if (typeof value === "boolean")
          value = { cls: defClass, tag: defTag, foc: value };
        else
          value = {
            cls: value.cls || defClass,
            tag: value.tag || defTag,
            foc: value.foc || false
          };
        if (el.classList.contains(value.cls) && value.foc)
          el.getElementsByTagName(value.tag)[0].focus();
      }
    }
  }
};
</script>

