<template>
    <div>
    
        <div id="allmap" ref="allmap"></div>
      <div id="r-result" ref="r-result"></div>
    </div>
</template>
<script>
export default {
  name: "ShowbaiduMap",
  props: ['coordinate'],
  data() {
    return {};
  },
  methods: {
    map() {
      function G(id) {
        return document.getElementById(id);
      }
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(this.coordinate.lon*1,this.coordinate.lat*1);
      map.centerAndZoom(point, 14);
      map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
	  map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
      var marker = new BMap.Marker(point); // 创建标注
      map.addOverlay(marker); // 将标注添加到地图中
    }
  },
  mounted() {
    this.map();
  },
  watch: {
    coordinate:{
      handler(newValue,oldValue){
        this.coordinate = newValue;
         this.map();

      },
      deep:true,
      
    }
  }
};
</script>
<style>
#allmap {
  height: 300px;
}
</style>

