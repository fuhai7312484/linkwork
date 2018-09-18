<template>
    <div class="userDataDetil" :style="{height:sWHeight}">
<div class="clear"></div>


<!-- {{userData.orgIsMe}} -->
<div v-if="userData.orgIsMe">
  
<el-form :model="userData" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">

{{userData.departmentList}}

 <el-row :gutter="20">
 <el-col :span="7" class="addDet_textLeft">
<h3>
    单位信息
</h3>

 </el-col>
  <el-col :span="17" class="addDet_textRigth">

                  <el-row :gutter="20" class="addDet_InputBox">
                            <el-col :span="16">
                                <el-form-item label="单位简称：">
                                    <el-input v-model="userData.shortName" placeholder="请输入单位简称"></el-input>
                                </el-form-item>
                            </el-col>
                          
                        </el-row>


                        
                        <el-row :gutter="20" class="addDet_InputBox">
                            <el-col :span="16">
                                <el-form-item label="单位全称：">
                                    <el-input v-model="userData.orgName" placeholder="请输入单位全称"></el-input>
                                </el-form-item>
                            </el-col>
                           
                        </el-row>


                         <el-row :gutter="20" class="addDet_InputBox">
                            <el-col :span="16">
                                 <el-form-item label="单位在项目中的定位" class="speLabel">
                                    <el-select v-model="userData.typeName" :multiple="false" filterable allow-create default-first-option 
                                    placeholder="选择单位在项目中的定位/或自己创建">
                                    <div class="speLabelUlBox">
                                        <el-option v-for="(item,index) in UnitPositList" :key="index" :label="item.name" :value="item.name" class="speLabelLists" >
                                        </el-option>
                                    </div>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="单位在项目中的定位：">
                                    <el-input v-model="userData.orgName" placeholder="请输入单位在项目中的定位"></el-input>
                                </el-form-item>
                            </el-col>
                           
                        </el-row>


                         <el-row :gutter="20" class="addDet_InputBox">
                            <el-col :span="16">
                                <el-form-item label="昵称：">
                                    {{userData.createPersonName}}
                                    <!-- <el-input v-model="userData.orgName" placeholder="请输入单位全称"></el-input> -->
                                </el-form-item>
                            </el-col>
                           
                        </el-row>

                         <el-row :gutter="20" class="addDet_InputBox">
                            <el-col :span="16">
                                <el-form-item label="创建人账号：">
                                    {{userData.createPersonMobile}}
                                    <!-- <el-input v-model="userData.orgName" placeholder="请输入单位全称"></el-input> -->
                                </el-form-item>
                            </el-col>
                           
                        </el-row>

  </el-col>
 </el-row>


      <el-row :gutter="20">
                    <el-col :span="7" class="addDet_textLeft">
                        <h3>
                            部门信息
                        </h3>

                    </el-col>

                     <el-col :span="17" class="addDet_textRigth" style="text-align:right">

                         <el-row :gutter="20" class="addDet_InputBox">
                            <el-col :span="16">
                                    <div class="stepH1InfoRigth" @click="addDomain">
          <span class="iconfont addproIcon">&#xe659;</span>新增部门</div>
                            </el-col>
                           
                        </el-row>





                          <el-row :gutter="20" class="addDet_InputBox">
                            <el-col :span="16">


                        <el-form-item prop="department" label="标题属性">
                    <el-input v-model="ruleForm.department" placeholder="部门" :style="{width:'200px'}"></el-input>
                </el-form-item>
                            </el-col>
                           
                        </el-row>

                         <el-row :gutter="20" class="addDet_InputBox">
                            <el-col :span="16">


            

<el-form-item v-for="(domain, index) in userData.departmentList" 
            :label="'部门'" 
            :key="index" 
            v-if="!domain.del"
           >
        <el-input v-model="domain.departmentName" :style="{width:'150px'}"  ></el-input>

        <i class="el-icon-delete removeBtn" @click.prevent="removeDomain(domain)"></i>
    
      </el-form-item>
                            </el-col>
                           
                        </el-row>

                     </el-col>
                    
                    
                    </el-row>

   </el-form>


            <div class="stepBtnStyle">
                <el-button tag="el-button" @click="submitForm('ruleForm')" type="primary">
                    编辑完成
                </el-button>
            </div>



</div>
<div v-else>


 <el-row :gutter="20">
 <el-col :span="7" class="addDet_textLeft">
<h3>
    单位信息
