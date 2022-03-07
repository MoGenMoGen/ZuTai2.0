<template>
    <div :style="{
    width:component.width+'px',
    height:component.height+'px',
    transform: 'rotate(' + option.rotate + 'deg)',
    cursor: 'default',
  }" :class="{'avue-echart-img--rotate':rotate==true}">
        <canvas :id="'c'+option.index" @click="clickthis"></canvas>
    </div>
</template>
<script>
    export default {
        name: 'baseTriangle',
        props: {
            option: Object,
            component: Object,
        },
        inject: ["main", "contain"],
        data() {
            return {
                poly: []
            }
        },
        computed: {
        },
        created() {

        },
        mounted() {
            this.draw()
        },
        // 销毁监听，防止内存泄露
        destroyed() {

        },
        watch: {
            component: {
            	handler() {
            		this.draw()
            	},
            	deep: true,
            },
            option: {
            	handler() {
            		this.draw()
            	},
            	deep: true,
            }
        },
        methods: {
            draw() {
                let lineWidth = this.option.lineWidth?this.option.lineWidth:5
                const canvas = document.getElementById('c'+this.option.index)
                const ctx = canvas.getContext('2d')
                canvas.width = this.component.width
                canvas.height = this.component.height
                let bottom = Number(this.component.height) - lineWidth
                let right = Number(this.component.width) - lineWidth
                if(!this.contain.menuFlag) {
                    canvas.moveCursor = 'default'
                }
                ctx.moveTo(right/2,0)
                ctx.lineTo(lineWidth,bottom)
                ctx.lineTo(right,bottom)
                ctx.lineTo(right/2,0)
                ctx.fillStyle = this.option.fillStyle?this.option.fillStyle:'#f00'
                ctx.fill()
                ctx.lineWidth= lineWidth
                ctx.strokeStyle = this.option.strokeStyle?this.option.strokeStyle:'white'
                ctx.stroke()
                this.poly = [{
                    x: right/2,
                    y: 0
                },{
                    x: lineWidth,
                    y: bottom
                },{
                    x: right,
                    y: bottom
                }]
            },
            PointInPoly(pt, poly) {
                for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i) 
                    ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y)) 
                    && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x) 
                    && (c = !c); 
                return c; 
            },
            clickthis(e) {
                let pt = {
                    x: e.offsetX,
                    y: e.offsetY
                }
                console.log(this.PointInPoly(pt,this.poly))
            }
        }
    }
</script>
<style lang="scss" scoped>
    canvas {
        cursor: default;
    }
</style>
