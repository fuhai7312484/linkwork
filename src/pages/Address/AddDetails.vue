<template>
    <div class="userDataDetil">
       <!-- {{this.$route.query.uid}} -->
       {{AddressUid}}
       {{userData}}
    </div>
</template>
<script>
import {getPostInfo,getStorage} from "../../assets/lib/myStorage.js";
  import { mapState, mapMutations } from "vuex";
export default {
    name:'addDetails',
    data(){
        return{
            userData:{},
        }
    },
      computed: {
          ...mapState(['AddressUid','proTitle'])
   
    },
    mounted () {
          let addDe = {
            lookUserId:this.AddressUid.uid,
            projectId: this.proTitle.proId,
             userId: getStorage("userInfo").id,
        }
         getPostInfo("/yq_api/projectUserRef/searchProjectUser",addDe).then(
           res=>{
               if(res.data.code===200){
                let data = res.data.data
               this.userData = data
               }
               console.log(res)
           }
         )
    },
    watch: {
         '$route' (to, from) {
             console.log(this.$route.query.uid)
        let addDeObj = {
            lookUserId: this.$route.query.uid,
            projectId: this.proTitle.proId,
             userId: getStorage("userInfo").id,
        }
 getPostInfo("/yq_api/projectUserRef/searchProjectUser", addDeObj).then(
           res=>{
               if(res.data.code===200){
                let data = res.data.data
               this.userData = data
               }
               console.log(res)
           }
         )
 
    },
   
    }
}
</script>
<style>

</style>

