<!-- 自定义配置 -->
<template>
  <div>
	<el-form-item label="图片地址">
	  <el-image style="width: 30px; height: 30px" v-if="main.activeOption.imgUrl"  :src="main.activeOption.imgUrl"   fit="fit">
	  </el-image>
	  <el-button type="text" @click="clickSource">选择图标</el-button>
	</el-form-item>
    <el-form-item label="小车号变量">
      <avue-input v-model="main.activeOption.v1"></avue-input>
    </el-form-item>
    <el-form-item label="产品变量">
      <avue-input v-model="main.activeOption.v2"></avue-input>
    </el-form-item>
    <el-form-item label="颜色变量">
      <avue-input v-model="main.activeOption.v3"></avue-input>
    </el-form-item>
    <el-form-item label="位置变量">
      <avue-input v-model="main.activeOption.v4"></avue-input>
    </el-form-item>
    <el-form-item label="最远位置">
      <avue-input v-model="main.activeOption.v5"></avue-input>
    </el-form-item>
	<imglist ref="imglist"   @change="handleSetImg"></imglist>
  </div>
</template>

<script>
	import imglist from '../../page/group/imglist'
export default {
  inject: ["main"],
  components: {imglist},
  methods: {
  	openImg(){
  		this.$refs.imglist.openImg('activeObj.data.value', 'border');
  	},
  	handleSetImg(val){
		this.main.activeOption.imgUrl = val
  		this.$forceUpdate()
  	},
  	updVal(){
  		this.$forceUpdate();
  	},
  	clickSource() {
  		this.$refs.imglist.openImg('activeObj.data.value', 'border');
  	},
  }
}
</script>

<style>
</style>
