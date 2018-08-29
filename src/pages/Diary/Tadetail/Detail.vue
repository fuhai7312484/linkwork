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

                                    <span class="addTitleBox fl">
                                        {{detailList.title?detailList.title:'暂无标题'}}
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


                    <div class="editDiaryShow fontH15" v-if="TextListLength != 0">
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
                                        <img :src="video.content" @click="LargeImage(video.content)" />
                                    </div>
                                    <div class="imagesInfo">
                                        {{video.name}}
                                    </div>
                                </div>
                            </el-col>
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
                                        <img :src="fileTypeImgChange(acces.name)" />
                                    </div>
                                    <div class="annexTitle fl">
                                        {{acces.name}} {{acces.size}}
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>

                    </div>

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
                        <span>可见人：{{lookUserLength}}</span>
                        <span> | </span>
                        <span>
                            <i class="iconfont iconfont18">&#xe682; </i> {{detailList.lookCount?detailList.lookCount:'0'}}</span>
                        <span @click="LikeCountChange" class="LikediaryBtn">

                            <!-- :style="{coolor:isLike?'#000':'red'}" -->
                            <i class="iconfont" :style="{color:isLike?'#00':'red'}">&#xe603; </i> {{detailList.projectDiaryLikeCount?detailList.projectDiaryLikeCount:'0'}}</span>
                        <span>
                            <i class="iconfont">&#xe779;</i> {{detailList.projectDiaryCommentCount?detailList.projectDiaryCommentCount:'0'}}</span>
                    </div>

                </li>

                <li class="resourceList pad20">
                    <div class="detailTitle fl">评分</div>

                    <div class="InfoOperating fr">
                        <!-- {{scoreValue}} -->
                        <span class="demonstration fl">给他评分：</span>
                        <el-rate v-model="scoreValue" :colors="['#fe3131', '#fe3131', '#fe3131']" @change="ScoreChange" class="scoreStar fl"></el-rate>

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
                        <li v-for="(comment,index) in detailList.projectDiaryCommentList" :key="index">
                            <!-- {{comment}} -->
                            <div class="diary-pic fl">
                                <img :src="comment.commentFromUserUrl" />
                            </div>
                            <div class="diary-title-Box fl">
                                <div class="diary-username">
                                    {{comment.commentFromUserName}}
                                </div>
                                <div class="diary-title-input">
                                    <span class="addTitleBox fl">
                                        {{comment.content}}
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                            <el-input type="textarea" v-model="ruleForm.commentDesc" placeholder="给Ta的日志评论"></el-input>
                            <div class="commentDescBtn">
                                <el-button type="primary" size="small" @click="submitForm('ruleForm')">评论</el-button>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>



 <div class="allCrntent">
 <div class="allCrntentTitleBox pad20">
                    <div class="detailTitle fl">可见人</div>
                    <div class="fr">
                        添加可见人
                    </div>
                </div>

                 <div class="allCrntentText pad20">
                    <div class="noComment" v-if="CommentListLength==0">
                        暂无可见人
                    </div>
                    
<el-row :gutter="20">

  <el-col :span="8" v-for="(look,index) in detailList.lookUserList" :key="index">
      <!-- {{look}} -->
      {{look.orgName}}-{{look.departmentName}}-{{look.levelName}}-{{look.userName}}({{look.operationStatus==='look'?'已读':'未读'}})


  </el-col>

 
</el-row>


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
        transDate
    } from "../../../assets/lib/myStorage.js";
    import { mapState } from "vuex";
    export default {
        name: "TaDetail",
        data() {
            return {
                loading: true,
                detailList: {},

                dialogImageUrl: "",
                dialogVisible: false,
                scoreValue: null,
                isLike: true,
                ruleForm: {
                    commentDesc: ""
                },

                rules: {},

                TextListLength:0,
                imgLength: 0,
                videoLength: 0,
                acceLength: 0,
                locationLength: 0,
                lookUserLength: 0,
                CommentListLength: 0
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

            open3(msg) {
                this.$message({
                    message: msg,
                    type: "warning"
                });
            },

            open4(msg) {
                this.$message.error(msg);
            },

            changeTime(time) {
                return transDate(time);
            },

            fileTypeImgChange(fileName) {
                return setFileTyleImge(fileName);
            },
            LargeImage(imagesUrl) {
                this.dialogImageUrl = imagesUrl;
                this.dialogVisible = true;
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
            ScoreChange(ev) {
                if (this.detailList.isScore === 1) {
                    let obj = {
                        diaryId: this.$route.query.diaryId,
                        userId: getStorage("userInfo").id,
                        projectId: this.proTitle.proId,
                        score: ev + ""
                    };
                    getPostInfo("yq_api/projectDiary/projectDiaryScore", obj).then(res => {
                        if (res.data.code === 200) {
                            this.open2(res.data.msg);
                            // this.detailList = res.data.data==null?res.data.data=[]:res.data.data;
                        }
                    });
                } else if (this.detailList.isScore === 0) {
                    this.open3("当前不能参与评分！");
                }
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
            detailList: {
                handler(newValue, oldValue) {
                    this.TextListLength = newValue.resourceList.length;
                    this.imgLength = newValue.imageList.length;
                    this.videoLength = newValue.videoList.length;
                    this.acceLength = newValue.accessoryList.length;
                    this.locationLength = newValue.locationList.length;
                    this.lookUserLength = newValue.lookUserList.length;
                    this.CommentListLength = newValue.projectDiaryCommentList
                        ? newValue.projectDiaryCommentList.length
                        : 0;

                    console.log(newValue);
                },
                deep: true
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
                    this.detailList =
                        res.data.data == null ? (res.data.data = []) : res.data.data;
                    this.scoreValue = res.data.data.score ? res.data.data.score : 0;
                    this.isLike =
                        res.data.data.isDiaryLike === 0
                            ? (this.isLike = true)
                            : (this.isLike = false);
                }

                this.loading = false;
            });
        }
    };
</script>
<style>


</style>