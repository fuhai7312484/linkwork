<template>
    <div class="headerBox">
        <div class="headerLeft">
<div>
    <div class="clickShowBox" style="">
      <el-collapse-transition>
        <div v-show="show3">
          <div class="transition-box">
              <el-table
              :show-header="false"
      :data="gridData"
      class="HeadProList"
      style="width: 100%">
       <el-table-column
       type="index"
        width="40">
      </el-table-column>
      <el-table-column
        prop="shortName"
        width="280">
      </el-table-column>
    </el-table>
 <router-link tag="div" to="/project/createpro" class="transitionCretdBtn">
        <span class="iconfont addproIcon">&#xe659;</span>创建项目</router-link>
              </div>
        </div>
      </el-collapse-transition>
    </div>
  </div>
   <span class="iconfont headPorList" ref="headPorList" slot="reference" @click="show3 = !show3" >&#xe658;</span>
               <h2> {{proTitle}}</h2>
        </div>
<div class="headRightBox">
 <el-popover
    placement="right"
    width="400"
    trigger="hover">
<div>
        这里是登录成功后跳转到首页
        <div>
            当前登录的用户信息：
             <p>
                用户ID：{{userData.id}}
            </p>
            <p>
                用户名称：{{userData.name}}
            </p>
              <p>
                手机号：{{userData.mobile}}
            </p>
              <p>
                accessToken：{{userData.accessToken}}
            </p>
               <p>
               邮箱：{{userData.email}}
            </p>
            头像：<img :src="userData.mainPic" :style="{width:'50px',height:'50px'}"/>
                 <el-row>
                <el-button size="mini" @click="signOut">退出登录</el-button>
                </el-row>
        </div>
    </div>


  <button slot="reference" class="HeadmainPicBox fl">
      <!-- <el-badge is-dot class="item"> -->
     <img :src="userData.mainPic" :style="{width:'34px',height:'34px'}"/> 
     <!-- </el-badge> -->
  </button>
  
</el-popover>  
<div class="HeadmainPicName fl">{{userData.name}}</div>


    <div class="HeadSearch fl">
        <i class="el-icon-search">
        </i>
        <input type="text"/>

    </div>


</div>

    </div>
</template>
<script>
import {
  getStorage,
  autodivheight,
  stoRemove,
  stClear
} from "../assets/lib/myStorage.js";
import router from "../router";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "GHeader",
  computed: {
    ...mapState(["proTitle", "ProList"])
  },
  data() {
    return {
      userData: {},
      show3: false,
      gridData: []
    };
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    ...mapActions(["getProList"]),
    signOut() {
      //    stoRemove('userName');
      stClear();
      this.changeLogin(0);
      router.push("/login");
    }
  },
  mounted() {
    this.userData = getStorage("userInfo");

    let _that = this;

    document.addEventListener("click", function(ev) {
      // console.log(_that.$refs.headPorList)
      if (_that.$refs.headPorList) {
        if (!!_that.$refs.headPorList.contains(ev.target)) return;
        _that.show3 = false;
      } else {
        return;
      }
    });

    // document.addEventListener('click',function(ev){
    //   console.log(_that.$refs.headPorList)
    //     if(!!_that.$refs.headPorList.contains(ev.target)) return;
    //      _that.show3 = false;
    // })
  },
  async created() {
    let params = {
      url: "yq_api/project/listByCondition",
      objs: {
        page: "1",
        size: "1",
        userId: getStorage("userInfo").id,
        type: "10"
      }
    };
    await this.getProList(params);
    this.gridData = this.ProList;
  }
};
</script>
<style>
.transition-box {
  margin-bottom: 10px;
  box-shadow: 3px 3px 3px #666;
  border-radius: 4px;
  background-color: #fff;
  color: #fff;
  padding: 10px 10px;
  box-sizing: border-box;
  margin-right: 20px;
  /* overflow-y:auto; */
}
.HeadProList{
   max-height: 500px;
   overflow-y:auto; 
}


.HeadProList::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     
    height: 1px;
}
.HeadProList::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
     -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #535353;
}
.HeadProList::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px #e1e1e1;
    border-radius: 4px;
    background: #EDEDED;
}

</style>

