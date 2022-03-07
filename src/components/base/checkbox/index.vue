<template>
	<div :style="styleVar">
		<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" v-if="option.showAll">全选</el-checkbox>
		<div style="margin: 5px 0;" v-if="option.showAll"></div>
		<el-checkbox-group v-model="checked" @change="handleCheckedChange">
			<el-checkbox style="margin-bottom: 5px;" :label="item.value" v-for="(item,index) in option.list" :key="index">{{item.name}}</el-checkbox>
		</el-checkbox-group>
	</div>
</template>
<script>
    import {writePlcData} from "@/api/visual";
	export default {
		name: 'baseCheckbox',
		props: {
			option: Object,
			component: Object,
		},
		data() {
			return {
				checkAll: false,
				checked: [],
				isIndeterminate: true
			}
		},
		computed: {
			styleVar() {
				return {
					"--color": this.option.color,
					"--selectColor": this.option.selectColor,
					"--fontSize": this.option.fontSize + "px",
					"--scale": `scale(${this.option.scale})`,
					"--flex": this.option.flex?'flex':'block',
					// "--borderWidth": this.option.borderWidth + "px",
					// "--innerWidth": this.option.innerWidth + "px",

				};
			},
		},
		created() {},
		mounted() {
			this.getInfo()
		},
		watch: {},
		// 销毁监听，防止内存泄露
		destroyed() {

		},
		methods: {
            change(val) {
                if (this.option.valNm) {
                    writePlcData(this.option.valNm, val).then(res => {
                        console.log(res)
                    if (res.data.code === 401) {
                        this.getInfo()
                        this.$message.error('没有修改权限');
                    }
                    if (res.data.code === 200) {
                        this.$message('修改成功');
                        localStorage.setItem(this.option.valNm, val)
                    }
                })
                }
                console.log(val)
            },
			handleCheckAllChange(val) {
				let list = this.option.list.map((item,index) => {
					return item.value
				})
				this.checked = val ? list : [];
				this.isIndeterminate = false;
			},
			handleCheckedChange(value) {
                console.log('change')
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.option.list.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.option.list.length;
				this.changeRadio(value)
			},
            changeRadio(val) {
                console.log(val)
                if (this.option.valNm) {
                    writePlcData(this.option.valNm, val.join(',')).then(res => {
						if (res.data.code === 401) {
							this.$message.error('没有修改权限');
							this.getInfo()
						}
						if (res.data.code == 200) {
							this.$message('修改成功');
							localStorage.setItem(this.option.valNm, val.join(','))
						}
                	})
                }
            },
            //是否显示
            getInfo() {
                if (this.option.valNm) {
                    this.checked = localStorage.getItem(this.option.valNm).split(',')
                }
            },
		}
	}
</script>
<style lang="scss" scoped>
	.el-checkbox-group {
		width: 100%;
		height: 100%;
		display: var(--flex);
		// font-size: var(--fontSize);
	}

	/deep/ {
		.el-checkbox {
			display: flex;
			align-items: center;
			//鼠标滑过改变字体和小方框边框的样式
			&:hover {
				border-color: var(--selectColor) !important;
				color: var(--selectColor) !important;

				//鼠标滑过时小方框边框显示
				.el-checkbox__inner {
					border-color: var(--selectColor);
				}
			}

			.el-checkbox__input {
				//选中时的样式
				&.is-indeterminate,&.is-checked {
					.el-checkbox__inner {
						//选中时小方框的的颜色
						// width: var(--borderWidth);
						// height: var(--borderWidth);
						transform: var(--scale);
						background-color: var(--selectColor) !important;
						border-color: var(--selectColor) !important;
					}

					+.el-checkbox__label {
						//选中时字体的颜色
						font-size: var(--fontSize);
						line-height: var(--fontSize);
						color: var(--selectColor) !important;
					}

					.el-checkbox__inner::after {
						// width: var(--innerWidth);
						// height: var(--innerWidth);
					}
				}

				.el-checkbox__inner {

					// 鼠标滑过小方框时的样式
					&:hover {
						border-color: var(--selectColor);
					}
				}
			}

			.el-checkbox__input {
				.el-checkbox__inner {
					//未选中时小方框的的颜色
					// width: var(--borderWidth);
					// height: var(--borderWidth);
					transform: var(--scale);
					background-color: var(--color) !important;
					border-color: var(--color) !important;
				}

				+.el-checkbox__label {
					//未选中时字体的颜色
					font-size: var(--fontSize);
					line-height: var(--fontSize);
					color: var(--color) !important;
				}

				.el-checkbox__inner::after {
					// width: var(--innerWidth);
					// height: var(--innerWidth);
				}
			}
		}
	}
</style>
