<template>
  <div>
    <div class="stepH1Title">
      <h1>项目信息填写</h1>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

      <el-form-item label="项目图片">
        <el-upload 
        ref="uploadimgs" action="http://39.107.254.60:8081/yq_api/image/upload" list-type="picture-card"
         accept="image/jpeg,image/gif,image/png,image/bmp,video/mp4"
          :limit="9" multiple :on-exceed="handLimitChange" :on-preview="handlePictureCardPreview" 
          :on-success="successUpload"
          :before-upload="handleBeforeUpload"
          :on-remove="handleRemove" :file-list="ruleForm.fileList">
          <i class="el-icon-plus"></i>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png/gif文件，且不超过2M
            <p>
              <span :style="{color:'red'}">注：</span>您最多可以添加9张图片</p>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>



      <!-- <el-form-item label="标题名称">
        <el-select v-model="ruleForm.TitleName" :multiple="false" filterable allow-create default-first-option placeholder="选择标题名称/或自己创建">
          <el-option v-for="item in TitleNameOpt" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        (选填)
      </el-form-item>
      <el-form-item label="节点提示">
        <el-select v-model="ruleForm.NodePrompt" :multiple="false" filterable allow-create default-first-option placeholder="选择节点提示/或自己创建">
          <el-option v-for="item in NodeOpt" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select> (选填)
      </el-form-item> -->



     

      <el-form-item label="项目简称" prop="SimpleName">
        <el-input v-model="ruleForm.SimpleName" @blur="SimpleBlur($event)"  placeholder="请输入项目简称(必填)"></el-input>
      </el-form-item>

       <el-form-item label="项目全称">
        <el-input v-model="ruleForm.FullName" @blur="FullBlur($event)" placeholder="请输入项目全称"></el-input>
      </el-form-item>

      <el-form-item label="当前人力">
        <el-input placeholder="当前人力" v-model="ruleForm.peopleNum" :disabled="true" style="width:100px;">
        </el-input>人

        

      </el-form-item>
      <div class="hr"></div>




      <el-form-item label="项目日期" required class="block" prop="StartData">
  
        <el-date-picker v-model="ruleForm.StartData" type="daterange" 
        align="left" unlink-panels range-separator="至" start-placeholder="起始日期"
          end-placeholder="结束日期" value-format="yyyy-MM-dd" :picker-options="pickerOptions2">
        </el-date-picker>
      </el-form-item>
      <div class="hr"></div>


      <div class="proScaleBox">
        <span class="proScaleTitle fl">
          <el-popover placement="top-start" trigger="manual" :content="ruleForm.scaleTitle" v-model="scaleVisible">
            <!-- <el-button slot="reference" @click="visible = !visible">手动激活</el-button> -->
            <el-input slot="reference"
             placeholder="请输入内容" 
             suffix-icon="el-icon-edit el-input__icon" 
             :style="{border:'0px',width:'110px'}"
              @focus="scaleFocus($event)" @blur="scaleBlur($event)" 
              v-model="ruleForm.scaleTitle">
            </el-input>
          </el-popover>
        </span>


        <div class="proScaleInput fl">
          <el-input v-model="ruleForm.scaleContent" placeholder="请输入内容"></el-input>

        </div>

      </div>



      <div class="proScaleBox">
        <span class="proScaleTitle fl">
          <el-popover placement="top-start" trigger="manual" :content="ruleForm.costTitle" v-model="costVisible">

            <el-input slot="reference" placeholder="请输入内容" suffix-icon="el-icon-edit el-input__icon" :style="{border:'0px',width:'110px'}"
              @focus="costFocus($event)" @blur="costBlur($event)" v-model="ruleForm.costTitle">
            </el-input>

          </el-popover>

        </span>
        <div class="proScaleInput fl">
          <el-input v-model="ruleForm.costContent" placeholder="请输入内容"></el-input>

        </div>

      </div>


      <div class="proScaleBox">
        <span class="proScaleTitle fl">

          <el-popover placement="top-start" trigger="manual" :content="ruleForm.addTitle" v-model="addVisible">
            <el-input slot="reference" placeholder="请输入内容" suffix-icon="el-icon-edit el-input__icon" :style="{border:'0px',width:'110px'}"
              @focus="addFocus($event)" @blur="addBlur($event)" v-model="ruleForm.addTitle">
            </el-input>
          </el-popover>
        </span>
        <div class="proScaleInput fl">
          <el-input v-model="ruleForm.addContent" placeholder="请输入内容"></el-input>

        </div>

      </div>


      <div class="hr"></div>

      <el-form-item label="项目描述">
        <el-input type="textarea" 
        :autosize="{ minRows: 6, maxRows: 8}" 
        placeholder="没有描述,怎么知道项目要做什么呢？" 
        v-model="ruleForm.porDesc"
        >
        </el-input>
      </el-form-item>

    </el-form>
    <div class="stepBtnStyle">
      <el-button @click="submitForm('ruleForm')" type="primary">
        编辑完成，继续编辑单位信息
      </el-button>
    </div>
   
  </div>
