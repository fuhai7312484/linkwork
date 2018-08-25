<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <div class="editDiaryBox">
      <div class="editDiaryTop">
        编辑日志

        <el-button tag="el-button" @click="submitForm('ruleForm')" type="primary">
          上传日志
        </el-button>


      </div>



      <div class="editDiaryContent">
{{resourceList}}

        <div class="editDiaryShow">
          <div class="editDiaryType iconfont">
            &#xe615;
          </div>
          <el-input type="textarea" v-model="ruleForm.desc" :autosize="{ minRows: 5, maxRows: 20}" placeholder="文字区域" class="editTxt"
            ref="handTextRef"></el-input>

        </div>


        <div class="editDiaryShow" v-if="showImg">
          <div class="editDiaryType maxFont iconfont">
            &#xe6a5;
          </div>
          <!-- <el-upload action="http://39.107.254.60:8081/yq_api/image/upload" :data="{userId}" list-type="picture" :on-remove="handleRemove"
            :on-preview="handlePictureCardPreview" :before-upload="handleBeforeUpload" multiple :haeders="upHeaders" :file-list="ruleForm.imgList">
          </el-upload> -->
          <ul>
            <li v-for="(itme,index) in ruleForm.imgList" :key="index">
              <img :src="itme.url" :style="{width:'100px'}" @click="LargeImage(itme.url)" /> {{itme.name}} 这里是图片

            </li>

          </ul>

          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>




        <div class="editDiaryShow" v-show="showVideo">
          <div class="editDiaryType maxFont iconfont">
            &#xe604;
          </div>

           <ul>
            <li v-for="(videos,index) in ruleForm.videoList" :key="index">
            <!-- {{videos}} {{videos.size}} -->
              <img :src="videos.content" :style="{width:'100px'}" @click="LargeImage(videos.url)" /> {{videos.name}} 



            </li>

          </ul>


          <!-- <ul>
            <li>
              这里是视频

            </li>

          </ul> -->
        </div>



        <div class="editDiaryShow">
          <div class="editDiaryType maxFont iconfont">
            &#xe633;
          </div>
          <ul>
            <li>
              这里是位置

            </li>

          </ul>
        </div>


        <div class="editDiaryShow" v-if="showfile">
          <div class="editDiaryType maxFont iconfont">
            &#xe732;
          </div>
            <ul>
            <li v-for="(itme,index) in ruleForm.annexList" :key="index">
              <img :src="itme.content" :style="{width:'100px'}" /> {{itme.name}} 这里是附件

            </li>

          </ul>
          <!-- <ul>
            <li>
              这里是附件

            </li>

          </ul> -->
        </div>

      </div>



      <ul class="editDiaryBtns">
        <li @click="handText">
          <div class="iconfont">&#xe615;</div>
          文本
        </li>
        <li>
          <el-upload ref="upload" class="upload-demo" action="http://39.107.254.60:8081/yq_api/image/upload"
           :data="{userId}" :on-preview="handlePreview"
           accept="image/jpeg,image/gif,image/png,image/jpg,image/bmp"
            :on-remove="handleRemove" :on-success="imageSuccess" :before-upload="handleBeforeUpload" :file-list="ruleForm.imgList"
            :haeders="upHeaders" :auto-upload="true" multiple :show-file-list="false" list-type="picture">
            <!-- <el-button class="iconfont" size="small" type="primary" ref="imgUpload">&#xe601;</el-button> -->

            <div class="iconfont" size="small" type="primary">&#xe601;</div>

          </el-upload>
          <!-- <div class="iconfont"  @click="handImgUploadChange" >&#xe601;</div> -->
          图片
        </li>

        <li>
