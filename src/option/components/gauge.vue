<!-- 刻度盘配置 -->
<template>
  <div>
    <el-form-item label="变量名">
      <el-input placeholder="请输入变量名" v-model="main.activeOption.valueName" clearable @input="updVal"></el-input>
    </el-form-item>
    <el-form-item label="刻度线粗度(像素)">
      <avue-input-number v-model="main.activeOption.lineSize"></avue-input-number>
    </el-form-item>
    <el-form-item label="显示刻度值">
      <avue-switch v-model="main.activeOption.axisLabelShow"></avue-switch>
    </el-form-item>
	<el-form-item label="最小刻度">
	  <avue-input-number v-model="main.activeOption.min"></avue-input-number>
	</el-form-item>
	<el-form-item label="最大刻度">
	  <avue-input-number v-model="main.activeOption.max"></avue-input-number>
	</el-form-item>
	<el-form-item label="单位">
	  <avue-input v-model="main.activeOption.unit"></avue-input>
	</el-form-item>
    <el-form-item label="刻度字号">
      <avue-input-number v-model="main.activeOption.axisLabelFontSize"></avue-input-number>
    </el-form-item>
    <el-form-item label="指标名称字号">
      <avue-input-number v-model="main.activeOption.nameFontSize"></avue-input-number>
    </el-form-item>
    <el-form-item label="指标字号">
      <avue-input-number v-model="main.activeOption.valueFontSize"></avue-input-number>
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