<template>
    <div class="content content_dairy" :style="{maxHeight:sWHeight}">

        <div v-loading="loading" element-loading-text="拼命加载中">




            <ul class="diaryListUlBox">
                <li class="resourceList pad20">


                    <div class="diaryListTop">

                        <div class="diary-left-pic fl">

                            <div class="diary-pic fl">
                                <img :src="detailList.mainPic" />
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
                                        <el-input v-if="!activeIndex" @keyup.enter.native="handTitleBlur(detailList.title,detailList.diaryId)" v-focus="true" v-model="detailList.title"
                                            data-index="0" @blur="handTitleBlur(detailList.title,detailList.diaryId)" class="titleInput"
                                            placeholder="请输入标题">
                                        </el-input>
                                    </span>
                                </div>
                            </div>
                        </div>


                   <!-- {{detailList.resourceList}} -->

                        <div class="diary-right-icons fr">

                            <div class="DarftDelet fl">
                            <!-- {{detailList.lookUserList.length}} -->

                         
                              <span :style="{color:isEdit?'#4c91e2':'#afafaf'}" @click="EditLog(detailList.diaryId,detailList.projectId)">
                                    <i class="el-icon-edit" ></i>
                                   {{lookUserLength===0?'编辑':'当日编辑'}}
                                  
                                </span> 

                                <span @click="deleteDiary(detailList.diaryId)" :style="{color:isEdit?'#4c91e2':'#afafaf'}">
                             <i class="el-icon-delete"></i>
                            
                             {{lookUserLength===0?'删除':'当日删除'}}
                                       
                            </span>
                            </div>

                            <div class="diaryTime">
                                {{changeTime(detailList.createTime)}}
                            </div>
                            <div class="diaryIcons">
                             
                                <span class="iconfont" :style="{color:resouLength!=0?'#4c91e2':''}">&#xe615;</span>
                                <span class="iconfont" :style="{color:imgLength!=0?'#4c91e2':''}">&#xe601;</span>
                                <span class="iconfont font16" :style="{color:videoLength!=0?'#4c91e2':''}">&#xe604;</span>
                                <span class="iconfont font16" :style="{color:locationLength!=0?'#4c91e2':''}">&#xe633;</span>
                                <span class="iconfont font16" :style="{color:acceLength!=0?'#4c91e2':''}">&#xe732;</span>
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



                    <div class="editDiaryShow fontH15" v-if="imgLength != 0">
                        <div class="editDiaryType maxFont iconfont">
                            &#xe6a5;
                        </div>
                        <el-row :gutter="20" class="flexibleUlBox">
                            <el-col class="resourceImgList" :span="8" v-for="(images,k) in detailList.imageList" :key="k">
                                <div class="grid-content bg-purple">
                                    <div class="resourceImg">
                                        <img :src="images.url" @click="LargeImage(images.url)" />
                                    </div>
                                    <div class="imagesInfo">
                                        {{images.name}}
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                        <el-dialog :visible.sync="dialogVisible">
                            
                          <img-swiper :imagesUrl="detailList.imageList">
                          
                          </img-swiper>
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
                                        <div class="resourceImgvdieoMak">
                                            <i class="iconfont" @click="Largevideo(video.url)">&#xe605;</i>
                                        </div>
                                        <img :src="video.content" @click="LargeImage(video.content)" />
                                    </div>
                                    <div class="imagesInfo">
                                        {{video.name}}
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                        <el-dialog :visible.sync="videoVisible">
                            <!-- <img width="100%" :src="dialogImageUrl" alt=""> -->

                            <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions" @play="onPlayerPlay($event)"
                                @pause="onPlayerPause($event)">
                            </video-player>

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
                                        <img :src="fileTypeImgChange(acces.name)" />
                                    </div>
                                    <div class="annexTitle fl">
                                        {{acces.name}} {{acces.size}}
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>

                    </div>
                    <!-- {{detailList.videoList.length?detailList.videoList.length:0}} -->

                    <div class="editDiaryShow fontH15" v-if="locationLength != 0">
                        <div class="editDiaryType maxFont iconfont">
                            &#xe633;
                        </div>

                        <el-row :gutter="12" class="annexListBox">
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
                        <span>可见人：{{lookUserLength+1}}</span>
                        <span> | </span>
                        <span><i class="iconfont iconfont18">&#xe682; </i> {{detailList.lookCount?detailList.lookCount:'0'}}</span>
                       
                        <span @click="LikeCountChange" class="LikediaryBtn">
                            <i class="iconfont" :style="{color:isLike?'#00':'red'}">&#xe603; </i> {{detailList.projectDiaryLikeCount?detailList.projectDiaryLikeCount:'0'}}</span>


                        <span><i class="iconfont">&#xe779;</i> {{detailList.projectDiaryCommentCount?detailList.projectDiaryCommentCount:'0'}}</span>
                    </div>
                </li>
            </ul>

            <div class="allCrntent">
                <div class="allCrntentTitleBox pad20">
                    <div class="detailTitle fl">评论</div>
                </div>
                <div class="allCrntentText pad20">
                    <div class="noComment" v-if="CommentListLength==0">
                        暂无评论
                    </div>
                    <ul v-if="CommentListLength!=0">
                        <li v-for="(comment,index) in detailList.projectDiaryCommentList" class="CommentList" :key="index" @click="changComment(comment.commentFromUserId,comment.commentFromUserName)">
                            <!-- {{comment}} -->
                            <!-- {{comment.commentFromUserName}} -->
                            <div class="diary-pic fl">
                                <img :src="comment.commentFromUserUrl" />
                            </div>
                            <div class="diary-title-Box fl">
                                <div class="diary-username">
                                    {{comment.commentFromUserName}}
                                </div>
                                <div class="diary-title-input">
                                    <span class="addTitleBox fl">
                                        <span v-if="comment.commentType==='reply'">
                                            回复： <span class="replyType">{{comment.commentToUserName}}</span> :
                                        </span> {{comment.content}}
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                            <el-input type="textarea" v-model="ruleForm.commentDesc" :placeholder="DescValue"></el-input>
                            <div class="commentDescBtn">
                                <el-button type="primary" size="small" @click="submitForm('ruleForm')">评论</el-button>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>




            <div class="allCrntent">
                <div class="allCrntentTitleBox pad20">
                    <div class="detailTitle fl">留痕记录单</div>
                </div>

                <div class="allCrntentText pad20" :style="{height:MaxHShow?'100%':'300px'}">
                    <div class="noComment" v-if="userLogLength==0">
                        暂无留痕
                    </div>

                    <el-row v-for="(userLog,index) in detailList.userLogList" :key="index" class="mar5">
                        <el-col :span="8">
                            {{changeTime(userLog.time)}}

                        </el-col>
                        <el-col :span="8">
                            {{userLog.orgName}}--{{userLog.userName}}
                        </el-col>
                        <el-col :span="8">
                            <span :class="userLogClass(userLog.operationType)">
                                {{getOperationType(userLog.operationType)}}
                            </span>
                        </el-col>
                    </el-row>
                </div>


                <div class="openUp" @click="openUpH">
                    <i :class="MaxHShow?'el-icon-arrow-up':'el-icon-arrow-down'"></i> {{MaxHShow?'点击隐藏':'点击展开'}}
                </div>
            </div>




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
  transDate,
  getDayNewTime
} from "../../../assets/lib/myStorage.js";
import { mapState } from "vuex";
import { videoPlayer } from "vue-video-player";
import ImgSwiper from "../../../components/ImgSwiper.vue";
import router from "../../../router";
export default {
  name: "mytext",
  data() {
    return {
      playerOptions: {
        //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "" //你的m3u8地址（必填）
          }
        ],
        poster: "poster.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        //        controlBar: {
        //          timeDivider: true,
        //          durationDisplay: true,
        //          remainingTimeDisplay: false,
        //          fullscreenToggle: true  //全屏按钮
        //        }
      },

      loading: true,
      detailList: {},
      activeIndex: true,
      focusState: false,
      dialogImageUrl: "",
      MaxHShow: false,
      dialogVisible: false,
      videoVisible: false,
      isLike: true,
      DescValue: "给Ta的日志评论",
      commentType: "comment",
      ToUserId: "",
      ToUserName: "",
      isEdit: false,
      ruleForm: {
        commentDesc: ""
      },

      rules: {},
      imgLength: 0,
      videoLength: 0,
      acceLength: 0,
      locationLength: 0,
      lookUserLength: 0,
      CommentListLength: 0,
      userLogLength: 0,
      resouLength:0,
    };
  },
  computed: {
    ...mapState(["sWHeight", "proTitle", "userInfo"]),
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  components: {
    videoPlayer,
    ImgSwiper
  },
  methods: {
    onPlayerPlay(player) {
      //   alert("play");
    },
    onPlayerPause(player) {
      //   alert("pause");
    },

    open2(msg) {
      this.$message({
        message: msg,
        type: "success"
      });
    },

    open4(msg) {
      this.$message.error(msg);
    },

    handTitleChange() {
      this.activeIndex = false;
      this.focusState = true;
    },

    focusclick() {
      this.focusState = true;
    },

    changeTime(time) {
      return getToTime(time, "-");
    },
    fileTypeImgChange(fileName) {
      return setFileTyleImge(fileName);
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

    deleteDiary(id) {
      let obj = {
        diaryId: id,
        userId: getStorage("userInfo").id
      };

      if (this.lookUserLength == 0) {
        this.$confirm("您确定要删除这篇日志吗?删除后不可恢复", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            getPostInfo("yq_api/projectDiary/delete", obj).then(res => {
              if (res.data.code === 200) {
                // this.open2(res.data.msg);
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.$router.push("/diary/MyDiary");
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
        // console.log("直接删除");
      } else {
        if (this.isEdit) {
          this.$confirm("您确定要删除这篇日志吗?删除后不可恢复", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              getPostInfo("yq_api/projectDiary/delete", obj).then(res => {
                if (res.data.code === 200) {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  this.$router.push("/diary/MyDiary");
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
          // console.log("可以删除！！");
        }
      }
    },
    EditLog(did,pid){
      if(this.lookUserLength == 0){

          router.push({
           path:'/diary/EditDiary',
           query:{
               did:did,
               pid:pid
           }
         
           });

      }else{
  if(this.isEdit){
         router.push({
           path:'/diary/EditDiary',
           query:{
               did:did,
               pid:pid
           }
         
           });
        // console.log('可以编辑')
        //  console.log(did,pid)
      }

      }
    
     

    },
    getOperationType(typeStr) {
      let HtmlStr = "";
      switch (typeStr) {
        case "look":
          HtmlStr = `浏览过`;
          break;
        case "like":
          HtmlStr = `点赞过`;
          break;
        case "comment":
          HtmlStr = `评论过`;
          break;
      }
      return HtmlStr;
    },
    userLogClass(typeStr) {
      let HtmlStr = "";
      switch (typeStr) {
        case "look":
          HtmlStr = "lookUserlog";
          break;
        case "like":
          HtmlStr = "likeUserlog";
          break;
        case "comment":
          HtmlStr = "commentUserlog";
          break;
      }
      return HtmlStr;
    },
    openUpH() {
      this.MaxHShow = !this.MaxHShow;
    },

    LikeCountChange() {
      if (this.isLike) {
        let obj = {
          projectDiaryId: this.$route.query.diaryId,
          userId: getStorage("userInfo").id,
          projectId: this.proTitle.proId,
          type: "0"
        };
        getPostInfo("yq_api/projectDiary/projectDiaryLike", obj).then(res => {
          if (res.data.code === 200) {
            this.open2("点赞成功！");
            this.detailList.projectDiaryLikeCount =
              this.detailList.projectDiaryLikeCount * 1 + 1;
            this.isLike = false;
          }
        });
      } else {
        this.open4("您已点过赞！请勿重复点赞");
      }
    },

    changComment(ToUserId, ToUserName) {
      this.DescValue = "@回复：" + ToUserName + "的评论";
      this.commentType = "reply";
      this.ToUserId = ToUserId;
      this.ToUserName = ToUserName;
      // console.log(ToUserId,ToUserName,this.ToUserId)
    },

    submitForm(formName) {
      let _that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.ruleForm.commentDesc)
          if (!this.ruleForm.commentDesc) {
            this.open4("请填写评论内容");
          } else {
            let obj = {
              projectId: this.proTitle.proId,
              commentFromUserId: getStorage("userInfo").id, //本会员的ID
              commentToUserId:
                this.commentType === "reply"
                  ? this.ToUserId
                  : this.detailList.createPerson, //被评论员的ID
              projectDiaryId: this.detailList.diaryId,
              content: this.ruleForm.commentDesc,
              commentType: this.commentType,
              isTop: "0"
            };
 this.detailList.projectDiaryCommentList==null?this.detailList.projectDiaryCommentList=[]:this.detailList.projectDiaryCommentList;
            getPostInfo("yq_api/projectDiary/addProjectDiaryComment", obj).then(
              res => {
                if (res.data.code === 200) {
                  this.open2(res.data.msg);
                  let commentObj = {
                    commentFromUserId: obj.commentFromUserId,
                    commentFromUserName: getStorage("userInfo").name,
                    commentFromUserUrl: getStorage("userInfo").mainPic,
                    commentType: this.commentType,
                    commentToUserName: this.ToUserName,
                    content: this.ruleForm.commentDesc
                  };
                  this.detailList.projectDiaryCommentList.push(commentObj);

                  (this.commentType = "comment"),
                    (this.DescValue = "给Ta的日志评论");
                  this.ruleForm.commentDesc = "";
                }
              }
            );

            // console.log(obj)
            // alert("submit!");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    LargeImage(imagesUrl) {
      this.dialogImageUrl = imagesUrl;
      this.dialogVisible = true;
    },

    Largevideo(videoUrl) {
      this.playerOptions.sources[0].src = videoUrl;
      this.videoVisible = true;
    }
  },
  mounted() {
    this.loading = true;
    let obj = {
      diaryId: this.$route.query.diaryId,
      userId: getStorage("userInfo").id,
      projectId: this.proTitle.proId
    };

    getPostInfo("yq_api/projectDiary/detail", obj).then(res => {
      if (res.data.code === 200) {
        // console.log(res.data.data)
        this.detailList =
          res.data.data == null ? (res.data.data = []) : res.data.data;
        this.isLike =
          res.data.data.isDiaryLike === 0
            ? (this.isLike = true)
            : (this.isLike = false);
        this.isEdit = getDayNewTime(this.detailList.createTime);
        // console.log(this.detailList)
      }
      // console.log(this.detailList);

      this.loading = false;
    });
  },
  watch: {
    detailList: {
      handler(newValue, oldValue) {
        this.resouLength = newValue.resourceList.length;
        this.imgLength = newValue.imageList.length;
        this.videoLength = newValue.videoList.length;
        this.acceLength = newValue.accessoryList.length;
        this.locationLength = newValue.locationList.length;
        this.lookUserLength = newValue.lookUserList.length;
        this.userLogLength = newValue.userLogList.length;
        this.CommentListLength = newValue.projectDiaryCommentList
          ? newValue.projectDiaryCommentList.length
          : 0;
      },
      deep: true
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
<style>
.video-js .vjs-big-play-button {
  /*
     播放按钮换成圆形
    */
  height: 2em;
  width: 2em;
  line-height: 2em;
  border-radius: 1em;
}
</style>