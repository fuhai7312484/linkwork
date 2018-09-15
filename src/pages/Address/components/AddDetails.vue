<template>
    <div class="userDataDetil" :style="{height:sWHeight}">

        <div v-if="userData.isMySelf">
            <el-form :model="userData" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">

                <div class="proUserInfoBox">

                    <el-row :gutter="20">
                        <el-col :span="6" class="addDet_avatarBox">
                            <img :src="userData.mainPic" />

                        </el-col>
                        <el-col :span="18">
                            <h2 class="addDet_TitleName">
                                {{userData.userName}} <span v-if="userData.level==3" class="addDet_tag3">{{levelChange(userData.level)}}</span>
                                <span v-else-if="userData.level==1" class="addDet_tag1">{{levelChange(userData.level)}}</span>

                            </h2>
                            <div class="addDet_Title_Icon">
                                <span class="el-icon-tickets" title="日志">
                                </span>
                                <span class="iconfont" title="消息">&#xe779;</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>



                <el-row :gutter="20">
                    <el-col :span="7" class="addDet_textLeft">
                        <h3>
                            基本信息
                        </h3>

                    </el-col>
                    <el-col :span="17" class="addDet_textRigth">

                        <el-row :gutter="20" class="addDet_InputBox">
                            <el-col :span="16">
                                <el-form-item label="账号：">
                                    <el-input v-model="userData.account" :disabled="true" placeholder="请输入账号"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                             
                                <el-checkbox v-model="ruleForm.accountSecrecy">保密</el-checkbox>
                            </el-col>
                        </el-row>





                        <el-row :gutter="20" class="addDet_InputBox">
                            <el-col :span="16">
                                <el-form-item label="昵称：">
                                    <el-input v-model="userData.userName" placeholder="请输入昵称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="ruleForm.nameSecrecy">保密</el-checkbox>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" class="addDet_InputBox">
                            <el-col :span="16">
                                <el-form-item label="性别：">
                                    <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
                                    <el-radio v-model="ruleForm.sex" label="0">女</el-radio>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="ruleForm.sexSecrecy">保密</el-checkbox>
                            </el-col>
                        </el-row>


                        <el-row :gutter="20" class="addDet_InputBox">
                            <el-col :span="16">
                                <el-form-item label="联系方式：">
                                    <el-input v-model="userData.mobile" placeholder="请输入联系方式"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="ruleForm.mobileSecrecy">保密</el-checkbox>
                            </el-col>
                        </el-row>


                        <el-row :gutter="20" class="addDet_InputBox">
                            <el-col :span="16">
                                <el-form-item label="邮箱：" prop="email"  >
                                    <el-input v-model="userData.email" placeholder="请输入邮箱"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="ruleForm.emailSecrecy">保密</el-checkbox>
                            </el-col>
                        </el-row>


                        <el-row :gutter="20" class="addDet_InputBox">
                            <el-col :span="16">
                                <el-form-item label="职称：">
                                    <el-input v-model="userData.levelName" placeholder="请输入职称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                               
                            </el-col>
                        </el-row>


                    </el-col>
                </el-row>



                <el-row :gutter="20">

                    <el-col :span="7" class="addDet_textLeft">
                        <h3>
                            本项目中角色
                        </h3>
                    </el-col>



                    <el-col :span="17" class="addDet_textRigth">

                        <div class="addDet_textInfoBox">
                            <span>单位(团队或组织)：</span>
                            <span>{{userData.orgName}}</span>
                        </div>
                        <div class="addDet_textInfoBox">
                            <span>部门：</span>
                            <span>{{userData.departmentName}}</span>
                        </div>

                        <div class="addDet_textInfoBox">
                            <span>角色：</span>
                            <span>{{userData.levelName}}</span>
                        </div>
                    </el-col>

                </el-row>


                <el-row :gutter="20">
                    <el-col :span="2" class="addDet_textLeft">
                        <div class="grid-content"></div>

                    </el-col>
                    <el-col :span="16" class="addDet_textRigth">
                        <h3>
                            技能标签(爱好、擅长点、推销亮点)
                        </h3>
                    </el-col>
                    <el-col :span="6">

                        <el-checkbox v-model="ruleForm.topicSecrecy">保密</el-checkbox>
                    </el-col>

                </el-row>


                <el-row :gutter="20">
                    <el-col :span="7" class="addDet_textLeft">

                        <div class="grid-content"></div>

                    </el-col>


                    <el-col :span="17" class="addDet_textRigth">

                        <div class="secrecyBottem">
                            <el-tag :key="index" v-for="(tag,index) in userData.topicList" closable
                                :disable-transitions="false" @close="handleClose(tag.name)">
                                {{tag.name}}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput"
                                size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">
                                <i class="el-icon-plus"></i> 添加标签</el-button>
                        </div>


                    </el-col>

                </el-row>


                <el-row :gutter="20" >
                    <el-col :span="7" class="addDet_textLeft">
                        <h3>
                            工作地址
                        </h3>
                    </el-col>
                    <el-col :span="11">

 
  
                    </el-col>
                    <el-col :span="6">
                        <el-checkbox v-model="ruleForm.positionSecrecy">保密</el-checkbox>
                    </el-col>
                </el-row>
                 <el-row :gutter="20">
                      <el-col :span="7" class="addDet_textLeft">
                       <div class="grid-content"></div>
                    </el-col>
                     <el-col :span="17">

      
