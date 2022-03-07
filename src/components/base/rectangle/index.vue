<template>
  <div :style="[styleName]" :class="{'avue-echart-img--rotate':rotate==true}"
	@mouseover="mouseover"
	@mouseout="mouseout">
		<p :style="{
		background:option.color,
		opacity:option.opacity/100,
		borderWidth:option.borderWidth+'px',
		borderColor:option.borderColor,
		borderStyle:option.borderType,
		borderRadius:option.radius+'px'
		}"
		:title="option.title">
    </p>
  </div>
</template>
<script>
import {getVal} from '@/api/visual'

export default {
  name: 'baseRectangle',
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
	  			height:this.component.height+'px',
	  			transform: 'rotate(' + this.option.rotate + 'deg)'
	  		}
	  	);
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
	//鼠标划入
	mouseover() {
	  //浮窗
	  if (this.option.fc) {
	    this.$parent.$parent.over(this.option.fcUrl,this.$parent.left,this.$parent.top+80)
	  }
	  //显示边框颜色
	  if (this.option.suspensionColor) {
	    if (this.option.color == undefined) {
	      this.colorStyle = "filter: drop-shadow(1px 0px 3px #ff0000)"
	    } else {
	      this.colorStyle = "filter: drop-shadow(1px 0px 3px  " + this.option.suspensionColor + ")"
	    }
	  }
	},
	
	//鼠标划出
	mouseout() {
	  //去除边框颜色
	  if (this.option.suspension) {
	    this.colorStyle = ""
	    //e.currentTarget.className = "avue-echart-img"
	  }
	  if (this.option.fc) {
	    this.$parent.$parent.leave()
	
	  }
	},
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
  height: 100%;
}
</style>
