<template>
  <div :style="[styleName]" :class="{'avue-echart-img--rotate':rotate==true}">
    <Slider v-model="value" :range="option.range" :disabled="option.disabled" :show-stops="option.showStop"
            :step="option.step" @on-change="changeValue"
    ></Slider>

  </div>
</template>
<script>
import {getVal,writePlcData} from '@/api/visual'

export default {
  name: 'baseSlider',
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      value: ""
    }
  },
  computed: {
    styleChange() {
      return {
        "--width": this.component.width + 'px',
        "--height": this.component.height + 'px',
        // "--background":this.option.backColor
      }
    },
	styleName() {
		return Object.assign(
			{
				transform: 'rotate(' + this.option.rotate + 'deg)'
			}
		);
	}
  },
  created() {
    this.getInfo()
    //setInterval(this.getInfo, 10000);
  },
  mounted() {

  },
  // 销毁监听，防止内存泄露
  destroyed() {

  },
  methods: {
    //是否显示
    getInfo() {
      if (this.option.valNm) {
        getVal(this.option.valNm).then(res => {
          this.value = res.data.data;
        })
      }
    },
    changeValue(val){

      if (this.option.valNm) {
        writePlcData(this.option.valNm,val).then(res=>{
          if (res.data.code === 401){
            this.getInfo()
            this.$message.error('没有修改权限');
          }
        })
      }


      //console.log(val)
    },

    format(val) {
      return '进度' + val + '%';
    },


  }
}
</script>
<style>
.ivu-slider-button {
  width: 21px;
  height: 21px;
}

.ivu-slider-wrap {
  height: 12px;
}

.ivu-slider-bar {
  height: 12px;
}
</style>
<style lang="scss" scoped>
p {
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.ivu-switch {
  width: var(--width) !important;
  height: var(--height) !important;
  // overflow: hidden;
}

.ivu-switch:after {
  height: calc(100% - 5px);
  top: 50%;
  transform: translateY(-50%);

}

.ivu-switch-large.ivu-switch-checked:after {
  left: calc(100% - 19px);
}

::v-deep .ivu-switch-checked {
  background-color: var(--background) !important;
}
</style>
