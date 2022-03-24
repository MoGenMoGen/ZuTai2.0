<!-- 自定义配置 -->
<template>
	<div>
		<el-form-item label="横向布局">
		  <avue-switch v-model="main.activeOption.flex"></avue-switch>
		</el-form-item>


    <el-form-item label="变量名称">
      <el-input   type="text"  placeholder="请输入变量名称"   v-model="main.activeOption.valNm" @focus="selectVar('main.activeOption.valNm')">  </el-input>
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
		<el-collapse v-model="activeName" accordion>
			<el-collapse-item title="数据" name="1">
				<el-button type="primary" @click="add" style="margin-left: 20px; margin-top: 20px">添加 +</el-button>
				<span style="color: #fff;margin-left: 10px">value值必须唯一</span>
				<div v-for="(item,index) in main.activeOption.list" :key="item" style="border-bottom: 1px dashed rgba(255,255,255,0.3)">
					<el-form-item label="显示文字">
						<el-input placeholder="请输入显示文字" v-model="item.name" clearable @input="updVal"></el-input>
					</el-form-item>
					<el-form-item label="文字对应value">
						<el-input placeholder="请输入对应value" v-model="item.value" clearable @input="updVal"></el-input>
						<el-button type="text" @click="del(index)" v-if="index>0">删除当前项</el-button>
					</el-form-item>
				</div>
			</el-collapse-item>
		</el-collapse>

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
			},
            selectVar(item) {
                this.main.handleOpenPoint(item)
            }
		}
	}
</script>

<style>
</style>
