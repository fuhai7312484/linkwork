<template>
  <div>
   
    <div class="remarkBox" :style="{height:sWHeight}">
      <div class="proTitleBox">
        <h1>
          链工作APP项目
        
        </h1>
        <h2>标题名称：项目</h2>
        <h3>节点：测试</h3>
      </div>

      <router-link tag="div" to="/project/createpro" class="proCreateBtn">
        <span class="iconfont addproIcon">&#xe659;</span>创建项目</router-link>

      <div class="remark">
        <h3>
          注释：
        </h3>
        <p>
          <el-progress type="circle" :width="28" :percentage="45"></el-progress>
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
        {{searchInput}}
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
                    <el-dropdown-item command="创建时间"> 创建时间</el-dropdown-item>
                    <el-dropdown-item command="未读信息">未读信息</el-dropdown-item>
                     <el-dropdown-item command="使用频率数"> 使用频率数</el-dropdown-item>
                    <el-dropdown-item command="创建人完成度">创建人完成度</el-dropdown-item>
                     <el-dropdown-item command="个人完成度"> 个人完成度</el-dropdown-item>
                    <el-dropdown-item command="参与人数">参与人数</el-dropdown-item>
                     <el-dropdown-item command="已完结"> 已完结</el-dropdown-item>
                    <el-dropdown-item command="删除并退出的">删除并退出的</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

            <div class="sortSeesaw">
              <div class="sortUp"></div>
              <div class="sortDown"></div>

            </div>

          </div>

        </div>
        <ul>
          <li class="porList" v-for="(item, index) in tableData" :key="index">
            <div class="porListNameBox">
              <el-col :span="16" class="porListTitle">
                <h2 :style="setTaskState(item.taskState)">
                  {{indexMethod(index)}}.{{item.name}}
                </h2>
              </el-col>

              <el-col :span="3" class="RingType">
                <el-progress type="circle" :width="39" :percentage="item.progress"></el-progress>
              </el-col>
              <el-col :span="3" class="RingType">
                <el-progress type="circle" color="#e9cf33" :width="39" :percentage="item.task"></el-progress>
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
                创建时间:{{item.createDate}}
              </el-col>
              <el-col :span="10">加入时间:{{item.addInDate}}</el-col>
              <el-col :span="4"> 参与人数:{{item.num}}</el-col>
            </div>
          </li>
        </ul>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { autodivheight } from "../../../assets/lib/myStorage.js";
  import { mapState } from "vuex";
  export default {
    name: "ProList",
    data() {
      return {
        searchInput: '',
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

        tableData: [
          {
            name: "链工作APP项目",
            createDate: "2016-05-03",
            addInDate: "2018-04-12",
            progress: 36,
            task: 12,
            num: 12,
            taskState: 1,
          },
          {
            name: "链工作开发与测试项目阶段一的开发",
            createDate: "2016-05-03",
            addInDate: "2018-04-12",
            progress: 90,
            task: 51,
            num: 7,
            taskState: 2,
          },
          {
            name: "链工作开发与测试项目阶段一的开发",
            createDate: "2016-05-03",
            addInDate: "2018-04-12",
            progress: 17,
            task: 1,
            num: 7,
            taskState: 3,
          },
          {
            name: "链工作开发与测试项目阶段一的开发",
            createDate: "2016-05-03",
            addInDate: "2018-04-12",
            progress: 58,
            task: 99,
            num: 7,
            taskState: 4,
          },
          {
            name: "链工作开发与测试项目阶段一的开发",
            createDate: "2016-05-03",
            addInDate: "2018-04-12",
            progress: 28,
            task: 37,
            num: 7,
            taskState: 5,
          },
             {
            name: "链工作开发与测试项目阶段一的开发",
            createDate: "2016-05-03",
            addInDate: "2018-04-12",
            progress: 90,
            task: 51,
            num: 7,
            taskState: 2,
          },
          {
            name: "链工作开发与测试项目阶段一的开发",
            createDate: "2016-05-03",
            addInDate: "2018-04-12",
            progress: 17,
            task: 1,
            num: 7,
            taskState: 3,
          },
          {
            name: "链工作开发与测试项目阶段一的开发",
            createDate: "2016-05-03",
            addInDate: "2018-04-12",
            progress: 58,
            task: 99,
            num: 7,
            taskState: 4,
          },
          {
            name: "链工作开发与测试项目阶段一的开发",
            createDate: "2016-05-03",
            addInDate: "2018-04-12",
            progress: 28,
            task: 37,
            num: 7,
            taskState: 5,
          },

        ]
      };
    },
    computed: {
      ...mapState({
        sWHeight: state => state.sWHeight
      })
    },
    methods: {
      indexMethod(index) {
        return (index * 1) + 1;
      },
      handleCommand(command) {
        console.log(command)
        // this.$message('click on item ' + command);
      },
      setTaskState(state) {
        switch (state) {
          case 1:
            return { color: "#edc800" }
            break;
          case 2:
            return { color: "#3db2ea" }
            break;
          case 3:
            return { color: "#181818" }
            break;
          case 4:
            return { color: "#676767" }
            break;
          case 5:
            return {
              color: "#a9a9a9",
              textDecoration: "line-through",
            }
            break;
        }
        // console.log(state)

      },

    }
  };
</script>
<style>

</style>