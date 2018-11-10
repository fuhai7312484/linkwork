<template>
  <el-row>
    <g-header></g-header>
    <left-menu></left-menu>
    <div class="demo-split" :style="{height:sWHeight}">
      <Split v-model="split1" min="190px" max="700px">
        <div slot="left" class="demo-split-pane splitLeft" :style="{height:sWHeight}">
          <el-dialog title="发起群聊(单聊)" :visible.sync="FriendsVisible" width="30%" :before-close="handleClose">
            <friends-listname :FriendsVisible="FriendsVisible" @handleClose="handleClose" @handFriendArr="handFriendArr">
            </friends-listname>
          </el-dialog>
          <div @click="getAddOrFriend('init')" class="x-addChatBtn">
            <span class="el-icon-plus">
            </span>
            发起群聊(单聊)
          </div>
          <!-- <div @click="addChatWithChange" class="x-addChatBtn">
            <span class="el-icon-plus">
              </span>
               发起群聊(单聊)
          </div> -->
          <div class="x-message-msgList-box">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane name="first">
                <span slot="label"><i class="iconfont">&#xe60e;</i>消息
                  <el-badge v-if="MessageUnreadCount!=0" class="mark" :value="MessageUnreadCount" size="small" />
                  <!-- <el-badge class="mark" :value="1" /> -->
                </span>
                <div class="noXmessage" v-if="messageList.length==0">
                  暂无消息
                </div>
                <div class="x-message-msgList" v-for="(msgList,index) in messageList" :key="index" :class="{ messageTabs:changeRed == index}"
                  @click="msgListChange(index,msgList.from,msgList.title,msgList.type)" v-if="msgList.isShow">
                  <!-- <div @click="getCreateChatGroupUsersInfo(msgList.from)">查看群成员</div> -->
                  <i class="x-message-msgTime x-message-times">{{msgList.time}}</i>
                  <!-- <i class="x-message-msgTime x-message-operate" @click.stop @click="msgListOperate(msgList.from)">操作</i> -->
                  <el-dropdown trigger="click" class="x-message-msgTime x-message-operate">
                    <span class="el-dropdown-link" @click.stop>
                      操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="msgListOperate(msgList.from)">删除该聊天</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <div class="x-message-msgImg fl" v-if="msgList.type==='chat'">
                    <img :src="msgList.mainPic" />
                  </div>
                  <div class="x-message-groupImgs fl" v-else-if="msgList.type=='groupchat'">
                    <span v-for="(MemberImgs,index) in msgList.Memberlist" class="fl" :key="index" v-if="index<4"
                      :style="{width:computeMegsWidth(msgList.Memberlist.length),height:computeMegsWidth(msgList.Memberlist.length)}">
                      <img :src="MemberImgs.mainPic" />
                    </span>
                  </div>
                  <div class="x-message-msgInfo-box fl">
                    <div class="x-message-msgName">
                      {{msgList.title}}
                    </div>
                    <div class="x-message-msgInfo">
                      TA:{{msgList.sourceMsg}}
                      <el-badge class="mark" :value="msgList.count" v-if="msgList.count!=0" />
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane name="second"><span slot="label"><i class="iconfont">&#xe61c;</i> 好友</span>

                <!-- {{Fdata}} -->
                <div style="padding:0 10px;">
                  <el-input placeholder="搜索好友..." v-model="filterText">
                  </el-input>
                </div>
                <el-tree :data="data" :props="defaultProps" ref="tree2" accordion node-key="$treeNodeId"
                  :default-expanded-keys="[1]" :default-checked-keys="[5]" :expand-on-click-node="false" @node-click="handleNodeClick"
                  :filter-node-method="filterNode" class="AddressUserListBox">
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span class="custom-treeImgBox" :style="titleColor(data.pid)">
                      <i v-if="data.pid==1" class="GPid1Cl">
                        D{{data.serNum}}
                      </i>
                      <i v-else-if="data.pid==2" class="DPid2Cl">
                        B{{data.serNum}}
                      </i>
                      <!-- {{data.id}} -->
                      <span class="deleteUserMakbox">
                        <span v-if="data.status==='2'" class="deleteUserMak iconfont">
                          &#xe64b;
                        </span>
                        <span v-if="data.status==='1'" class="deleteUserMak"></span>
                        <img :src="data.mainPic?data.mainPic:require('../../assets/images/mainpic.jpg')" v-if="data.pid===3" />
                      </span> <span :class="data.status==='2'?'deleteColor':data.status==='1'?'deleteColor':''">{{
                        node.label }}</span>

                      <span v-if="data.level==1 || data.level==3" class="LeveTag" :style="{background:data.level==1?'#07a816':data.level==3?'#fd7100':'',}">{{levelChange(data.level)}}</span>
                      {{data.peopleNum?'('+data.peopleNum+')人':''}}
                    </span>
                    <el-button v-if="data.pid==3 && data.userId!=proTitle.userId" type="text" size="mini" @click="() => handleNodeClick">
                      <i class="iconfont messageIcon">&#xe60e;</i>
                    </el-button>
                  </span>
                </el-tree>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="clear" style=" background: #f5f5f8;"></div>
        </div>
        <div slot="right" class="demo-split-pane splitRinght" v-loading="loading" element-loading-text="拼命加载中">
          <div class="webim-chatwindow-title">
           <div class="webim-chatwindowText">{{to_name}}</div> 
            <div class="x-message-setting">
              <span :class="show3?'el-icon-arrow-up':'el-icon-arrow-down'" @click="show3 = !show3"></span>
              <el-collapse-transition>
                <div v-if="to_username" v-show="show3">
                  <div class="x-message-settingBox">
                    <ul class="x-message-users">
                      <li v-for="(usersItem,index) in groupUsers" :key="index" class="x-message-usersSpan">
                        <span class="x-message-usersOwner iconfont" v-if="usersItem.owner">&#xe61c;</span>
                        <el-popover v-if="deleShow && usersItem.status!=1 && !usersItem.owner" placement="top" width="160"
                          v-model="usersItem.succShow">
                          <p>确定删除群成员{{usersItem.userName}}吗？</p>
                          <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="usersItem.succShow = false">取消</el-button>
                            <el-button type="primary" size="mini" @click="deleteUserChange(index,usersItem.userId)">确定</el-button>
                          </div>
                          <span slot="reference" class="x-message-DelUsers">
                            <i class="el-icon-close"></i>
                          </span>
                        </el-popover>
                        <span class="deleStatus1" v-if="usersItem.status==1">
                          <i class="iconfont">&#xe64b;</i>
                        </span>
                        <img :src="usersItem.mainPic?usersItem.mainPic:require('../../assets/images/mainpic.jpg')" />
                        <div> {{usersItem.userName}}</div>
                      </li>
                      <li class="x-message-usersSpan" v-if="isOwner" @click="getAddOrFriend('add')">
                        <span class="x-message-addUser">
                          <i class="el-icon-plus"></i>
                        </span>
                        <div> 添加</div>
                      </li>
                      <li class="x-message-usersSpan" @click="deleShow = !deleShow" v-if="isOwner && to_username.length==14">
                        <span class="x-message-addUser">
                          <i class="el-icon-minus"></i>
                        </span>
                        <div> {{deleShow?'取消':'删除'}} </div>
                      </li>
                    </ul>
                    <div class="x-chatTitle">
                      <span class="x-chatTitle-em">单(群)聊名称：</span>
                      <div>
                        <el-input v-if="isOwner && to_username.length==14" style="max-width:60%;" v-model="editTo_name"
                          placeholder="请输入群名称">
                        </el-input>
                        <span v-else> {{to_name}} </span>
                        <i v-if="isOwner&& to_username.length==14" @click="EditGroupName" class="el-icon-edit elEditStyle"></i>
                      </div>
                    </div>
                    <div class="LordTransfer" v-if="isOwner && to_username.length==14">
                      <el-popover placement="right" width="400" v-model="visible2" trigger="click">
                        指定新群主：{{radio7}}
                        <ul>
                          <li class="LordTransferList" v-for="(itme,index) in groupUsers" :key="index">
                            <el-radio v-if="!itme.owner" :label="itme.userId" v-model="radio7">
                              <img :src="itme.mainPic" />
                              {{itme.userName}}
                            </el-radio>
                          </li>
                        </ul>
                        <div style="text-align: right; margin: 0">
                          <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                          <el-button type="primary" size="mini" @click="LordConversion">确定</el-button>
                        </div>
                        <!-- <span slot="reference"> 群主管理权转让</span> -->
                        <!-- <el-button slot="reference">click 激活</el-button> -->
                      </el-popover>


                    </div>
                    <el-button type="primary" @click="leaveGroup">
                      退出群聊
                    </el-button>
                  </div>
                </div>
              </el-collapse-transition>
            </div>
          </div>
          <div class="userDataDetil" :style="{height:sWHeight}">
            <div class="webim-chatwindow-msg" id="data-list-content" :style="{height:computeMessageHeight(sWHeight)}">
              <div v-for="(item,index) in chatHistory" :key="index" :class="item.from==from_username?' x-message-left':' x-message-right'">


                <div v-if="item.messageType=='ModifyingGroupName'" class="x-message-Tip">
                  <!-- <div><span>
                          {{item.time}}
                        </span></div> -->
                  <span>
                    ({{item.time}}) - {{item.sourceMsg}}
                  </span>
                </div>
                <div v-else-if="item.messageType=='TransferGroupOwner'" class="x-message-Tip">
                  <!-- <div><span>
                          {{item.time}}
                        </span></div> -->
                  <span>
                    ({{item.time}}) - {{item.sourceMsg}}
                  </span>
                </div>
                <div v-else-if="item.messageType=='inviteChatGroup'" class="x-message-Tip">
                  <!-- <div><span>
                          {{item.time}}
                        </span></div> -->
                  <span>
                    ({{item.time}}) - {{item.sourceMsg}}
                  </span>
                </div>
                <div v-else>
                  <div class="x-message-imgBox" :class="item.from==from_username?' x-message-left-img':' x-message-right-img'">
                    <img :src="item.mainPic" width="40px" height="40px;" />
                  </div>
                  <div class="x-message-TextBox" :class="item.from==from_username?' fl':' fr'">
                    <div class="x-message-nickBox">
                      <div :class="item.from==from_username?' fl':' fr'">{{item.nickName}}</div>
                      <div class="x-message-Time" :class="item.from==from_username?' fl':' fr'">
                        {{item.time}}
                      </div>
                    </div>
                    <div>
                      <span class="x-message-text" v-if="item.messageType=='typeText'" :class="item.from==from_username?' fl':' fr'"
                        v-html="handleMsg(item.sourceMsg)"></span>
                      <span class="x-message-text" v-else-if="item.messageType=='typeImg'" :class="item.from==from_username?' fl':' fr'">

                        <div class="x-message-StyleImg" @click="ImgVisible=!ImgVisible"> <img :src="item.messageBody.fileUrl" />
                        </div>
                        <el-dialog :visible.sync="ImgVisible" width="30%" class="VisibleImg" center>
                          <img :src="item.messageBody.fileUrl" />
                        </el-dialog>
                      </span>
                      <span class="x-message-text" v-else-if="item.messageType=='typeVoice'" :class="item.from==from_username?' fl':' fr'">
                        <!-- <video controls="" autoplay="" name="media"><source :src="item.messageBody.fileUrl" type="audio/mpeg"></video> -->
                        <p class="weixinAudio" @click="typeVoicePlay(item.messageBody.fileUrl,index,item.id)" :id="'media'+''+index"
                          :ref="'media'+''+index" data-play="false" :style="{width:item.messageBody.duration*50+'px'}">
                          <!-- {{item.messageBody.duration*10+'px'}} -->
                          <audio :data="index" @canplay="playing(item.id)" @ended="ended(index)" width="1" height="1"
                            type="audio/mpeg" class="mx-audio" preload>
                            <source :src="item.messageBody.fileUrl" type="audio/mpeg">
                          </audio>
                          <span id="audio_area" class="db audio_area">
                            <span class="audio_wrp db">
                              <span class="audio_play_area">
                                <i class="icon_audio_default"></i>
                                <i class="icon_audio_playing"></i>
                              </span>
                              <span id="audio_length" class="audio_length tips_global">{{item.messageBody.duration}}"</span>
                            </span>
                          </span>
                        </p>
                        <div class="VoiceUnread" v-if='item.unlook'>
                        </div>
                      </span>
                      <span class="x-message-text" v-else-if="item.messageType=='typeVideo'" :class="item.from==from_username?' fl':' fr'">
                        <div class="x-message-StyleImg"> <img :src="item.messageBody.thumbnail" /></div>
                        <el-dialog :visible.sync="videoVisible">
                          <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
                            :options="playerOptions" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)">
                          </video-player>
                        </el-dialog>
                        <div class="x-message-typeVideo" @click="Largevideo(item.messageBody.fileUrl)">
                          <div class="x-message-deg">
                          </div>
                        </div>
                      </span>
                      <span class="x-message-text" v-else-if="item.messageType=='typeFile'" :class="item.from==from_username?' fl':' fr'">
                        <div class='fl'>
                          <img :src="fileTypeImgChange(item.messageBody.fileName)" :style="{width:'50px',marginRight:'5px'}" />
                        </div>
                        <div class="fr">
                          {{item.messageBody.fileName}}<br />
                          ({{item.messageBody.fileSize}})
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="webim-send-wrapper">
              <div class="webim-chatwindow-options">
                <span @click="showEmoji = !showEmoji">
                  表情
                </span>
                <ul class="faces-ul" v-show="showEmoji">
                  <li v-for="(value,key) in emojiMap" :key="key" @click="clickFace(key)" class="webim-emoji-item">
                    <img :src="value" alt="emoj" />
                  </li>
                </ul>
                <!-- <span class="el-icon-picture">
                </span> -->
                <span class="el-icon-delete" @click="clearChat">
                </span>
              </div>
              <textarea rows="6" cols="20" placeholder="输入消息" id="inputcontent" @keyup.enter="sendTextMsg()" class="messageTextArea">
