<template>
    <div class="content content_dairy" :style="{maxHeight:sWHeight}">
        <div v-loading="loading" element-loading-text="拼命加载中">
            <div class="myDiaryInfoCountBox" v-if="TaDiaryList.length != 0">

                <el-alert :title="TaDiaryList?'Ta共有'+TaDiaryList.length+'条日志,未读消息有'+ diaryCount+'条':'你的好友暂时还没有发布过日志'" type="success">
                </el-alert>

              

            </div>


            <div class="myDiaryInfoCountBox" v-else-if="TaDiaryList.length == 0">
                <div class="DiaryMsg">
                    您的好友当前没有发布任何日志！
                </div>

            </div>
            <ul class="diaryListUlBox">
                <li class="resourceList pad20" v-for="(itme,index) in TaDiaryList" :key="index">

                    <div class="diaryListTop">
                        <div class="diary-left-pic fl">
                            <div class="diary-pic fl">
                             
                               
                                <img :src="itme.mainPic" v-if="itme.lookORunlook==='look'" />
                                 <el-badge is-dot class="item" v-else>
                                    <img :src="itme.mainPic" />
                                </el-badge>
                               
                                <!-- <img :src="itme.mainPic"/> -->

                            </div>
                            <div class="diary-title-Box fl">
                                <div class="diary-username">
                                    
                                   {{itme.userName}} <span class="diary-usernameOrgName"> ({{itme.orgName}}{{itme.departmentName?'-'+itme.departmentName:''}})</span>

                                </div>
                                <div class="diary-title-input">

                                    <span class="addTitleBox fl">
                                        {{itme.title}}
                                    </span>

                                </div>

                            </div>


                        </div>
                        <div class="diary-right-icons fr">
                            <div class="diaryTime">
                                {{changeTime(itme.createTime)}}
                            </div>
                            <div class="diaryIcons">
                                <span class="iconfont" :style="{color:itme.resourceList.length?'#4c91e2':''}">&#xe615;</span>
                                <span class="iconfont" :style="{color:itme.imageList.length?'#4c91e2':''}">&#xe601; ({{itme.imageList.length}})</span>
                                <span class="iconfont font16" :style="{color:itme.videoList.length?'#4c91e2':''}">&#xe604; ({{itme.videoList.length}})</span>
                                <span class="iconfont font16" :style="{color:itme.locationList.length?'#4c91e2':''}">&#xe633; ({{itme.locationList.length}})</span>
                                <span class="iconfont font16" :style="{color:itme.accessoryList.length?'#4c91e2':''}">&#xe732;({{itme.accessoryList.length}})</span>
                            </div>
                        </div>

                    </div>
                    <router-link tag="div" class="TaDiaryDetail" :to=" {path:'/diary/TaDiary/'+(index+1),query: {diaryId:itme.diaryId}}">

                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>

                        <p class="diaryText" style="max-height:60px;" v-for="(contents,i) in itme.resourceList" :key="i">
                           <span v-html="Trim(contents.content)"></span>
                        </p>
                        <span v-show="lengthShow">

                            <!-- {{itme.imageList.length>3?itme.imageList.length=3:itme.imageList.length}} -->


                        </span>



                        <el-row :gutter="20" class="flexibleUlBox" v-if="itme.imageList.length">
                            <el-col class="resourceImgList" :span="8" v-for="(images,k) in itme.imageList" :key="k" v-if="k<3">
                                <div
                                    class="grid-content bg-purple">
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
                            <el-col class="resourceImgList" :span="8" v-for="(video,j) in itme.videoList" :key="j" v-if="j<3">
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


                        <el-row :gutter="12" class="annexListBox" v-else-if="itme.accessoryList.length">
                            <el-col :span="12" class="annexList" v-for="(acces,j) in itme.accessoryList" :key="j" v-if="j<3">
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


                        <div class="InfoOperating">
                            <span>可见人：{{itme.lookUserList.length}}</span>
                            <span> | </span>
                            <span><i class="iconfont iconfont18">&#xe682;</i> {{itme.lookCount?itme.lookCount:'0'}}</span>
                            <span><i class="iconfont">&#xe603;</i> {{itme.projectDiaryLikeCount?itme.projectDiaryLikeCount:'0'}}</span>
                            <span><i class="iconfont">&#xe779;</i> {{itme.projectDiaryCommentCount?itme.projectDiaryCommentCount:'0'}}</span>
                        </div>
                    </router-link>

                </li>

            </ul>

        </div>

        <div class="clear"></div>




    </div>
</template>
<script>
    import { getPostInfo, getStorage, getToTime, setFileTyleImge, transDate } from "../../../assets/lib/myStorage.js";
    import { mapState } from "vuex";
    import '../../../assets/images/PDF.png';
    export default {
        name: 'TaDiary',
        data() {
            return {
                loading: true,
                lengthShow: false,
                TaDiaryList: [],
                dialogImageUrl: "",
                dialogVisible: false,
                diaryCount: 0,
                imgList: [{ url: '初始需回填的图片url', status: 'finished' }],
            }
        },

        computed: {
            ...mapState(
                ['sWHeight', 'proTitle', 'userInfo']
            ),
        },
        methods: {
             Trim(str){
return str.replace(/\n|\r\n/g,"<br/>")
        },
            open2(msg) {
                this.$message({
                    message: msg,
                    type: 'success'
                });
            },
            changeTime(time) {
                return transDate(time)

            },

            fileTypeImgChange(fileName) {
                return setFileTyleImge(fileName)

            },


            LargeImage(imagesUrl) {
                this.dialogImageUrl = imagesUrl;
                this.dialogVisible = true;
            },

        },

        mounted() {





// 类型筛选
    let searchObj={
        page:'1',
        size:'999',
        userId:'2C9136AE655B671001655B8122330012',
        projectId:this.proTitle.proId,
        createTime:'2018-08',
        bigTime:'2018-11',
        // type:'mv',
        look:'look',
    }
    // console.log(searchObj)

       getPostInfo('yq_api/projectDiary/searchMyFriendsDariyList',searchObj)
            .then(res=>{
                if(res.data.code===200){
                    // console.log(res.data.data)
                    // this.myDiaryList = res.data.data;
                    // this.loading = false;
                
                }
               
            })












            

            this.loading = true;

            let obj = {
                page: '1',
                size: '999',
                userId: getStorage("userInfo").id,
                projectId: this.proTitle.proId,

            }
            getPostInfo('yq_api/projectDiary/searchMyFriendsDariyList', obj)
                .then(res => {

                    this.TaDiaryList = res.data.data == null ? res.data.data = [] : res.data.data;
                  
                    this.loading = false;
                })

            let Wobj = {
                projectId: this.proTitle.proId,
                status: '0',
                userId: getStorage("userInfo").id,
                mobile: getStorage("userInfo").mobile,
                operationStatus: 'unlook'
            }

            getPostInfo('yq_api/mail/findProjectUnreadMailCountAZ', Wobj)
                .then(res => {
                    this.diaryCount = res.data.data.diary
                    
                })


        },



    }
</script>
<style>
</style>