<editbaidu-map @baiduMapFromChild="baiduMapFromChild" :post="{lat:userData.positionBdLatitude,lng:userData.positionBdLongitude}"></editbaidu-map>


                     </el-col>


                 </el-row>


                <el-row :gutter="20">
                    <el-col :span="7" class="addDet_textLeft">
                        <h3>
                           个人说明
                        </h3>
                    </el-col>
                    <el-col :span="17">
                        <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 14}" placeholder="请输入个人说明" v-model="userData.content">
                   </el-input>
                    </el-col>
                </el-row>


                <!-- <el-row :gutter="20">
                <el-col :span="7" class="addDet_textLeft">
                    <h3>
                        工作地址
                    </h3>
                </el-col>
                <el-col :span="17" class="addDet_textRigth">
                    <div class="addDet_textInfoBox">
                        {{userData.positionDesc}}
                    </div>
                    <div class="showBaiduMap">
                        <showbaidu-map :coordinate="{lat:userData.positionBdLatitude,lon:userData.positionBdLongitude}"></showbaidu-map>
                    </div>
                </el-col>
            </el-row> -->








            </el-form>









            <div class="stepBtnStyle">
                <el-button tag="el-button" @click="submitForm('ruleForm')" type="primary">
                    个人信息编辑完成
                </el-button>
            </div>





            <div class="clear"></div>





        </div>



        <div v-else>



            <div class="proUserInfoBox">
                <el-row :gutter="20">
                    <el-col :span="6" class="addDet_avatarBox">
                        <img :src="userData.mainPic" />

                    </el-col>
                    <el-col :span="18">
                        <h2 class="addDet_TitleName">
                            {{userData.userName}} <span v-if="userData.level==3" class="addDet_tag3">{{levelChange(userData.level)}}</span>
                            <span v-else-if="userData.level==1" class="addDet_tag1">{{levelChange(userData.level)}}</span>

                        </h2>
                        <div class="addDet_Title_Icon">
                            <span class="el-icon-tickets" title="日志">
                            </span>
                            <span class="iconfont" title="消息">&#xe779;</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
