<template>
    <div class="content" :style="{maxHeight:sWHeight}">
        
<el-dialog
  title="添加可见人"
  :visible.sync="FriendsVisible"
  width="30%"
  :before-close="handleClose">


<friends-list :FriendsVisible="FriendsVisible" @handleClose="handleClose" @handFriendArr="handFriendArr" >



</friends-list>
</el-dialog>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <div class="editDiaryBox">
                <div class="editDiaryTop">
                    <el-row>
                        <el-col :span="6">
                            <router-link tag="div" to="/diary/EditDiary/DraftboxList" class="DraftBox">
                                <span class="iconfont DraftBoxFont">
                                    &#xe608;
                                </span>
                                草稿箱({{DraftBoxLength}}条)
                            </router-link>
                        </el-col>
                        <!-- <el-col :span="6">
                            <div class="VisiblePerson">
                                <el-checkbox class="VisiblePersonCheBox" v-model="MyChecked"></el-checkbox>
                                个人可见
                            </div>
                        </el-col> -->
                        <el-col :span="6">
                            <div class="VisiblePerson">
                                <el-checkbox v-model="KChecked" @change="FriendsVisible = true" class="VisiblePersonCheBox"></el-checkbox>
                                指定可见人
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="upLoadBtn">
                                <el-button tag="el-button" @click="submitForm('ruleForm')" type="primary">
                                    上传记事
                                </el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="editDiaryContent">
                    <div class="editDiaryShow">
                        <div class="editDiaryType iconfont">
                            &#xe615;
                        </div>
                        <el-input type="textarea" v-model="ruleForm.desc" :autosize="{ minRows: 5, maxRows: 20}" placeholder="文字区域" class="editTxt"
                            ref="handTextRef"></el-input>
                    </div>
                    <div class="editDiaryShow" v-if="ruleForm.imgList!=0 || ImgFlag==true">
                        <div class="editDiaryType maxFont iconfont">
                            &#xe6a5;
                        </div>
                        <el-row :gutter="20" class="flexibleUlBox">
                            <el-col class="resourceImgList" :span="8" v-for="(images,k) in ruleForm.imgList" :key="k">
                                <div class="grid-content bg-purple">
                                    <div class="resourceImg">
                                        <span class="removeEl" @click="RemoveImgList(k)">
                                            <i class="el-icon-close"></i>
                                        </span>
                                        <img :src="images.url" @click="LargeImage(images.url)" />
                                    </div>
                                    <div class="imagesInfo">
                                        {{images.name}}
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                        <li v-if="ImgFlag==true">
                            <el-progress class="videoPercentage" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
                        </li>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                    <div class="editDiaryShow" v-if="ruleForm.videoList.length!=0 || videoFlag==true">
                        <div class="editDiaryType maxFont iconfont">
                            &#xe604;
                        </div>
                        <el-row :gutter="20" class="flexibleUlBox">
                            <el-col class="resourceImgList" :span="8" v-for="(video,k) in ruleForm.videoList" :key="k">
                                <div class="grid-content bg-purple">
                                    <div class="resourceImg">
                                        <span class="removeEl" @click="RemoveVideoList(k)">
                                            <i class="el-icon-close"></i>
                                        </span>
                                        <div class="resourceImgvdieoMak">
                                            <i class="iconfont" @click="Largevideo(video.url)">&#xe605;</i>
                                        </div>
                                        <img :src="video.content" @click="Largevideo(video.url)" />
                                    </div>
                                    <div class="imagesInfo">
                                        {{video.name}}
                                    </div>
                                </div>
                            </el-col>
                            <el-col class="resourceImgList" :span="8" v-if="videoFlag==true">
                                <el-progress class="videoPercentage" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
                            </el-col>
                        </el-row>
                        <el-dialog :visible.sync="videoVisible">
                            <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions" @play="onPlayerPlay($event)"
                                @pause="onPlayerPause($event)">
                            </video-player>
                        </el-dialog>
                    </div>
                    <div class="editDiaryShow" v-if="ruleForm.locationList.length!=0">
                        <div class="editDiaryType maxFont iconfont">
                            &#xe633;
                        </div>
                        <el-row :gutter="12" class="annexListBox">
                            <el-col :span="24" class="annexList" v-for="(locat,index) in ruleForm.locationList" :key="index">
                                <el-card shadow="always">
                                    <span class="removeEl removeEP" @click="RemoveLocationList(index)">
                                        <i class="el-icon-close"></i>
                                    </span>
                                    <span class="isCurrentMap iconfont">
                                        {{locat.isCurrentMap==='Y'?'&#xe6e7;':'&#xe633;'}}
                                    </span>
                                    <span>
                                        当前地址-{{locat.name}}
                                    </span>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                    <el-dialog :visible.sync="locationVisible">
                        <baidu-map @baiduMapFromChild="baiduMapFromChild"></baidu-map>
                    </el-dialog>

                    <div class="editDiaryShow" v-if="ruleForm.annexList.length!=0">
                        <div class="editDiaryType maxFont iconfont">
                            &#xe732;
                        </div>

                        <el-row :gutter="12" class="annexListBox">
                            <el-col :span="24" class="annexList" v-for="(acces,j) in ruleForm.annexList" :key="j">
                                <el-card shadow="always">
                                    <span class="removeEl removeEP" @click="RemoveAnnexListList(j)">
                                        <i class="el-icon-close"></i>
                                    </span>
                                    <div class="annexTypeImg fl" :style="{width:'8%'}">
                                        <img :src="fileTypeImgChange(acces.name)" />
                                    </div>
                                    <div class="annexTitle fl">
                                        {{acces.name}} {{acces.size}}
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <ul class="editDiaryBtns">
                    <li @click="handText">
                        <div class="iconfont">&#xe615;</div>
                        文本
                    </li>
                    <li>
                        <el-upload ref="upload" class="upload-demo" :action="UploadUrl()" :data="{userId}" :on-preview="handlePreview"
                            accept="image/jpeg,image/gif,image/png,image/jpg,image/bmp" :on-remove="handleRemove" :on-success="imageSuccess"
                            :before-upload="handleBeforeUpload" :on-progress="uploadImgProcess" :file-list="ruleForm.imgList"
                            :haeders="upHeaders" :auto-upload="true" multiple :show-file-list="false" list-type="picture">
                            <div class="iconfont" size="small" type="primary">&#xe601;</div>
                        </el-upload>
                        图片
                    </li>
                    <li>
                        <el-upload ref="upload2" class="upload-demo" :action="UploadUrl()" :show-file-list="false"
                            :on-success="handleVideoSuccess" :before-upload="beforeUploadVideo" :on-progress="uploadVideoProcess"
                            :data="{userId}" accept="video/mp4" :on-remove="handleRemove" :file-list="ruleForm.videoList" :haeders="upHeaders"
                            :auto-upload="true" multiple list-type="picture">
                            <div class="iconfont" size="small" type="primary">&#xe624;</div>
                        </el-upload>
                        视频
                    </li>
                    <li @click="Largelocation">
                        <div class="iconfont fontlarge">&#xe633;</div>
                        位置
                    </li>
                    <li>
                        <el-upload ref="upload2" class="upload-demo" :action="UploadUrl()" :data="{userId}" :on-preview="handlePreview"
                            :on-remove="handleRemove" :on-success="imageSuccess" :before-upload="annexBeforeUpload" :file-list="ruleForm.annexList"
                            :haeders="upHeaders" :auto-upload="true" multiple :show-file-list="false" list-type="picture">
                            <div class="iconfont" size="small" type="primary">&#xe732;</div>
                        </el-upload>
                        附件
                    </li>
                </ul>
            </div>
        </el-form>
        <div class="clear"></div>
    </div>
