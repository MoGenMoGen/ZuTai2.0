<template>
	<div class="container" :style="{
    width:component.width+'px',
    height:component.height+'px',
  }" @click="click">
		<!--起始点的样式-->
		<p :style="circleStyle" v-show="ifBuild && option.pointShow && pointArray.length>0 && !option.ifEdit"></p>
		<canvas :id="'c'+option.index" :width="component.width" :height="component.height"></canvas>
	</div>

</template>
<script>
	// import {getVal} from '@/api/visual'

	export default {
		name: 'baseBrokenLine',
		props: {
			option: Object,
			component: Object,
		},
		inject: ["main", "contain"],
		data() {
			return {
				ifBuild: false,
				show: true,
				fabricObj: null,
				mouseFrom: {},
				lineCounter: 0,

				pointArray: [],
				//鼠标的位置
				x: 0,
				y: 0,

				ifDrag: false, //是否拖动
				ifTime: false, //是否进入定时器
				time: 0,
				offsetX: 0,
				offsetY: 0,
			}
		},
		computed: {
			circleStyle() {
				return {
					width: this.option.pointWidth + 'px',
					height: this.option.pointWidth + 'px',
					opacity: this.contain.pointOpacity,
					left: this.pointArray.length > 0 ? this.pointArray[0].x + 'px' : 0,
					top: this.pointArray.length > 0 ? this.pointArray[0].y + 'px' : 0,
					background: this.option.pointBgColor
				}
			}
		},
		created() {

		},
		mounted() {
			this.ifBuild = window.location.href.indexOf('build') != -1
			this.$nextTick(() => {
				setTimeout(() => {
					this.fabricObj = new fabric.Canvas('c' + this.option.index);
					this.fabricObj.defaultCursor = 'crosshair';
					this.fabricObj.hoverCursor = 'crosshair';
					this.fabricObj.moveCursor = 'crosshair';
					this.pointArray = this.main.activeOption && this.main.activeOption.index === this
						.option.index && this.main.activeOption.optionArr ? this.main.activeOption
						.optionArr : this.option.optionArr
					this.fabricObj.on('mouse:down', (e) => this.mousedown(e))
					this.fabricObj.on('mouse:up', (e) => this.mouseup(e))
					// this.fabricObj.on('object:resize', (e) => this.drag(e))
					// this.fabricObj.on('object:drag', (e) => this.drag(e))

					this.fabricEvent();
				}, 500);
			});
		},
		// 销毁监听，防止内存泄露
		destroyed() {

		},
		watch: {

			'main.activeOption': {
				handler: function(e) {
					this.$nextTick(() => {
						setTimeout(() => {
							if (e.index === this.option.index) {
								this.pointArray = e.optionArr

								this.fabricEvent();
							}

						}, 500);
					});
				},
				deep: true,
			},
			component: {
				handler: function() {
					if (this.main.activeOption && this.main.activeOption.index === this.option.index) {
						this.$nextTick(() => {
							setTimeout(() => {

								this.fabricEvent();
							}, 500);
						});
					}
				},
				deep: true,
			},
			'main.activeOption.index': {
				handler() {
					this.main.activeOption.setUp = false
					this.main.activeOption.ifEdit = false
				},
				immediate: true
			}
		},
		methods: {
			drag(e) {},
			mousedown(e) {
				this.x = e.pointer.x
				this.y = e.pointer.y
			},
			mouseup(e) {
				if (this.main.activeOption && this.main.activeOption.index === this.option.index) {
					if (e.pointer.x === this.x && e.pointer.y === this.y && !this.option.ifEdit) { //是点击事件
						this.pointArray.push({
							x: this.x,
							y: this.y
						})
						this.main.activeOption.optionArr = this.pointArray
						this.fabricEvent();
					}
				}
				console.log('up')
				console.log(this.pointArray)
			},

			//绘图
			fabricEvent() {

				this.fabricObj.clear()
				this.fabricObj.setWidth(this.component.width);
				this.fabricObj.setHeight(this.component.height);
				//  var points = this.main.activeOption && this.main.activeOption.optionArr ? this.main.activeOption.optionArr : this.option.optionArr
				var points = this.pointArray
				if (points.length > 0) {
					var left = points[0].x
					var top = points[0].y
				}

				points.forEach(item => {
					if (item.x < left) {
						left = item.x
					}
					if (item.y < top) {
						top = item.y
					}
				})
				var polygon = new fabric.Polyline(points, {
					left: left ? left : 0,
					top: top ? top : 0,
					// left:100,
					// top:200,
					fill: this.option.bgColor,
					strokeWidth: this.option.borderWidth,
					stroke: this.option.borderColor,
					scaleX: this.option.scaleX,
					scaleY: this.option.scaleY,
					objectCaching: false,
					transparentCorners: false,
					cornerColor: '',
					lockMovementX: true, //去掉拖动功能
					lockMovementY: true,
					lockRotation: true, //去掉旋转功能
					lockScalingX: true, //去掉缩放功能
					lockScalingY: true,
					hasBorders: false, //去掉选中的边框
				});
				//  隐藏控制点
				polygon.setControlsVisibility({
					mtr: false
				})
				polygon.setControlsVisibility({
					ml: false
				})
				polygon.setControlsVisibility({
					mb: false
				})
				polygon.setControlsVisibility({
					mr: false
				})
				polygon.setControlsVisibility({
					mt: false
				})
				polygon.setControlsVisibility({
					tl: false
				})
				polygon.setControlsVisibility({
					bl: false
				})
				polygon.setControlsVisibility({
					tr: false
				})
				polygon.setControlsVisibility({
					br: false
				})
				// polygon.lockUniScaling = true  //禁用缩放
				// canvas.viewportTransform = [0.7, 0, 0, 0.7, -50, 50];

				this.fabricObj.add(polygon);
				if (this.option.ifEdit) {
					this.Edit()

				}

			},

			anchorWrapper(anchorIndex, fn) {
				return (eventData, transform, x, y) => {
					var fabricObject = transform.target,
						absolutePoint = fabric.util.transformPoint({
							x: (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x),
							y: (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y),
						}, fabricObject.calcTransformMatrix()),
						actionPerformed = fn(eventData, transform, x, y),
						newDim = fabricObject._setPositionDimensions({}),
						polygonBaseSize = fabricObject._getNonTransformedDimensions(),
						newX = (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) / polygonBaseSize.x,
						newY = (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) / polygonBaseSize.y;
					fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
					return actionPerformed;
				}
			},
			actionHandler(eventData, transform, x, y) {
				var polygon = transform.target,
					currentControl = polygon.controls[polygon.__corner],
					mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(x, y), 'center', 'center'),
					polygonBaseSize = polygon._getNonTransformedDimensions(),
					size = polygon._getTransformedDimensions(0, 0),
					finalPointPosition = {
						x: mouseLocalPosition.x * polygonBaseSize.x / size.x + polygon.pathOffset.x,
						y: mouseLocalPosition.y * polygonBaseSize.y / size.y + polygon.pathOffset.y
					};
				polygon.points[currentControl.pointIndex] = finalPointPosition;
				return true;
			},
			Edit() {
				// clone what are you copying since you
				// may want copy and paste on different moment.
				// and you do not want the changes happened
				// later to reflect on the copy.
				var poly = this.fabricObj.getObjects()[0];
				this.fabricObj.setActiveObject(poly);
				poly.edit = this.option.ifEdit;
				if (poly.edit) {
					var lastControl = poly.points.length - 1;
					poly.cornerStyle = 'circle';
					poly.cornerColor = 'rgba(0,0,255,0.5)';
					poly.controls = poly.points.reduce((acc, point, index) => {
						acc['p' + index] = new fabric.Control({
							positionHandler: (dim, finalMatrix, fabricObject) => {
								var x = (fabricObject.points[index].x - fabricObject.pathOffset.x),
									y = (fabricObject.points[index].y - fabricObject.pathOffset.y);
								return fabric.util.transformPoint({
										x: x,
										y: y
									},
									fabric.util.multiplyTransformMatrices(
										fabricObject.canvas.viewportTransform,
										fabricObject.calcTransformMatrix()
									)
								);
							},
							actionHandler: this.anchorWrapper(index > 0 ? index - 1 : lastControl, this
								.actionHandler),
							actionName: 'modifyPolygon',
							pointIndex: index
						});
						return acc;
					}, {});
				} else {
					poly.cornerColor = '';
					// poly.cornerStyle = 'rect';
					poly.controls = '';
				}
				//  poly.hasBorders = false;
				this.fabricObj.requestRenderAll();
			},
		}
	}
</script>
<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
		position: relative;

		p {
			position: absolute;
			z-index: 100;
			border-radius: 50%;
			transform: translate(-50%, -50%);
		}

		/deep/.canvas-container {
			width: 100% !important;
			height: 100% !important;
		}

		canvas {
			width: 100%;
			height: 100%;
		}
	}

	.line-wrap {
		//width:300px;
		margin: 0 auto;
	}

	.circle-load-rect-svg {
		margin: 10px;
	}

	.g-rect-fill {
		fill: none; //填充颜色(画折线一般把属性设置为none)
		//stroke-width: 10; //边框宽带
		//stroke: #cb8505; //边框颜色
		stroke-linejoin: round;
		stroke-linecap: round;
		//stroke-dasharray: 20; //块宽度
		animation: dash linear infinite;
		// animation-duration: 9s;
		// fill-opacity: 0.1; //透明度
		//stroke-opacity:0.1 //边框的透明度
	}

	@keyframes dash {
		0% {
			stroke-dashoffset: 1000;
		}
	}
</style>
