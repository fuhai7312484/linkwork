<template>
  <div>
    <div class="stepH1Title">
     <h1>项目信息填写</h1>

    </div>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

      <el-form-item label="项目图片">
        <el-upload ref="uploada" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" accept="image/jpeg,image/gif,image/png,image/bmp,video/mp4"
          :limit="9" multiple :on-exceed="handLimitChange" :on-preview="handlePictureCardPreview" :on-success="successUpload"
          :on-remove="handleRemove" :file-list="fileList">
          <i class="el-icon-plus"></i>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png/gif文件，且不超过500kb
            <p>
              <span :style="{color:'red'}">注：</span>您最多可以添加9张图片</p>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

        <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->

        <!-- <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    :limit="9"
                    accept="image/jpeg,image/gif,image/png,image/bmp,video/mp4"
                     list-type="picture"
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>
                    <br/><span>注：</span>您最多可以添加9张图片
                    </div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload> -->
      </el-form-item>

      <el-form-item label="标题名称">


        <!-- <el-input v-model="ruleForm.name"></el-input> -->

        <el-select v-model="value10" :multiple="false" filterable allow-create default-first-option placeholder="选择标题名称/或自己创建">
          <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        (选填)
      </el-form-item>



      <el-form-item label="节点提示">


        <!-- <el-input v-model="ruleForm.name"></el-input> -->

        <el-select v-model="value11" :multiple="false" filterable allow-create default-first-option placeholder="选择节点提示/或自己创建">
          <el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value">
          </el-option>

        </el-select> (选填)


      </el-form-item>



      <el-form-item label="项目全称">
        <el-input v-model="ruleForm.name1" placeholder="请输入项目全称"></el-input>
      </el-form-item>

      <el-form-item label="项目简称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入项目简称(必填)"></el-input>
      </el-form-item>

      <el-form-item label="当前人力">
        <el-input placeholder="当前人力" v-model="input1" :disabled="true" style="width:100px;">
        </el-input>

      </el-form-item>
      <div class="hr"></div>
      <el-form-item label="项目日期" class="block">
        <!-- {{ruleForm.StartData}} -->
        <el-date-picker v-model="ruleForm.StartData" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="起始日期"
          end-placeholder="结束日期" value-format="timestamp" :picker-options="pickerOptions2">
        </el-date-picker>
      </el-form-item>
      <div class="hr"></div>


   <div class="proScaleBox">

    

     <span class="proScaleTitle fl">
  <el-popover
    placement="top-start"
    trigger="manual"
    :content="input6"
    v-model="visible">
    <!-- <el-button slot="reference" @click="visible = !visible">手动激活</el-button> -->

     <el-input
      slot="reference"
    placeholder="请输入内容"
    suffix-icon="el-icon-edit el-input__icon"
    :style="{border:'0px'}"
    @focus="focus($event)"
    @blur="blur($event)"
    v-model="input6">
  </el-input>
  </el-popover>
  


     </span>
     <div class="proScaleInput fl">
 <el-input v-model="ruleForm.name2" placeholder="请输入内容"></el-input>

     </div>

   </div>
   


     <div class="proScaleBox">
     <span class="proScaleTitle fl">

 <el-input
    placeholder="请输入内容"
    suffix-icon="el-icon-edit el-input__icon"
    @focus="focus($event)"
    v-model="input7">
  </el-input>

     </span>
     <div class="proScaleInput fl">
 <el-input v-model="ruleForm.name3" placeholder="请输入内容"></el-input>

     </div>

   </div>


     <div class="proScaleBox">
     <span class="proScaleTitle fl">

 <el-input
    placeholder="请输入内容"
    suffix-icon="el-icon-edit el-input__icon"
    @focus="focus($event)"
    v-model="input8">
  </el-input>

     </span>
     <div class="proScaleInput fl">
 <el-input v-model="ruleForm.name4" placeholder="请输入内容"></el-input>

     </div>

   </div>


 <div class="hr"></div>

<el-form-item label="项目描述">
      <el-input type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}" 
      placeholder="没有描述,怎么知道项目要做什么呢？" v-model="textarea3">
      </el-input>
 </el-form-item>

    </el-form>
<div class="stepBtnStyle">
    <el-button @click="submitForm('ruleForm')"  type="primary">
      编辑完成，继续编辑单位信息
    </el-button>
</div>
  </div>
</template>
<script>
  import { getTimestamp } from "../../../assets/lib/myStorage.js";
  import router from "../../../router";
  export default {
    name: "Step1",
    data() {
      return {
        options5: [
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
        value10: [],

        options6: [
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
        value11: [],
        input1: "1人",
        textarea3: "",
        input6:'项目规模',
         input7:'项目造价',
          input8:'项目地址',

        dialogImageUrl: "",
        dialogVisible: false,
        visible:false,

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
        fileList: [],
        ruleForm: {
          name: "",
          name1: "",
          name2: "",
          name3: "",
          name4: "",
          StartData: [],
          fileList: []
        },
        rules: {
          name: [
            { required: true, message: "请输入项目简称", trigger: "blur" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          ]
        }
      };
    },
    methods: {
      focus(ev) {
ev.currentTarget.select();
if(ev.target.value.length>=6)this.visible = true;
// console.log(ev.target.value.length)


},
blur(ev){
  if(!ev.target.value)ev.target.value ='项目规模'
   this.visible = false;
   
  
  // console.log(ev.target.value)

},
      open4(msg) {
        this.$message({
          message: msg,
          type: "error"
        });
      },
      handleRemove(file, fileList) {
        // 删除时在表单的某个字段里移除一个值
        let tmp = this.ruleForm.fileList;
        let url = file.response.result[0].url;
        if (tmp.includes(url)) {
          tmp.splice(
            tmp.findIndex(item => {
              return item === url;
            }),
            1
          );
        }
      },
      successUpload(response, file, fileList, $event) {
        // 上传成功在表单的某个字段里加一个值
        // let upObj={
        //   name:file.name,
        //   url:file.url,
        // }
        // console.log(file,file.name,file.url)
        // this.ruleForm.fileList.push(upObj)
        // console.log(file)
        // this.ruleForm.fileList.push(file.response.result[0].url)
        // console.log(this.ruleForm.fileList)
      },
      handLimitChange() {
        this.open4("上传图片数量不能超过9张");
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      //  submitUpload() {
      //         // this.$refs.upload.submit();
      //         console.log(this.$refs.upload.submit())
      //       },

      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            console.log(this.$refs.uploada.uploadFiles);
            // console.log(this.$refs)

            // let fileList = this.ruleForm.fileList;
            // console.log(this.ruleForm.fileList)
            // console.log(valid)
            //  this.$refs.upload.submit();
            // console.log(this.$refs.upload)

            // alert('您填写的内容是：' + this.ruleForm.name);
            router.push('/project/step_2')
            this.$emit('next',1)
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
      input6(){
        this.input6.length >=6?this.visible = true: this.visible = false;
      }
    },
    mounted() {
      this.ruleForm.StartData = getTimestamp();
       this.$emit('next',0)
    }
  };
</script>
<style>
  .el-upload__tip {
    line-height: 20px;
  }
</style>