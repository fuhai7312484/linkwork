<template>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <div class="editDiaryBox">
        <div class="editDiaryTop">
            编辑日志




        </div>



        <div class="editDiaryContent">


            <div class="editDiaryShow">
                <div class="editDiaryType iconfont">
                    &#xe615;
                </div>
    <el-input type="textarea" v-model="ruleForm.desc" :autosize="{ minRows: 5, maxRows: 20}" placeholder="文字区域" class="editTxt" ref="handTextRef"></el-input>
            
            </div>


              <div class="editDiaryShow" v-if="showImg">
                <div class="editDiaryType maxFont iconfont">
                  &#xe6a5;
                </div>

                             

                            <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture"
                            :on-remove="handleRemove"
                            :on-preview="handlePictureCardPreview"
                              :before-upload="handleBeforeUpload"
                              multiple
                                :haeders="upHeaders"
                            :file-list="fileList">
                        </el-upload>

                        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>

               <!-- <ul>
                   <li v-for="(itme,index) in fileList" :key="index">
                       <img :src="itme.url" :style="{width:'100px'}" />
                       {{itme.name}}
这里是图片

                   </li>

               </ul> -->
            </div>




              <div class="editDiaryShow">
                <div class="editDiaryType maxFont iconfont">
                 &#xe604;
                </div>
               <ul>
                   <li>
这里是视频

                   </li>

               </ul>
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


   <div class="editDiaryShow">
                <div class="editDiaryType maxFont iconfont">
               &#xe732;
                </div>
               <ul>
                   <li>
这里是附件

                   </li>

               </ul>
            </div>



        </div>






        <ul class="editDiaryBtns">
            <li @click="handText">
                <div class="iconfont">&#xe615;</div>
                文本
            </li>
            <li>
               <el-upload
                class="upload-demo"
                action="http://39.107.254.60:8081/yq_api/projectDiary/add"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                    :before-upload="handleBeforeUpload"
                    accept="image/jpeg,image/gif,image/png,image/bmp,video/mp4"
                :file-list="fileList"
                :haeders="upHeaders"
                multiple
                :show-file-list="false"
                list-type="picture">
  <!-- <el-button class="iconfont" size="small" type="primary" ref="imgUpload">&#xe601;</el-button> -->

  <div class="iconfont" size="small" type="primary">&#xe601;</div>
 
</el-upload>
                <!-- <div class="iconfont"  @click="handImgUploadChange" >&#xe601;</div> -->
                图片
            </li>

            <li>
                <div class="iconfont fontlarge">&#xe624;</div>
                视频
            </li>
            <li>
                <div class="iconfont fontlarge">&#xe633;</div>
                位置
            </li>
            <li>
                <div class="iconfont fontlarge">&#xe732;</div>
                附件
            </li>


        </ul>



    </div>
    </el-form>
</template>
<script>
export default {
  name: "EditDiary",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      showImg:false,
      upHeaders:{'Conten-Type':'multipart/form-data; boundary=fuckReaquestHeader'},
      ruleForm: {
        desc:""
      },
      rules: {}
    };
  },

  methods: {
      handImgUploadChange(ev){
        //   console.log(ev.target)
        //  this.$refs.imgUpload.getFile()
          console.log( this.$refs)
            // this.$refs.imgUpload.submit();
      },

    submitUpload() {
      this.$refs.upload.submit();
    },

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      handleBeforeUpload(file){
          console.log(file.type,file.size)
      console.log('before')
      if(!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg'  || file.type === 'video/mp4')) {
        this.$notify.warning({
          title: '警告',
          message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
        })
      }
      let size = file.size / 1024 / 1024 / 2
      if(size > 2) {
        this.$notify.warning({
          title: '警告',
          message: '图片大小必须小于2M'
        })
      }
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {

    },




    handleRemove(file, fileList) {
        this.fileList = fileList
        // console.log(this.fileList)
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(res, file, fileList) {
        console.log(this.fileList,fileList)
        this.showImg = true;
        this.fileList = fileList
      console.log(this.fileList.length)
    },

    handText() {
       this.$refs.handTextRef.focus()
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
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
  watch: {
      fileList(){
          this.fileList.length?this.showImg=true:this.showImg=false;
          console.log(this.fileList.length)
      }
  }
};
</script>

<style>
</style>