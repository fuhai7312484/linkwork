<template>
  <el-row>
    <g-header></g-header>
    <left-menu></left-menu>
    <div class="demo-split" :style="{height:sWHeight}">
      <Split v-model="split1" min="190px" max="700px">

        <div slot="left" class="demo-split-pane splitLeft" :style="{height:sWHeight}">
          <div @click="addChatWithChange">

            + 发起群聊(单聊)
          </div>
          <div class="x-message-msgList-box">
            <div class="x-message-msgList" v-for="(msgList,index) in messageList" :key="index" @click="msgListChange(msgList.from,msgList.title,msgList.type)"
              v-if="msgList.isShow">
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
          </div>
          <div class="clear" style=" background: #f5f5f8;"></div>
        </div>
        <div slot="right" class="demo-split-pane splitRinght">
          <div class="webim-chatwindow-title">
            {{to_name}}
          </div>
          <div class="userDataDetil" :style="{height:sWHeight}">
            <div class="webim-chatwindow-msg" id="data-list-content" :style="{height:computeMessageHeight(sWHeight)}">
              <div v-for="(item,index) in chatHistory" :key="index" :class="item.from==from_username?' x-message-left':' x-message-right'">
               
                
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
        split1: 0.3,
        from_username: "", // url中的发起方用户名
        to_username: "", // url中的接收方用户名
        to_msgType:'',
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
      GFooter
    },
    computed: {
      ...mapState(["sWHeight", "proTitle"]),
      getMyNickName() {
        return this.myNickName;
      }
    },
    methods: {
      msgListChange(toId, name,type) {
        // this.getGroupChatMemberId(toId)
    
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
      //
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
          onOpened: function (message) {
            console.log("用户已上线");
          },
          onClosed: function (message) {
            console.log("用户已下线");
          },
          onEmojiMessage: this.receiveEmojiMessage,
          onPictureMessage: this.receivePictureMessage,
          onTextMessage: this.receiveTextMsg
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
          Object.keys(ChatDataList).forEach(function (key) {
            // console.log(ChatDataList[key])
            let MesArr = ChatDataList[key].msgs.filter(e => {
              return e.projectId == _that.proTitle.proId && e.from == key;
            });
           if(MesArr.length!=0){
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
              newTime:ChatDataList[key].newTime,
            };
            arr.push(showListObj);
              var compare = function (obj1, obj2) {
                var val1 = obj1.newTime;
                var val2 = obj2.newTime;
                    return val2-val1;
            } 
           }
            
                      
            _that.messageList = arr.sort(compare);
          });
        }
      },
      //查询群里群成员ID
      getGroupChatMemberId(id) {
        var pageNum = 1,
          pageSize = 1000;
        var options = {
          pageNum: pageNum,
          pageSize: pageSize,
          groupId: id,
          success: function (resp) {
            console.log("Response: ", resp);
          },
          error: function (e) { }
        };
        this.$imconn.listGroupMember(options);
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
      //发起群聊(单聊)
      addChatWithChange(){
        console.log('00000')
      },

      // 接受文本消息
      receiveTextMsg(message) {
        // message:{"id":"465540634703299052","type":"chat","from":"1","to":"2","data":"5共和国","ext":{"weichat":{"originType":"webim"}},"sourceMsg":"5共和国","error":false,"errorText":"","errorCode":"","time":"2018-05-10T12:55:27.432Z"}
        console.log(message.ext.messageType)
     
        let TextMsg = null;
        // let nickName = null;
        if (message.type == "chat") {
          TextMsg = message.from.toUpperCase();
          // nickName = message.ext.userName;
        } else if (message.type == "groupchat") {
          TextMsg = message.to.toUpperCase();
          // nickName = message.ext.singleChatToUserName
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
          messageType:message.ext.messageType,
        };
       
        
        if(message.ext.messageType=='typeText'){
          receiveMessage.sourceMsg =  message.sourceMsg
        }else if(message.ext.messageType=='typeImg'){
           let msgFileUrl = JSON.parse(message.ext.messageBody)
           console.log(msgFileUrl)
          receiveMessage.sourceMsg = '[图片消息]'
            receiveMessage.messageBody =  msgFileUrl
        }else if(message.ext.messageType=='typeVideo'){
           let msgFileUrl = JSON.parse(message.ext.messageBody)
           receiveMessage.sourceMsg = '[视频消息]'
           receiveMessage.messageBody =  msgFileUrl
        }

        let to_username = this.to_username;
        var chatData = JSON.parse(localStorage.getItem("chatData"));
        if (chatData) {
          if (!chatData.chatHistoryData[TextMsg]) {
            chatData.chatHistoryData[TextMsg] = {
               newTime:(new Date()).getTime(),
              title:message.type == "groupchat"
                  ? message.ext.singleChatToUserName
                  : message.ext.userName,
              type: message.type,
              isShow: true,
              count: 1,
              msgs: [receiveMessage]
            };

            if (message.type == "groupchat") {
              var pageNum = 1,
                pageSize = 1000;
              var options = {
                pageNum: pageNum,
                pageSize: pageSize,
                groupId: message.to,
                success: function (resp) {
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
                    // userIds:str,
                  };
                  getPostInfo("yq_api/chat/contactGroup/userList", GroupObj).then(
                    res => {
                      if (res.data.code == 200) {
                        chatData.chatHistoryData[TextMsg].Memberlist =
                          res.data.data;
                        //  console.log(res,chatData.chatHistoryData[TextMsg])
                      }
                    }
                  );
                  console.log("Response: ", resp);
                },
                error: function (e) { }
              };
              this.$imconn.listGroupMember(options);
            }
          } else {
            chatData.chatHistoryData[TextMsg].newTime = (new Date()).getTime();
            chatData.chatHistoryData[TextMsg].title = message.ext.userName;
            chatData.chatHistoryData[TextMsg].isShow = true;
            chatData.chatHistoryData[TextMsg].type = message.type;
            if (TextMsg != to_username) {
              chatData.chatHistoryData[TextMsg].count =
                chatData.chatHistoryData[TextMsg].count + 1;
            }

            if (message.type == "groupchat") {
              var pageNum = 1,
                pageSize = 1000;
              var options = {
                pageNum: pageNum,
                pageSize: pageSize,
                groupId: message.to,
                success: function (resp) {
                  // console.log(resp.data)
                  let str = "";
                  resp.data.forEach(e => {
                    if (e.owner) {
                      str += e.owner;
                    }
                    if (e.member) {
                      str += "," + e.member;
                    }
                  });
                  // console.log(str)

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
                        chatData.chatHistoryData[TextMsg].Memberlist =
                          res.data.data;
                        // console.log(res.data.data);
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
                error: function (e) { }
              };
              this.$imconn.listGroupMember(options);
            }

            chatData.chatHistoryData[TextMsg].msgs.push(receiveMessage);
          }

          setTimeout(function () {
            localStorage.setItem("chatData", JSON.stringify(chatData));
            _that.getMsgsList();
          }, 1000);
        } else {
          // console.log(message)
          let chatHistoryData = {};
          chatHistoryData[TextMsg] = {
            newTime:(new Date()).getTime(),
            type: message.type,
            title:
              message.type == "groupchat"
                ? message.ext.singleChatToUserName
                : message.ext.userName,
            count: 1,
            isShow: true,
            msgs: [receiveMessage]
          };

          if (message.type == "groupchat") {
            var pageNum = 1,
              pageSize = 1000;
            var options = {
              pageNum: pageNum,
              pageSize: pageSize,
              groupId: message.to,
              success: function (resp) {
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
              error: function (e) { }
            };
            this.$imconn.listGroupMember(options);
          }

          setTimeout(function () {
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
        console.log(message,1111111)
        this.chatHistory.push(message);
      },
      // 接受图片消息
      receivePictureMessage(message) {
        console.log(message.url);
        console.log(message);
        this.chatHistory.push(message);
        console.log(this.chatHistory);
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
          success: function (id, serverMsgId) {
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
                 chatData.chatHistoryData[to_username].newTime=(new Date()).getTime(),
                chatData.chatHistoryData[to_username].count = 0;
                chatData.chatHistoryData[to_username].msgs.push(sendMessage);
              } else {
                chatData.chatHistoryData[to_username] = {
                  newTime:(new Date()).getTime(),
                  count: 0,
                  msgs: [sendMessage]
                };
              }
              localStorage.setItem("chatData", JSON.stringify(chatData));
              _that.getMsgsList();
            } else {
              let chatHistoryData = {};
              chatHistoryData[to_username] = {
                  newTime:(new Date()).getTime(),
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
          fail: function (e) {
            console.log("Send private text error");
          }
        });
        
        //
    
        if(to_msgType=='groupchat'){
          msg.setGroup('groupchat');
        }else if(to_msgType=='chat'){
           msg.body.chatType = "singleChat";
        }
        

        this.$imconn.send(msg.body);
      },
//点击直接发送表情
       clickFace (key) {
         console.log(key)
        var id = this.$imconn.getUniqueId()
        var msg = new WebIM.message('txt', id)
        let fromUserName = this.from_username
        let to_username = this.to_username.toUpperCase()
        let _thisChatHistory = this.chatHistory
        let sendTime = this.getNowTime()
        let myNickName = this.getMyNickName
        let headimgurl = this.headimgurl;
         let to_msgType = this.to_msgType;
        let _that = this;


        msg.set({
          msg: key,
          to: this.to_username,
          roomType: false,
          success: function (id, serverMsgId) {
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
            }


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



            var chatData = JSON.parse(localStorage.getItem('chatData'))
            if (chatData) {
              if (chatData.chatHistoryData[to_username]) {
                chatData.chatHistoryData[to_username].push(sendMessage)
              } else {
                chatData.chatHistoryData[to_username] = [sendMessage]
              }
              localStorage.setItem('chatData', JSON.stringify(chatData))
            } else {
              let chatHistoryData = {}
              chatHistoryData[to_username] = [sendMessage]
              localStorage.setItem('chatData', JSON.stringify({chatHistoryData}))
            }
            _thisChatHistory.push(sendMessage)
          },
          fail: function (e) {
            console.log('Send emoji text error')
          }
        })
     if(to_msgType=='groupchat'){
          msg.setGroup('groupchat');
        }else if(to_msgType=='chat'){
           msg.body.chatType = "singleChat";
        }
        
        this.$imconn.send(msg.body)
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
        localStorage.removeItem("chatData");
        this.chatHistory = [];
      },

      handleMsg(msg) {
        if (this.emojiMap[msg]) {
          return `<img src="${this.emojiMap[msg]}"/>`;
        } else {
          return msg;
        }
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
      // let urlParams = this.getParamsFromUrl()
      // console.log(urlParams)

      // this.from_username = urlParams.from_username
      // this.to_username = urlParams.to_username
      // this.receiveNickName =
      // console.log(decodeURI(urlParams.to_nickname))

      this.from_username = this.proTitle.userId;
      this.currentUserpwd = this.proTitle.userId;
      this.to_username = "2C9136AE65CB50170165CC5218B60068";
      //  this.receiveNickName = '中魁'
      // this.getChatListDataFromLocal()
      this.loginEasemob();
      this.getMsgsList();

      // if (urlParams.from_username && urlParams.to_username) {
      //   this.from_username = urlParams.from_username
      //   this.to_username = urlParams.to_username
      //   this.receiveNickName = decodeURI(urlParams.to_nickname)
      //   this.getChatListDataFromLocal()
      //   this.loginEasemob()
      // } else {
      //   this.$createDialog({
      //     type: 'alert',
      //     title: '温馨提示',
      //     content: '路径错误,缺少用户名'
      //   }).show()
      // }
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
</style>