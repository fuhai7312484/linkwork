<template>
  <el-row>
    <g-header></g-header>
    <left-menu></left-menu>


    <div class="demo-split" :style="{height:sWHeight}">
      <Split v-model="split1">
        <div slot="left" class="demo-split-pane">


          <div v-for="(itme,index) in data" :key="(index+1)">
            <ul>
              <li>
                {{itme.shortName}}-({{itme.typeName}})<br/>
                <ul>
                  <li v-for="(org,index) in itme.orgLeader" :key="(index+2)" class="custom-treeImgBox">
                    -- <img :src="org.mainPic">{{org.userName}}
                  </li>
                  <li v-for="(depList,index) in itme.departmentList" :key="(index+3)">
                    --{{depList.departmentName}}
                    <ul>
                      <li v-for="(pur,index) in depList.purList" :key="(index+4)" class="custom-treeImgBox">
                        -------
                        <img :src="pur.mainPic"> {{pur.userName}}
                      </li>
                    </ul>
                  </li>
                  <li v-for="(orgMem,index) in itme.orgMember" :key="index" class="custom-treeImgBox">
                    --<img :src="orgMem.mainPic"> {{orgMem.userName}}


                  </li>
                </ul>
              </li>
            </ul>


          </div>








          <!-- <el-tree
        :data="data"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick">
        <span class="custom-tree-node" slot-scope="{ node, data }">
        <span class="custom-treeImgBox"><img :src="data.mainPic" v-if="data.mainPic">{{ node.label }}</span>
       
       
       
        <span>
          <el-button type="text" size="mini" @click="() => append(data)">
            Append
          </el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">
            Delete
          </el-button>
        </span> 
      </span>
      </el-tree> -->

        </div>
        <div slot="right" class="demo-split-pane">
          <router-view></router-view>
          个人信息
           {{data}}
          <!-- {{proTitle}} -->
        </div>
      </Split>
    </div>




    <!-- <div class="remarkBox" :style="{height:sWHeight}">
      <div class="proTitleBox">
           <ul class="DiaryTabs">
通讯录
            </ul> 
      </div>
    </div>
    


      <div class="contentBox">
    
        

      </div> -->

    <right-menu></right-menu>
    <g-footer></g-footer>
  </el-row>

</template>
<script>
  import LeftMenu from "@/components/LeftMenu";
  import RightMenu from "@/components/RightMenu";
  import GHeader from "@/components/Header.vue";
  import GFooter from "@/components/Footer.vue";
  import { getPostInfo, getStorage } from "../../assets/lib/myStorage.js";
  import { mapState, mapMutations } from "vuex";

  export default {
    name: "AddressIndex",
    data() {
      return {
        split1: 0.3,
        data: [],
        // data: [
        //   {
        //     label: "一级 1",
        //     children: [
        //       {
        //         label: "二级 1-1",
        //         children: [
        //           {
        //             label: "三级 1-1-1"
        //           }
        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     label: "一级 2",
        //     children: [
        //       {
        //         label: "二级 2-1",
        //         children: [
        //           {
        //             label: "三级 2-1-1"
        //           }
        //         ]
        //       },
        //       {
        //         label: "二级 2-2",
        //         children: [
        //           {
        //             label: "三级 2-2-1"
        //           }
        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     label: "一级 3",
        //     children: [
        //       {
        //         label: "二级 3-1",
        //         children: [
        //           {
        //             label: "三级 3-1-1"
        //           }
        //         ]
        //       },
        //       {
        //         label: "二级 3-2",
        //         children: [
        //           {
        //             label: "三级 3-2-1"
        //           }
        //         ]
        //       }
        //     ]
        //   }
        // ],
        defaultProps: {
          children: "children",
          //  "departmentList",
          label: "label",
          mainPic: "mainPic"
        }
      };
    },
    components: {
      LeftMenu,
      RightMenu,
      GHeader,
      GFooter
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo,
        sWHeight: state => state.sWHeight,
        proTitle: state => state.proTitle
      })
    },
    methods: {
      ...mapMutations(["changeLogin", "getScrllH"]),

      handleNodeClick(data) {
        // this.$router.push('/')
        console.log(data);
      }
    },
    mounted() {
      let addObj = {
        userId: getStorage("userInfo").id,
        projectId: this.proTitle.proId
      };
      console.log(addObj);
      getPostInfo("/yq_api/orgDepartment/searchLinkmanList", addObj).then(res => {
        if (res.data.code === 200) {
          let data = res.data.data.orgList;
          console.log(data);
          // let newData = [];
          // data.forEach(e => {
          //   let pObj = {
          //     label: e.shortName + "-" + "(" + e.typeName + ")",
          //     children: []
          //   };
          //   e.departmentList.forEach(el => {
          //     // let children =[]

          //     let cobj = {
          //       label: el.departmentName,
          //       children:[],
          //     };

          //     el.purList.forEach(ele => {

          //       let eleObj={
          //         label:ele.userName,
          //         mainPic:ele.mainPic,
          //       }
          //       // ele.label = ele.userName;
          //       cobj.children.push(eleObj);
          //     });

          //     console.log(e.orgMember)
          //     pObj.children.push(cobj);

          //   });
          //   newData.push(pObj);
          // });
          // this.data = newData;

          this.data = data;
          console.log(this.data);
        }
      });
    }
  };
</script>
<style>
</style>