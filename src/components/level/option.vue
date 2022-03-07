<!-- 液位 -->
<template>
	<div>
		<el-form-item label="液位形状">
			<avue-radio v-model="main.activeOption.type" :dic="dicOption">
			</avue-radio>
		</el-form-item>
		<el-form-item label="数据绑定">
			<avue-input v-model="main.activeOption.val"></avue-input>
		</el-form-item>

		<el-form-item label="高">
			<avue-input v-model="main.activeOption.height"></avue-input>
		</el-form-item>

		<el-form-item label="宽">
			<avue-input v-model="main.activeOption.width"></avue-input>
		</el-form-item>
	</div>
</template>

<script>
	export default {
		inject: ["main"],
		data() {
			return {
				dicOption: [{
					label: '矩形',
					value: 'rect'
				}, {
					label: '圆角矩形',
					value: 'roundRect'
				}, {
					label: '圆形',
					value: 'round'
				}]
			}
		},
	}
</script>

<style>
</style>
