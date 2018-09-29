<template>
  <div>
    <div class="stepH1Title">
      <h1>我在项目中的个人信息</h1>
    </div>
    {{UploadUrl()}}
    <!-- {{userInfo}}--- {{ruleForm.sex}} -->
    <!-- {{ruleForm.nickname}} -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <div class="proUserInfoBox">
        <div class="proUserAvatarBox">
          <el-upload class="AvatImgBox" :action="UploadUrl()" :show-file-list="false" :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img :src="ruleForm.AvatImageUrl" class="avatar">
            <div class="editAvatar">
              <i class="el-icon-edit"></i> 编辑
            </div>
          </el-upload>
          <p class="proUserName">
            {{userInfo.name}}
          </p>
        </div>
        <div class="proUserInfoInputs">
          <div class="secrecyBox marginBot">
            <div class="secrecyLeft">
              <el-form-item label="账号">
                <el-input v-model="ruleForm.UserMobile" :disabled="true" placeholder="请输入账号"></el-input>
              </el-form-item>
            </div>
            <div class="secrecyRight">
              <el-checkbox v-model="ruleForm.UserSecret">保密</el-checkbox>
            </div>
          </div>
          <div class="secrecyBox marginBot">
            <div class="secrecyLeft">
              <el-form-item label="昵称">
                <el-input v-model="ruleForm.nickname" @blur="nicknameBlur($event)" placeholder="请输入昵称"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="secrecyBox marginBot">
            <div class="secrecyLeft">
              <el-form-item label="性别">
                <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
                <el-radio v-model="ruleForm.sex" label="0">女</el-radio>
              
              </el-form-item>
            </div>
            <div class="secrecyRight">
              <el-checkbox v-model="ruleForm.sexSecret">保密</el-checkbox>
            </div>
          </div>
        </div>
      </div>
      <div class="secrecyBox">
        <div class="secrecyLeft">
          <el-form-item label="联系方式" prop="mobile">
            <el-input v-model="ruleForm.mobile" placeholder="请输入联系方式"></el-input>
          </el-form-item>
        </div>
        <div class="secrecyRight">
          <el-checkbox v-model="ruleForm.mobileSecret">保密</el-checkbox>
        </div>
      </div>
      <div class="secrecyBox">
        <div class="secrecyLeft">
          <el-form-item label="邮箱" prop="email" 
    >
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </div>
        <div class="secrecyRight">
          <el-checkbox v-model="ruleForm.emailSecret">保密</el-checkbox>
        </div>
      </div>
      <el-form-item label="职称">
        <el-input v-model="ruleForm.jobTitle" placeholder="请输入职称"></el-input>
      </el-form-item>
      <div class="hr"></div>
      <div class="secrecyBox">
        <div class="secrecyTop">
          <div class="secrecyLeft">
            <h2>技能标签（擅长点、爱好、推销亮点）</h2>
          </div>
          <div class="secrecyRight">
            <el-checkbox v-model="ruleForm.tagSecret">保密</el-checkbox>
          </div>
        </div>
        <div class="secrecyBottem">
          <el-tag :key="index" v-for="(tag,index) in ruleForm.dynamicTags" closable :disable-transitions="false" @close="handleClose(tag.name)">
            {{tag.name}}
          </el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">
            <i class="el-icon-plus"></i> 添加标签</el-button>
        </div>
        <div class="secrecyBottem">
          <h4 style="color:#fda446">
            您提供的信息越详细准确，越方便他人检索到您，与您建立更好的合作关系。 例如：“电气工程师”“建筑师”。
          </h4>
        </div>
      </div>

      <div class="hr"></div>
      <!-- {{ruleForm.mapSearch}} -->

      <!-- 经度：{{ruleForm.lng}}纬度：{{ruleForm.lat}} -->


      <div class="secrecyBox">
        <div class="secrecyLeft">
          <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
          <el-form-item label="工作常用地址">
            <el-input v-model="ruleForm.mapSearch" @focus="mapSearchFocus($event)" id="suggestId" placeholder="请输入详细地址或拖拽地址坐标点选地址"></el-input>
          </el-form-item>
        </div>
        <div class="secrecyRight">
          <el-checkbox v-model="ruleForm.mapAddSecret">保密</el-checkbox>
        </div>
      </div>



      <div id="allmap" ref="allmap"></div>
      <div id="r-result" ref="r-result"></div>
      <div class="hr"></div>
      
      <el-form-item label="个人说明">
        <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 14}" placeholder="请输入个人说明" v-model="ruleForm.textarea">
        </el-input>
      </el-form-item>

    </el-form>
    <div class="stepBtnStyle">
      <el-button tag="el-button" @click="submitForm('ruleForm')" type="primary">
        编辑完成，继续编辑个人信息
      </el-button>
    </div>

  </div>
