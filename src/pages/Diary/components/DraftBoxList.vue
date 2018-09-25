<template>
    <div class="content content_dairy" :style="{maxHeight:sWHeight}">

        <div v-loading="loading" element-loading-text="拼命加载中">

            <div class="myDiaryInfoCountBox" v-if="DraftBoxList.length != 0">
                <el-alert :title="'您该项目的草稿箱中有'+DraftBoxList.length+'条!（草稿箱中仅可保存10条，超出部分逐条删除！）'" type="warning">
                </el-alert>
            </div>

            <div class="myDiaryInfoCountBox" v-else-if="DraftBoxList.length == 0">
                <div class="DiaryMsg">
                    当前没有储存的草稿！
                </div>
            </div>

            <ul class="diaryListUlBox">
                <li class="resourceList pad20" v-for="(itme,index) in DraftBoxList" :key="index">


                    <div class="diaryListTop">
                        <div class="diary-left-pic fl">
                            <div class="diary-pic fl">
                                <img :src="itme.mainPic" />
                            </div>
                            <div class="diary-title-Box fl">
                                <div class="diary-username">
                                    {{itme.orgName}}--{{itme.userName}}
                                </div>
                            </div>
                        </div>

                        <div class="diary-right-icons fr">
                            <div class="DarftDelet fl">

                                <el-popover placement="top" width="180" v-model="itme.visible">
                                    <p>草稿删除后将不可恢复</p>
                                    <br/>
                                    <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="text" @click="itme.visible = false">取消</el-button>
                                        <el-button type="primary" size="mini" @click="handDraftDel(itme.DraftBoxId)">确定</el-button>
                                    </div>
                                    <span slot="reference">

                                        <i class="el-icon-delete"></i>
                                        删除

                                    </span>
                                </el-popover>

                                <router-link tag='span' :to="{path:'/diary/EditDiary/DraftboxList/'+(index+1),query: {DraftBoxId:itme.DraftBoxId}}">
                                    <i class="el-icon-edit"></i>
                                    编辑
                                </router-link>

                            </div>
                            <div class="fr">
                                <div class="diaryTime">
                                    {{changeTime(itme.DraftBoxId)}}
                                </div>
                                <div class="diaryIcons">
                                    <span class="iconfont" :style="{color:itme.desc?'#4c91e2':''}">&#xe615;</span>
                                    <span class="iconfont" :style="{color:itme.imgList.length?'#4c91e2':''}">&#xe601;</span>
                                    <span class="iconfont font16" :style="{color:itme.videoList.length?'#4c91e2':''}">&#xe604;</span>
                                    <span class="iconfont font16" :style="{color:itme.locationList.length?'#4c91e2':''}">&#xe633;</span>
                                    <span class="iconfont font16" :style="{color:itme.annexList.length?'#4c91e2':''}">&#xe732;</span>
                                </div>

                            </div>
                        </div>
                    </div>

                    <router-link tag="div" class="TaDiaryDetail" :to=" {path:'/diary/EditDiary/DraftboxList/'+(index+1),query: {DraftBoxId:itme.DraftBoxId}}">

                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>


                        <p class="diaryText">
                            {{itme.desc}}
                        </p>

                        <span v-show="lengthShow">
                            {{itme.imgList.length>3?itme.imgList.length=3:itme.imgList.length}}
                        </span>

                        <el-row :gutter="20" class="flexibleUlBox" v-if="itme.imgList.length">
                            <el-col class="resourceImgList" :span="8" v-for="(images,k) in itme.imgList" :key="k">
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



                        <el-row :gutter="20" class="flexibleUlBox" v-else-if="itme.videoList.length">
                            <el-col class="resourceImgList" :span="8" v-for="(video,j) in itme.videoList" :key="j">
                                <div class="grid-content bg-purple">
                                    <div class="resourceImg">

                                        <div class="resourceImgvdieoMak">
                                            <i class="iconfont" @click="LargeImage(video.url)">&#xe605;</i>

                                        </div>

                                        <img :src="video.content" @click="LargeImage(video.url)" />
                                    </div>

                                    <div class="imagesInfo">
                                        {{video.name}}
                                    </div>
                                </div>
                            </el-col>
                        </el-row>



                        <el-row :gutter="12" class="annexListBox" v-else-if="itme.annexList.length">
                            <el-col :span="12" class="annexList" v-for="(acces,j) in itme.annexList" :key="j">
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



                        <el-row :gutter="12" class="annexListBox" v-else-if="itme.locationList.length">
                            <el-col :span="24" class="annexList" v-for="(locat,j) in itme.locationList" :key="j">
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



                    </router-link>



                </li>
            </ul>


        </div>

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
        transDate
    } from "../../../assets/lib/myStorage.js";
    import { mapState } from "vuex";
    export default {
        name: "DraftboxList",
        data() {
            return {
                loading: true,
                DraftBoxList: [],
                dialogImageUrl: "",
                dialogVisible: false,
                lengthShow: false
            };
        },
        computed: {
            ...mapState(["sWHeight", "proTitle", "userInfo"])
        },
        methods: {
            openMsg(msg) {
                this.$message({
                    type: "success",
                    message: msg
                });
            },
              fileTypeImgChange(fileName) {
                return setFileTyleImge(fileName);
            },

            changeTime(time) {
                return transDate(time);
            },
            LargeImage(imagesUrl) {
                this.dialogImageUrl = imagesUrl;
                this.dialogVisible = true;
            },

            handDraftDel(index) {
                let newArr = this.DraftBoxList.filter(e => {
                    return e.DraftBoxId != index;
                });
                this.DraftBoxList = newArr;
                let StorDraf = getStorage("DraftBox").filter(e => {
                    return e.DraftBoxId != index;
                });
                setStorage("DraftBox", StorDraf);
                this.openMsg("删除成功！");
            }
        },
        mounted() {
            if (getStorage("DraftBox")) {
                console.log(getStorage("DraftBox"))
                let arr = getStorage("DraftBox").filter(e => {
                    return (
                        e.projectId == this.proTitle.proId &&
                        e.userId == getStorage("userInfo").id
                    );
                });
                this.DraftBoxList = arr.sort(function (a, b) {
                    return b.DraftBoxId - a.DraftBoxId;
                });
            }
            this.loading = false;
        }
    };
</script>
<style>
</style>