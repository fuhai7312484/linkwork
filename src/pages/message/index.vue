<template>
  <el-row>
    <g-header></g-header>
    <left-menu></left-menu>
    <div class="demo-split" :style="{height:sWHeight}">
      <Split v-model="split1" min="190px" max="700px">

        <div slot="left" class="demo-split-pane splitLeft" :style="{height:sWHeight}">


          <el-dialog
  title="发起群聊(单聊)"
  :visible.sync="FriendsVisible"
  width="30%"
  :before-close="handleClose">
  
<friends-listname :FriendsVisible="FriendsVisible" @handleClose="handleClose" @handFriendArr="handFriendArr" >
</friends-listname>
</el-dialog>

  <div @click="FriendsVisible = true" class="x-addChatBtn">
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
        <!-- <el-badge class="mark" :value="1" /> -->
        </span>
 <div class="x-message-msgList" v-for="(msgList,index) in messageList" :key="index" @click="msgListChange(msgList.from,msgList.title,msgList.type)"
              v-if="msgList.isShow">
              <div @click="getCreateChatGroupUsersInfo(msgList.from)">查看群成员</div>
              <i class="x-message-msgTime">{{msgList.time}}</i>
              <div class="x-message-msgImg fl" v-if="msgList.type==='chat'">
                <img :src="msgList.mainPic" />
              </div>
              <div class="x-message-groupImgs fl" v-else-if="msgList.type=='groupchat'">
                <span v-for="(MemberImgs,index) in msgList.Memberlist" class="fl" :key="index" v-if="index<4" :style="{width:computeMegsWidth(msgList.Memberlist.length),height:computeMegsWidth(msgList.Memberlist.length)}">
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
    
    好友</el-tab-pane>
  
  </el-tabs>

           

            
          </div>
          <div class="clear" style=" background: #f5f5f8;"></div>
        </div>
        <div slot="right" class="demo-split-pane splitRinght">
          <div class="webim-chatwindow-title">
            
            {{to_name}}

            <div class="x-message-setting">
             <span class="el-icon-arrow-down" @click="show3 = !show3"></span>

             
      <el-collapse-transition>
        <div v-show="show3">
          <div class="x-message-settingBox">

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
<div v-if="item.messageType=='inviteChatGroup'" class="x-message-Tip">
   <!-- <div>  <span>
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
                    
                  
                   

                    <span class="x-message-text" v-if="item.messageType=='typeText'" :class="item.from==from_username?' fl':' fr'" v-html="handleMsg(item.sourceMsg)"></span>

                   <span class="x-message-text"  v-else-if="item.messageType=='typeImg'" :class="item.from==from_username?' fl':' fr'"> <img :src="item.messageBody.fileUrl" /> </span>
                    <!-- hidden="true" -->



                    <span class="x-message-text"  v-else-if="item.messageType=='typeVoice'" :class="item.from==from_username?' fl':' fr'">
                        <!-- <video controls="" autoplay="" name="media"><source :src="item.messageBody.fileUrl" type="audio/mpeg"></video> -->

<p class="weixinAudio" 
@click="typeVoicePlay(item.messageBody.fileUrl,index,item.id)"
 :id="'media'+''+index" 
 :ref="'media'+''+index" 
 data-play="false" 
 :style="{width:item.messageBody.duration*50+'px'}"
  >
  <!-- {{item.messageBody.duration*10+'px'}} -->
		<audio :data="index" @canplay="playing(item.id)" @ended="ended(index)" width="1" height="1"  type="audio/mpeg" class="mx-audio" preload >
      <source :src="item.messageBody.fileUrl" type="audio/mpeg">
      </audio>
			<span id="audio_area" class="db audio_area">
			<span class="audio_wrp db">
			<span class="audio_play_area">
				<i class="icon_audio_default"></i>
				<i class="icon_audio_playing"></i>
            </span>
			<span id="audio_length" class="audio_length tips_global">{{item.messageBody.duration}}"</span>
			<!-- <span class="db audio_info_area">    
                <strong class="db audio_title">Title/标题</strong>
                <span class="audio_source tips_global">From/来源</span>
			</span> -->
			<!-- <span id="audio_progress" class="progress_bar" style="width: 0%;"></span> -->
			</span>
			</span>
		</p>
 
<div class="VoiceUnread" v-if='item.unlook'>

