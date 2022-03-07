<template>
  <div @mousedown="mouseDown" @mouseup="mouseUp" :style="{width:component.width+'px',height:component.height+'px'}">

    <svg xmlns="http://www.w3.org/2000/svg"
         xml:space="preserve" class="circle-load-rect-svg" width="100%" height="100%">
      <polyline :points="option.points" class="g-rect-fill" :stroke-opacity="option.opacity"
                :stroke="option.color"
                :style="{'animation-duration':show?option.speed+'s':'0s'}"
                :stroke-width="option.width"
                :stroke-dasharray="option.dasharray"/>
    </svg>

    <!--   设定锚点的情况下显示-->
    <!-- <i class="el-icon-plus" style="color: #FFFFFF;font-size: 60px" v-if="option.setUp"></i> -->
  </div>
</template>
<script>
// import {getVal} from '@/api/visual'

export default {
  inject: ["main","contain"],
  name: 'xline',
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      show: true,
	  x:0,
	  y:0,
    }
  },
  computed: {},
  created() {
    this.getInfo()
    setInterval(this.getInfo, 10000);
  },
  mounted() {

  },
  // 销毁监听，防止内存泄露
  destroyed() {

  },
  methods: {
    //是否显示
    getInfo() {
  //     if (this.option.addr) {
  //       let item = localStorage.getItem(this.option.addr);
  //       this.show = item == this.option.openVal;
  //     }
  //     if (this.option.addr2){
  //       let item2 = localStorage.getItem(this.option.addr2);
  //       if (item2 != this.option.openVal2){
  //         this.show = false
  //       }
  //     }

  //     if (this.option.addr3 && this.option.addr4){
  //       let item3 = localStorage.getItem(this.option.addr3);
  //       let item4 = localStorage.getItem(this.option.addr4);
		// let item5 = localStorage.getItem(this.option.addr5);
  //       if (item3 != this.option.openVal3 || item4 != this.option.openVal4){
  //         this.show = false
  //       }
  //     }
		let itemA1 = localStorage.getItem(this.option.addrA1);
		let itemA2 = localStorage.getItem(this.option.addrA2);
		let itemA3 = localStorage.getItem(this.option.addrA3);
		let item = localStorage.getItem(this.option.addr);
		let item2 = localStorage.getItem(this.option.addr2);
		let item3 = localStorage.getItem(this.option.addr3);
		let item4 = localStorage.getItem(this.option.addr4);
		let item5 = localStorage.getItem(this.option.addr5);
		if((itemA1&&itemA1 == this.option.openValA1)||(itemA2&&itemA2 == this.option.openValA2)||(itemA3&&itemA3 == this.option.openValA3)||(!this.option.addrA1&&!this.option.addrA2&&!this.option.addrA3)) {
			if(this.option.addr&&!this.option.addr2) {
				if (this.option.addr3 || this.option.addr4 || this.option.addr5) {
					if(item == this.option.openVal&&((item3&&item3 == this.option.openVal3) || (item4&&item4 == this.option.openVal4)||(item5&&item5 == this.option.openVal5))) {
						this.show = true
					} else {
						this.show = false
					}
				} else {
					this.show = item == this.option.openVal
				}
			} else if (this.option.addr2&&!this.option.addr) {
				if (this.option.addr3 || this.option.addr4 || this.option.addr5) {
					if(item2 == this.option.openVal2&&((item3&&item3 == this.option.openVal3) || (item4&&item4 == this.option.openVal4)||(item5&&item5 == this.option.openVal5))) {
						this.show = true
					} else {
						this.show = false
					}
				} else {
					this.show = item2 == this.option.openVal2
				}
			} else if (this.option.addr&&this.option.addr2) {
				if (this.option.addr3 || this.option.addr4 || this.option.addr5) {
					if(item == this.option.openVal&&item2 == this.option.openVal2&&((item3&&item3 == this.option.openVal3) || (item4&&item4 == this.option.openVal4)||(item5&&item5 == this.option.openVal5))) {
						this.show = true
					} else {
						this.show = false
					}
				} else {
					this.show = (item == this.option.openVal&&item2 == this.option.openVal2)
				}
			} else if (!this.option.addr&&!this.option.addr2) {
			if (this.option.addr3 || this.option.addr4 || this.option.addr5) {
				if((item3&&item3 == this.option.openVal3) || (item4&&item4 == this.option.openVal4)||(item5&&item5 == this.option.openVal5)) {
					this.show = true
				} else {
					this.show = false
				}
			} else {
				this.show = true
			}
		  }
		} else {
			this.show = false
		}
    },
	mouseDown(e) {
		this.x = e.offsetX
		this.y = e.offsetY
	},
	mouseUp(e) {

		if(e.offsetX==this.x&&e.offsetY==this.y) {
			if(this.main.activeOption.points==undefined) {
				this.main.activeOption.points = this.x + ',' + this.y
				// console.log(22,this.main.activeOption.points)
			} else {
				this.main.activeOption.points = this.main.activeOption.points + ' '+this.x + ',' + this.y
				// console.log(33,this.main.activeOption.points)
			}
		}
	}


  }
}
</script>
<style lang="scss" scoped>
body {
  font-size: 10px;
}
p{
  color: #fff;
}
.container {
  width: 100%;
}

.line-wrap {
  //width:300px;
  margin: 0 auto;
}

// .circle-load-rect-svg {
//   margin: 10px;
// }

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
