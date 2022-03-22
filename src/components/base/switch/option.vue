<!-- 开关 -->
<template>
	<div>
		<el-form-item label="旋转">
		  <el-slider v-model="main.activeOption.rotate" :max="360"  :step="1"></el-slider>
		</el-form-item>
		<el-form-item label="变量名">
			<el-input placeholder="请输入变量名" v-model="main.activeOption.valueName" clearable ></el-input>
		</el-form-item>

		<el-collapse v-model="activeName" accordion>
			<el-collapse-item title="开启设置" name="1">
				<el-form-item label="开启状态">
					<el-image style="width: 30px; height: 30px" v-if="main.activeOption.openUrl"  :src="main.activeOption.openUrl"   fit="fit">
					</el-image>
					<el-button type="text" @click="clickSource('open')">选择图标</el-button>
					<!--			<el-button type="text" @click="main.activeOption.openUrl=''">删除图标</el-button>-->
				</el-form-item>
				<el-form-item label="字体大小">
					<avue-input-number v-model="main.activeOption.fontSize" :max="200"></avue-input-number>
				</el-form-item>
				<el-form-item label="开启文字">
					<el-input placeholder="请输入开启文字" v-model="main.activeOption.openText" clearable></el-input>
					<span style="color: #f00;font-size: 12px">优先显示图片，没有图片显示文字</span>

					<!--			<el-button type="text" @click="main.activeOption.openUrl=''">删除图标</el-button>-->
				</el-form-item>
				<el-form-item label="开启字体颜色">
					<avue-input-color v-model="main.activeOption.openColor"></avue-input-color>
				</el-form-item>
				<el-form-item label="开启变量值">
					<el-input placeholder="请输入值" v-model="main.activeOption.openValue" clearable></el-input>
				</el-form-item>
				<el-form-item label="开启背景颜色">
					<avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.openBgColor" ></avue-input-color>
				</el-form-item>
				<el-form-item label="开启按下背景色">
					<avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.openBgColor2" ></avue-input-color>
				</el-form-item>
				<el-form-item label="开启边框颜色">
					<avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.openBorderColor" ></avue-input-color>
				</el-form-item>
				<el-form-item label="开启边框宽度">
					<avue-input-number v-model="main.activeOption.openBorderWidth"></avue-input-number>
				</el-form-item>
				<el-form-item label="开启边框样式">
					<avue-select v-model="main.activeOption.openBorderType" placeholder="请选择字体" type="tree" :dic="dicBorder"></avue-select>
				</el-form-item>
				<el-form-item label="开启圆角弧度">
					<avue-input-number v-model="main.activeOption.openRadius"></avue-input-number>
				</el-form-item>
			</el-collapse-item>
			<el-collapse-item title="关闭设置" name="2">
				<el-form-item label="关闭状态" >
					<el-image style="width: 30px; height: 30px"  :src="main.activeOption.closeUrl"  v-if="main.activeOption.closeUrl"   fit="fit">
					</el-image>
					<el-button type="text" @click="clickSource('close')">选择图标</el-button>
					<!--			<el-button type="text" @click="main.activeOption.closeUrl=''">删除图标</el-button>-->
				</el-form-item>
				<el-form-item label="关闭文字" >
					<el-input placeholder="请输入值" v-model="main.activeOption.closeText" clearable></el-input>
					<span style="color: #fff;font-size: 12px">优先显示图片，没有图片显示文字</span>
				</el-form-item>
				<el-form-item label="关闭字体颜色">
					<avue-input-color v-model="main.activeOption.closeColor"></avue-input-color>
				</el-form-item>
				<el-form-item label="关闭变量值">
					<el-input placeholder="请输入值" v-model="main.activeOption.closeValue" clearable></el-input>
				</el-form-item>
				<el-form-item label="关闭背景颜色">
					<avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.closeBgColor" ></avue-input-color>
				</el-form-item>
				<el-form-item label="关闭按下背景色">
					<avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.closeBgColor2" ></avue-input-color>
				</el-form-item>
				<el-form-item label="关闭边框颜色">
					<avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.closeBorderColor" ></avue-input-color>
				</el-form-item>
				<el-form-item label="关闭边框宽度">
					<avue-input-number v-model="main.activeOption.closeBorderWidth"></avue-input-number>
				</el-form-item>
				<el-form-item label="关闭边框样式">
					<avue-select v-model="main.activeOption.closeBorderType" placeholder="请选择字体" type="tree" :dic="dicBorder"></avue-select>
				</el-form-item>
				<el-form-item label="关闭圆角弧度">
					<avue-input-number v-model="main.activeOption.closeRadius"></avue-input-number>
				</el-form-item>

			</el-collapse-item>
			<el-collapse-item title="弹窗设置" name="3">
				<el-form-item label="启用二次确认">
					<el-checkbox v-model="main.activeOption.ifConfirm"></el-checkbox>
				</el-form-item>
				<el-form-item label="弹窗标题" v-show="main.activeOption.ifConfirm">
					<el-input placeholder="请输入值" v-model="main.activeOption.confirmTitle" clearable></el-input>
				</el-form-item>
				<el-form-item label="弹窗文字" v-show="main.activeOption.ifConfirm">
					<el-input placeholder="请输入值" v-model="main.activeOption.confirmContent" clearable></el-input>
				</el-form-item>
			</el-collapse-item>
		</el-collapse>

		<imglist ref="imglist"   @change="handleSetImg"></imglist>
	</div>


</template>

<script>
	// import sourceList from "../../page/group/sourceList";
	import imglist from '../../../page/group/imglist'
	export default {
		inject: ["main"],
		components: {imglist},
		data() {
			return {
				type:'',
				index: '',
				dialogVisible: false,
				form: 'el-icon-info',
				info: {
					w: '',
					h: '',
					url: '',
					vars: '',
					con: '',
					val: '',
					testModel:false
				},
				dicBorder:[{
				    label:'实线',
				    value:'solid'
				},{
				    label:'虚线',
				    value:'dashed'
				},{
				    label:'点状',
				    value:'dotted'
				},{
				    label:'双实线',
				    value:'double'
				},{
				    label:'凹槽',
				    value:'groove'
				},{
				    label:'垄状',
				    value:'ridge'
				}],  
			}
		},

		methods: {
			openImg(){
				this.$refs.imglist.openImg('activeObj.data.value', 'border');
			},
			handleSetImg(val){
				if(this.type==='open'){
					this.main.activeOption.openUrl = val
				}else {
					this.main.activeOption.closeUrl = val
				}
				this.$forceUpdate()
			},

			updVal(){
				this.$forceUpdate();
			},
			clickSource(type) {
				this.type = type
				this.$refs.imglist.openImg('activeObj.data.value', 'border');
			},
			// setImg(url) {
			//   this.main.activeOption.tableData[this.index].url = url
			//   this.dialogVisible = false
			// },

		}
	}
</script>

<style>
	.tc {
		background-color: #ffffff;
	}
</style>
