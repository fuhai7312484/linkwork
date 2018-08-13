<template>
  <div id="app">
    <!-- <g-header></g-header> -->
    <router-view/>
    <!-- <g-footer></g-footer> -->
    
  </div>
</template>

<script>
import './assets/style/global.css';
import './assets/style/tools.css';
// import GHeader from './components/Header.vue'
// import GFooter from './components/Footer.vue'


export default {

  name: 'App',
  components: {
    // GHeader,
    // GFooter,
  }
//   created(){
//     this.$store.dispatch('getUser');
// }
}
</script>

<style>

</style>
