<template>
    <div>
        这里是第二步
     
<el-button tag="el-button" @click="handNext" style="margin-top: 12px;">
编辑完成，下一步
</el-button>
    </div>
</template>
<script>
export default {
    name:'Step2',
       methods:{
        handNext(){
        this.$emit('next')
        }
    
    }
}
</script>
<style>

</style>


