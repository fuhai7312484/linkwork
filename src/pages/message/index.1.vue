


<template>
  <el-row>
    <g-header></g-header>
    <left-menu></left-menu>


    <div class="demo-split" :style="{height:sWHeight}">
      <Split v-model="split1" min="190px" max="700px">
        <div slot="left" class="demo-split-pane splitLeft" :style="{height:sWHeight}">
 qqqqqqqq

          



          <div class="clear" style=" background: #f5f5f8;"></div>

        </div>



          <div slot="right" class="demo-split-pane splitRinght">
        <span>添加好友</span>

        2222222222222222222222
        </div>
       
      </Split>
    </div>



    <right-menu>



    </right-menu>
    <g-footer></g-footer>
  </el-row>

</template>
<script>
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import GHeader from "@/components/Header.vue";
import GFooter from "@/components/Footer.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "messageIndex",
  data() {
    return {
      split1: 0.3
    };
  },
  components: {
    LeftMenu,
    RightMenu,
    GHeader,
    GFooter
  },
  computed: {
    ...mapState(["sWHeight",'proTitle'])
  },
  methods: {
    loginEasemob() {
      // this.$imoption.user = this.proTitle.userId;
      // this.$imoption.pwd = this.proTitle.userId;

        this.$imoption.user = '13051376806';
      this.$imoption.pwd = '123456';
      

        this.$imoption.success = (res) => {
          this.accence_token = res.access_token
          this.myNickName = res.user.nickname
          this.addListen()
         
        }

     
      this.$imconn.open(this.$imoption);
      // this.$imconn.listen({
      //   onOpened: function(message) {
      //     console.log("用户已上线");
      //   },
      //   onClosed: function(message) {
      //     console.log("用户已下线");
      //   },
      //   onEmojiMessage: this.receiveEmojiMessage,
      //   onPictureMessage: this.receivePictureMessage,
      //   onTextMessage: this.receiveTextMsg
      // });

    },
      addListen () {
        this.$imconn.listen({
          onOpened: function (message) {
            console.log('用户已上线')
          },
          onClosed: function (message) {
            console.log('用户已下线')
          },
          onEmojiMessage: this.receiveEmojiMessage,
          onPictureMessage: this.receivePictureMessage,
          onTextMessage: this.receiveTextMsg
        })
      },

        getChatListDataFromLocal () {
        var chatData = JSON.parse(localStorage.getItem('chatData'))
        if (chatData) {
          var currentChatData = chatData.chatHistoryData[this.to_username]
          if (currentChatData) {
            this.chatHistory.push(...currentChatData)
          }
        }
      },


  },
  mounted() {


  // document.querySelector('#inputcontent').focus()
  //     let urlParams = this.getParamsFromUrl()
  //     if (urlParams.from_username && urlParams.to_username) {
  //       this.from_username = urlParams.from_username
  //       this.to_username = urlParams.to_username
  //       this.receiveNickName = decodeURI(urlParams.to_nickname)
  //       this.getChatListDataFromLocal()
  //       this.loginEasemob()
  //     } else {
  //       this.$createDialog({
  //         type: 'alert',
  //         title: '温馨提示',
  //         content: '路径错误,缺少用户名'
  //       }).show()
  //     }


      
    // this.$imconn.open(this.$imoption)


    this.loginEasemob()
    //        var options = {
    //     apiUrl: WebIM.config.apiURL,
    //     user: '13051376806',
    //     pwd: '123456',
    //     appKey: WebIM.config.appkey
    // };
    // conn.open(options);

 

    // conn.getRoster({
    //   success: function ( roster ) {
    //     //获取好友列表，并进行好友列表渲染，roster格式为：
    //     /** [
    //           {
    //             jid:'asemoemo#chatdemoui_test1@easemob.com',
    //             name:'test1',
    //             subscription: 'both'
    //           }
    //         ]
    //     */
    //     for ( var i = 0, l = roster.length; i < l; i++ ) {
    //       var ros = roster[i];
    //       //ros.subscription值为both/to为要显示的联系人，此处与APP需保持一致，才能保证两个客户端登录后的好友列表一致
    //       if ( ros.subscription === 'both' || ros.subscription === 'to' ) {
    //         console.log(ros)
    //       }
    //     }
    //   },
    // });

    // this.loginEasemob()
    // this.$store.dispatch('DO_LOGIN_IM')
  }
};
</script>
<style>
</style>