<!-- orgId:{{userData.orgId}} -->
            <el-row :gutter="20">
                <el-col :span="7" class="addDet_textLeft">
                    <h3>
                        基本信息
                    </h3>

                </el-col>
                <el-col :span="17" class="addDet_textRigth">
                    <div class="addDet_textInfoBox">
                        <span>账号：</span>
                        <span>{{userData.account}}</span>
                    </div>


                    <div class="addDet_textInfoBox">
                        <span>昵称：</span>
                        <span>{{userData.userName}}</span>
                    </div>

                    <div class="addDet_textInfoBox">
                        <span>性别：</span>
                        <span>{{userData.sex==1?'男':'女'}}</span>
                    </div>

                    <div class="addDet_textInfoBox">
                        <span>联系方式：</span>
                        <span>{{userData.mobile}}</span>
                    </div>

                    <div class="addDet_textInfoBox">
                        <span>邮箱：</span>
                        <span>{{userData.email}}</span>
                    </div>

                    <div class="addDet_textInfoBox">
                        <span>职称：</span>
                        <span>{{userData.levelName}}</span>
                    </div>

                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="7" class="addDet_textLeft">
                    <h3>
                        本项目中角色
                    </h3>
                </el-col>

                <el-col :span="17" class="addDet_textRigth">

                    <div class="addDet_textInfoBox">
                        <span>单位(团队或组织)：</span>
                        <span>{{userData.orgName}}</span>
                    </div>
                    <div class="addDet_textInfoBox">
                        <span>部门：</span>
                        <span>{{userData.departmentName}}</span>
                    </div>

                    <div class="addDet_textInfoBox">
                        <span>Ta的角色：</span>
                        <span>{{userData.levelName}}</span>
                    </div>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="2" class="addDet_textLeft">
                    <div class="grid-content"></div>

                </el-col>
                <el-col :span="22" class="addDet_textRigth">
                    <h3>
                         技能标签(爱好、擅长点、推销亮点)
                    </h3>
                </el-col>

            </el-row>

            <el-row :gutter="20">
                <el-col :span="7" class="addDet_textLeft">

                    <div class="grid-content"></div>

                </el-col>


                <el-col :span="17" class="addDet_textRigth">
                    <div>
                       
                        <span v-for="(topItme,index) in userData.topicList" :key="index" class="addDet_TagsList">
                            {{topItme.name}}
                        </span><br />

                    </div>
                </el-col>

            </el-row>
            <el-row :gutter="20">
                <el-col :span="7" class="addDet_textLeft">
                    <h3>
                        工作地址
                    </h3>
                </el-col>
                <el-col :span="17" class="addDet_textRigth">
                    <div class="addDet_textInfoBox">
                        {{userData.positionDesc}}
                    </div>
                    <div class="showBaiduMap">
                        
                        <showbaidu-map :coordinate="{lat:userData.positionBdLatitude,lng:userData.positionBdLongitude}"></showbaidu-map>
                  
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="7" class="addDet_textLeft">
                    <h3>
                        个人说明
                    </h3>
                </el-col>
                <el-col :span="17" class="addDet_textRigth">
                    <div class="addDet_textInfoBox">
                        {{userData.content==null?'当前用户还没有任何个人说明':userData.content}}
                    </div>
                </el-col>
            </el-row>
            <div class="clear"></div>



        </div>


    </div>
