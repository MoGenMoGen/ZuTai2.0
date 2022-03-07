<template>
	<div :style="{width:component.width+'px',height:component.height+'px'}">
		<div class="navList" :style="navStyle">
			<p v-for="(item,index) in option.navList" @click="toPage(item.linkHref,item.nm)" :key="index" :style="navItemStyle"
				:class="{active:(item.linkHref && item.linkHref.indexOf(urlId)!=-1) || item.nm==navSelect}">{{item.nm}}</p>
		</div>
	</div>
</template>
<script>
	export default {
		inject: ["main","contain"],
		name: 'baseNav',
		props: {
			option: Object,
			component: Object
		},
		data() {
			return {
				urlId: '',
				navSelect: ''
			}
		},
		mounted() {
			// this.$nextTick(()=>{
				// console.log(window.addEventListener('message',this.listener))
			  // window.addEventListener('message',this.listener)
			// })
			if(window.sessionStorage.getItem('navSelect')) {
				this.navSelect = window.sessionStorage.getItem('navSelect')
			} else {
				this.navSelect = ""
			}
			let url = top.location.href.split('?')[0]
			this.urlId = url.split('/')[url.split('/').length - 1]
		},
		computed: {
			navStyle() {
				return {
					flexDirection: this.option.navStyle == 'horizontal' ? 'row' : 'column',
					fontSize: this.option.fontSize + 'px',
					color: this.option.color,
					lineHeight: this.option.lineHeight + 'px',
					fontWeight: this.option.fontWeight,
					fontFamily: this.option.fontFamily,
					textAlign: this.option.textAlign
				}
			},
			navItemStyle() {
				let styleInfo = {
					"backgroundColor": this.option.bgColor,
					"borderWidth": this.option.borderWidth + 'px',
					"borderColor": this.option.borderColor,
					"borderStyle": this.option.borderType,
					"borderRadius": this.option.itemRadius + 'px',
					"width": this.option.itemWidth + 'px',
					"height": this.option.itemHeight + 'px',
					"--activeBgColor": this.option.bgColorActive,
					"--activeColor": this.option.colorActive,
				}
				if (this.option.navStyle == 'horizontal') {
					styleInfo.marginRight = this.option.itemSpace + 'px'
				} else {
					styleInfo.marginBottom = this.option.itemSpace + 'px'
				}
				return styleInfo
			}
		},
		methods: {
			toPage(url,nm) {
				let myUrl = url.indexOf('http') == -1 ? window.location.origin + '/view/' + url : url
				if (this.option.linkTarget == '_blank') {
					window.open(myUrl)
				} else if (this.option.linkTarget == '_self') {
					if (window == top) {
						window.location.href = myUrl
					} else {
						top.location.href = myUrl;
					}
				}
				window.sessionStorage.setItem('navSelect',nm)
			},
			listener(e) {
				console.log('this.e',e)
			}
		},
		beforeDestroy() {
			window.removeEventListener('message',this.listener)
		}
	}
</script>
<style scoped lang="scss">
	.navList {
		display: flex;
		display: -webkit-flex;

		p {
			cursor: pointer;
		}
	}

	.navList p:hover,
	.active {
		background-color: var(--activeBgColor) !important;
		color: var(--activeColor)
	}
</style>