<!-- action="http://39.107.254.60:8081/yq_api/image/upload" -->

        <el-upload ref="upload2" class="upload-demo" action="http://39.107.254.60:8081/yq_api/image/upload"
           :data="{userId}" :on-preview="handlePreview"
             accept="video/mp4"
            :on-remove="handleRemove"
             :on-success="imageSuccess"
             :before-upload="videoBeforeUpload"
             :file-list="ruleForm.videoList"
            :haeders="upHeaders" 
            :auto-upload="true"
             multiple 
             :show-file-list="false"
              list-type="picture">
            <!-- <el-button class="iconfont" size="small" type="primary" ref="imgUpload">&#xe601;</el-button> -->

            <div class="iconfont" size="small" type="primary">&#xe624;</div>

          </el-upload>


          <!-- <div class="iconfont fontlarge">&#xe624;</div> -->
          视频
        </li>
        <li>

          <div class="iconfont fontlarge">&#xe633;</div>
          位置
        </li>
        <li>
           <el-upload ref="upload2" class="upload-demo" action="http://39.107.254.60:8081/yq_api/image/upload"
           :data="{userId}" :on-preview="handlePreview"
            :on-remove="handleRemove"
             :on-success="imageSuccess"
             :before-upload="annexBeforeUpload"
             :file-list="ruleForm.annexList"
            :haeders="upHeaders" 
            :auto-upload="true"
             multiple 
             :show-file-list="false"
              list-type="picture">
            <!-- <el-button class="iconfont" size="small" type="primary" ref="imgUpload">&#xe601;</el-button> -->

            <div class="iconfont" size="small" type="primary">&#xe732;</div>

          </el-upload>

          <!-- <div class="iconfont fontlarge">&#xe732;</div> -->
          附件
        </li>


      </ul>



    </div>
  </el-form>