</template>
<script>
    import {
        getPostInfo,
        getStorage,
        getNewDataTime,
        getFileType,
        setFileTyleImge,
        setStorage,
        getAnnexUrl
    } from "../../../assets/lib/myStorage.js";
    import BaiduMap from "../../../components/BaiduMap.vue";
    import FriendsList from "../../../components/FriendsList.vue";
    import { videoPlayer } from "vue-video-player";
    import { mapState } from "vuex";
    import axios from "axios";
    export default {
        name: "DraftDetail",
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
                dialogImageUrl: "",
                 FriendArr:[],
                FriendsVisible:false,
                dialogVisible: false,
                locationVisible: false,
                showImg: false,
                showVideo: false,
                showfile: false,
                videoFlag: false,
                videoVisible: false,

                MyChecked: false,
                KChecked: false,
                annexFlag:false,
                ImgFlag: false,
                videoUploadPercent: 0,
                imgUploadPercent: 0,

                isReplace: false,
                isEditDiary:false,

                DraftBoxLength: 0,
                isDraftBox: true,
                orgName: "",

                vdImg: "",
                userId: "",
                upHeaders: {
                    "Conten-Type": "multipart/form-data; boundary=fuckReaquestHeader"
                },
                resourceList: [],
                DraftBoxId: "",
                ruleForm: {
                    desc: "",
                    imgList: [],
                    videoList: [],
                    annexList: [],
                    locationList: []
                },
                rules: {}
            };
        },
        components: {
            BaiduMap,
            FriendsList,
        },
        computed: {
            ...mapState(["sWHeight", "proTitle", "userInfo"])
        },
        methods: {
              UploadUrl(){
               return getAnnexUrl();
        
    },
              handleClose(done) {
    
        this.$confirm('确认关闭？')
          .then(_ => {
             this.FriendsVisible = false;
            done();
          })
          .catch(_ => {});
      },
      
             handFriendArr(data){
                this.FriendsVisible = false;
                this.FriendArr = data;
               
              
            },
            onPlayerPlay(player) {
                //   alert("play");
            },
            onPlayerPause(player) {
                //   alert("pause");
            },

            KCheckedChange() {
                this.$alert("可见人列表", "添加可见人", {
                    confirmButtonText: "确定",
                    callback: action => {
                        this.$message({
                            type: "info",
                            message: `action: ${action}`
                        });
                    }
                });
            },
            open4(msg) {
                this.$message.error(msg);
            },

            open2(msg) {
                this.$message({
                    message: msg,
                    type: "success"
                });
            },

             fileTypeImgChange(fileName) {
                return setFileTyleImge(fileName);
            },
            baiduMapFromChild(data) {
                this.locationVisible = false;
                let locatName =
                    this.proTitle.protitle +
                    "-" +
                    (this.proTitle.orgName === null ? "" : this.proTitle.orgName + "-") +
                    getStorage("userInfo").name +
                    "-" +
                    getNewDataTime();
                // console.log(locatName);
                // console.log(data);

                let obj = {
                    name: data.name + " " + locatName,
                    size: data.size,
                    type: data.type
                };

                this.ruleForm.locationList.push(obj);

                // console.log(obj);
            },

            handImgUploadChange(ev) { },

            LargeImage(imagesUrl) {
                this.dialogImageUrl = imagesUrl;
                this.dialogVisible = true;
            },

            Largevideo(videoUrl) {
                this.playerOptions.sources[0].src = videoUrl;
                this.videoVisible = true;
            },

            Largelocation() {
                this.locationVisible = true;
            },

            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            beforeUploadVideo(file) {
                const isLt10M = file.size / 1024 / 1024 < 50;
                if (
                    [
                        "video/mp4",
                        "video/ogg",
                        "video/flv",
                        "video/avi",
                        "video/wmv",
                        "video/rmvb"
                    ].indexOf(file.type) == -1
                ) {
                    this.$message.error("请上传正确的视频格式");
                    return false;
                }
                if (!isLt10M) {
                    this.$message.error("上传视频大小不能超过50MB哦!");
                    return false;
                }
            },
            uploadVideoProcess(event, file, fileList) {
                this.videoFlag = true;

                let val = (event.loaded / event.total * 100).toFixed(0);
                this.videoUploadPercent = val * 1;
            },

            uploadAnnexProcess(event, file, fileList) {
                this.annexFlag = true;

                let val = (event.loaded / event.total * 100).toFixed(0);
                this.imgUploadPercent = val * 1;
            },
             uploadImgProcess(event, file, fileList) {
                this.ImgFlag = true;

                let val = (event.loaded / event.total * 100).toFixed(0);
                this.imgUploadPercent = val * 1;
            },
            handleVideoSuccess(res, file, imgList) {
                // console.log(res);
                if (res.code === 200) {
                    let fileType = file.name.split(".")[file.name.split(".").length - 1];
                    let videoName =
                        this.proTitle.protitle +
                        "-" +
                        (this.proTitle.orgName === null ? "" : this.proTitle.orgName + "-") +
                        getStorage("userInfo").name +
                        "-" +
                        getNewDataTime() +
                        "." +
                        fileType;
                    // console.log(fileType, videoName);
                    let _that = this;
                    setTimeout(function () {
                        this.vdImg = res.data[0].content;

                        let obj = {
                            size: res.data[0].size,
                            name: file.name,
                            type: "mv",
                            content: res.data[0].content,
                            url: res.data[0].url
                        };

                        _that.ruleForm.videoList.push(obj);

                        if (_that.videoUploadPercent == 100) {
                            _that.videoFlag = false;
                        }
                    }, 1500);
                }
            },

            handleBeforeUpload(file) {
                // console.log("before");
                // console.log(file);

                const isJPEG = file.type === "image/jpeg";
                const isPNG = file.type === "image/png";
                const isJPG = file.type === "image/jpg";
                const isGIF = file.type === "image/gif";
                const isBMP = file.type === "image/bmp";

                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isGIF && !isPNG && !isBMP && !isJPEG) {
                    this.$message.error("上传图片只能是JPEG  JPG  PNG  GIF BMP  格式!");
                }
                if (!isLt2M) {
                    this.$message.error("上传图片大小不能超过 2MB!");
                }
                return (isJPG || isBMP || isGIF || isPNG || isJPEG) && isLt2M;
            },

            videoBeforeUpload(file) {
                // console.log("视频before");
            },

            annexBeforeUpload(file) {
                // console.log("附件before");
            },
            submitUpload() {
                this.$refs.upload.submit();
            },

            // 文件超出个数限制时的钩子
            handleExceed(files, imgList) { },

            RemoveImgList(index) {
                this.ruleForm.imgList.splice(index, 1);
            },

            RemoveVideoList(index) {
                this.ruleForm.videoList.splice(index, 1);
            },

            RemoveLocationList(index) {
                this.ruleForm.locationList.splice(index, 1);
            },
            RemoveAnnexListList(index) {
                this.ruleForm.annexList.splice(index, 1);
            },

            handleRemove(file, imgList) {
                this.ruleForm.imgList = imgList;
            },
            handlePreview(file) { },

            

            imageSuccess(res, file, imgList) {
             
                // console.log(imgList)
                
                let fileType = file.name.split(".")[file.name.split(".").length - 1];
                // console.log(fileType)
                let nameStr =
                    this.proTitle.protitle +
                    "-" +
                    (this.proTitle.orgName === null ? "" : this.proTitle.orgName + "-") +
                    getStorage("userInfo").name +
                    "-" +
                    getNewDataTime() +
                    "." +
                    fileType;

                if (res.code === 200) {
                    // console.log(res)
                    // res.data[0].name = nameStr;
                   
                    // res.data[0].name = file.name;
                    // res.data[0].type = getFileType(fileType);
                    // let fileData=[]
                    // imgList.forEach((e,index) => {
                    //     if(e.response && e.response.code ===200){
                    //         // if(e.response.data[0])
                    //         fileData.push(e.response.data[0])
                    //         //   console.log(e.response.data[0])
                    //     }
                      

                    // });
                    this.ruleForm.imgList = imgList;
                    // console.log(fileData)

                    //  console.log(res.data,imgList)
                    // console.log(getFileType(fileType))
                    // if (res.data[0].type === "img") {
                    //     this.showImg = true;
                    //     // this.ruleForm.imgList = imgList;
                    //     // this.ruleForm.imgList.push(...res.data);
                    // } else if (res.data[0].type === "file") {
                    //     this.showfile = true;
                    //     // this.ruleForm.annexList = imgList;

                    //     this.ruleForm.annexList.push(...res.data);
                    // }

                    this.ImgFlag = false;
                }
            },

               annexSuccess(res, file, annexList) {
              
            
                
                let fileType = file.name.split(".")[file.name.split(".").length - 1];
                // console.log(fileType)
                let nameStr =
                    this.proTitle.protitle +
                    "-" +
                    (this.proTitle.orgName === null ? "" : this.proTitle.orgName + "-") +
                    getStorage("userInfo").name +
                    "-" +
                    getNewDataTime() +
                    "." +
                    fileType;

                if (res.code === 200) {
                
                    this.ruleForm.annexList = annexList;
             

                    this.annexFlag = false;
                }
            },

            handText() {
                this.$refs.handTextRef.focus();
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$refs.upload.submit();
                        let imgListArr=[]
                    this.ruleForm.imgList.forEach((e,index) => {
                        let obj={
                            name:e.name,
                            type:'img',
                        }
                        if(e.response && e.response.code ===200){
                            obj.size = e.response.data[0].size;
                             obj.url = e.response.data[0].url;
                            imgListArr.push(obj)
                        }
                    });


                    let annexListArr=[]
                    this.ruleForm.annexList.forEach((e,index) => {
                        let obj={
                            name:e.name,
                            type:'file',
                        }
                        if(e.response && e.response.code ===200){
                            obj.size = e.response.data[0].size;
                             obj.url = e.response.data[0].url;
                            annexListArr.push(obj)
                        }
                    });





                        this.resourceList = [
                            ...imgListArr,
                            ...this.ruleForm.videoList,
                            ...annexListArr,
                            ...this.ruleForm.locationList
                        ];
                        if (!this.ruleForm.desc && this.resourceList.length <= 0) {
                            this.open4("当前没有可上传的内容！请输入");
                        } else {
                            this.$refs.upload.submit();

                            let uploadInfo = {
                                userId: getStorage("userInfo").id,
                                projectId: this.proTitle.proId,
                                status: "0",
                                diaryType: "diary",
                                diaryLookType: ""
                            };

                            let resourceList = [];
                            let num = 0;
                            if (this.ruleForm.desc) {
                                uploadInfo["resourceList[" + 0 + "].type"] = "text";
                                uploadInfo[
                                    "resourceList[" + 0 + "].content"
                                ] = this.ruleForm.desc;
                                num = 1;
                            }

                            for (let i = 0; i < this.resourceList.length; i++) {
                                resourceList.push({});
                                resourceList[i].url = this.resourceList[i].url;
                                resourceList[i].type = this.resourceList[i].type;
                                resourceList[i].name = this.resourceList[i].name;
                                resourceList[i].size = this.resourceList[i].size;
                                this.resourceList[i].content
                                    ? (resourceList[i].content = this.resourceList[i].content)
                                    : "";
                            }

                            for (let i = 0; i < this.resourceList.length; i++) {
                                for (let key in resourceList[i]) {
                                    uploadInfo["resourceList[" + (i + num) + "]." + key] =
                                        resourceList[i][key];
                                }
                            }
                        

                             getPostInfo("yq_api/projectDiary/add", uploadInfo).then(res => {
                                if (res.data.code === 200) {
                                    let _that = this;
                                 
                                    this.open2("日志上传成功！");
                                    this.isDraftBox = false;
                                    let ResouceObj={
                                        userId:getStorage("userInfo").id,
                                        projectId:this.proTitle.proId,
                                        receivePeople:this.FriendArr.join(','),
                                        resourceId:res.data.data,
                                        resourceType:'diary',
                                    }
                                   
                                  if(ResouceObj.receivePeople){
                                          //分享可见人
                                     getPostInfo("yq_api/userResource/shareMyResouce", ResouceObj).then(resInfo => {
                                         if(resInfo.data.code ===200){
                                             
                                              setTimeout(function(){
                                                   _that.$router.go(0)
                                              },500)
                                           _that.$router.push("/diary/MyDiary");
                                          
                                           
                                         }
                                     })
                                    }else{
                                         _that.$router.push("/diary/MyDiary");
                                    }
                                     
                                    let rep = getStorage("DraftBox").filter(e => {
                                        return e.DraftBoxId != this.DraftBoxId;
                                    });
                                    setStorage("DraftBox", rep);

                                }
                            });

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
            }
        },
        mounted() {
            this.userId = getStorage("userInfo").id;
          
            if (this.$route.query.DraftBoxId) {
                this.isReplace = true;
                this.DraftBoxId = this.$route.query.DraftBoxId;
                getStorage("DraftBox").forEach(e => {
                    if(e.DraftBoxId == this.$route.query.DraftBoxId){
                        this.ruleForm.locationList = e.locationList;
                        this.ruleForm.annexList =e.annexList;
                        this.ruleForm.videoList = e.videoList;
                        this.ruleForm.imgList = e.imgList;
                        this.ruleForm.desc = e.desc;
                    }
                });
               
                this.DraftBoxId = this.$route.query.DraftBoxId;
               
            } else {
                this.DraftBoxId = +new Date();
            }

            let obj = {
                page: "1",
                size: "1",
                userId: getStorage("userInfo").id,
                projectId: this.proTitle.proId
            };
           
            getPostInfo("yq_api/projectDiary/searchMyDariyList", obj).then(res => {
                this.orgName = res.data.data[0].orgName;
            });

            let DraftNewArr = [];
            if (getStorage("DraftBox")) {
                DraftNewArr = getStorage("DraftBox").filter(e => {
                    return (
                        e.projectId == this.proTitle.proId &&
                        e.userId == getStorage("userInfo").id
                    );
                });
            }
            this.DraftBoxLength = DraftNewArr.length;
        },
        beforeDestroy() {
            if (this.isDraftBox) {
                let DraftArr = getStorage("DraftBox") ? getStorage("DraftBox") : [];
                let DraftBoxObj = {
                    DraftBoxId: this.DraftBoxId,
                    userId: getStorage("userInfo").id,
                    projectId: this.proTitle.proId,
                    mainPic: getStorage("userInfo").mainPic,
                    orgName: this.orgName,
                    userName: getStorage("userInfo").name,
                    status: "0",
                    diaryType: "diary",
                    diaryLookType: "",
                    desc: this.ruleForm.desc,
                    imgList: this.ruleForm.imgList,
                    videoList: this.ruleForm.videoList,
                    annexList: this.ruleForm.annexList,
                    locationList: this.ruleForm.locationList,
                    visible: false
                };

                if (this.isReplace) {
                    let rep = getStorage("DraftBox").filter(e => {
                        return e.DraftBoxId != this.DraftBoxId;
                    });
                    if (
                        this.ruleForm.desc ||
                        this.ruleForm.imgList.length != 0 ||
                        this.ruleForm.videoList.length != 0 ||
                        this.ruleForm.annexList.length != 0 ||
                        this.ruleForm.locationList.length != 0
                    ) {
                        rep.push(DraftBoxObj);
                        setStorage("DraftBox", rep);
                    } else {
                        setStorage("DraftBox", rep);
                       
                    }
                } else {
                    if (
                        this.ruleForm.desc ||
                        this.ruleForm.imgList.length != 0 ||
                        this.ruleForm.videoList.length != 0 ||
                        this.ruleForm.annexList.length != 0 ||
                        this.ruleForm.locationList.length != 0
                    ) {
                        DraftArr.push(DraftBoxObj);
                        setStorage("DraftBox", DraftArr);
                    }
                }
            }
        },
        watch: {
            fileList() {
                this.fileList.length ? (this.showImg = true) : (this.showImg = false);
              
            },
               FriendArr(){
              
                if(this.FriendArr.length!=0){
                    this.KChecked = true;
                }else{
                    this.KChecked = false;
                }
            }
         

            
        }
    };
</script>

<style>
</style>