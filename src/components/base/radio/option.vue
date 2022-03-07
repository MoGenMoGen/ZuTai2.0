<!-- 自定义配置 -->
<template>
	<div>
		<el-form-item label="横向布局">
		  <avue-switch v-model="main.activeOption.flex"></avue-switch>
		</el-form-item>


    <el-form-item label="变量名称">
      <el-input   type="text"  placeholder="请输入变量名称"   v-model="main.activeOption.valNm">  </el-input>
    </el-form-item>
    <el-form-item label="文字未选中颜色">
		  <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.color" ></avue-input-color>
		</el-form-item>
		<el-form-item label="文字选中颜色">
		  <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.selectColor" ></avue-input-color>
		</el-form-item>
		<el-form-item label="字体大小">
		  <avue-input-number v-model="main.activeOption.fontSize"></avue-input-number>
		</el-form-item>
		<el-form-item label="按钮放大倍数">
		  <avue-input-number v-model="main.activeOption.scale"></avue-input-number>
		</el-form-item>
		<!-- <el-form-item label="按钮圆圈大小">
		  <avue-input-number v-model="main.activeOption.borderWidth"></avue-input-number>
		</el-form-item>
		<el-form-item label="按钮选中内圈大小">
		  <avue-input-number v-model="main.activeOption.innerWidth"></avue-input-number>
		</el-form-item> -->
		<el-button type="text" @click="add">添加单选项</el-button>
		<div v-for="(item,index) in main.activeOption.list" :key="item">
		  <el-form-item label="显示文字">
		    <el-input placeholder="请输入显示文字" v-model="item.name" clearable @input="updVal"></el-input>
		  </el-form-item>
		  <el-form-item label="文字对应value">
			  <el-input placeholder="请输入对应value" v-model="item.value" clearable @input="updVal"></el-input>
			  <el-button type="text" @click="del(index)" v-if="index>0">删除当前项</el-button>
		  </el-form-item>
		</div>
	</div>
</template>

<script>
	export default {
		inject: ["main"],
		data() {
			return {}
		},
		components: {},
		computed() {
			//this.init()
		},
		mounted() {},
		methods: {
			updVal(){
			  this.$forceUpdate();
			},
			add() {
				let info = {
					name: '选项',
					value: ''
				}
				this.main.activeOption.list.push(info)
				this.$forceUpdate()
			},
			del(index) {
				this.main.activeOption.list.splice(index, 1);
				this.$forceUpdate()
			}
		}
	}
</script>

<style>
</style>
