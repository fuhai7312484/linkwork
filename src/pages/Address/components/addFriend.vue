<template>
    <div class="addFriendBox">
        <div class="addFriendTitle">邀请Ta:</div>
     
        <div class="addFriendPad addFriendPro">
<el-radio v-model="radio" label="1">邀请直接加入<span class="addFriendTagColor"> 本单位 </span></el-radio>
 </div>
 <div class="addFriendPad addFriendDep">
  <el-radio v-model="radio" label="2">邀请加入<span class="addFriendTagColor"> 部门 </span></el-radio>
       

        <el-select v-model="value" size="mini" style="width:100px;" placeholder="请选择" v-if="radio==2">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

      <el-select v-model="value1" size="mini" style="width:100px;" placeholder="请选择" v-if="radio==2">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
       
        </div>

        <div class="addPersonsBox">

            
        </div>
    
       
    </div>
</template>
<script>
export default {
  name: "addFriend",
  data() {
    return {
      radio: "1",
      options: [
        {
          value: "0",
          label: "部门A"
        },
  
      ],
       options1: [
        {
          value: "0",
          label: "成员"
        },
  
      ],
      value: "0",
      value1: "0"
    };
  }
};
</script>
<style>
</style>