</template>
<script>
import router from "../../../router";
import {
  getStorage,
  setStorage,
  getPostInfo,
  getAnnexUrl
} from "../../../assets/lib/myStorage.js";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Step3",
  data() {
    return {
      userInfo: {},
      inputVisible: false,
      inputValue: "",
      checked5: false,
      ruleForm: {
        AvatImageUrl: "",
        AvatImgName: "",
        UserMobile: "",
        UserSecret: false,
        nickname: "",
        sex: "1",
        sexSecret: false,
        mobile: "",
        mobileSecret: false,
        email: "",
        emailSecret: false,
        jobTitle: "",
        team: "单位A",
        section: "",
        tagSecret: false,
        dynamicTags: [],
        mapAddSecret: false,
        mapSearch: "",
        lat: 0,
        lng: 0,
        textarea: ""
      },
      rules: {
        email:[
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
        ],
        mobile: [
          {
            required: true,
            message: "请输入正确格式的联系方式",
            trigger: "blur"
          },
          {
            min: 0,
            max: 11,
            message: "联系方式为11位的手机号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      create1proId: state => state.create1proId,
      create2orgId: state => state.create2orgId
    })
  },
  methods: {
    ...mapMutations(["setcreate1proId", "setcreate2orgId"]),
    nicknameBlur(ev) {
      this.ruleForm.nickname
        ? this.ruleForm.nickname
        : (this.ruleForm.nickname = this.userInfo.name);
    },
          UploadUrl(){
               return getAnnexUrl();
        
    },
    open4(msg) {
      this.$message({
        message: msg,
        type: "error"
      });
    },
       open2(msg) {
        this.$message({
          message: msg,
          type: 'success'
        });
      },

    handNext() {
      this.$emit("next");
    },
    mapSearchFocus(ev) {
      ev.currentTarget.select();
      if (ev.target.value.length >= 6) this.scaleVisible = true;
    },

    //添加或者删除标签
    handleClose(tag) {
      this.ruleForm.dynamicTags.splice(
        this.ruleForm.dynamicTags.indexOf(tag),
        1
      );
    },

    showInput() {
      //  console.log(this.ruleForm.dynamicTags.length)
      if (this.ruleForm.dynamicTags.length >= 9) {
        this.open4("技能标签最多只可填写9个");
        // console.log('大于9个了')
      } else {
        this.inputVisible = true;

        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      }
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        if (inputValue.length >= 10) {
          this.open4("技能标签最多10字符");
        } else {
          this.ruleForm.dynamicTags.push({ name: inputValue });
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    //百度地图API
    map() {
      // console.log(this.ruleForm.mapSearch);
      let _that = this;

      function G(id) {
        return document.getElementById(id);
      }
      //  let map =new BMap.Map(this.$refs.allmap); // 创建Map实例
      var map = new BMap.Map(this.$refs.allmap);
      var initLat = 39.916527;
      var initLng = 116.397128;
      var point = new BMap.Point(initLng, initLat);

      map.centerAndZoom(point, 13);
      // 初始化地图,设置城市和地图级别。
      //   var marker = new BMap.Marker(point);        // 创建标注
      // map.addOverlay(marker);
      map.enableScrollWheelZoom(); // 启用滚轮放大缩小
      map.addControl(new BMap.NavigationControl()); // 启用放大缩小 尺

      var ac = new BMap.Autocomplete({
        //建立一个自动完成的对象
        input: "suggestId",
        location: map
      });

      //获取当前位置
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          ac = new BMap.Marker(r.point);
          ac.addEventListener("dragend", showInfo);
          ac.enableDragging(); //可拖拽
          getAddress(r.point);
          map.addOverlay(ac); //把点添加到地图上
          map.panTo(r.point);
          _that.ruleForm.lat = r.point.lat;
          _that.ruleForm.lng = r.point.lng;
          // console.log(r.point)
        } else {
          alert("failed" + this.getStatus());
        }
      });

      ac.addEventListener("onhighlight", function(e) {
        //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
          value =
            _value.province +
            _value.city +
            _value.district +
            _value.street +
            _value.business;
        }
        str =
          "FromItem<br />index = " +
          e.fromitem.index +
          "<br />value = " +
          value;

        value = "";
        if (e.toitem.index > -1) {
          _value = e.toitem.value;
          value =
            _value.province +
            _value.city +
            _value.district +
            _value.street +
            _value.business;
        }
        str +=
          "<br />ToItem<br />index = " +
          e.toitem.index +
          "<br />value = " +
          value;
        G("searchResultPanel").innerHTML = str;
      });

      var myValue;

      ac.addEventListener("onconfirm", function(e) {
        //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        // console.log(_value);
        myValue =
          _value.province +
          _value.city +
          _value.district +
          _value.street +
          _value.business;
        _that.ruleForm.mapSearch = myValue;

        G("searchResultPanel").innerHTML =
          "onconfirm<br />index = " +
          e.item.index +
          "<br />myValue = " +
          myValue;
        // showInfo(e);
        setPlace();
      });

      function setPlace() {
        map.clearOverlays(); //清除地图上所有覆盖物
        function myFun() {
          var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
          map.centerAndZoom(pp, 18);
          _that.ruleForm.lat = pp.lat;
          _that.ruleForm.lng = pp.lng;
          //   console.log(pp.lat,pp.lng)
          let marker = new BMap.Marker(pp);

          map.addOverlay(marker); //添加标注
          marker.addEventListener("dragend", function(e) {
            showInfo(e);
          });
          marker.enableDragging(); //设置标注点可移动
        }
        var local = new BMap.LocalSearch(map, {
          //智能搜索
          onSearchComplete: myFun
        });
        local.search(myValue);
      }
      //绑定Marker的拖拽事件
      function showInfo(e) {
        // console.log(e);
        var gc = new BMap.Geocoder();
        gc.getLocation(e.point, function(rs) {
          var addComp = rs.addressComponents;
          var address =
            addComp.province +
            addComp.city +
            addComp.district +
            addComp.street +
            addComp.streetNumber; //获取地址
          _that.ruleForm.mapSearch = address;
          _that.ruleForm.lat = e.point.lat;
          _that.ruleForm.lng = e.point.lng;
        });
      }
      //获取地址信息，设置地址label
      function getAddress(point) {
        var gc = new BMap.Geocoder();

        gc.getLocation(point, function(rs) {
          var addComp = rs.addressComponents;
          var address =
            addComp.province +
            addComp.city +
            addComp.district +
            addComp.street +
            addComp.streetNumber; //获取地址
          _that.ruleForm.mapSearch = address;
        });
      }
    },

    handleAvatarSuccess(res, file) {
      // console.log(URL.createObjectURL(file.raw))

      this.ruleForm.AvatImageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.AvatImgName = file.name;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isBMP = file.type === "image/bmp";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error("上传头像图片只能是 JPG/png/gif/bmp 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isJPG || isPNG || isGIF || isBMP) && isLt2M;
    },

    handChangproTitle(obj, url) {
      // let obj = {protitle:title,proId:proId}

      setStorage("proInfo", obj);

      // this.proTitleChang(obj);
      this.$router.push(url);

      //   setTimeout(() => {
      //       this.proTitleChang(title)
      //  this.$router.push(url)

      //   }, 1000);

      //  this.proTitleChang(title)
      //  this.$router.push(url)
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        
          let uploadInfo = {
            userId: getStorage("userInfo").id,
            projectId: this.$route.query.projectId,
            orgId: this.$route.query.orgId,
            accountSecrecy: this.ruleForm.UserSecret ? "Y" : "N",
            account: this.ruleForm.UserMobile,
            userName: this.ruleForm.nickname,
            sex: this.ruleForm.sex * 1,
            sexSecrecy: this.ruleForm.sexSecret ? "Y" : "N",
            mobile: this.ruleForm.mobile,
            mobileSecrecy: this.ruleForm.mobileSecret ? "Y" : "N",
            email: this.ruleForm.email,
            emailSecrecy: this.ruleForm.emailSecret ? "Y" : "N",
            levelName: this.ruleForm.jobTitle,
            topicSecrecy:this.ruleForm.tagSecret ? "Y" : "N",
            positionDesc: this.ruleForm.mapSearch,
            positionSecrecy: this.ruleForm.mapAddSecret ? "Y" : "N",
            content: this.ruleForm.textarea,
            positionBdLatitude: this.ruleForm.lat,
            positionBdLongitude: this.ruleForm.lng,
            mainPic: this.ruleForm.AvatImageUrl
          };
       
          let topicList = [];
          for (let i = 0; i < this.ruleForm.dynamicTags.length; i++) {
            topicList.push({});
            topicList[i].name = this.ruleForm.dynamicTags[i].name;
          }
          for (let i = 0; i < this.ruleForm.dynamicTags.length; i++) {
            for (let key in topicList[i]) {
              uploadInfo["topicList[" + i + "]." + key] = topicList[i][key];
            }
          }
  //  console.log(uploadInfo);
          getPostInfo("/yq_api/projectUserRef/addPeople", uploadInfo).then(
            res => {
              if (res.data.code === 200) {
               this.open2('恭喜您！项目创建成功！')
                this.handChangproTitle(
                  {
                    protitle: this.$route.query.shortName,
                    proId: this.$route.query.projectId,
                    orgName: null
                  },
                  "/"
                );
               
                // router.push("/");
                // this.$emit("next", 2);
              }
            }
          );
       
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    if (!this.$route.query.projectId) {
      this.open4("创建项目请先填写项目信息！");
      router.push("/project/step_1");
    }else{
   // console.log(this.$route.query.projectId,this.$route.query.shortName,this.$route.query.orgId)
    this.$emit("next", 2);
    this.map();
    this.ruleForm.UserMobile = this.ruleForm.mobile = getStorage(
      "userInfo"
    ).mobile;
    this.ruleForm.nickname = getStorage("userInfo").name;
    this.userInfo = getStorage("userInfo");
    this.ruleForm.AvatImageUrl = getStorage("userInfo").mainPic;
    }
 
  },
  watch: {
    mapSearch() {
      this.ruleForm.mapSearch = this.ruleForm.mapSearch;
    }
  }
};
</script>
<style>
#allmap {
  height: 350px;
  overflow: hidden;
}

/* .el-tag{margin-top:5px; margin-bottom:5px; } */

.el-tag + .el-tag {
  margin-left: 10px;
}

.input-new-tag {
  width: 100px;
  margin-left: 10px;
  vertical-align: bottom;
}

/* .AvatImgBox .el-upload{
  width: 100px;
  height: 100px;
  background: #000;
  
}

AvatImgBox .avatar-uploader-icon{
  width: 100px;
  height: 100px;
}


   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  } */
</style>