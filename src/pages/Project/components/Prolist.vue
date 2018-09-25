<template>
  <div>
   
    <div class="remarkBox" :style="{height:sWHeight}">
      <div class="proTitleBox">
        <h1>
         {{proInfo.protitle}}
          <!-- 链工作APP项目 -->
        
        </h1>
        <h2>标题名称：{{proInfo.title!=null?proInfo.title:'无'}}</h2>
        <h3>节点：{{proInfo.period!=null?proInfo.period:'无'}}</h3>
      </div>

      <router-link tag="div" to="/project/createpro" class="proCreateBtn">
        <span class="iconfont addproIcon">&#xe659;</span>创建项目</router-link>

      <div class="remark">
        <h3>
          注释：
        </h3>
        <p>
          <el-progress type="circle" :width="28" :percentage="45" class="IE" ></el-progress>
          <span>时间进度图表</span>
        </p>
        <p>
          <el-progress type="circle" color="#e9cf33" :width="28" :percentage="45"></el-progress>
          <span>任务进度图表</span>
        </p>
        <ul>
          <li v-for="(item,index) in noteInfo" :key="index">
            <span class="ItemDec" :style="{backgroundColor:item.style.color}"></span>
            <span class="ItemDecText">
         {{item.content}}--
              <span :style="item.style">{{item.colorName}}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="contentBox">
      <div class="content" 
      :style="{maxHeight:sWHeight}"
      >
      
        <div class="searchBox">
          <div class="search">

            <el-input placeholder="请输入项目名称" v-model="searchInput" class="searchInput">
              <el-button slot="append" icon="el-icon-search" class="searchBtn"></el-button>
            </el-input>

          </div>
          <div class="SortBtn">

               <el-dropdown trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link">
                     排序
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="0"> 创建时间</el-dropdown-item>
                    <el-dropdown-item command="1">未读信息</el-dropdown-item>
                     <el-dropdown-item command="7"> 使用频率数</el-dropdown-item>
                    <el-dropdown-item command="3">创建人完成度</el-dropdown-item>
                     <el-dropdown-item command="4"> 个人完成度</el-dropdown-item>
                    <el-dropdown-item command="2">参与人数</el-dropdown-item>
                     <el-dropdown-item command="5"> 已完结</el-dropdown-item>
                    <el-dropdown-item command="8">删除并退出的</el-dropdown-item>
                     <!-- <el-dropdown-item command="9">按项目简称</el-dropdown-item> -->
                      <el-dropdown-item command="10">全部项目</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

            <div class="sortSeesaw">
              <div class="sortUp"></div>
              <div class="sortDown"></div>

            </div>

          </div>

        </div>

        <!-- {{tableData}} -->
        <ul v-if="showProUl">
          <li>
        <h2 :style="{color:'#ccc',textAlign:'center',paddingTop:'50px'}">无查询数据，去 <router-link to="/project/createpro" tag="span" :style="{color:'#3db2ea',cursor:'pointer'}"><i class="iconfont">&#xe659;</i> 创建自己的项目</router-link></h2>

          </li>
        

        </ul>
        <ul v-if="!showProUl" v-loading="loading"
         element-loading-text="拼命加载中"
         >
          <li class="porList" v-for="(item, index) in tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="index" >
           <!-- {{item.shortName}} -->
            <div class="porListNameBox">
              <el-col :span="16" class="porListTitle">
                <h2 :style="setTaskState(item.isMyProject,item.status,item.uStatus)" 
                @click="handChangproTitle({protitle:item.shortName,
                proId:item.projectId,
                orgName:item.orgName,
                uStatus:item.uStatus,
                shortName:item.shortName,
                title:item.title,
                period:item.period
                },('/address'))">
         {{indexMethod(item.key)}}.{{item.shortName}}

         
                </h2>
                <!-- <h2 :style="setTaskState(item.taskState)" @click="handChangproTitle(item.name)">
                  {{indexMethod(index)}}.{{item.name}}
                </h2> -->
              </el-col>

              <el-col :span="3" class="RingType">
                <el-progress type="circle" :width="39" :percentage="item.timeDuty===null?item.timeDuty=0:(item.timeDuty*1)"></el-progress>
              </el-col>
              <el-col :span="3" class="RingType">
                <el-progress type="circle" color="#e9cf33" :width="39" :percentage="item.duty===null?item.duty=0:(item.duty*1)"></el-progress>
              </el-col>
              <el-col :span="2" class="porListTitle">

                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    设置
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <i class="el-icon-delete"></i>删除</el-dropdown-item>
                    <el-dropdown-item>
                      <i class="el-icon-star-off"></i>关注</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </div>
            <div class="porDatesBox">
              <el-col :span="10">
                创建时间: {{TimePro(item.createTime,'-')}}
                
                 <!-- {{getToTime(item.createTime)}} -->
            
              </el-col>
              <el-col :span="10">加入时间:{{TimePro(item.joinTime,'-')}}</el-col>
              <el-col :span="4"> 参与人数:{{item.peopleNum}}</el-col>
            </div>
          </li>
                    <el-pagination
                  background
                  layout="prev, pager, next"
                  :page-size="pagesize"
                  :current-page="currentPage"
                  :total="total"
                  @current-change="current_change"
                >
                  </el-pagination>
        </ul>

        <!-- <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination> -->

        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  autodivheight,
  getPostInfo,
  getStorage,
  getToTime,
  setKeyIndex,
  statusColor,
  setStorage
} from "../../../assets/lib/myStorage.js";
import { mapState, mapMutations } from "vuex";
export default {
  name: "ProList",
  data() {
    return {
      total: 0, //默认数据总数
      pagesize: 6, //每页的数据条数
      currentPage: 1, //默认开始页面
      showProUl:false,
      loading: true,
      searchInput: "",
      timer: null,
      proInfo:{},
      noteInfo: [
        {
          prefix: "·",
          content: "被邀请加入项目字体颜色",
          colorName: "黄色",
          style: { color: "#edc800", fontWeight: "bold" }
        },
        {
          prefix: "·",
          content: "自己创建的项目字体颜色",
          colorName: "蓝色",
          style: { color: "#3db2ea", fontWeight: "bold" }
        },
        {
          prefix: "·",
          content: "被邀请参与的项目字体颜色",
          colorName: "黑色",
          style: { color: "#181818", fontWeight: "bold" }
        },
        {
          prefix: "·",
          content: "您已归档的项目字体颜色",
          colorName: "深灰",
          style: { color: "#676767", fontWeight: "bold" }
        },
        {
          prefix: "·",
          content: "您已退出并删除的项目字体颜色",
          colorName: "浅灰",
          style: {
            color: "#a9a9a9",
            textDecoration: "line-through",
            fontWeight: "bold"
          }
        }
      ],
      searchArr: [],
      tableData: []
    };
  },
  computed: {
    ...mapState({
      sWHeight: state => state.sWHeight,
      proTitle:state => state.proTitle,
    })
  },

  methods: {
    current_change(currentPage) {
      this.currentPage = currentPage;
    

      // console.log(this.tableData.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize))
    },

    ...mapMutations(["proTitleChang", "showLoading"]),
    //  craetChangproTitle(title){
    //  this.proTitleChang(title)
    //  this.$router.push('/project/createpro')
    // },
    TimePro(time, nic) {
      if (!time) {
        return "0000" + nic + "00" + nic + "00" + " " + "00:00:00";
      } else {
        return getToTime(time, nic);
      }
    },
    handChangproTitle(obj,url) {
      this.showLoading(true);
      if(obj.uStatus=== '4'){
        // console.log(obj.uStatus,obj.proId,'这里是未完成的项目创建页面')
      this.$router.push({
          path: '/project/step_1',
          query: {
            projectId: obj.proId,
            shortName:obj.shortName,
          }
        });
      }else{
  let StorageObj={
        orgName:obj.orgName,
        protitle:obj.protitle,
        proId:obj.proId,
          title:obj.title,
          period:obj.period,
          userId:getStorage("userInfo").id,
      }
      setStorage('proInfo',StorageObj)
      this.$router.push(url);
      }
    },
    indexMethod(index) {
      return index * 1 + 1;
    },

    handleCommand(command) {
      // console.log(command)
      this.loading = true;
      let obj = {
        page: "1",
        size: "999",
        userId: getStorage("userInfo").id,
        // type:'0'
        type: command
      };
      getPostInfo("yq_api/project/listByCondition", obj)
        .then(res => {
          let data = res.data;
          if (data.code === 200) {
            data = data.data;
      
            setKeyIndex(data);
            this.searchArr = this.tableData = data;
            // console.log(this.tableData)
        
            
            this.total = data.length;
            this.currentPage = 1;
         
            this.loading = false;
          }
        })
        .catch(err => {
         
          console.log(err);
        });
    },
    setTaskState(isMyProject, status, uStatus) {
     return statusColor(isMyProject, status, uStatus)
    }
  },
  mounted() {
     this.proInfo = this.$store.state.proTitle;
  },
  created() {
    this.handleCommand("10");
  },

  watch: {
    searchInput() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        let result = [];

        this.searchArr.forEach(e => {
          if (e.shortName.indexOf(this.searchInput) > -1) {
            result.push(e);
          }
        });

        setKeyIndex(result);
        this.total = result.length;
        this.currentPage = 1;
        if(result.length){
           this.showProUl = false
          this.tableData = result;
         
        }else{

          this.showProUl = true;

        }

    
      }, 100);
    },
    deep: true
  }
};
</script>
<style>
</style>