</div>

                      <!-- <audio controls preload="auto" :id="'media'+''+index" :ref="'media'+''+index" controls>
                        <source :src="item.messageBody.fileUrl" type="audio/mpeg">
                        </audio> -->
         
                      </span>

                        
                    <span class="x-message-text"  v-else-if="item.messageType=='typeVideo'" :class="item.from==from_username?' fl':' fr'"> <img :src="item.messageBody.thumbnail" />
                    


                    
                    <div class="x-message-typeVideo">
                      <div class="x-message-deg">


                      </div>
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
                  <img :src="value" alt="emoj"/>
                </li>
              </ul>


                <span class="el-icon-picture">

                </span>
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
import { getPostInfo, getStorage } from "../../assets/lib/myStorage.js";
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
      FriendArr: [],
      FriendsVisible: false,
      show3: false,
      activeName: "first",
      split1: 0.3,
      from_username: "", // url中的发起方用户名
      to_username: "", // url中的接收方用户名
      to_msgType: "",
      conn: {}, // 与环信的通信长连接
      chatHistory: [], // 聊天记录数组
      currentUserpwd: "123456", // 当前用户环信密码
      accence_token: "", // 权限token
      messageList: [],
      showMseList: {},
      to_name: "",
      myOrgId: "",
      myOrgName: "",
      myProjectName: "",
      myUserName: "楠",
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
    ...mapState(["sWHeight", "proTitle"]),
    getMyNickName() {
      return this.myNickName;
    }
  },
  methods: {
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
      console.log(this.to_username, this.proTitle.userId);
      var option = {
        to: this.proTitle.userId,
        roomId: this.to_username,
        success: function() {
          console.log("退出群组成功！");
        },
        error: function() {
          console.log("退出群组失败！");
        }
      };
      this.$imconn.leaveGroupBySelf(option);
    },

    msgListChange(toId, name, type) {
      this.to_username = toId;
      this.to_msgType = type;
      this.to_name = name;
      var chatData = JSON.parse(localStorage.getItem("chatData"));
      if (chatData) {
        chatData.chatHistoryData[toId].count = 0;
        localStorage.setItem("chatData", JSON.stringify(chatData));
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

    //从localstroage获取聊天列表
    getMsgsList() {
      var chatData = JSON.parse(localStorage.getItem("chatData"));
      if (chatData) {
        let ChatDataList = chatData.chatHistoryData;
        let _that = this;
        let arr = [];
        //从localstroage获取聊天列表
        Object.keys(ChatDataList).forEach(function(key) {
          // console.log(ChatDataList[key])
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
          _that.messageList = arr.sort(compare);
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
              console.log(resd.data.data);
            }
          });
        }
      });
      setTimeout(function() {
        //  console.log(arr)
        return arr;
      }, 500);
    },
    //查询群里群成员ID
    getGroupChatMemberId(id) {
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
            return resd;
            console.log(resd);
          });
        }
      });

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
        }
      }
    },
    todu(time) {
      return time < 10 ? "0" + time : "" + time;
    },
    //发起群聊(单聊)
    handFriendArr(usersData) {
      this.FriendsVisible = false;
      let usersIds = [];
      let userNames = [];
      usersData.forEach(e => {
        usersIds.push(e.userId);
        userNames.push(e.userName);
      });
      //  console.log(usersIds)

      if (usersData.length == 0) return;
      let chatType = usersData.length <= 1 ? "0" : "1";
      let _that = this;
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

      var options = {
        data: {
          groupname:
            userNames.join("、") + "-" + times + "---------------加个串",
          // groupname:'11111111111111',
          desc: userNames.join("、"),
          members: usersIds,
          //  members: ['2C9136AE65CB50170165CC515EF60066','2C9136AE65CB50170165CC4E8EA30060'],
          public: true,
          approval: false,
          allowinvites: true
          // maxusers:200,
        },
        success: function(respData) {
          console.log('群组创建成功！',respData)

     

        


          let addGroupObj = {
            userId: usId,
            projectId: _that.proTitle.proId,
            groupId: respData.data.groupid,
            userIds: usersIds.join(),
            chatType: "1"
          };
          //  console.log(usersIds)

          getPostInfo("yq_api/chat/contact/addChatGroup", addGroupObj).then(
            res => {
              if (res.data.code == 200) {
                // console.log(res)






     let Memberlist = [];

    let obj = {
            groupId: respData.data.groupid,
            projectId: _that.proTitle.proId,
            type: "1",
            userId: getStorage("userInfo").id
          };
          console.log(obj)

          getPostInfo("yq_api/chat/contact/findChatGroupInfo", obj).then(
            infores => {
              console.log(infores);
              // if (infores.data.code == 200) {
              
              //        let robj = {
              //     gid: infores.data.data.gid,
              //     groupId: respData.data.groupid,
              //     projectId: _that.proTitle.proId,
              //     type: "1",
              //     userId: getStorage("userInfo").id
              //   };
              //   console.log(robj);
              //   getPostInfo("yq_api/chat/contactGroup/userList", robj).then(
              //     userResd => {
              //       if (userResd.data.code == 200) {
              //         Memberlist = userResd.data.data;
              //         console.log(userResd.data.data);
              //       }
              //     }
              //   );
               
             
              // }
            }
          );













                _that.open2("群组创建成功！");
                _that.to_username = res.data.conditions;
                _that.to_name =
                  userNames.join("、") + "-" + times + "---------------加个串";

                //                                         setTimeout(function(){
                //  var chatData = JSON.parse(localStorage.getItem("chatData"));
                //                        if (chatData) {
                //                            chatData.chatHistoryData[res.data.conditions] = {
                //                              Memberlist:Memberlist,
                //                            newTime:(new Date()).getTime(),
                //                           title:userNames.join('、')+'-'+times,
                //                           type: chatType=='0'?'chat':'groupchat',
                //                           isShow: true,
                //                           count: 0,
                //                           msgs: [{from:res.data.conditions,messageType:'inviteChatGroup',nickName:userNames.join('、')+'-'+times,projectId:_that.proTitle.proId,sourceMsg:userNames+'加入聊天',time:(new Date()).getTime()}]
                //                         };
                //                           localStorage.setItem("chatData", JSON.stringify(chatData));
                //                          }else{
                //                             let chatHistoryData = {};
                //                       chatHistoryData[res.data.conditions] = {
                //                          Memberlist:Memberlist,
                //                         newTime:(new Date()).getTime(),
                //                         type: chatType=='0'?'chat':'groupchat',
                //                         title:userNames.join('、')+'-'+times,
                //                         count: 0,
                //                         isShow: true,
                //                         msgs: [{from:res.data.conditions,messageType:'inviteChatGroup',nickName:userNames.join('、')+'-'+times,projectId:_that.proTitle.proId,sourceMsg:userNames+'加入聊天',time:(new Date()).getTime()}]
                //                       };
                //                        localStorage.setItem("chatData", JSON.stringify({ chatHistoryData }));
                //                          }
                //                          _that.getChatListDataFromLocal()
                //                          _that.getMsgsList()
                //                                         },500)
              }
            }
          );
        },
        error: function() {
          console.log("群组创建失败");
        }
      };
      // console.log(options)
      this.$imconn.createGroupNew(options);
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
      console.log(message);
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
        console.log(msgFileUrl);
        receiveMessage.sourceMsg = "[图片消息]";
        receiveMessage.messageBody = msgFileUrl;
      } else if (message.ext.messageType == "typeVideo") {
        let msgFileUrl = JSON.parse(message.ext.messageBody);
        receiveMessage.sourceMsg = "[视频消息]";
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
                      console.log(res, chatData.chatHistoryData[TextMsg]);
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
          chatData.chatHistoryData[TextMsg].title = message.ext.userName;
          chatData.chatHistoryData[TextMsg].isShow = true;
          chatData.chatHistoryData[TextMsg].type = message.type;
          if (TextMsg != to_username) {
            chatData.chatHistoryData[TextMsg].count =
              chatData.chatHistoryData[TextMsg].count + 1;
          }
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
                      chatData.chatHistoryData[TextMsg].title = nameStr;
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
                    chatData.chatHistoryData[TextMsg].title = nameStr;
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

      msg.set({
        msg: text,
        action: "action", //用户自定义，cmd消息必填
        ext: {
          nickName: myNickName,
          headimgurl,
          projectId: this.proTitle.proId,
          orgId: this.myOrgId,
          orgName: this.myOrgName,
          projectName: this.myProjectName,
          userName: this.myUserName,
          userId: this.proTitle.userId,
          userPortraitUri: this.myUserPortraitUri
        }, //用户自扩展的消息内容（群聊用法相同）

        to: this.to_username,
        roomType: false,
        // chatType: 'chatRoom',
        success: function(id, serverMsgId) {
          document.querySelector("#inputcontent").value = "";
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

      //

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

    //清空当前聊天记录
    clearChat() {
      var pageNum = 1,
        pageSize = 1000;
      var options = {
        pageNum: pageNum,
        pageSize: pageSize,
        groupId: "64017546674177",
        success: function(resp) {
          console.log("Response: ", resp);
        },
        error: function(e) {}
      };
      this.$imconn.listGroupMember(options);

      //            var options = {
      //     groupId: '63997175988225',
      //     success: function(resp){
      //         console.log("Response: ", resp);
      //     },
      //     error: function(){}
      // };
      // this.$imconn.getGroupInfo(options);

      // let to_username = this.to_username
      //  var chatData = JSON.parse(localStorage.getItem('chatData'))
      //  if (chatData) {
      //     if (chatData.chatHistoryData[to_username]) {
      //         chatData.chatHistoryData[to_username].msgs = []
      //       }
      //       localStorage.setItem('chatData', JSON.stringify(chatData))
      //  }
      // this.chatHistory = [];
    },

    handleMsg(msg) {
      if (this.emojiMap[msg]) {
        return `<img src="${this.emojiMap[msg]}"/>`;
      } else {
        return msg;
      }
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
    //获取初始化消息列表
    this.from_username = this.proTitle.userId;
    this.currentUserpwd = this.proTitle.userId;
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
          }
        });
      }
    }

    this.loginEasemob();
    this.getMsgsList();
  },
  watch: {
    chatHistory() {
      this.scrollToBottom();
    },
    to_username(n, o) {
      this.getChatListDataFromLocal();
      // console.log('变了',n,o)
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