</textarea>
            </div>
          </div>
        </div>
      </Split>
    </div>
    <!-- <right-menu>
    </right-menu> -->
    <g-footer></g-footer>
  </el-row>
</template>
<script>
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import GHeader from "@/components/Header.vue";
import GFooter from "@/components/Footer.vue";
import FriendsListname from "@/components/FriendsListname.vue";
import { mapState, mapMutations } from "vuex";
import {
  getPostInfo,
  getStorage,
  setFileTyleImge
} from "../../assets/lib/myStorage.js";
import ee_1 from "../../assets/faces/ee_1.png";
import ee_2 from "../../assets/faces/ee_2.png";
import ee_3 from "../../assets/faces/ee_3.png";
import ee_4 from "../../assets/faces/ee_4.png";
import ee_5 from "../../assets/faces/ee_5.png";
import ee_6 from "../../assets/faces/ee_6.png";
import ee_7 from "../../assets/faces/ee_7.png";
import ee_8 from "../../assets/faces/ee_8.png";
import ee_9 from "../../assets/faces/ee_9.png";
import ee_10 from "../../assets/faces/ee_10.png";
// import ee_11 from '../../assets/faces/ee_11.png'
import ee_12 from "../../assets/faces/ee_12.png";
import ee_13 from "../../assets/faces/ee_13.png";
import ee_14 from "../../assets/faces/ee_14.png";
import ee_15 from "../../assets/faces/ee_15.png";
import ee_16 from "../../assets/faces/ee_16.png";
import ee_17 from "../../assets/faces/ee_17.png";
import ee_18 from "../../assets/faces/ee_18.png";
import ee_19 from "../../assets/faces/ee_19.png";
import ee_20 from "../../assets/faces/ee_20.png";
import ee_21 from "../../assets/faces/ee_21.png";
import ee_22 from "../../assets/faces/ee_22.png";
import ee_23 from "../../assets/faces/ee_23.png";
import ee_24 from "../../assets/faces/ee_24.png";
import ee_25 from "../../assets/faces/ee_25.png";
import ee_26 from "../../assets/faces/ee_26.png";
import ee_27 from "../../assets/faces/ee_27.png";
import ee_28 from "../../assets/faces/ee_28.png";
import ee_29 from "../../assets/faces/ee_29.png";
import ee_30 from "../../assets/faces/ee_30.png";
import ee_31 from "../../assets/faces/ee_31.png";
import ee_32 from "../../assets/faces/ee_32.png";
import ee_33 from "../../assets/faces/ee_33.png";
import ee_34 from "../../assets/faces/ee_34.png";
import ee_35 from "../../assets/faces/ee_35.png";
export default {
  name: "messageIndex",
  data() {
    return {
      data: [],
      addOrFriend: "init",
      defaultProps: {
        children: "children",
        label: "label",
        id: "id",
        mainPic: "mainPic",
        level: "level",
        projectId: "projectId",
        peopleNum: "peopleNum",
        serNum: "serNum",
        creator: "creator",
        orgIsMe: "orgIsMe",
        status: "status",
        departmentId: "departmentId"
      },
      // isMeOrgLeader: false,
      playerOptions: {
        //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "" //你的m3u8地址（必填）
          }
        ],
        poster: "poster.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        //        controlBar: {
        //          timeDivider: true,
        //          durationDisplay: true,
        //          remainingTimeDisplay: false,
        //          fullscreenToggle: true  //全屏按钮
        //        }
      },
      filterText: "",
      radio7: "",
      gid: "",
      isOwner: false,
      deleShow: false,
      visible2: false,
      groupUsers: [],
      changeRed: -1,
      FriendArr: [],
      FriendsVisible: false,
      show3: false,
      loading: false,
      activeName: "first",
      split1: 0.3,
      from_username: "", // url中的发起方用户名
      to_username: "", // url中的接收方用户名
      editTo_name: "",
      to_msgType: "",
      conn: {}, // 与环信的通信长连接
      chatHistory: [], // 聊天记录数组
      currentUserpwd: "123456", // 当前用户环信密码
      accence_token: "", // 权限token
      messageList: [],
      showMseList: {},
      ImgVisible: false,
      videoVisible: false,
      to_name: "",
      myOrgId: "",
      myOrgName: "",
      myProjectName: "",
      myUserName: "楠",
      GownerUserName: "",
      myUserPortraitUri:
        "http://39.107.254.60:801/project/2C9136AE655B671001655B75312F0008/userHead.png",
      emojiMap: {
        "[):]": ee_1,
        "[:D]": ee_2,
        "[;)]": ee_3,
        "[:-o]": ee_4,
        "[:p]": ee_5,
        "[(H)]": ee_6,
        "[:@]": ee_7,
        "[:s]": ee_8,
        "[:$]": ee_9,
        "[:(]": ee_10,
        // '[:\'(]': ee_11,
        "[:|]": ee_12,
        "[(a)]": ee_13,
        "[8o|]": ee_14,
        "[8-|]": ee_15,
        "[+o(]": ee_16,
        "[<o)]": ee_17,
        "[|-)]": ee_18,
        "[*-)]": ee_19,
        "[:-#]": ee_20,
        "[:-*]": ee_21,
        "[^o)]": ee_22,
        "[8-)]": ee_23,
        "[(|)]": ee_24,
        "[(u)]": ee_25,
        "[(S)]": ee_26,
        "[(*)]": ee_27,
        "[(#)]": ee_28,
        "[(R)]": ee_29,
        "[({)]": ee_30,
        "[(})]": ee_31,
        "[(k)]": ee_32,
        "[(F)]": ee_33,
        "[(W)]": ee_34,
        "[(D)]": ee_35
      },
      showEmoji: false, // 是否显示表情
      myNickName: "我", // 发送人昵称
      receiveNickName: "", //接收人昵称
      headimgurl: "" // 发送人头像
    };
  },
  components: {
    LeftMenu,
    RightMenu,
    GHeader,
    GFooter,
    FriendsListname
  },
  computed: {
    ...mapState(["sWHeight", "proTitle", "MessageUnreadCount"]),
    getMyNickName() {
      return this.myNickName;
    }
  },
  methods: {
    ...mapMutations(["getMessageUnreadCount"]),
    //群主转换
    LordConversion() {
      let oldOwner = this.groupUsers.filter(e => {
        return e.owner;
      })[0].userId;
      // console.log(oldOwner)
      // console.log(this.groupUsers,this.to_username,this.radio7)
      console.log(this.groupUsers);
      //设置成员为管理员
      //       var options = {
      //         groupId: '64658323079170',
      //         username: '2c9136ae65cb50170165cc4f5f350062',
      //         success: function(resp) {
      //           console.log('设置成功',resp)
      //         },
      //         error: function(e){}
      //     };
      //     console.log(options)
      // this.$imconn.setAdmin(options);

      // var options = {
      //         groupId: '64658323079170',
      //         success: function (resp) {
      //           console.log('查询成功',resp)
      //         },
      //         error: function(e){}
      //     };
      // this.$imconn.getGroupAdmin(options);

      var options = {
        groupId: "64658323079170",
        success: function(resp) {
          console.log("Response: ", resp);
        },
        error: function() {}
      };
      this.$imconn.getGroupInfo(options);

      //       var options = {
      //         groupId: "groupId",
      //         username: "user",
      //         success: function(resp) {},
      //         error: function (e) {}
      //      };
      // this.$imconn.removeAdmin(options);

      // this.visible2 = false;
      // console.log(this.radio7)
    },
    //删除一个聊天列表
    msgListOperate(from) {
      // console.log(from);

      var chatData = JSON.parse(localStorage.getItem("chatData"));
      if (chatData) {
        delete chatData.chatHistoryData[from];
      }

      localStorage.setItem("chatData", JSON.stringify(chatData));
      if (from == this.to_username) {
        this.initializeGetChatUser();
      }

      this.getMsgsList();
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.FriendsVisible = false;
          done();
        })
        .catch(_ => {});
    },
    //退出群组
    leaveGroup() {
      // console.log(this.to_username, this.proTitle.userId);
      let _that = this;
      var option = {
        to: _that.proTitle.userId,
        roomId: _that.to_username,
        success: function() {
          console.log("退出群组成功！");

          let obj = {
            userId: getStorage("userInfo").id,
            projectId: _that.proTitle.proId,
            groupId: _that.to_username,
            targetId: "",
            type: "removeMyself"
          };

          getPostInfo("yq_api/chat/contact/remvChatGroupPeople", obj).then(
            res => {
              if (res.data.code == 200) {
                _that.open2("成功退出群组！");
                _that.groupUsers[index].status = "1";
              }
            }
          );
        },
        error: function() {
          console.log("退出群组失败！");
        }
      };
      this.$imconn.leaveGroupBySelf(option);
    },
    msgListChange(index, toId, name, type) {
      console.log(toId);
      this.deleShow = false;
      this.show3 = false;
      this.changeRed = index;
      this.to_username = toId;
      this.to_msgType = type;
      this.to_name = name;
      this.editTo_name = name;
      var chatData = JSON.parse(localStorage.getItem("chatData"));
      if (chatData) {
        chatData.chatHistoryData[toId].count = 0;
        localStorage.setItem("chatData", JSON.stringify(chatData));
        this.getMessageUnreadCount();
      }
      this.getMsgsList();
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    computeMegsWidth(row) {
      switch (row) {
        case 3:
        case 4:
          return "17px";
          break;
        case 5:
        case 6:
          return "17px";
          break;
        case 9:
          // case 4:
          return "17px";
          break;
      }
      // console.log(row)
    },
    //计算信息框的高度
    computeMessageHeight(str) {
      return parseInt(str) - 320 + "px";
    },
    scrollToBottom() {
      this.$nextTick(() => {
        var div = document.getElementById("data-list-content");
        div.scrollTop = div.scrollHeight;
      });
    },
    loginEasemob() {
      this.$imoption.user = this.from_username;
      this.$imoption.pwd = this.currentUserpwd;
      //  this.$imoption.user ='2C9136AE655B671001655B75312F0008'
      // this.$imoption.pwd = '2C9136AE655B671001655B75312F0008'
      this.$imoption.success = res => {
        this.accence_token = res.access_token;
        this.myNickName = res.user.nickname;
        this.addListen();
      };
      this.$imconn.open(this.$imoption);
    },
    addListen() {
      this.$imconn.listen({
        onOpened: function(message) {
          console.log("用户已上线");
        },
        onClosed: function(message) {
          console.log("用户已下线");
        },
        onEmojiMessage: this.receiveEmojiMessage,
        onPictureMessage: this.receivePictureMessage,
        onOnline: function() {
          console.log("本机网络连接成功");
        }, //本机网络连接成功
        onOffline: function() {
          console.log("本机掉线");
        },
        onTextMessage: this.receiveTextMsg,
        onCreateGroup: function onCreateGroup(message) {
          // console.log(message)
        }
      });
    },

    // 获取url中的当前用户环信账号和聊天对象账号
    // getParamsFromUrl () {
    //   var urlhash = location.hash //获取url中"?"符后的字串
    //   var theRequest = {}
    //   if (urlhash.indexOf('?') != -1) {
    //     var index = urlhash.indexOf('?') + parseInt(1)
    //     var str = urlhash.substr(index)
    //     var strArr = str.split('&')
    //     for (var i = 0; i < strArr.length; i++) {
    //       let arr = strArr[i].split('=')
    //       theRequest[arr[0]] = arr[1]
    //     }
    //   }
    //   return theRequest
    // },
    //删除群成员
    deleteUserChange(index, id) {
      let _that = this;
      var option = {
        affiliation: "owner", // 写死
        roomId: _that.to_username, // 群组ID
        success: function() {
          // console.log('add to black list succeed');
        },
        to: id // 需要删除的成员ID
      };
      _that.$imconn.addToGroupBlackList(option);
      let obj = {
        userId: getStorage("userInfo").id,
        projectId: _that.proTitle.proId,
        groupId: _that.to_username,
        targetId: id,
        type: "removePeople"
      };
      getPostInfo("yq_api/chat/contact/remvChatGroupPeople", obj).then(res => {
        if (res.data.code == 200) {
          _that.open2("成员删除成功！");
          _that.groupUsers[index].status = "1";
        }
      });
    },
    //获取初始化消息列表
    initializeGetChatUser() {
      var chatData = JSON.parse(localStorage.getItem("chatData"));
      if (chatData) {
        let ChatDataList = chatData.chatHistoryData;
        let _that = this;
        // console.log(ChatDataList)
        for (var key in ChatDataList) {
          ChatDataList[key].msgs.forEach(e => {
            if (e.projectId == _that.proTitle.proId) {
              _that.to_username = key;
              _that.to_name = ChatDataList[key].title;
              _that.editTo_name = ChatDataList[key].title;
            }
          });
        }
      }
    },

    //获取当前群信息
    getChatGroupInfo() {
      let obj = {
        groupId: this.to_username,
        projectId: this.proTitle.proId,
        type: "1",
        userId: getStorage("userInfo").id
      };
      console.log(obj);
      getPostInfo("yq_api/chat/contact/findChatGroupInfo", obj).then(res => {
        console.log(res);
      });
    },
    //从localstroage获取聊天列表
    getMsgsList() {
      var chatData = JSON.parse(localStorage.getItem("chatData"));
      if (chatData) {
        let ChatDataList = chatData.chatHistoryData;
        let _that = this;
        let arr = [];

        //从localstroage获取聊天列表
        Object.keys(ChatDataList).forEach(function(key) {
          let MesArr = ChatDataList[key].msgs.filter(e => {
            return e.projectId == _that.proTitle.proId && e.from == key;
          });

          if (MesArr.length != 0) {
            let showListObj = {
              from: MesArr[0].from,
              sourceMsg: MesArr[MesArr.length - 1].sourceMsg,
              time: MesArr[MesArr.length - 1].time,
              nickName: MesArr[0].nickName,
              mainPic: MesArr[0].mainPic,
              count: ChatDataList[key].count,
              isShow: ChatDataList[key].isShow,
              type: ChatDataList[key].type,
              title: ChatDataList[key].title,
              Memberlist: ChatDataList[key].Memberlist,
              newTime: ChatDataList[key].newTime
            };
            arr.push(showListObj);
            var compare = function(obj1, obj2) {
              var val1 = obj1.newTime;
              var val2 = obj2.newTime;
              return val2 - val1;
            };
          } else {
            let showListObj = {
              from: key,
              sourceMsg: "暂无消息",
              time: "",
              // nickName: MesArr[0].nickName,
              mainPic: ChatDataList[key].mainPic,
              count: ChatDataList[key].count,
              isShow: ChatDataList[key].isShow,
              type: ChatDataList[key].type,
              title: ChatDataList[key].title,
              Memberlist: ChatDataList[key].Memberlist,
              newTime: ChatDataList[key].newTime
            };
            arr.push(showListObj);
            var compare = function(obj1, obj2) {
              var val1 = obj1.newTime;
              var val2 = obj2.newTime;
              return val2 - val1;
            };
          }
          // if(ChatDataList[key].projectId == _that.proTitle.proId){
          _that.messageList = arr.sort(compare);
          // }

          // console.log(_that.messageList)
        });
      }
    },
    //创建群组后写入缓存
    getCreateChatGroupUsersInfo(id) {
      let arr = [];
      let obj = {
        groupId: id,
        projectId: this.proTitle.proId,
        type: "1",
        userId: getStorage("userInfo").id
      };
      // console.log(obj)
      getPostInfo("yq_api/chat/contact/findChatGroupInfo", obj).then(res => {
        // console.log(res)
        if (res.data.code == 200) {
          let robj = {
            gid: res.data.gid,
            groupId: id,
            projectId: this.proTitle.proId,
            type: "1",
            userId: getStorage("userInfo").id
          };
          getPostInfo("yq_api/chat/contactGroup/userList", robj).then(resd => {
            if (resd.data.code == 200) {
              arr = resd.data.data;
              // console.log(resd.data.data);
            }
          });
        }
      });
      setTimeout(function() {
        //  console.log(arr)
        return arr;
      }, 500);
    },
    //发送提示消息
    sendTipTextMsg(oldName, tip) {
      var id = this.$imconn.getUniqueId(); // 生成本地消息id
      var msg = new WebIM.message("txt", id); // 创建文本消息
      let _that = this;
      let myNickName = this.getMyNickName;
      let headimgurl = this.headimgurl;

      // console.log(oldName,_that.editTo_name)
      var option = {
        msg: tip, // 消息内容
        ext: {
          conversationSeverId: "",
          departMentId: "",
          departMentName: "新部门",
          name: _that.editTo_name,
          oldName: oldName,
          messageTip: "ModifyingGroupName",
          nickName: myNickName,
          headimgurl,
          projectId: _that.proTitle.proId,
          orgId: _that.myOrgId,
          orgName: _that.myOrgName,
          projectName: _that.myProjectName,
          userName: _that.myUserName,
          userId: _that.proTitle.userId,
          singleChatToUserName: _that.editTo_name,
          userPortraitUri: _that.myUserPortraitUri
        }, //用户自扩展的消息内容（群聊用法相同）

        to: _that.to_username, // 接收消息对象(群组id)
        roomType: false,
        chatType: "chatRoom",
        success: function() {
          console.log("成功", this.ext);
          var chatData = JSON.parse(localStorage.getItem("chatData"));
          if (chatData) {
            if (chatData.chatHistoryData[_that.to_username]) {
              chatData.chatHistoryData[_that.to_username].title =
                _that.editTo_name;
            }
          }
          localStorage.setItem("chatData", JSON.stringify(chatData));
          _that.getMsgsList();
          // console.log('发送成功！');
        },
        fail: function() {
          console.log("failed");
        }
      };
      // console.log(option)
      msg.set(option);
      msg.setGroup("groupchat");
      _that.$imconn.send(msg.body);

      //      msg.set({
      //       msg: text,
      //       action: "action", //用户自定义，cmd消息必填
      //       ext: {
      //         messageTip:'ModifyingGroupName',
      //         nickName: myNickName,
      //         headimgurl,
      //         projectId: this.proTitle.proId,
      //         orgId: this.myOrgId,
      //         orgName: this.myOrgName,
      //         projectName: this.myProjectName,
      //         userName: this.myUserName,
      //         userId: this.proTitle.userId,
      //         singleChatToUserName:to_username,
      //         userPortraitUri: this.myUserPortraitUri
      //       }, //用户自扩展的消息内容（群聊用法相同）

      //       to: this.to_username,
      //       roomType: false,
      //       // chatType: 'chatRoom',
      //       success: function (id, serverMsgId) {
      //         let sendMessage = {
      //           from: fromUserName,
      //           sourceMsg: text,
      //           time: sendTime,
      //           nickName: "我",
      //           mainPic: _that.myUserPortraitUri,
      //           projectId: _that.proTitle.proId,
      //           count: 0,
      //           messageType: "typeText"
      //         };
      //         var chatData = JSON.parse(localStorage.getItem("chatData"));
      //         if (chatData) {
      //           if (chatData.chatHistoryData[to_username]) {
      //             (chatData.chatHistoryData[
      //               to_username
      //             ].newTime = new Date().getTime()),
      //               (chatData.chatHistoryData[to_username].count = 0);
      //             chatData.chatHistoryData[to_username].msgs.push(sendMessage);
      //           } else {
      //             chatData.chatHistoryData[to_username] = {
      //               newTime: new Date().getTime(),
      //               count: 0,
      //               msgs: [sendMessage]
      //             };
      //           }
      //           localStorage.setItem("chatData", JSON.stringify(chatData));
      //           _that.getMsgsList();
      //         } else {
      //           let chatHistoryData = {};
      //           chatHistoryData[to_username] = {
      //             newTime: new Date().getTime(),
      //             count: 0,
      //             msgs: [sendMessage]
      //           };
      //           localStorage.setItem(
      //             "chatData",
      //             JSON.stringify({ chatHistoryData })
      //           );
      //           _that.getMsgsList();
      //         }
      //         _thisChatHistory.push(sendMessage);
      //       },
      //       fail: function (e) {
      //         console.log("Send private text error");
      //       }
      //     });
    },
    //修改群名称
    EditGroupName() {
      let _that = this;
      var option = {
        roomId: _that.to_username,
        subject: _that.editTo_name, // 群组名称
        description: "", // 群组简介
        success: function() {
          // console.log("Change Group Names Success!");
          let robj = {
            userId: getStorage("userInfo").id,
            projectId: _that.proTitle.proId,
            gid: _that.gid,
            groupId: _that.to_username,
            name: _that.editTo_name
          };
          getPostInfo("yq_api/chat/contact/editeGroupUserInfo", robj).then(
            res => {
              if (res.data.code == 200) {
                _that.sendTipTextMsg(
                  _that.to_name,
                  _that.GownerUserName +
                    " 修改了群名称为： " +
                    _that.editTo_name
                );
                _that.to_name = _that.editTo_name;
                _that.show3 = false;
                _that.open2("群名称修改成功！！");
              }
            }
          );
        }
      };
      this.$imconn.changeGroupSubject(option);
    },
    //查询群里群成员ID
    getGroupChatMemberId() {
      if (this.to_username.length === 14) {
        let _that = this;
        var pageNum = 1,
          pageSize = 1000;
        var options = {
          pageNum: pageNum,
          pageSize: pageSize,
          groupId: _that.to_username,
          success: function(resp) {
            let Gowner = "";
            resp.data.forEach(e => {
              if (e.owner) {
                if (e.owner.toUpperCase() == _that.proTitle.userId) {
                  _that.isOwner = true;
                } else {
                  _that.isOwner = false;
                }
                Gowner = e.owner.toUpperCase();
              }
            });

            // var chatData = JSON.parse(localStorage.getItem("chatData"));
            //       if (chatData) {
            //          let ChatDataList = chatData.chatHistoryData;
            //          ChatDataList[id].Memberlist.forEach(el=>{
            //            if(el.userId == Gowner){
            //              el.owner = true
            //             // console.log(el.userId,Gowner)
            //            }
            //          })
            //          _that.groupUsers = ChatDataList[id].Memberlist

            //       }
            //       console.log(_that.groupUsers)

            let obj = {
              groupId: _that.to_username,
              projectId: _that.proTitle.proId,
              type: "1",
              userId: getStorage("userInfo").id
            };

            getPostInfo("yq_api/chat/contact/findChatGroupInfo", obj).then(
              res => {
                // console.log(_that.proTitle.proId)
                if (res.data.code == 200) {
                  // console.log(res.data.data.gid)

                  _that.gid = res.data.data.gid;
                  let robj = {
                    gid: res.data.gid,
                    groupId: _that.to_username,
                    projectId: _that.proTitle.proId,
                    type: "1",
                    userId: getStorage("userInfo").id
                  };
                  getPostInfo("yq_api/chat/contactGroup/userList", robj).then(
                    resd => {
                      if (resd.data.code == 200) {
                        resd.data.data.forEach(el => {
                          el.succShow = false;
                          if (el.userId == Gowner) {
                            _that.GownerUserName = el.userName;
                            el.owner = true;
                          }
                        });
                        _that.groupUsers = resd.data.data;
                      }
                    }
                  );
                }
              }
            );
          },
          error: function(e) {}
        };
        this.$imconn.listGroupMember(options);
      } else if (this.to_username.length === 32) {
        let addDe = {
          lookUserId: this.to_username,
          projectId: this.proTitle.proId,
          userId: getStorage("userInfo").id
        };

        //查询用户在项目中的信息接口
        getPostInfo("/yq_api/projectUserRef/searchProjectUser", addDe).then(
          res => {
            if (res.data.code) {
              this.groupUsers = [res.data.data];
            }
          }
        );
      }

      // var pageNum = 1,
      //   pageSize = 1000;
      // var options = {
      //   pageNum: pageNum,
      //   pageSize: pageSize,
      //   groupId: id,
      //   success: function (resp) {
      //     console.log("Response: ", resp);
      //   },
      //   error: function (e) { }
      // };
      // this.$imconn.listGroupMember(options);
    },

    getChatListDataFromLocal() {
      var chatData = JSON.parse(localStorage.getItem("chatData"));

      if (chatData) {
        let ChatDataList = chatData.chatHistoryData;
        this.showMseList = ChatDataList;
        // 从localstroage获取聊天历史记录
        if (ChatDataList[this.to_username.toUpperCase()]) {
          var currentChatData =
            ChatDataList[this.to_username.toUpperCase()].msgs;
          if (currentChatData) {
            currentChatData = currentChatData.filter(e => {
              return e.projectId == this.proTitle.proId;
            });
            this.chatHistory = currentChatData;
          }
        } else {
          this.chatHistory = [];
        }
      }
    },
    todu(time) {
      return time < 10 ? "0" + time : "" + time;
    },
    //发起单聊
    handchatFriend() {
      // console.log(this.to_username,this.to_name)
      let _that = this;
      let to_username = this.to_username;
      let to_name = this.to_name;

      let addDe = {
        lookUserId: to_username,
        projectId: this.proTitle.proId,
        userId: getStorage("userInfo").id
      };
      console.log(addDe);
      //查询用户在项目中的信息接口
      getPostInfo("/yq_api/projectUserRef/searchProjectUser", addDe).then(
        res => {
          if (res.data.code === 200) {
            var chatData = JSON.parse(localStorage.getItem("chatData"));
            if (chatData) {
              if (!chatData.chatHistoryData[to_username]) {
                chatData.chatHistoryData[to_username] = {
                  newTime: new Date().getTime(),
                  title: to_name,
                  type: "chat",
                  isShow: true,
                  count: 0,
                  msgs: [],
                  mainPic: res.data.data.mainPic
                };
              } else {
                chatData.chatHistoryData[
                  to_username
                ].newTime = new Date().getTime();
                chatData.chatHistoryData[to_username].title = to_name;
                chatData.chatHistoryData[to_username].isShow = true;
                chatData.chatHistoryData[to_username].type = "chat";
                chatData.chatHistoryData[to_username].count = 0;
                chatData.chatHistoryData[to_username].mainPic =
                  res.data.data.mainPic;
                chatData.chatHistoryData[to_username].msgs = [];
              }
              setTimeout(function() {
                localStorage.setItem("chatData", JSON.stringify(chatData));
                _that.getChatListDataFromLocal();
                _that.getMsgsList();
              }, 1000);
            } else {
              // console.log(message)
              let chatHistoryData = {};
              chatHistoryData[to_username] = {
                newTime: new Date().getTime(),
                type: "chat",
                title: to_name,
                count: 0,
                isShow: true,
                msgs: [],
                mainPic: res.data.data.mainPic
              };
              setTimeout(function() {
                localStorage.setItem(
                  "chatData",
                  JSON.stringify({ chatHistoryData })
                );
                _that.getChatListDataFromLocal();
                _that.getMsgsList();
              }, 500);
            }
          }
        }
      );
      // this.getMsgsList()
    },
    //获取当前是新建群聊还是群聊中新增成员
    getAddOrFriend(type) {
      this.addOrFriend = type;
      this.FriendsVisible = true;
    },
    //发起群聊(单聊)或增加群成员
    handFriendArr(usersData) {
      this.FriendsVisible = false;
      let _that = this;
      let usersIds = [];
      let userNames = [];
      usersData.forEach(e => {
        usersIds.push(e.userId);
        userNames.push(e.userName);
      });
      if (usersData.length == 0) return;

      if (this.addOrFriend == "init") {
        let chatType = usersData.length <= 1 ? "0" : "1";
        let usId = getStorage("userInfo").id;
        var myDate = new Date();
        let times =
          myDate.getFullYear() +
          "" +
          this.todu(myDate.getMonth() + 1) +
          "" +
          this.todu(myDate.getDate()) +
          "" +
          this.todu(myDate.getHours()) +
          "" +
          this.todu(myDate.getMinutes()) +
          this.todu(myDate.getSeconds());
        if (chatType == "0") {
          _that.to_username = usersIds[0];
          _that.to_name = userNames[0];
          this.handchatFriend();
        } else if (chatType == "1") {
          var options = {
            data: {
              groupname:
                chatType == 0
                  ? userNames.join(" ")
                  : userNames.join("、") + "-" + times,
              desc: chatType == 0 ? userNames.join("") : userNames.join("、"),
              members: usersIds,

              public: true,
              approval: false,
              allowinvites: true,
              maxusers: 200
            },
            success: function(respData) {
              // console.log("群组创建成功！", respData);
              _that.loading = true;
              _that.open2("群组创建成功！");
              _that.to_username = respData.data.groupid;
              _that.to_name = userNames.join("、") + "-" + times;
              // console.log(_that.to_username);
              let addGroupObj = {
                userId: usId,
                projectId: _that.proTitle.proId,
                groupId: respData.data.groupid,
                userIds: usersIds.join(),
                chatType: "1"
              };
              //调取服务器创建群聊
              getPostInfo("yq_api/chat/contact/addChatGroup", addGroupObj).then(
                res => {
                  if (res.data.code == 200) {
                    let Memberlist = [];
                    let obj = {
                      groupId: res.data.conditions,
                      projectId: _that.proTitle.proId,
                      type: "1",
                      userId: getStorage("userInfo").id
                    };
                    //查询群聊在服务器里的信息
                    getPostInfo(
                      "yq_api/chat/contact/findChatGroupInfo",
                      obj
                    ).then(infores => {
                      if (infores.data.code == 200) {
                        let robj = {
                          gid: infores.data.data.gid,
                          groupId: infores.data.data.id,
                          projectId: _that.proTitle.proId,
                          type: "1",
                          userId: getStorage("userInfo").id
                        };
                        //通过群聊查询服务器信息接口返回的gid来查询当前群聊里所有的群成员
                        getPostInfo(
                          "yq_api/chat/contactGroup/userList",
                          robj
                        ).then(userResd => {
                          if (userResd.data.code == 200) {
                            // _that.sendTipTextMsg('',userNames.join("、")+'加入聊天')

                            setTimeout(function() {
                              var id = _that.$imconn.getUniqueId(); // 生成本地消息id
                              var msg = new WebIM.message("txt", id); // 创建文本消息
                              //  console.log(id,msg)
                              let myNickName = _that.getMyNickName;
                              let headimgurl = _that.headimgurl;

                              var option1 = {
                                msg: "邀请" + userNames.join("、") + "加入聊天", // 消息内容
                                ext: {
                                  name: userNames.join("、") + "-" + times,

                                  messageTip: "inviteChatGroup",
                                  nickName: _that.proTitle.userId,
                                  headimgurl: "http://",
                                  projectId: _that.proTitle.proId,
                                  orgId: _that.myOrgId,
                                  orgName: _that.myOrgName,
                                  projectName: _that.myProjectName,
                                  userName: _that.myUserName,
                                  userId: _that.proTitle.userId,
                                  singleChatToUserName:
                                    userNames.join("、") + "-" + times,
                                  userPortraitUri: _that.myUserPortraitUri
                                }, //用户自扩展的消息内容（群聊用法相同）

                                to: infores.data.data.id, // 接收消息对象(群组id)
                                roomType: false,
                                chatType: "chatRoom",
                                success: function() {
                                  // console.log("发送成功");

                                  Memberlist = userResd.data.data;
                                  let sendTimeWZ = new Date();
                                  let sendTime =
                                    sendTimeWZ.getMonth() +
                                    1 +
                                    "-" +
                                    sendTimeWZ.getDate() +
                                    " " +
                                    sendTimeWZ.getHours() +
                                    ":" +
                                    sendTimeWZ.getMinutes();
                                  var chatData = JSON.parse(
                                    localStorage.getItem("chatData")
                                  );
                                  if (chatData) {
                                    chatData.chatHistoryData[
                                      res.data.conditions
                                    ] = {
                                      Memberlist: userResd.data.data,
                                      newTime: new Date().getTime(),
                                      title: userNames.join("、") + "-" + times,
                                      type:
                                        chatType == "0" ? "chat" : "groupchat",
                                      isShow: true,
                                      count: 0,
                                      projectId: _that.proTitle.proId,
                                      msgs: [
                                        {
                                          from: res.data.conditions,
                                          messageType: "inviteChatGroup",
                                          nickName:
                                            userNames.join("、") + "-" + times,
                                          projectId: _that.proTitle.proId,
                                          sourceMsg: userNames + "加入聊天",
                                          time: sendTime
                                        }
                                      ]
                                    };
                                    localStorage.setItem(
                                      "chatData",
                                      JSON.stringify(chatData)
                                    );
                                  } else {
                                    let chatHistoryData = {};
                                    chatHistoryData[res.data.conditions] = {
                                      Memberlist: userResd.data.data,
                                      newTime: new Date().getTime(),
                                      type:
                                        chatType == "0" ? "chat" : "groupchat",
                                      title: userNames.join("、") + "-" + times,
                                      count: 0,
                                      isShow: true,
                                      projectId: _that.proTitle.proId,
                                      msgs: [
                                        {
                                          from: res.data.conditions,
                                          messageType: "inviteChatGroup",
                                          nickName:
                                            userNames.join("、") + "-" + times,
                                          projectId: _that.proTitle.proId,
                                          sourceMsg: userNames + "加入聊天",
                                          time: sendTime
                                        }
                                      ]
                                    };
                                    localStorage.setItem(
                                      "chatData",
                                      JSON.stringify({ chatHistoryData })
                                    );
                                  }

                                  _that.msgListChange(
                                    0,
                                    _that.to_username,
                                    _that.to_name,
                                    "groupchat"
                                  );
                                  _that.getChatListDataFromLocal();
                                  _that.getMsgsList();
                                  _that.loading = false;
                                },
                                fail: function() {
                                  console.log("failed");
                                }
                              };
                              // console.log(option1)
                              msg.set(option1);
                              msg.setGroup("groupchat");
                              _that.$imconn.send(msg.body);
                            }, 1000);
                          }
                        });
                      }
                    });
                  }
                }
              );
            },
            error: function() {
              console.log("群组创建失败");
            }
          };
          this.$imconn.createGroupNew(options);
        }
      } else if (this.addOrFriend == "add") {
        if (_that.to_username.length == 14) {
          var option = {
            list: usersIds,
            roomId: this.to_username
          };
          this.$imconn.addGroupMembers(option);
          let addGroupObj = {
            userId: getStorage("userInfo").id,
            projectId: _that.proTitle.proId,
            groupId: _that.to_username,
            userIds: usersIds.join(",")
          };
          getPostInfo(
            "yq_api/chat/contact/addChatGroupPeople",
            addGroupObj
          ).then(res => {
            if (res.data.code == 200) {
              _that.getGroupChatMemberId();
              let robj = {
                gid: _that.gid,
                groupId: _that.to_username,
                projectId: _that.proTitle.proId,
                type: "1",
                userId: getStorage("userInfo").id
              };
              //通过群聊查询服务器信息接口返回的gid来查询当前群聊里所有的群成员
              getPostInfo("yq_api/chat/contactGroup/userList", robj).then(
                userResd => {
                  if (userResd.data.code == 200) {
                    setTimeout(function() {
                      var id = _that.$imconn.getUniqueId(); // 生成本地消息id
                      var msg = new WebIM.message("txt", id); // 创建文本消息
                      //  console.log(id,msg)
                      let myNickName = _that.getMyNickName;
                      let headimgurl = _that.headimgurl;

                      var option1 = {
                        msg: "邀请" + userNames.join("、") + "加入聊天", // 消息内容
                        ext: {
                          name: userNames.join("、"),
                          messageTip: "inviteChatGroup",
                          nickName: _that.proTitle.userId,
                          headimgurl: "http://",
                          projectId: _that.proTitle.proId,
                          orgId: _that.myOrgId,
                          orgName: _that.myOrgName,
                          projectName: _that.myProjectName,
                          userName: _that.myUserName,
                          userId: _that.proTitle.userId,
                          // singleChatToUserName:
                          //   userNames.join("、") +
                          //   "-" +
                          //   times,
                          userPortraitUri: _that.myUserPortraitUri
                        }, //用户自扩展的消息内容（群聊用法相同）

                        to: _that.to_username, // 接收消息对象(群组id)
                        roomType: false,
                        chatType: "chatRoom",
                        success: function() {
                          // console.log("发送成功");

                          var chatData = JSON.parse(
                            localStorage.getItem("chatData")
                          );
                          if (chatData) {
                            chatData.chatHistoryData[
                              _that.to_username
                            ].Memberlist = userResd.data.data;
                          }
                          localStorage.setItem(
                            "chatData",
                            JSON.stringify(chatData)
                          );

                          _that.getMsgsList();

                          _that.open2("添加成员成功！");
                        },
                        fail: function() {
                          console.log("failed");
                        }
                      };
                      // console.log(option1)
                      msg.set(option1);
                      msg.setGroup("groupchat");
                      _that.$imconn.send(msg.body);
                    }, 500);
                  }
                }
              );
            }
          });
        } else if (_that.to_username.length == 32) {
          //  let chatType = usersData.length <= 1 ? "0" : "1";
          let usId = getStorage("userInfo").id;
          var myDate = new Date();
          let times =
            myDate.getFullYear() +
            "" +
            this.todu(myDate.getMonth() + 1) +
            "" +
            this.todu(myDate.getDate()) +
            "" +
            this.todu(myDate.getHours()) +
            "" +
            this.todu(myDate.getMinutes()) +
            this.todu(myDate.getSeconds());
          usersIds.unshift(_that.to_username);
          let grOldName = _that.to_name + "、" + userNames.join("、");
          let grname = grOldName + "-" + times;
          // console.log(usersIds)
          var options = {
            data: {
              groupname: grname,
              desc: _that.to_name + "、" + userNames.join("、"),
              members: usersIds,
              public: true,
              approval: false,
              allowinvites: true,
              maxusers: 200
            },
            success: function(respData) {
              // console.log("群组创建成功！", respData);
              _that.loading = true;
              _that.open2("群组创建成功！");
              _that.to_username = respData.data.groupid;
              _that.to_name = grname;
              let addGroupObj = {
                userId: usId,
                projectId: _that.proTitle.proId,
                groupId: respData.data.groupid,
                userIds: usersIds.join(),
                chatType: "1"
              };
              //调取服务器创建群聊
              getPostInfo("yq_api/chat/contact/addChatGroup", addGroupObj).then(
                res => {
                  if (res.data.code == 200) {
                    let Memberlist = [];
                    let obj = {
                      groupId: res.data.conditions,
                      projectId: _that.proTitle.proId,
                      type: "1",
                      userId: getStorage("userInfo").id
                    };
                    //查询群聊在服务器里的信息
                    getPostInfo(
                      "yq_api/chat/contact/findChatGroupInfo",
                      obj
                    ).then(infores => {
                      if (infores.data.code == 200) {
                        let robj = {
                          gid: infores.data.data.gid,
                          groupId: infores.data.data.id,
                          projectId: _that.proTitle.proId,
                          type: "1",
                          userId: getStorage("userInfo").id
                        };
                        //通过群聊查询服务器信息接口返回的gid来查询当前群聊里所有的群成员
                        getPostInfo(
                          "yq_api/chat/contactGroup/userList",
                          robj
                        ).then(userResd => {
                          if (userResd.data.code == 200) {
                            // _that.sendTipTextMsg('',userNames.join("、")+'加入聊天')

                            setTimeout(function() {
                              var id = _that.$imconn.getUniqueId(); // 生成本地消息id
                              var msg = new WebIM.message("txt", id); // 创建文本消息
                              //  console.log(id,msg)
                              let myNickName = _that.getMyNickName;
                              let headimgurl = _that.headimgurl;

                              var option1 = {
                                msg: "邀请" + grOldName + "加入聊天", // 消息内容
                                ext: {
                                  name: grname,
                                  messageTip: "inviteChatGroup",
                                  nickName: _that.proTitle.userId,
                                  headimgurl: "http://",
                                  projectId: _that.proTitle.proId,
                                  orgId: _that.myOrgId,
                                  orgName: _that.myOrgName,
                                  projectName: _that.myProjectName,
                                  userName: _that.myUserName,
                                  userId: _that.proTitle.userId,
                                  singleChatToUserName: grname,
                                  userPortraitUri: _that.myUserPortraitUri
                                }, //用户自扩展的消息内容（群聊用法相同）

                                to: infores.data.data.id, // 接收消息对象(群组id)
                                roomType: false,
                                chatType: "chatRoom",
                                success: function() {
                                  // console.log("发送成功");
                                  (_that.activeName = "first"),
                                    (_that.loading = false);
                                  _that.show3 = false;

                                  Memberlist = userResd.data.data;
                                  let sendTimeWZ = new Date();
                                  let sendTime =
                                    sendTimeWZ.getMonth() +
                                    1 +
                                    "-" +
                                    sendTimeWZ.getDate() +
                                    " " +
                                    sendTimeWZ.getHours() +
                                    ":" +
                                    sendTimeWZ.getMinutes();
                                  var chatData = JSON.parse(
                                    localStorage.getItem("chatData")
                                  );

                                  if (chatData) {
                                    chatData.chatHistoryData[
                                      res.data.conditions
                                    ] = {
                                      Memberlist: userResd.data.data,
                                      newTime: new Date().getTime(),
                                      title: grname,
                                      type: "groupchat",
                                      isShow: true,
                                      count: 0,
                                      projectId: _that.proTitle.proId,
                                      msgs: [
                                        {
                                          from: res.data.conditions,
                                          messageType: "inviteChatGroup",
                                          nickName: grname,
                                          projectId: _that.proTitle.proId,
                                          sourceMsg: grOldName + "加入聊天",
                                          time: sendTime
                                        }
                                      ]
                                    };
                                    localStorage.setItem(
                                      "chatData",
                                      JSON.stringify(chatData)
                                    );
                                  } else {
                                    let chatHistoryData = {};
                                    chatHistoryData[res.data.conditions] = {
                                      Memberlist: userResd.data.data,
                                      newTime: new Date().getTime(),
                                      type:
                                        chatType == "0" ? "chat" : "groupchat",
                                      title: userNames.join("、") + "-" + times,
                                      count: 0,
                                      isShow: true,
                                      projectId: _that.proTitle.proId,
                                      msgs: [
                                        {
                                          from: res.data.conditions,
                                          messageType: "inviteChatGroup",
                                          nickName:
                                            userNames.join("、") + "-" + times,
                                          projectId: _that.proTitle.proId,
                                          sourceMsg: userNames + "加入聊天",
                                          time: sendTime
                                        }
                                      ]
                                    };
                                    localStorage.setItem(
                                      "chatData",
                                      JSON.stringify({ chatHistoryData })
                                    );
                                  }

                                  _that.msgListChange(
                                    0,
                                    _that.to_username,
                                    _that.to_name,
                                    "groupchat"
                                  );
                                  _that.getChatListDataFromLocal();
                                  _that.getMsgsList();
                                  _that.loading = false;
                                },
                                fail: function() {
                                  console.log("failed");
                                }
                              };
                              // console.log(option1)
                              msg.set(option1);
                              msg.setGroup("groupchat");
                              _that.$imconn.send(msg.body);
                            }, 1000);
                          }
                        });
                      }
                    });
                  }
                }
              );
            },
            error: function() {
              console.log("群组创建失败");
            }
          };
          this.$imconn.createGroupNew(options);
        }
      }
    },
    addChatWithChange() {
      //         let _that=this;
      //         let usId = getStorage("userInfo").id;
      //         var options = {
      //             data: {
      //                 groupname: '加上群主应该是四个人',
      //                 desc: 'web加上群主应该是四个人',
      //                 members: ['2C9136AE65CB50170165CC515EF60066','2C9136AE669FC1550166A01BEA020048','2C9136AE65CB50170165CC4E8EA30060'],
      //                 public: true,
      //                 approval: false,
      //                 allowinvites: true,
      //                 maxusers:200,
      //             },
      //             success: function (respData) {
      //               console.log('群组创建成功！',respData)
      //               let addGroupObj={
      //                 userId:usId,
      //                 projectId: _that.proTitle.proId,
      //                 groupId:respData.data.groupid,
      //                 userIds:'2C9136AE65CB50170165CC515EF60066,2C9136AE669FC1550166A01BEA020048,2C9136AE65CB50170165CC4E8EA30060',
      //                 chatType:'1'
      //               }
      //                  getPostInfo("yq_api/chat/contact/addChatGroup", addGroupObj).then(res=>{
      //                    console.log(res)
      //                  })
      //             },
      //             error: function () {
      //               console.log('群组创建失败')
      //             }
      // };
      //  this.$imconn.createGroupNew(options);
    },

    // 接受文本消息
    receiveTextMsg(message) {
      // message:{"id":"465540634703299052","type":"chat","from":"1","to":"2","data":"5共和国","ext":{"weichat":{"originType":"webim"}},"sourceMsg":"5共和国","error":false,"errorText":"","errorCode":"","time":"2018-05-10T12:55:27.432Z"}
      // console.log(message);
      this.changeRed = -1;
      let TextMsg = null;
      if (message.type == "chat") {
        TextMsg = message.from.toUpperCase();
      } else if (message.type == "groupchat") {
        TextMsg = message.to.toUpperCase();
      }
      let _that = this;
      let sendTimeWZ = message.time ? new Date(message.time) : new Date();
      let sendTime =
        sendTimeWZ.getMonth() +
        1 +
        "-" +
        sendTimeWZ.getDate() +
        " " +
        sendTimeWZ.getHours() +
        ":" +
        sendTimeWZ.getMinutes();

      let receiveMessage = {
        from: TextMsg,
        sourceMsg: message.sourceMsg,
        time: sendTime,
        nickName: message.ext.userName,
        mainPic: message.ext.userPortraitUri,
        projectId: message.ext.projectId,
        messageType: message.ext.messageType
      };

      if (message.ext.messageType == "typeText") {
        receiveMessage.sourceMsg = message.sourceMsg;
      } else if (message.ext.messageType == "typeImg") {
        let msgFileUrl = JSON.parse(message.ext.messageBody);
        // console.log(msgFileUrl);
        receiveMessage.sourceMsg = "[图片消息]";
        receiveMessage.messageBody = msgFileUrl;
      } else if (message.ext.messageType == "typeVideo") {
        let msgFileUrl = JSON.parse(message.ext.messageBody);
        receiveMessage.sourceMsg = "[视频消息]";
        receiveMessage.messageBody = msgFileUrl;
      } else if (message.ext.messageType == "typeFile") {
        let msgFileUrl = JSON.parse(message.ext.messageBody);
        receiveMessage.sourceMsg = "[文件消息]";
        receiveMessage.messageBody = msgFileUrl;
      } else if (message.ext.messageType == "typeVoice") {
        let msgFileUrl = JSON.parse(message.ext.messageBody);
        receiveMessage.sourceMsg = "[语音消息]";
        receiveMessage.id = new Date().getTime();
        receiveMessage.unlook = true;
        receiveMessage.messageBody = msgFileUrl;
      }
      if (message.ext.messageTip == "inviteChatGroup") {
        receiveMessage.messageType = "inviteChatGroup";
      }
      if (message.ext.messageTip == "ModifyingGroupName") {
        receiveMessage.messageType = "ModifyingGroupName";
      }
      if (message.ext.messageTip == "TransferGroupOwner") {
        receiveMessage.messageType = "TransferGroupOwner";
      }

      let to_username = this.to_username;
      var chatData = JSON.parse(localStorage.getItem("chatData"));
      if (chatData) {
        if (!chatData.chatHistoryData[TextMsg]) {
          chatData.chatHistoryData[TextMsg] = {
            newTime: new Date().getTime(),
            title:
              message.type == "groupchat"
                ? message.ext.singleChatToUserName
                : message.ext.userName,
            type: message.type,
            isShow: true,
            count: 1,
            msgs: [receiveMessage]
            // projectId:message.ext.projectId,
          };
          if (message.type == "chat") {
            chatData.chatHistoryData[TextMsg].mainPic =
              message.ext.userPortraitUri;
          }
          if (message.type == "groupchat") {
            var pageNum = 1,
              pageSize = 1000;
            var options = {
              pageNum: pageNum,
              pageSize: pageSize,
              groupId: message.to,
              success: function(resp) {
                let str = "";
                resp.data.forEach(e => {
                  if (e.owner) {
                    str += e.owner;
                  }
                  if (e.member) {
                    str += "," + e.member;
                  }
                });
                let GroupObj = {
                  userId: getStorage("userInfo").id,
                  projectId: _that.proTitle.proId,
                  groupId: message.to,
                  status: "0",
                  type: "groupchat"
                };
                getPostInfo("yq_api/chat/contactGroup/userList", GroupObj).then(
                  res => {
                    if (res.data.code == 200) {
                      chatData.chatHistoryData[TextMsg].Memberlist =
                        res.data.data;
                      chatData.chatHistoryData[TextMsg].peopleNum =
                        res.data.data.length;
                      _that.getMessageUnreadCount();
                      // console.log(res, chatData.chatHistoryData[TextMsg]);
                    }
                  }
                );
                console.log("Response: ", resp);
              },
              error: function(e) {}
            };
            this.$imconn.listGroupMember(options);
          }
        } else {
          chatData.chatHistoryData[TextMsg].newTime = new Date().getTime();
          chatData.chatHistoryData[TextMsg].title =
            message.type == "groupchat"
              ? message.ext.singleChatToUserName
              : message.ext.userName;
          chatData.chatHistoryData[TextMsg].isShow = true;
          chatData.chatHistoryData[TextMsg].type = message.type;
          // chatData.chatHistoryData[TextMsg].projectId = message.ext.projectId;
          if (TextMsg != to_username) {
            chatData.chatHistoryData[TextMsg].count =
              chatData.chatHistoryData[TextMsg].count + 1;
          }
          // console.log(chatData.chatHistoryData[TextMsg].count);

          //     if (message.ext.messageTip == "inviteChatGroup") {
          // receiveMessage.sourceMsg = "[创建群聊]";
          //     }
          //     if (message.ext.messageTip == "ModifyingGroupName") {
          //       receiveMessage.sourceMsg = "[更改群名]";

          //     }

          if (message.type == "chat") {
            chatData.chatHistoryData[TextMsg].mainPic =
              message.ext.userPortraitUri;
          }

          if (message.type == "groupchat") {
            var pageNum = 1,
              pageSize = 1000;
            var options = {
              pageNum: pageNum,
              pageSize: pageSize,
              groupId: message.to,
              success: function(resp) {
                let str = "";
                resp.data.forEach(e => {
                  if (e.owner) {
                    str += e.owner;
                  }
                  if (e.member) {
                    str += "," + e.member;
                  }
                });
                let GroupObj = {
                  userId: getStorage("userInfo").id,
                  projectId: _that.proTitle.proId,
                  groupId: message.to,
                  status: "0",
                  type: "groupchat"
                };
                getPostInfo("yq_api/chat/contactGroup/userList", GroupObj).then(
                  res => {
                    if (res.data.code == 200) {
                      chatData.chatHistoryData[TextMsg].Memberlist =
                        res.data.data;
                      chatData.chatHistoryData[TextMsg].peopleNum =
                        res.data.data.length;
                      let nameStr = "";
                      res.data.data.forEach(e => {
                        nameStr += e.userName + "、";
                      });
                      chatData.chatHistoryData[TextMsg].title =
                        message.type == "groupchat"
                          ? message.ext.singleChatToUserName
                          : message.ext.userName;
                    }
                  }
                );
              },
              error: function(e) {}
            };
            this.$imconn.listGroupMember(options);
          }

          chatData.chatHistoryData[TextMsg].msgs.push(receiveMessage);
        }

        setTimeout(function() {
          localStorage.setItem("chatData", JSON.stringify(chatData));
          _that.getMessageUnreadCount();
          _that.getMsgsList();
        }, 1000);
      } else {
        // console.log(message)
        let chatHistoryData = {};
        chatHistoryData[TextMsg] = {
          newTime: new Date().getTime(),
          type: message.type,
          title:
            message.type == "groupchat"
              ? message.ext.singleChatToUserName
              : message.ext.userName,
          count: 1,
          isShow: true,
          msgs: [receiveMessage]
          //  projectId:message.ext.projectId,
        };
        if (message.type == "chat") {
          chatHistoryData[TextMsg].mainPic = message.ext.userPortraitUri;
        }
        if (message.type == "groupchat") {
          var pageNum = 1,
            pageSize = 1000;
          var options = {
            pageNum: pageNum,
            pageSize: pageSize,
            groupId: message.to,
            success: function(resp) {
              // console.log(resp.data)
              let str = resp.data[0].owner;
              resp.data.forEach(e => {
                if (e.member) {
                  str += "," + e.member;
                }
              });
              let GroupObj = {
                userId: getStorage("userInfo").id,
                projectId: _that.proTitle.proId,
                groupId: message.to,
                status: "0",
                type: "groupchat"
                // userIds:str,
              };
              getPostInfo("yq_api/chat/contactGroup/userList", GroupObj).then(
                res => {
                  if (res.data.code == 200) {
                    chatHistoryData[TextMsg].Memberlist = res.data.data;
                    chatData.chatHistoryData[TextMsg].peopleNum =
                      res.data.data.length;
                    let nameStr = "";
                    res.data.data.forEach(e => {
                      nameStr += e.userName + "、";
                    });
                    chatData.chatHistoryData[TextMsg].title =
                      message.type == "groupchat"
                        ? message.ext.singleChatToUserName
                        : message.ext.userName;

                    //  console.log(res,chatData.chatHistoryData[TextMsg])
                  }
                }
              );
              // console.log("Response: ", resp)
            },
            error: function(e) {}
          };
          this.$imconn.listGroupMember(options);
        }

        setTimeout(function() {
          localStorage.setItem("chatData", JSON.stringify({ chatHistoryData }));
          _that.getMessageUnreadCount();
          _that.getMsgsList();
        }, 500);
      }

      // this.getChatListDataFromLocal()
      if (receiveMessage.from == to_username) {
        this.chatHistory.push(receiveMessage);
      }
    },
    // 接受表情消息
    receiveEmojiMessage(message) {
      console.log(message, 1111111);
      this.chatHistory.push(message);
    },
    // 接受图片消息
    receivePictureMessage(message) {
      console.log(message.url);
      console.log(message);
      this.chatHistory.push(message);
      console.log(this.chatHistory);
    },

    typeVoicePlay(url, index, id) {
      // console.log(url,index,id)
      var chatData = JSON.parse(localStorage.getItem("chatData"));
      let to_username = this.to_username;

      chatData.chatHistoryData[to_username].msgs.forEach(e => {
        if (e.id == id) {
          e.unlook = false;
        }
      });
      localStorage.setItem("chatData", JSON.stringify(chatData));
      this.getChatListDataFromLocal();
      let _that = this;
      Object.keys(_that.$refs).forEach(function(key) {
        if (_that.$refs[key][0]) {
          _that.$refs[key][0].dataset.play = false;
          _that.$refs[key][0].querySelector(".mx-audio").pause();
          _that.$refs[key][0].querySelector(
            ".icon_audio_playing"
          ).style.display = "none";
          _that.$refs[key][0].querySelector(
            ".icon_audio_default"
          ).style.display = "inline-block";
        }
      });

      var Pdom = this.$refs["media" + "" + index][0];
      var audio = Pdom.querySelector(".mx-audio");
      var defaultIcon = Pdom.querySelector(".icon_audio_default");
      var playingIcon = Pdom.querySelector(".icon_audio_playing");
      audio.currentTime = 0;

      if (Pdom.dataset.play == "false") {
        audio.play();
        defaultIcon.style.display = "none";
        playingIcon.style.display = "inline-block";
        Pdom.dataset.play = true;
      } else {
        audio.pause();
        // audio.currentTime = 0

        defaultIcon.style.display = "inline-block";
        playingIcon.style.display = "none";
        Pdom.dataset.play = false;
      }
    },
    playing(id) {
      // console.log('开始');
      // console.log(id)
    },
    ended(index) {
      var Pdom = this.$refs["media" + "" + index][0];
      var audio = Pdom.querySelector(".mx-audio");
      var defaultIcon = Pdom.querySelector(".icon_audio_default");
      var playingIcon = Pdom.querySelector(".icon_audio_playing");
      Pdom.dataset.play = false;
      defaultIcon.style.display = "inline-block";
      playingIcon.style.display = "none";
    },

    // 发送文本消息
    sendTextMsg() {
      var text = document.querySelector("#inputcontent").value;
      text = text.replace(/\n/g, "");
      if (!text || text.trim() == "") {
        this.open4("发送内容不能为空");
        return;
      }

      // var id =this.$imconn.getUniqueId();            // 生成本地消息id
      // var msg = new WebIM.message('txt', id); // 创建文本消息
      // var option = {
      //     msg: text,             // 消息内容
      //     to: '65455578480641',                     // 接收消息对象(群组id)
      //     roomType: false,
      //     chatType: 'chatRoom',
      //     success: function () {
      //         console.log('成功！');
      //     },
      //     fail: function () {
      //         console.log('failed');
      //     }
      // };
      // msg.set(option);
      // msg.setGroup('groupchat');
      // this.$imconn.send(msg.body);

      var id = this.$imconn.getUniqueId();
      var msg = new WebIM.message("txt", id);
      let fromUserName = this.from_username;
      let to_username = this.to_username;
      let _thisChatHistory = this.chatHistory;
      let sendTime = this.getNowTime();
      let myNickName = this.getMyNickName;
      let headimgurl = this.headimgurl;
      let to_msgType = this.to_msgType;
      let _that = this;

      // console.log(to_username);
      msg.set({
        msg: text,
        action: "action", //用户自定义，cmd消息必填
        ext: {
          nickName: myNickName,
          headimgurl,
          messageType: "typeText",
          projectId: _that.proTitle.proId,
          orgId: _that.myOrgId,
          orgName: _that.myOrgName,
          projectName: _that.myProjectName,
          userName: _that.myUserName,
          userId: _that.proTitle.userId,
          singleChatToUserName: _that.to_name,
          userPortraitUri: _that.myUserPortraitUri
        }, //用户自扩展的消息内容（群聊用法相同）

        to: _that.to_username,
        // to:'65455578480641',
        roomType: false,
        chatType: "chatRoom",
        success: function(id, serverMsgId) {
          document.querySelector("#inputcontent").value = "";
          //  console.log(this.ext)
          let sendMessage = {
            from: fromUserName,
            sourceMsg: text,
            time: sendTime,
            nickName: "我",
            mainPic: _that.myUserPortraitUri,
            projectId: _that.proTitle.proId,
            count: 0,
            messageType: "typeText"
          };
          var chatData = JSON.parse(localStorage.getItem("chatData"));
          if (chatData) {
            if (chatData.chatHistoryData[to_username]) {
              (chatData.chatHistoryData[
                to_username
              ].newTime = new Date().getTime()),
                (chatData.chatHistoryData[to_username].count = 0);
              chatData.chatHistoryData[to_username].msgs.push(sendMessage);
            } else {
              chatData.chatHistoryData[to_username] = {
                newTime: new Date().getTime(),
                count: 0,
                msgs: [sendMessage]
              };
            }
            localStorage.setItem("chatData", JSON.stringify(chatData));
            _that.getMsgsList();
          } else {
            let chatHistoryData = {};
            chatHistoryData[to_username] = {
              newTime: new Date().getTime(),
              count: 0,
              msgs: [sendMessage]
            };
            localStorage.setItem(
              "chatData",
              JSON.stringify({ chatHistoryData })
            );
            _that.getMsgsList();
          }
          _thisChatHistory.push(sendMessage);
        },
        fail: function(e) {
          console.log("Send private text error");
        }
      });

      if (to_msgType == "groupchat") {
        msg.setGroup("groupchat");
      } else if (to_msgType == "chat") {
        msg.body.chatType = "singleChat";
      }

      this.$imconn.send(msg.body);
    },
    //点击直接发送表情
    clickFace(key) {
      console.log(key);
      var id = this.$imconn.getUniqueId();
      var msg = new WebIM.message("txt", id);
      let fromUserName = this.from_username;
      let to_username = this.to_username.toUpperCase();
      let _thisChatHistory = this.chatHistory;
      let sendTime = this.getNowTime();
      let myNickName = this.getMyNickName;
      let headimgurl = this.headimgurl;
      let to_msgType = this.to_msgType;
      let _that = this;

      msg.set({
        msg: key,
        to: this.to_username,
        roomType: false,
        success: function(id, serverMsgId) {
          _that.showEmoji = false;

          let sendMessage = {
            from: fromUserName,
            sourceMsg: key,
            time: sendTime,
            nickName: "我",
            mainPic: _that.myUserPortraitUri,
            projectId: _that.proTitle.proId,
            count: 0,
            messageType: "typeText"
          };

          var chatData = JSON.parse(localStorage.getItem("chatData"));
          if (chatData) {
            if (chatData.chatHistoryData[to_username]) {
              chatData.chatHistoryData[to_username].count = 0;
              chatData.chatHistoryData[to_username].msgs.push(sendMessage);
            } else {
              chatData.chatHistoryData[to_username] = {
                count: 0,
                msgs: [sendMessage]
              };
            }
            localStorage.setItem("chatData", JSON.stringify(chatData));
          } else {
            let chatHistoryData = {};
            chatHistoryData[to_username] = {
              count: 0,
              msgs: [sendMessage]
            };
            localStorage.setItem(
              "chatData",
              JSON.stringify({ chatHistoryData })
            );
          }
          _thisChatHistory.push(sendMessage);

          var chatData = JSON.parse(localStorage.getItem("chatData"));
          if (chatData) {
            if (chatData.chatHistoryData[to_username]) {
              chatData.chatHistoryData[to_username].push(sendMessage);
            } else {
              chatData.chatHistoryData[to_username] = [sendMessage];
            }
            localStorage.setItem("chatData", JSON.stringify(chatData));
          } else {
            let chatHistoryData = {};
            chatHistoryData[to_username] = [sendMessage];
            localStorage.setItem(
              "chatData",
              JSON.stringify({ chatHistoryData })
            );
          }
          _thisChatHistory.push(sendMessage);
        },
        fail: function(e) {
          console.log("Send emoji text error");
        }
      });
      if (to_msgType == "groupchat") {
        msg.setGroup("groupchat");
      } else if (to_msgType == "chat") {
        msg.body.chatType = "singleChat";
      }

      this.$imconn.send(msg.body);
    },

    getNowTime() {
      let now = new Date();
      return (
        now.getMonth() +
        1 +
        "-" +
        now.getDate() +
        " " +
        now.getHours() +
        ":" +
        now.getMinutes()
      );
    },
    //获取好友列表
    getFriendsList() {
      let addObj = {
        userId: getStorage("userInfo").id,
        projectId: this.proTitle.proId
      };
      getPostInfo("/yq_api/orgDepartment/searchLinkmanList", addObj).then(
        res => {
          if (res.data.code === 200) {
            let data = res.data.data.orgList;
            let newData = [];
            //第一层循环
            data.forEach((e, index) => {
              let pObj = {
                label:
                  e.shortName + (e.typeName ? "-(" + e.typeName + ")" : ""),
                children: [],
                projectId: e.projectId,
                peopleNum: 1,
                id: e.id,
                serNum: index + 1,
                orgId: e.orgId,
                pid: 1,
                orgIsMe: false
              };
              //代表人循环
              let creUserObj = {
                label: e.orgLeader[0].userName,
                mainPic: e.orgLeader[0].mainPic,
                level: e.orgLeader[0].level,
                userId: e.orgLeader[0].userId,
                projectId: e.orgLeader[0].projectId,
                pid: 3,
                id: e.orgLeader[0].id,
                creator: e.orgLeader[0].creator,
                orgId: e.orgLeader[0].orgId,
                status: e.orgLeader[0].status,
                departmentId: e.orgLeader[0].departmentId
              };

              if (e.orgLeader[0].userId === getStorage("userInfo").id) {
                this.isMeOrgLeader = true;
                let addDe = {
                  lookUserId: e.orgLeader[0].userId,
                  projectId: this.proTitle.proId,
                  userId: getStorage("userInfo").id
                };
                getPostInfo(
                  "/yq_api/projectUserRef/searchProjectUser",
                  addDe
                ).then(res => {
                  if (res.data.code === 200) {
                    let data = res.data.data;
                    this.userData = data;
                    if (data.userId === getStorage("userInfo").id) {
                      this.userData.isMySelf = true;
                    }
                  }
                });

                this.orgInfoObj = {
                  orgId: e.orgLeader[0].orgId,
                  shortName: e.orgLeader[0].shortName,
                  userId: e.orgLeader[0].userId,
                  orgName: e.orgLeader[0].orgName,
                  classifyName: e.typeName,
                  nickName: e.orgLeader[0].nickName
                };
                this.isMeOrgId = e.orgLeader[0].orgId;
                this.isMeShortName = e.orgLeader[0].shortName;

                this.InvitePeople = {
                  mainPic: e.orgLeader[0].mainPic,
                  userId: e.orgLeader[0].userId,
                  orgName: e.orgLeader[0].orgName,
                  departmentName: e.orgLeader[0].departmentName,
                  levelName: e.orgLeader[0].levelName,
                  mobile: e.orgLeader[0].mobile
                };
                pObj.orgIsMe = true;
              }

              if (
                e.orgLeader[0].creator == "Y" &&
                e.orgLeader[0].userId === getStorage("userInfo").id
              ) {
                this.orgLeaderIsMe = true;
              }
              pObj.children.push(creUserObj);

              //部门循环
              e.departmentList.forEach((el, index) => {
                //  console.log(el)

                let cobj = {
                  label: el.departmentName,
                  children: [],
                  id: el.id,
                  peopleNum: el.purList.length != 0 ? el.purList.length : "0",
                  serNum: index + 1,
                  pid: 2,
                  orgId: el.orgId
                };
                // 用户循环
                el.purList.forEach(ele => {
                  pObj.peopleNum++;
                  let eleObj = {
                    label: ele.userName,
                    mainPic: ele.mainPic,
                    level: ele.level,
                    userId: ele.userId,
                    projectId: ele.projectId,
                    id: ele.id,
                    pid: 3,
                    orgId: ele.orgId,
                    creator: ele.creator,
                    status: ele.status,
                    departmentId: ele.departmentId
                  };
                  if (ele.userId === getStorage("userInfo").id) {
                    let addDe = {
                      lookUserId:
                        e.orgLeader[0].orgId === ele.orgId
                          ? e.orgLeader[0].userId
                          : console.log("没有"),
                      projectId: this.proTitle.proId,
                      userId: getStorage("userInfo").id
                    };
                    getPostInfo(
                      "/yq_api/projectUserRef/searchProjectUser",
                      addDe
                    ).then(res => {
                      if (res.data.code === 200) {
                        let data = res.data.data;
                        this.userData = data;
                        if (data.userId === getStorage("userInfo").id) {
                          this.userData.isMySelf = true;
                        }
                      }
                    });
                  }

                  if (ele.userId === getStorage("userInfo").id) {
                    this.isMeOrgId = ele.orgId;

                    this.InvitePeople = {
                      mainPic: ele.mainPic,
                      userId: ele.userId,
                      orgName: ele.orgName,
                      departmentName: ele.departmentName,
                      levelName: ele.levelName,
                      mobile: ele.mobile
                    };
                  }
                  cobj.children.push(eleObj);
                  cobj.children.sort(function(a, b) {
                    return a.level - b.level;
                  });
                });
                pObj.children.push(cobj);
              });
              //无部门用户组循环
              e.orgMember.forEach(ue => {
                pObj.peopleNum++;
                let ueObj = {
                  label: ue.userName,
                  mainPic: ue.mainPic,
                  level: ue.level,
                  userId: ue.userId,
                  projectId: ue.projectId,
                  id: ue.id,
                  creator: ue.creator,
                  orgId: ue.orgId,
                  pid: 3,
                  status: ue.status,
                  departmentId: ue.departmentId
                };
                if (ue.userId === getStorage("userInfo").id) {
                  let addDe = {
                    lookUserId:
                      e.orgLeader[0].orgId === ue.orgId
                        ? e.orgLeader[0].userId
                        : console.log("没有"),
                    projectId: this.proTitle.proId,
                    userId: getStorage("userInfo").id
                  };
                  getPostInfo(
                    "/yq_api/projectUserRef/searchProjectUser",
                    addDe
                  ).then(res => {
                    if (res.data.code === 200) {
                      let data = res.data.data;

                      this.userData = data;
                      if (data.userId === getStorage("userInfo").id) {
                        this.userData.isMySelf = true;
                      }
                    }
                  });
                }
                if (ue.userId === getStorage("userInfo").id) {
                  this.isMeOrgId = ue.orgId;
                  this.InvitePeople = {
                    mainPic: ue.mainPic,
                    userId: ue.userId,
                    orgName: ue.orgName,
                    departmentName: ue.departmentName,
                    levelName: ue.levelName,
                    mobile: ue.mobile
                  };
                }
                pObj.children.push(ueObj);
              });
              newData.push(pObj);
            });
            this.data = newData;
          }
        }
      );
    },
    titleColor(pid) {
      switch (pid) {
        case 1:
          return { color: "#ff6700" };
          break;
        case 2:
          return { color: "#029cff" };
          break;
      }
    },
    levelChange(level) {
      switch (level) {
        case 1:
          return "代表人";
          break;
        case 3:
          return "负责人";
          break;
      }
    },
    handleNodeClick(data) {
      if (data.status == "0") {
        if (data.pid == 3 && data.userId != this.proTitle.userId) {
          this.to_username = data.userId;
          this.to_name = data.label;
        }
      } else if (data.status == "2") {
        this.open4("当前用户已归档或已退出项目！无法聊天");
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //清空当前聊天记录
    clearChat() {
      let to_username = this.to_username;
      var chatData = JSON.parse(localStorage.getItem("chatData"));
      if (chatData) {
        if (chatData.chatHistoryData[to_username]) {
          chatData.chatHistoryData[to_username].msgs = [];
        }
        localStorage.setItem("chatData", JSON.stringify(chatData));
      }
      this.chatHistory = [];
    },
    Largevideo(videoUrl) {
      this.playerOptions.sources[0].src = videoUrl;
      this.videoVisible = true;
    },
    onPlayerPlay(player) {
      //   alert("play");
    },
    onPlayerPause(player) {
      //   alert("pause");
    },
    handleMsg(msg) {
      if (this.emojiMap[msg]) {
        return `<img src="${this.emojiMap[msg]}"/>`;
      } else {
        return msg;
      }
    },
    fileTypeImgChange(fileName) {
      return setFileTyleImge(fileName);
    },

    open2(msg) {
      this.$message({
        message: msg,
        type: "success"
      });
    },
    open4(msg) {
      this.$message.error(msg);
    }
  },
  mounted() {
    this.getFriendsList();
    let addDe = {
      lookUserId: getStorage("userInfo").id,
      projectId: this.proTitle.proId,
      userId: getStorage("userInfo").id
    };
    getPostInfo("/yq_api/projectUserRef/searchProjectUser", addDe).then(res => {
      if (res.data.code === 200) {
        let data = res.data.data;
        this.myOrgId = data.orgId;
        this.myOrgName = data.orgName;
        this.myUserName = data.myName;
        this.myProjectName = data.shortName;
        this.myUserPortraitUri = data.mainPic;
      }
    });
    document.querySelector("#inputcontent").focus();
    this.from_username = this.proTitle.userId;
    this.currentUserpwd = this.proTitle.userId;
    this.initializeGetChatUser();
    this.loginEasemob();
    this.getMsgsList();
  },
  watch: {
    chatHistory() {
      this.scrollToBottom();
    },
    to_username(n, o) {
      let _that = this;
      _that.getChatListDataFromLocal();
      _that.getMsgsList();

      setTimeout(function() {
        _that.getGroupChatMemberId();
      }, 300);

      // console.log('变了',n,o)
    },
    filterText(val) {
      // console.log(this.$refs.tree2.filter(val))
      this.$refs.tree2.filter(val);
    }
  }
};
</script>
<style>
.app-voice-pause,
.app-voice-play {
  height: 18px;
  background-repeat: no-repeat;
  /* background-image: url(../img/voice.png); */
  background-size: 18px auto;
  opacity: 0.5;
}

.app-voice-you .app-voice-pause {
  /*从未播放*/
  background-position: 0px -39px;
}

.app-voice-you .app-voice-play {
  /*播放中（不需要过渡动画）*/
  background-position: 0px -39px;
  -webkit-animation: voiceplay 1s infinite step-start;
  -moz-animation: voiceplay 1s infinite step-start;
  -o-animation: voiceplay 1s infinite step-start;
  animation: voiceplay 1s infinite step-start;
}

@-webkit-keyframes voiceplay {
  0%,
  100% {
    background-position: 0px -39px;
  }

  33.333333% {
    background-position: 0px -0px;
  }

  66.666666% {
    background-position: 0px -19.7px;
  }
}
</style>