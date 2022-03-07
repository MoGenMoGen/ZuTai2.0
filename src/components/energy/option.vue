<!-- 自定义配置 -->
<template>
  <div>
    <el-form-item label="用电量总量">
      <el-input  v-model="main.activeOption.ydlzl"></el-input>
    </el-form-item>
    <el-form-item label="用电量">
      <el-input type="textarea" :rows="5"  v-model="main.activeOption.ydl"></el-input>
    </el-form-item>

    <el-form-item label="用水量总量">
      <el-input  v-model="main.activeOption.yslzl"></el-input>
    </el-form-item>
    <el-form-item label="用水量">
      <el-input type="textarea" :rows="5"  v-model="main.activeOption.ysl"></el-input>
    </el-form-item>

    <el-form-item label="燃气用量总量">
      <el-input  v-model="main.activeOption.yqlzl"></el-input>
    </el-form-item>
    <el-form-item label="燃气用量">
      <el-input type="textarea" :rows="5"  v-model="main.activeOption.yql"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  inject: ["main"]
}
</script>

<style>
</style>