</template>
<script>
  import {
    getPostInfo,
    getStorage,
    getNewDataTime,
    getFileType
  } from "../../../assets/lib/myStorage.js";
  import { mapState } from "vuex";
  import axios from "axios";
  export default {
    name: "EditDiary",
    data() {
      return {
        dialogImageUrl: "",
        dialogVisible: false,
        showImg: false,
        showVideo:false,
        showfile:false,
        userId: "",
        upHeaders: {
          "Conten-Type": "multipart/form-data; boundary=fuckReaquestHeader"
        },
        resourceList: [],
        ruleForm: {
          desc: "",
          imgList: [],
           videoList: [],
           annexList:[],
         
        },
        rules: {}
      };
    },
    computed: {
      ...mapState(["proTitle", "userInfo"])
    },
    methods: {
      open4(msg) {
        this.$message.error(msg);
      },
      handImgUploadChange(ev) {
        //  console.log(this.$refs);
        //   console.log(ev.target)
        //  this.$refs.see.click()
        // this.$refs.imgUpload.submit();
      },

      LargeImage(imagesUrl) {
        this.dialogImageUrl = imagesUrl;
        this.dialogVisible = true;
      },

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      handleBeforeUpload(file) {
        // console.log(file.type,file.size)
        console.log("before");
        console.log(file)

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
        // console.log(file.type,file.size)
        console.log("视频before");

       
      },

      annexBeforeUpload(file){
  console.log("附件before");

      },
      submitUpload() {
        this.$refs.upload.submit();
      },

      //     uploadImg(f){
      // let userId = {userId:getStorage("userInfo").id}
      //       let param = new FormData(); //创建form对象
      //             param.append('file', f.file);//通过append向form对象添加数据
      //             param.append('fileType', f.fileType);//通过append向form对象添加数据
      //             param.append('fileId', f.fileId);//通过append向form对象添加数据
      //             param.append('fileName', f.fileName);//添加form表单中其他数据

      //             axios.post('http://39.107.254.60:8081/yq_api/image/upload', param)
      //                 .then(res => {
      //                   console.log(res.data)
      //                   if(res.data.code===200){
      //                  this.resourceList = [...res.data.data]
      //                   this.ruleForm.imgList = [...res.data.data]
      //                   console.log(this.resourceList,this.ruleForm.imgList)
      //                   }

      //                   //  this.ruleForm.imgList = [...res.data.data];
      //       //  console.log(this.ruleForm.imgList)
      //       // this.resourceList = [...imgList];

      //                 })
      //                 .catch(err => {
      //                     reject(err);
      //                 })
      //                  console.log(this.resourceList,this.ruleForm.imgList)
      // console.log("走了")
      //  console.log(f)

      //     },
      // 文件超出个数限制时的钩子
      handleExceed(files, imgList) { },
      handleRemove(file, imgList) {
        this.ruleForm.imgList = imgList;

        this.resourceList = [...imgList];
        // console.log(this.resourceList,imgList)

        // console.log(this.fileList)
        // console.log(file, imgList);
      },
      handlePreview(file) {
        // console.log(file);
      },

      imageSuccess(res, file, imgList) {

       

        let fileType = file.name.split(".")[1];
        let nameStr =
            this.proTitle.protitle +
            "-" +
            (this.proTitle.orgName === null ? "" : this.proTitle.orgName + "-") +
            getStorage("userInfo").name +
            "-" +
            getNewDataTime() +
            "." +
          fileType;

          
          
      //     // console.log(getFileType(fileType))
      
        res.data[0].name = nameStr
        res.data[0].type = getFileType(fileType)



      //   //  this.showVideo = true;
      //   // this.ruleForm.videoList = res.data;
      //   //   console.log(this.ruleForm.videoList)

       if(res.data[0].type==='img'){
          this.showImg = true;
         this.ruleForm.imgList.push(...res.data);
       }else if(res.data[0].type==='mv'){
         console.log(res.data[0].type)
          this.showVideo = true;
         this.ruleForm.videoList.push(...res.data);
          console.log(this.ruleForm.videoList)
       }else if(res.data[0].type==='file'){
          this.showfile = true;
          this.ruleForm.annexList.push(...res.data);
       }
       
     
        this.resourceList.push(...res.data)





        // for (let i = 0; i < imgList.length; i++) {
        //   let fileType = imgList[i].name.split(".")[1];
        // console.log(getFileType(fileType))
        //   let nameStr =
        //     this.proTitle.protitle +
        //     "-" +
        //     (this.proTitle.orgName === null ? "" : this.proTitle.orgName + "-") +
        //     getStorage("userInfo").name +
        //     "-" +
        //     getNewDataTime() +
        //     "." +
        //   fileType;
        //   imgList[i].name = nameStr;
        //   imgList[i].type = getFileType(fileType);
        //   imgList[i].url = imgList[i].response.data[0].url;
        //   imgList[i].size = imgList[i].response.data[0].size;
        //   getFileType(fileType)==='mv'? imgList[i].content =imgList[i].response.data[0].content:'';
        // }
        // this.ruleForm.imgList = imgList;
        // this.resourceList = [...imgList];
        // this.resourceList.push(...imgList)
      },

      handText() {
        this.$refs.handTextRef.focus();
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$refs.upload.submit();
            // console.log(this.ruleForm)

            // console.log(this.ruleForm.desc)
            // console.log(this.ruleForm.imgList)
            //  console.log(this.resourceList)
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

              // console.log(this.resourceList);
              let resourceList = [];
              let num = 0;
              if (this.ruleForm.desc) {
                // console.log(this.ruleForm.desc)
                uploadInfo["resourceList[" + 0 + "].type"] = "text";
                uploadInfo[
                  "resourceList[" + 0 + "].content"
                ] = this.ruleForm.desc;
                num = 1;
              }
              //  console.log(num)
              for (let i = 0; i < this.resourceList.length; i++) {
                resourceList.push({});
                resourceList[i].url = this.resourceList[i].url;
                resourceList[i].type = this.resourceList[i].type;
                resourceList[i].name = this.resourceList[i].name;
                resourceList[i].size = this.resourceList[i].size;
                this.resourceList[i].content?resourceList[i].content = this.resourceList[i].content:''
                
              }
              // console.log(resourceList)
              for (let i = 0; i < this.resourceList.length; i++) {
                for (let key in resourceList[i]) {
                  uploadInfo["resourceList[" + (i + num) + "]." + key] =
                    resourceList[i][key];
                }
              }

              console.log(uploadInfo);

              // getPostInfo("yq_api/projectDiary/add", uploadInfo).then(res => {
              //   console.log(res);
              // });

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
    },
    watch: {
      fileList() {
        this.fileList.length ? (this.showImg = true) : (this.showImg = false);
        console.log(this.ruleForm.imgList.length);
      }
    }
  };
</script>

<style>
</style>