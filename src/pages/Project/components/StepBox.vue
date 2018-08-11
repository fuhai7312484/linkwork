<template>
    <div class="stepBox">
  <el-steps direction="vertical" :active="active" finish-status="success">
    <el-step title="项目信息填写" description="请填写项目信息"></el-step>
    <el-step title="公司信息填写" description="填写公司信息"></el-step>
    <el-step title="我在项目中的个人信息" description="到这里你就成功了"></el-step>
  </el-steps>
</div>
</template>
<script>
export default {
    name:'StepBox',
    props: ['active']
}
</script>
<style>

</style>

