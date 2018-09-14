<template>
    <div>
        <!-- {{ruleForm.mapSearch}}{{ruleForm.lat}}{{ruleForm.lng}} -->
  <div class="secrecyBox" style="margin-bottom:10px;">
        <div class="secrecyLeft">
          <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
         
            <el-input v-model="ruleForm.mapSearch" @focus="mapSearchFocus($event)" id="suggestId" placeholder="请输入详细地址或拖拽地址坐标点选地址"></el-input>
      
        </div>
       
        <!-- <span @click="baiduMapToParent">
            提交位置

        </span> -->
    
      </div>
<!-- {{post}} -->

        <div id="allmap" ref="allmap"></div>
      <div id="r-result" ref="r-result"></div>
     

    </div>
</template>
<script>
export default {
    name:'EditbaiduMap',
      props:['post'],
    
    data(){
        return {
    ruleForm: {
             mapSearch: "",
             lat: 0,
             lng: 0,

    }

        }
    },
  
    methods:{

        baiduMapToParent(){
            this.$emit('baiduMapFromChild',{name:this.ruleForm.mapSearch,lat:this.post.lat,lng:this.post.lng})
        },

           mapSearchFocus(ev) {
      ev.currentTarget.select();
      if (ev.target.value.length >= 6) this.scaleVisible = true;
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

    
    // console.log(this.post.lat,this.post.lon)
      
      var initLat = this.post.lat*1;
      var initLng = this.post.lng*1;
      var point = new BMap.Point(initLng, initLat);

      map.centerAndZoom(point, 14);
      // 初始化地图,设置城市和地图级别。
      //   var marker = new BMap.Marker(point);        // 创建标注
      // map.addOverlay(marker);
      map.enableScrollWheelZoom(); // 启用滚轮放大缩小
      map.addControl(new BMap.NavigationControl()); // 启用放大缩小 尺
 
      var marker = new BMap.Marker(point); // 创建标注
      map.addOverlay(marker); // 将标注添加到地图中
      marker.addEventListener("dragend", showInfo);
      marker.enableDragging();
       getAddress(point);

      var ac = new BMap.Autocomplete({
        //建立一个自动完成的对象
        input: "suggestId",
        location: map
      });

      //获取当前位置
      // var geolocation = new BMap.Geolocation();
      // geolocation.getCurrentPosition(function(r) {
      //   if (this.getStatus() == BMAP_STATUS_SUCCESS) {
      //     ac = new BMap.Marker(r.point);
      //     ac.addEventListener("dragend", showInfo);
      //     ac.enableDragging(); //可拖拽
      //     getAddress(r.point);
      //     map.addOverlay(ac); //把点添加到地图上
      //     map.panTo(r.point);
      //     _that.post.lat = r.point.lat;
      //     _that.post.lon = r.point.lng;
      //     // console.log(r.point)
      //   } else {
      //     alert("failed" + this.getStatus());
      //   }
      // });

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
          _that.baiduMapToParent()

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
          _that.post.lat = pp.lat;
          _that.post.lng = pp.lng;
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
          _that.post.lat = e.point.lat;
          _that.post.lng = e.point.lng;
           _that.baiduMapToParent()
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
            _that.baiduMapToParent()
        });
      }
    },
    
    },
    mounted(){
    this.map()
  }
}
</script>
<style>
#allmap{
    height: 300px;
}

</style>