</template>
<script>
import { getTimestamp, getToTime,getPostInfo,getStorage } from "../../../assets/lib/myStorage.js";
import router from "../../../router";
import { mapState,mapMutations } from "vuex";
export default {
  name: "Step1",
  data() {
    return {
      TitleNameOpt: [
        {
          value: "事项",
          label: "事项"
        },
        {
          value: "课题",
          label: "课题"
        },
        {
          value: "培训",
          label: "培训"
        },
        {
          value: "规则",
          label: "规则"
        }
      ],
      NodeOpt: [
        {
          value: "立项",
          label: "立项"
        },
        {
          value: "规划设计",
          label: "规划设计"
        },
        {
          value: "采购",
          label: "采购"
        },
        {
          value: "施工",
          label: "施工"
        },
        {
          value: "运营管理",
          label: "运营管理"
        }
      ],

      dialogImageUrl: "",
      dialogVisible: false,
      scaleVisible: false,
      costVisible: false,
      addVisible: false,
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },

      ruleForm: {
        TitleName: "项目",
        NodePrompt: "其他",
        FullName: "",
        SimpleName: "",
        peopleNum: 1,
        scaleTitle: "项目规模",
        scaleContent: "",
        costTitle: "项目造价",
        costContent: "",
        addTitle: "项目地址",
        addContent: "",
        porDesc: "",
        StartData: [],
        fileList: [],

        
      },
      rules: {
        StartData: [
          { type: 'array', required: true, message: '请选择项目创建时间和结束时间', trigger: 'change' }
          ],
        SimpleName: [
          { required: true, message: "请输入项目简称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
   computed: {
    ...mapState({
      create1proId: state => state.create1proId
    })
  },
  methods: {
     ...mapMutations(["setcreate1proId"]),
    scaleFocus(ev) {
      ev.currentTarget.select();
      if (ev.target.value.length >= 6) this.scaleVisible = true;
    },
    scaleBlur(ev) {
      if (!ev.target.value) ev.target.value = "项目规模";
      this.scaleVisible = false;
    },
    costFocus(ev) {
      ev.currentTarget.select();
      if (ev.target.value.length >= 6) this.costVisible = true;
    },
    costBlur(ev) {
      if (!ev.target.value) ev.target.value = "项目造价";
      this.costVisible = false;
    },

    addFocus(ev) {
      ev.currentTarget.select();
      if (ev.target.value.length >= 6) this.addVisible = true;
    },
    addBlur(ev) {
      if (!ev.target.value) ev.target.value = "项目造价";
      this.addVisible = false;
    },
    SimpleBlur(ev) {
      this.ruleForm.FullName
        ? this.ruleForm.FullName
        : (this.ruleForm.FullName = this.ruleForm.SimpleName);
    },
    FullBlur(ev) {
      this.ruleForm.FullName
        ? this.ruleForm.FullName
        : (this.ruleForm.FullName = this.ruleForm.SimpleName);
    },
    open4(msg) {
      this.$message({
        message: msg,
        type: "error"
      });
    },
     open(msg) {
        this.$message({
          message: msg,
          type: 'success'
        });
        
      },
    handleRemove(file, fileList) {
      // 删除时在表单的某个字段里移除一个值
      // let tmp = this.ruleForm.fileList;
      // let url = file.response.result[0].url;
      // if (tmp.includes(url)) {
      //   tmp.splice(
      //     tmp.findIndex(item => {
      //       return item === url;
      //     }),
      //     1
      //   );
      // }
   
      this.ruleForm.fileList = fileList;

    },
    successUpload(res, file, fileList, $event) {
      // 上传成功在表单的某个字段里加一个值

      if (res.code === 200) {
        this.ruleForm.fileList = fileList;
      }
      // console.log(this.ruleForm.fileList)
    },
    handleBeforeUpload(file) {
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
    handLimitChange() {
      this.open4("上传图片数量不能超过9张");
    },

    
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
  
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.FullName
            ? this.ruleForm.FullName
            : (this.ruleForm.FullName = this.ruleForm.SimpleName);
          let imageStr ='';
          this.ruleForm.fileList.forEach(e => {
            if(e.response){
          imageStr += e.response.data[0].url+',' 
            }else{
               imageStr += e.url+','
            }
          });
          let uploadInfo ={
            userId:getStorage("userInfo").id,
            title:this.ruleForm.TitleName,//标题名称
            period:this.ruleForm.NodePrompt,//节点提示
             shortName:this.ruleForm.SimpleName,//项目简称
            totalName:this.ruleForm.FullName,//项目全称
            peopleNum:this.ruleForm.peopleNum*1,//当前人力
            beginTime:this.ruleForm.StartData[0],//项目开始日期
            endTime:this.ruleForm.StartData[1],//项目结束日期
            info:this.ruleForm.porDesc,//项目描述
            propertyOneName:this.ruleForm.scaleTitle,
            propertyOne:this.ruleForm.scaleContent,
            propertyTwoName:this.ruleForm.costTitle,
            propertyTwo:this.ruleForm.costContent,
            propertyThreeName:this.ruleForm.addTitle,
            propertyThree:this.ruleForm.addContent,
            url:imageStr,
          }
          console.log(uploadInfo)
          if(this.$route.query.projectId){
                  uploadInfo.projectId = this.$route.query.projectId
              getPostInfo("yq_api/project/edite", uploadInfo).then(res => {
              if(res.data.code===200){
                // console.log(uploadInfo)
           router.push({
            path: '/project/step_2',
            query: {
            projectId: this.$route.query.projectId,
            shortName:this.ruleForm.SimpleName,
                }
             })
                  this.$emit("next", 1);
              }
            })
          }else{
          getPostInfo("/yq_api/project/add", uploadInfo).then(res => {
              if(res.data.code===200){
                // console.log(res.data.data)
                // this.setcreate1proId({shortName:this.ruleForm.SimpleName,projectId:res.data.data,})
                router.push({
            path: '/project/step_2',
            query: {
            projectId: res.data.data,
            shortName:this.ruleForm.SimpleName,
                }
             })
                //  router.push("/project/step_2");
                  this.$emit("next", 1);
              }
            })


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

     isOpen() {
        const h = this.$createElement;
        this.$msgbox({
          title: '未完成创建项目',
          message: h('p', null, [
            h('div', { style: 'color:red' }, '该项目未创建完成，您是否想要继续创建完善项目？ '),
            h('div', { style: 'color:#409EFF;font-size:16px;' }, this.$route.query.shortName)
          ]),
           distinguishCancelAndClose: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '删除项目',
        }).then(action => {

            let imgList = {
                 userId:getStorage("userInfo").id,
                 projectId:this.$route.query.projectId,
                  projectUserId:' '
                }
                 getPostInfo("yq_api/projectResource/findImageList", imgList).then(res => {
                if(res.data.code === 200){
                  
                   res.data.data.url.split(',').forEach(e=>{
                     if(e){
                        let obj ={
                       url:e
                     }
                     this.ruleForm.fileList.push(obj)
                     }
                   })
                }   
                 })

          let objInfo={
            userId:getStorage("userInfo").id,
            projectId:this.$route.query.projectId,
          }
          // console.log(objInfo)
            getPostInfo("yq_api/project/detail", objInfo).then(res => {
              if(res.data.code ===200){
                let data = res.data.data
                this.ruleForm.TitleName = data.title;
                this.ruleForm.NodePrompt = data.period;
                this.ruleForm.SimpleName = data.shortName;
                this.ruleForm.FullName  = data.totalName;
                this.ruleForm.StartData = [data.beginTime,data.endTime];
                this.ruleForm.scaleTitle = data.propertyOneName;
               this.ruleForm.scaleContent = data.propertyOne;
               this.ruleForm.costTitle = data.propertyTwoName;
               this.ruleForm.costContent = data.propertyTwo;
              this.ruleForm.addTitle = data.propertyThreeName;
               this.ruleForm.addContent= data.propertyThree;
               this.ruleForm.porDesc = data.info;
               
              }
              
            })
        
        }).catch(action => {
            if(action === 'cancel'){
              
              let delObj = {
                 userId:getStorage("userInfo").id,
                 projectId:this.$route.query.projectId,
              }
              getPostInfo("yq_api/projectUserRef/delete", delObj).then(res => {
                if(res.data.code===200){
                  this.open('删除项目成功！！')
                    router.push("/project/prolist");
                }
                //  console.log(res)

              })

            }else{
             router.push("/project/prolist");
            }
           
          });
      },

  
  },

  watch: {
    ruleForm: {
      handler(newValue, oldValue) {
        newValue.scaleTitle.length >= 6
          ? (this.scaleVisible = true)
          : (this.scaleVisible = false);
        newValue.costTitle.length >= 6
          ? (this.costVisible = true)
          : (this.costVisible = false);
        newValue.addTitle.length >= 6
          ? (this.addVisible = true)
          : (this.addVisible = false);
      },
      deep: true
    }
  },
  mounted() {
    this.ruleForm.StartData = getTimestamp();
    this.$emit("next", 0);
    //  userId:getStorage("userInfo").id,
    if(this.$route.query.projectId){
      this.isOpen()
    }
    // console.log(this.$route.query.projectId,this.$route.query.shortName)
   
  }
};
</script>
<style>
.el-upload__tip {
  line-height: 20px;
}
</style>