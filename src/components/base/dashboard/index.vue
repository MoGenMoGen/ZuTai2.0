<template>
	<div :style="{width: width+'px',height: height+'px'}">
		<myCharts :style="{width: width+'px',height: height+'px'}" :id="id" :data="options" :ref="id"></myCharts>
	</div>
</template>
<script>
	import myCharts from '../../myCharts/MyCharts'
	export default {
		name: 'baseDashboard',
		props: {
			option: Object,
			component: Object
		},
		data() {
			return {
				id: '',
				options: {
					tooltip: {
						formatter: '{a} <br/>{b} : {c}%'
					},
					series: [{
						name: 'Pressure',
						type: 'gauge',
						progress: {
							show: true
						},
						detail: {
							valueAnimation: true,
							formatter: '{value}'
						},
						data: [{
							value: 50,
							name: this.option.name
						}]
					}]
				}
			}
		},
		computed: {
			width() {
				return this.component.width
			},
			height() {
				return this.component.height
			}
		},
		components: {
			myCharts
		},
		watch: {
			width() {
				this.$nextTick(() => {
					let id = this.id
					let myChart = document.getElementById(id)
					this.$echart.init(myChart).resize()
				});
			},
			height() {
				this.$nextTick(() => {
					let id = this.id
					let myChart = document.getElementById(id)
					this.$echart.init(myChart).resize()
				});
			},
			option: {
				handler() {
					this.$nextTick(() => {
						let id = this.id 
						let myChart = document.getElementById(id)
						this.options.series[0].data[0].name = this.option.name
						this.$echart.init(myChart).setOption(this.options)
					});
				},
				deep: true
			}
			// options: {
			// 	handler(newValue,oldValue){
			// 		console.log(newValue)
			// 		this.$nextTick(() => {
			// 			let id = this.id
			// 			let myChart = document.getElementById(id)
			// 			console.log(this.$echart.init(myChart))
			// 			// this.$echart.init(myChart).resize()
			// 		});
			// 	},
			// 	deep:true
			// }
		},
		created() {
			this.id = `chart_${new Date().getTime()}`
		},
		methods: {

		}
	}
</script>
