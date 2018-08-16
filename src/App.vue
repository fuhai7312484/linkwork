<template>
  <div id="app" v-loading="isLoding" 
   element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0,0,0, .8)">
    <router-view></router-view>
  </div>
</template>

<script>
import './assets/style/global.css';
import './assets/style/tools.css';
// import Loading from './components/loading.vue'
// import GHeader from './components/Header.vue'
// import GFooter from './components/Footer.vue'

 import {mapState,mapGetters} from 'vuex'
export default {

  name: 'App',
  computed: {
    //  ...mapState(['isLoding']),
      ...mapGetters([
 'isLoding',
 ]),
  },
  components: {
  
  },
  created() {


  },

//   created(){
//     this.$store.dispatch('getUser');
// }
}
</script>

<style>


</style>