</h3>

 </el-col>
  <el-col :span="17" class="addDet_textRigth">

        <div class="addDet_textInfoBox">
        <span>单位简称：</span>
        <span>{{userData.shortName}}</span>
        </div>
        <div class="addDet_textInfoBox">
        <span>单位全称：</span>
        <span>{{userData.orgName}}</span>
        </div>
         <div class="addDet_textInfoBox">
        <span>单位在项目中的定位：</span>
        <span>{{userData.typeName}}</span>
        </div>

        <div class="addDet_textInfoBox">
        <span>昵称：</span>
        <span>{{userData.createPersonName}}</span>
        </div>
        <div class="addDet_textInfoBox">
        <span>创建人账号：</span>
        <span>{{userData.createPersonMobile}}</span>
        </div>

  </el-col>
 </el-row>

 
 <el-row :gutter="20">
 <el-col :span="7" class="addDet_textLeft">
<h3>
    部门信息
</h3>

 </el-col>
  <el-col :span="17" class="addDet_textRigth">
        <div v-for="(itme,index) in userData.departmentList" :key="index" class="addDet_textInfoBox">
        <span>部门：</span> <span>{{itme.departmentName}} ({{itme.purList.length}}人)</span>
        </div>
  </el-col>
 </el-row>
</div>



<div class="clear"></div>
    </div>
</template>
// <script>
import { getPostInfo, character,getStorage } from "../../../assets/lib/myStorage.js";
import { mapState } from "vuex";
import ShowbaiduMap from "../../../components/ShowbaiduMap.vue";
export default {
  name: "OrgDetails",
  props: ["userData"],
  data() {
    return {
          dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          email: ''
        },


      ruleForm: {
        department: "部门",
         domains: [{
            value: ''
          }],
          deleteDepart:[],
      },

      rules: {

      },
      UnitPositList: [],
      UnitPosit: ""
    };
  },
  computed: {
    ...mapState(["sWHeight","proTitle"])
  },
  components: {
    ShowbaiduMap
  },
  //   computed: {
  //       ...mapState(['AddressUid','proTitle'])

  // },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            console.log(this.userData)
              let obj={
             projectId:this.proTitle.proId,
             userId:getStorage("userInfo").id,
             orgId:this.userData.orgId,
             secrecy:'N',
             shortName:this.userData.shortName,
             orgName:this.userData.orgName,
             classifyName:this.userData.typeName,
             nickName:this.userData.createPersonName,
             title:this.ruleForm.department,
            }
          

          let departmentList = [];
          for (let i = 0; i < this.userData.departmentList.length; i++) {
            departmentList.push({});
            departmentList[i].orgId = this.userData.orgId;
            departmentList[i].departmentName = this.userData.departmentList[i].departmentName;
            departmentList[i].del = this.userData.departmentList[i].del;
            departmentList[i].operation = this.userData.departmentList[i].del?'delete':'add';
            //  departmentList[i].operation = 'delete';
            departmentList[i].createPerson = getStorage("userInfo").id;
         
          }
          console.log(this.ruleForm.deleteDepart.departmentList)


          for (let i = 0; i < departmentList.length; i++) {
            for (let key in departmentList[i]) {
              obj["departmentList[" + i + "]." + key] =
                departmentList[i][key];
            }
          }
          console.log(obj)


            //  getPostInfo("/yq_api/orgDepartment/editeOrg", obj).then(res => {
            //      if(res.data.code===200){
            //          console.log(res)
            //      }

            //  })
        

          
        }
      });
    },
    removeDomain(item) {
      var index = this.userData.departmentList.indexOf(item);
      if (index !== -1) {
        //   this.ruleForm.deleteDepart.push()
     
        this.ruleForm.deleteDepart.departmentList[index].del = true
        this.userData.departmentList.splice(index, 1);
      }
    },

    addDomain() {
      let charaName = character(this.userData.departmentList.length);
      this.userData.departmentList.push({
        departmentName: "部门" + charaName,
        key: Date.now(),
        charaName
      });
    //   this.ruleForm.deleteDepart.departmentList.push({
    //     departmentName: "部门" + charaName,
    //     key: Date.now(),
    //     charaName
    //   });
      console.log(this.ruleForm.deleteDepart)
    }
  },
  watch: {
      userData:{
          handler(n,o){
              console.log(n)
              this.ruleForm.deleteDepart = n;

          },
        //   deep:true,
      }
  },
  mounted() {
    //   this.ruleForm.deleteDepart = this.userData;
    // console.log(this.userData.departmentList)
    let classifyType = {
      type: "projectorg"
    };
    getPostInfo("yq_api/classify/type", classifyType).then(res => {
      if (res.data.code === 200) {
        this.UnitPositList = res.data.data;
      }
    });
  }
};
</script>
<style>
</style>

