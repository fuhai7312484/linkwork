<template>
   <div>
        这里是第三步

<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
    {{mapSearch}}
    经度：{{lat}} 纬度：{{lng}}

	  <!-- <div id="r-result">请输入:
            <input type="text" id="suggestId" size="20" value="百度" style="width:150px;" />
        </div> -->
        <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>

    
 <el-form-item label="个人常用地址">
        <el-input v-model="mapSearch" @focus="mapSearchFocus($event)" id="suggestId" placeholder="请输入详细地址或拖拽地址坐标点选地址"></el-input>
      </el-form-item>

        <div id="allmap" ref="allmap"></div>
        <div id="r-result" ref="r-result"></div>


        </el-form> 

<el-button tag="el-button" @click="handNext" style="margin-top: 12px;">
编辑完成，下一步
</el-button>
    </div>
</template>
<script>

export default {
    name:'Step3',
    data(){
        return{
          mapSearch:'',
          lat:0,
          lng:0,
            ruleForm:{
            
            },
            rules:{},

        }
    },
       methods:{
        handNext(){
        this.$emit('next')
        },
             mapSearchFocus(ev) {
ev.currentTarget.select();
if(ev.target.value.length>=6)this.scaleVisible = true;
},

         map(){




             console.log(this.mapSearch)
             let _that = this;
     
var map = new BMap.Map(this.$refs.allmap);              //创建Map实例
//<c:if test='${empty awardInfo.baiduMapLng}'>
//	map.centerAndZoom('哈尔滨市', 12);
//</c:if>
//<c:if test='${not empty awardInfo.baiduMapLng}'>
//	var point = new BMap.Point(${awardInfo.baiduMapLng}, ${awardInfo.baiduMapLat});
//	map.centerAndZoom(point, 18);
//	var marker = new BMap.Marker(point);
//	map.addOverlay(marker);
//	marker.enableDragging();
//	marker.addEventListener('dragend', function(e){
//		document.getElementById('lnglat').innerHTML = '当前坐标：' + e.point.lng + ", " + e.point.lat;
//	});
//</c:if>
//上面使用的是JSP中的C标签,适用于需要读取数据库中储存的坐标,然后将位置信息显示在地图中,并添加可拖拽标注
//var point = new BMap.Point(116.404, 39.915); //创建点坐标
//map.centerAndZoom(point, 15);                //初始化地图(设置中心点坐标和地图缩放级别)
map.centerAndZoom("北京市", 12);              //初始化地图(设置城市名和地图缩放级别)
map.addControl(new BMap.NavigationControl());  //添加平移缩放控件
map.addControl(new BMap.ScaleControl());       //添加比例尺控件
map.addControl(new BMap.OverviewMapControl()); //添加缩略地图控件
map.enableScrollWheelZoom();                   //启用滚轮放大缩小
//map.disableDragging();                       //禁止地图拖拽
//map.enableDragging();                        //允许地图拖拽(默认为允许)
 
 
/**
 * 浏览器定位(状态码说明如下)
 * BMAP_STATUS_SUCCESS            : 检索成功,对应数值"0"
 * BMAP_STATUS_CITY_LIST          : 城市列表,对应数值"1"
 * BMAP_STATUS_UNKNOWN_LOCATION   : 位置结果未知,对应数值"2"
 * BMAP_STATUS_UNKNOWN_ROUTE      : 导航结果未知,对应数值"3"
 * BMAP_STATUS_INVALID_KEY        : 非法密钥,对应数值"4"
 * BMAP_STATUS_INVALID_REQUEST    : 非法请求,对应数值"5"
 * BMAP_STATUS_PERMISSION_DENIED  : 没有权限,对应数值"6"(自1.1新增)
 * BMAP_STATUS_SERVICE_UNAVAILABLE: 服务不可用,对应数值"7"(自1.1新增)
 * BMAP_STATUS_TIMEOUT            : 超时,对应数值"8"(自1.1新增)
 */
var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function(r){
	console.log('浏览器定位的状态码为：' + this.getStatus());
	if(this.getStatus() == BMAP_STATUS_SUCCESS){
		var mk = new BMap.Marker(r.point);
		map.addOverlay(mk);
		map.panTo(r.point);
		document.getElementById('lnglat').innerHTML = '当前坐标：' + r.point.lng + ", " + r.point.lat;
	}else{
		//switch(this.getStatus()){
		//	case 6 : document.getElementById('lnglat').innerHTML = '请求未授权,无法提供定位服务'; break;
		//	default: document.getElementById('lnglat').innerHTML = '无法获取当前位置,您可移动地图查看'; break;
		//}
		new BMap.LocalCity().get(function(result){
			console.log('IP定位获取当前城市：' + result.name);
			map.setCenter(result.name);
		});
	}
},{enableHighAccuracy:true});
 
 
/**
 * 地图查看
 */
function showMap(){
	var address = document.getElementById('address').value;
	if('' == address){
		document.getElementById('lnglat').innerHTML = '请输入地址';
		return;
	}
	//创建地址解析器实例
	var myGeo = new BMap.Geocoder();
	//将地址解析结果显示在地图上,并调整地图视野
	myGeo.getPoint(address, function(point){
		if(point){
			map.centerAndZoom(point, 16);
			map.clearOverlays();                 //清除地图上所有的标记(map.removeOverlay(marker)可清除单个标注)
			var marker = new BMap.Marker(point); //创建标注
			map.addOverlay(marker);              //将标注添加到地图中
			marker.enableDragging();             //设置标注可拖拽(默认为不可拖拽)
			//百度坐标是先经度,再纬度,即Point(lng, lat)
			//谷歌坐标的顺序与百度恰好相反,是(lat, lng)
			//也可这样获取坐标-------------------->marker.getPosition().lng和marker.getPosition().lat;
			document.getElementById('lnglat').innerHTML = '当前坐标：' + point.lng + ", " + point.lat;
			//监听标注的拖拽事件,以便实时获取标注拖拽后的坐标
			marker.addEventListener('dragend', function(e){
				document.getElementById('lnglat').innerHTML = '当前坐标：' + e.point.lng + ", " + e.point.lat;
			});
		}
	}, '哈尔滨市');
}

    
    }
    },
     mounted(){
          this.$emit("next", 2);
        this.map()
 
  },watch: {
      mapSearch(){
          this.mapSearch = this.mapSearch;
      }
  }

}
</script>
<style>


#allmap{
  height: 350px;
  overflow: hidden;
 
}

</style>


