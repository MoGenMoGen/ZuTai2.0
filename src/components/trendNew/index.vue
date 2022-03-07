<template>
	<div :style="{width: width+'px',height: height+'px'}">
		<!-- <img :height="h" :width="w"  :src="url" alt="" @click="openShow"> -->
		<!-- <Modal v-model="dialogVisible" title="趋势" :mask-closable="false" draggable="true"
           :mask="false" :footer-hide="true" width="900" :on-cancel="off">
 -->
		<RadioGroup v-model="vertical" @on-change="changeRadio" :style="{height: '20px',color: option.color||'#fff'}">
			<Radio :label="item" v-for="item in type" :key="item">
				<span>{{ item }}</span>
			</Radio>
		</RadioGroup>
		<div id="myChart" :style="{width: width+'px', height: (height-20)+'px'}"></div>
		<!-- </Modal> -->
	</div>
</template>
<script>
	import {getListH} from '@/api/visual'
	export default {
		name: 'trendNew',
		props: {
			option: Object,
			component: Object
		},
		data() {
			return {
				vertical: '',
				dialogVisible: true,
				now: '',
				oneDay: '',
				value: '',
				data: [],
				timer: null,
				myChart: null,
				xData: [],
				vData: [],
				imgUrl: '',
				show: false,
				defShow: true,
				type: []
				// w:'',
				// h:''
			}
		},
		computed: {
			url() {
				return (this.option.url)
			},
			w() {
				return (this.option.w)
			},
			h() {
				return (this.option.h)
			},
			width() {
				return this.component.width
			},
			height() {
				return this.component.height
			}
		},
		mounted() {
			this.getInfo()
		},
		watch: {
			width() {
				this.$echart.init(document.getElementById('myChart')).resize()
			},
			height() {
				this.$echart.init(document.getElementById('myChart')).resize()
			},
			'option.points': {
				handler() {
					if(this.option.points) {
						this.type = this.option.points.split(",")
					} else {
						this.type = []
						this.vertical = ''
					}
				}
			}
		},
		methods: {
			changeRadio(e) {
				console.log(e)
				this.xData = []
				this.vData = []
				this.vertical = e
				getListH({name:this.vertical,hour:4}).then(res=>{
				  this.xData = res.data.data.time
				  this.vData = res.data.data.value
				  this.drawLine()
				  this.setData()
				})
			},
			getInfo() {
				this.xData = []
				this.vData = []
				if (this.option.points) {
					this.type = this.option.points.split(",")
					this.vertical = this.type[0]
					getListH({name:this.vertical,hour:4}).then(res=>{
					  this.xData = res.data.data.time
					  this.vData = res.data.data.value
					  this.drawLine()
					  this.setData()
					})
				}
			},


			off() {
				clearInterval(this.timer);
				this.timer = null;
				this.dialogVisible = false
				this.data = []
				this.value = ''
				this.oneDay = ''
				this.now = ''
			},

			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				this.myChart = this.$echart.init(document.getElementById('myChart'))
				this.timer = setInterval(this.setData, 2000);
			},
			setData() {
				this.xData.push(this.dateFormat(new Date(), "hh:mm:ss"));
				this.vData.push(localStorage.getItem(this.vertical));
				if (this.xData.length > 20) {
					this.xData.shift();
					this.vData.shift();
				}
				this.myChart.setOption({
					tooltip: {
						trigger: 'axis'
					},
					xAxis: {
						type: 'category',
						data: this.xData,
						axisLabel: {
							color: this.option.xColor || '#fff',
							fontSize: this.option.xFontSize || 12
						},
						axisLine: {
							lineStyle: {
								color: this.option.xLineColor || '#fff',
							}
						}
					},
					yAxis: {
						type: 'value',
						axisLabel: {
							color: this.option.yColor || '#fff',
							fontSize: this.option.yFontSize || 12
						},
						axisLine: {
							show: this.option.yAxisLineShow,
							lineStyle: {
								color: this.option.yLineColor || '#fff'
							}
						},
						splitLine: {
						  lineStyle: {
							color: this.option.ySplitLineColor || '#fff'
						  }
						}
					},
					series: [{
						data: this.vData,
						type: 'line',
						itemStyle: {
						  color: this.option.itemStyleColor || "#fff"
						},
						lineStyle: {
						  color: this.option.lineStyleColor || "#fff"
						},
						smooth: this.option.smooth ? true : false, //是否圆滑曲线
						showSymbol: this.option.showSymbol ? true : false, //显示点
					}]
				});
			},
			//格式化时间
			dateFormat(date, format) {
				format = format || 'yyyy-MM-dd hh:mm:ss';
				if (date !== 'Invalid Date') {
					let o = {
						"M+": date.getMonth() + 1, //month
						"d+": date.getDate(), //day
						"h+": date.getHours(), //hour
						"m+": date.getMinutes(), //minute
						"s+": date.getSeconds(), //second
						"q+": Math.floor((date.getMonth() + 3) / 3), //quarter
						"S": date.getMilliseconds() //millisecond
					}
					if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
						(date.getFullYear() + "").substr(4 - RegExp.$1.length));
					for (let k in o)
						if (new RegExp("(" + k + ")").test(format))
							format = format.replace(RegExp.$1,
								RegExp.$1.length === 1 ? o[k] :
								("00" + o[k]).substr(("" + o[k]).length));
					return format;
				}
				return '';

			}
		},
		beforeDestroy() {
			this.off()
		}
	}
</script>
<style>
	.bj {
		background-color: #ffffff;
	}
</style>
