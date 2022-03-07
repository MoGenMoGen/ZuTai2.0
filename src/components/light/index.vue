<template>
	<div>
		<!--  默认指示灯  -->
		<img :style="[styleImgName,styleFlashName,styleJumpName]" class="avue-echart-img" v-if="show"
		:class="{'avue-echart-img--rotate':rotate==true,'avue-echart-img--flash':flash==true,'avue-echart-img--jump':jump==true}"
		width="100%"
		height="100%"
		:src="imgShowUrl">
	</div>
</template>
<script>
	export default {
		name: 'light',
		props: {
			option: Object,
			component: Object
		},
		data() {
			return {
				imgShowUrl: '',
				show: false,
				defShow: true,
				w: '',
				h: ''
			}
		},
		computed: {
			// w() {
			//   return (this.option.w)
			// },
			// h() {
			//   return (this.option.h)
			// }
			styleImgName() {
				return Object.assign(
					(() => {
						if (this.rotate) {
							return {
								animationDuration: this.rotateDuration / 1000 + "s"
							};
						}
						return {};
					})(), {
						opacity: this.option.opacity || 1,
						transform: 'rotate(' + this.option.rotate2 + 'deg)'
					}
				);
			},
			styleFlashName() {
				return Object.assign(
					(() => {
						if (this.flash) {
							return {
								animationDuration: this.flashDuration / 1000 + "s"
							};
						}
						return {};
					})()
				);
			},
			styleJumpName() {
				return Object.assign(
					(() => {
						if (this.jump) {
							return {
								animationDuration: this.jumpDuration / 1000 + "s"
							};
						}
						return {};
					})()
				);
			},
			rotateDuration() {
				return this.option.rotateDuration || 3000;
			},
			rotate() {
				return this.option.rotate;
			},
			flashDuration() {
				return this.option.flashDuration || 3000;
			},
			flash() {
				return this.option.flash;
			},
			jumpDuration() {
				return this.option.jumpDuration || 3000;
			},
			jump() {
				return this.option.jump;
			}
		},
		mounted() {
			this.getInfo()
			setInterval(this.getInfo, 3000);
		},
		methods: {
			getInfo() {
        // console.log(this.option)
				if (this.option.tableData != undefined) {
					this.defShow = false
					this.option.tableData.map(p => {
						let b = false;
						//con条件  vars变量  val值
						let item = localStorage.getItem(p.vars);
						//判断获取的变量满足
						if (p.con == '==') {
							if (item == p.val) {
								b = true
							}
						}
            if (p.con == '!=') {
              if (item != p.val) {
                b = true
              }
            }


						if (p.con == '<') {
							if (item < p.val) {
								b = true
							}
						}
						if (p.con == '>') {
							if (item > p.val) {
								b = true
							}
						}
						if (p.con == '<=') {
							if (item <= p.val) {
								b = true
							}
						}
						if (p.con == '>=') {
							if (item >= p.val) {
								b = true
							}
						}
						if (b) {
							this.show = true
							this.imgShowUrl = p.url
						}
					})
				}

			}
		}
	}
</script>