</template>
//
<script>
    import {getPostInfo} from "../../../assets/lib/myStorage.js";
    import { mapState } from "vuex";
    import ShowbaiduMap from "../../../components/ShowbaiduMap.vue";
        import EditbaiduMap from "../../../components/EditbaiduMap.vue";
    export default {
        name: "AddDetails",
        props: ["userData"],
        data() {
            return {
                inputVisible: false,
                inputValue: "",
                ruleForm: {
                    sex:'1',
                    mobileSecrecy:false,
                 accountSecrecy:false,
                 sexSecrecy:false,
                 emailSecrecy:false,
                 topicSecrecy:false,
                 positionSecrecy:false,
                 nameSecrecy:false,
                },
                rules: {
                    email: [
                        { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur"] }
                    ],
                    mobile: [
                        {
                            required: true,
                            message: "请输入正确格式的联系方式",
                            trigger: "blur"
                        },
                        {
                            min: 0,
                            max: 11,
                            message: "联系方式为11位的手机号",
                            trigger: "blur"
                        }
                    ]
                }
            };
        },
        computed: {
            ...mapState(["sWHeight"]),

         
        },
        components: {
            ShowbaiduMap,
              EditbaiduMap
        },
        methods: {
                baiduMapFromChild(data) {
                    this.userData.positionDesc =data.name;
                    this.userData.positionBdLatitude = data.lat+'';
                    this.userData.positionBdLongitude = data.lng+'';
                 
            },
            mapSearchFocus(ev) {
                ev.currentTarget.select();
                if (ev.target.value.length >= 6) this.scaleVisible = true;
            },
            //添加或者删除标签
            handleClose(tag) {
                this.userData.topicList.splice(
                    this.userData.topicList.indexOf(tag),
                    1
                );
            },
            showInput() {
             
                if (this.userData.topicList.length >= 9) {
                    this.open4("技能标签最多只可填写9个");
                } else {
                 
                    this.inputVisible = true;
                    this.$nextTick(_ => {
                        this.$refs.saveTagInput.$refs.input.focus();
                    });
                }
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    if (inputValue.length >= 10) {
                        this.open4("技能标签最多10字符");
                    } else {
                        this.userData.topicList.push({ name: inputValue });
                    }
                }
                this.inputVisible = false;
                this.inputValue = "";
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                   
                      
                       let EditInfoObj={
                           id:this.userData.id,
                           userId:this.userData.userId,
                           projectId:this.userData.projectId,
                           userName:this.userData.userName,
                           mainPic:this.userData.mainPic,
                           sex:this.ruleForm.sex,
                           mobileSecrecy:this.ruleForm.mobileSecrecy?'Y':'N',
                           accountSecrecy:this.ruleForm.accountSecrecy?'Y':'N',
                           nameSecrecy:this.ruleForm.nameSecrecy?'Y':'N',
                           sexSecrecy:this.ruleForm.sexSecrecy?'Y':'N',
                           mobile:this.userData.mobile,
                           email:this.userData.email,
                           emailSecrecy:this.ruleForm.emailSecrecy?'Y':'N',
                           levelName:this.userData.levelName,
                           topicSecrecy:this.ruleForm.topicSecrecy?'Y':'N',
                           positionDesc:this.userData.positionDesc,
                           positionBdLatitude:this.userData.positionBdLatitude,
                           positionBdLongitude:this.userData.positionBdLongitude,
                           positionSecrecy:this.ruleForm.positionSecrecy?'Y':'N',
                           content:this.userData.content,

                       }
                         let topic =[];
                        for (let i = 0; i < this.userData.topicList.length; i++) {
                            topic.push({});
                            topic[i].name = this.userData.topicList[i].name;
                           
                        }
                        for (let i = 0; i < this.userData.topicList.length; i++) {
                            for (let key in topic[i]) {
                            EditInfoObj["topic[" + i + "]." + key] = topic[i][key];
                            }
                        }
                          getPostInfo("yq_api/projectUserRef/editeProjectPeople", EditInfoObj).then(res => {
                             if(res.data.code ===200)
                             if(res.data.data){
                                 this.open2('个人信息更新成功')
                                 let _that = this;
                                 setTimeout(function () {
                                    _that.$router.go(0)
                                   },500)
                               
                             }
                          })
                    }
                });
            },
            levelChange(level) {
                switch (level) {
                    case 3:
                        return "负责人";
                        break;
                    case 1:
                        return "代表人";
                        break;
                }
               
            },
            isSecret(info){
                switch(info){
                    case 'Y':
                    return true;
                    break;
                     case 'N':
                    return false;
                    break;

                }
            },
                open2(msg) {
                  this.$message({
                message: msg,
                type: 'success'
                });
            },        
        },
        watch: {
              userData:{
                  handler(n,o){
                    
                     this.ruleForm.mobileSecrecy = this.isSecret(n.mobileSecrecy)
                      this.ruleForm.accountSecrecy = this.isSecret(n.accountSecrecy);
                    this.ruleForm.nameSecrecy = this.isSecret(n.nameSecrecy);
                   this.ruleForm.sexSecrecy = this.isSecret(n.sexSecrecy)
                    this.ruleForm.emailSecrecy = this.isSecret(n.emailSecrecy)
                    this.ruleForm.topicSecrecy =this.isSecret(n.topicSecrecy)
                     this.ruleForm.positionSecrecy =this.isSecret(n.positionSecrecy)
                     this.ruleForm.sex = this.userData.sex

                  },
                  deep:true,
              }
        },
        mounted() {
         
        }
    };
</script>
<style>
    .el-tag+.el-tag {
        margin-left: 10px;
    }

    .input-new-tag {
        width: 100px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>