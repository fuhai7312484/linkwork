<template>
  <div>
    <div class="stepH1Title">
      <h1>项目信息填写</h1>

    </div>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

      <el-form-item label="项目图片">
        <el-upload 
        ref="uploadimgs" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" accept="image/jpeg,image/gif,image/png,image/bmp,video/mp4"
          :limit="9" multiple :on-exceed="handLimitChange" :on-preview="handlePictureCardPreview" :on-success="successUpload"
          :on-remove="handleRemove" :file-list="ruleForm.fileList">
          <i class="el-icon-plus"></i>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png/gif文件，且不超过500kb
            <p>
              <span :style="{color:'red'}">注：</span>您最多可以添加9张图片</p>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>



      <el-form-item label="标题名称">
        <!-- <el-input v-model="ruleForm.name"></el-input> -->
        <el-select v-model="ruleForm.TitleName" :multiple="false" filterable allow-create default-first-option placeholder="选择标题名称/或自己创建">
          <el-option v-for="item in TitleNameOpt" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        (选填)
      </el-form-item>




      <el-form-item label="节点提示">
        <!-- <el-input v-model="ruleForm.name"></el-input> -->
        <el-select v-model="ruleForm.NodePrompt" :multiple="false" filterable allow-create default-first-option placeholder="选择节点提示/或自己创建">
          <el-option v-for="item in NodeOpt" :key="item.value" :label="item.label" :value="item.value">
          </el-option>

        </el-select> (选填)


      </el-form-item>



      <el-form-item label="项目全称">
        <el-input v-model="ruleForm.FullName" @blur="FullBlur($event)" placeholder="请输入项目全称"></el-input>
      </el-form-item>

      <el-form-item label="项目简称" prop="SimpleName">
        <el-input v-model="ruleForm.SimpleName" @blur="SimpleBlur($event)"  placeholder="请输入项目简称(必填)"></el-input>
      </el-form-item>

      <el-form-item label="当前人力">
        <el-input placeholder="当前人力" v-model="ruleForm.peopleNum" :disabled="true" style="width:100px;">
        </el-input>

        

      </el-form-item>
      <div class="hr"></div>
      <el-form-item label="项目日期" class="block">
        {{ruleForm.StartData}}
        <el-date-picker v-model="ruleForm.StartData" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="起始日期"
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
import { getTimestamp,getToTime} from "../../../assets/lib/myStorage.js";
import router from "../../../router";
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
        TitleName:'项目',
        NodePrompt: '其他',
        FullName: "",
        SimpleName: "",
        peopleNum: "1人",
        scaleTitle: "项目规模",
        scaleContent: "",
        costTitle: "项目造价",
        costContent: "",
        addTitle: "项目地址",
        addContent: "",
        porDesc: "",

        StartData: [],
        fileList: []
      },
      rules: {
        SimpleName: [
          { required: true, message: "请输入项目简称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
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
    SimpleBlur(ev){
      this.ruleForm.FullName?this.ruleForm.FullName: this.ruleForm.FullName=this.ruleForm.SimpleName
    },
FullBlur(ev){
this.ruleForm.FullName?this.ruleForm.FullName: this.ruleForm.FullName=this.ruleForm.SimpleName
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
      let upObj={
        name:file.name,
        url:file.url,
      }
      // console.log(file,file.name,file.url)
      this.ruleForm.fileList.push(upObj)
      // console.log(file)
      // this.ruleForm.fileList.push(file.response.result[0].url)
      // console.log(this.ruleForm.fileList)
    },
    handLimitChange() {
      this.open4("上传图片数量不能超过9张");
    },

    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      // console.log(file.url)
    },

    //  submitUpload() {
    //         // this.$refs.upload.submit();
    //         console.log(this.$refs.upload.submit())
    //       },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.$refs.uploadimgs.uploadFiles);
          //  let step1Obj = {

          //   }
          //   console.log(step1Obj)
          this.ruleForm.FullName?this.ruleForm.FullName:this.ruleForm.FullName = this.ruleForm.SimpleName
          console.log(this.ruleForm);

          // console.log(this.$refs)
          // let fileList = this.ruleForm.fileList;
          // console.log(this.ruleForm.fileList)
          // console.log(valid)
          //  this.$refs.upload.submit();
          // console.log(this.$refs.upload)
          // alert('您填写的内容是：' + this.ruleForm.name);

          router.push("/project/step_2");
          this.$emit("next", 1);
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
  }
};
</script>
<style>
.el-upload__tip {
  line-height: 20px;
}
</style>