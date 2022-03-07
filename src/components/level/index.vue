<!-- 液位 -->
<template>
	<div>
		<dv-water-level-pond v-if="show" :config="config" :style="{width: width, height:height}" />
	</div>
</template>
<script>
	// import {getVal} from '@/api/visual'

	export default {
		name: 'level',
		props: {
			option: Object,
			component: Object
		},
		data() {
			return {
				show: false,
				height: '85px',
				width: '74px',
				config: {
					data: [90],
					waveHeight: 5,
					waveNum: 5,
					waveOpacity: 1,
					formatter: '',
					shape: 'rect'
				}
			}
		},
		mounted() {
			this.setVal2()
		},
		computed: {},
		methods: {
			setVal2() {
				this.show = false
				this.height = this.component.height+'px'
				this.width = this.component.width+'px'
				if (this.option.val) {
					let item = localStorage.getItem(this.option.val);
					this.config.data = [item]
					this.$nextTick(()=>{
						this.show = true
					})
				} else {
					this.config.data = [90]
					this.$nextTick(()=>{
						this.show = true
					})
				}
			},
		},
		watch: {
			'option.type': {
				handler(newVal, oldVal) {
					this.show = false
					this.config.shape = newVal
					this.$nextTick(()=>{
						this.show = true
					})
				}
			},
			'component.height': {
				handler(newVal, oldVal) {
					this.show = false
					this.height = this.component.height+'px'
					this.width = this.component.width+'px'
					this.$nextTick(()=>{
						this.show = true
					})
				}
			},
			'component.width': {
				handler(newVal, oldVal) {
					this.show = false
					this.height = this.component.height+'px'
					this.width = this.component.width+'px'
					this.$nextTick(()=>{
						this.show = true
					})
				}
			},
			'option.val': {
				handler(newVal, oldVal) {
					this.setVal2()
				}
			},
		}
	}
</script>
