<template>
  <div :style="[styleName]" style="position: relative;" :class="{'avue-echart-img--rotate':rotate==true}">
    <p :style="{
    background:option.color,
    height: option.height+'px'
    }">
	<!-- opacity:option.opacity/100,
    borderWidth:option.borderWidth+'px',
    borderColor:option.borderColor,
    borderStyle:option.borderType,
    borderRadius:option.radius+'px', -->
		<p class="arrow" :style="{
			borderLeft: borderLeft+'px solid ' + option.color,
			borderTop: borderLeft+'px solid transparent',
			borderBottom: borderLeft+'px solid transparent',
			right: right,
			top: top,
		}"></p>
    </p>
	
  </div>
</template>
<script>
import {getVal} from '@/api/visual'

export default {
  name: 'baseArrow',
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      show: true,
    }
  },
  computed: {
	styleName() {
		return Object.assign(
			{
				width:this.component.width+'px',
				// height:this.component.height+'px',
				transform: 'rotate(' + this.option.rotate + 'deg)',
				transformOrigin: 'center top'
			}
		);
	},
	borderLeft() {
		return Number(this.option.height/2)*3
	},
	right() {
		return '-' + Number(this.option.height/2) + 'px'
	},
	top() {
		return '-' + this.option.height + 'px'
	}
  },
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
      //console.log(this.option)
      if (this.option.addr) {
        getVal(this.option.addr).then(res => {
          let data = res.data;
          if (data.code === 200 && data.msg !== '暂无承载数据') {
            let val = data.data
            this.show = val == this.option.openVal;
          }

        })
      }
    }


  }
}
</script>
<style lang="scss" scoped>
p{
  width: 100%;
  // height: 5px;
}
.arrow {
	width: 0;
	height: 0;
	position: absolute;
}
</style>
