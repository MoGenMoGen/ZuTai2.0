<template>
  <div
    :style="[styleName, styleChange]"
    :class="{ 'avue-echart-img--rotate': rotate == true }"
  >
    <Slider
      v-model="value"
      :min="Number(option.min)"
      :max="Number(option.max)"
      :range="option.range"
      :disabled="option.disabled"
      :show-stops="option.showStop"
      :step="Number(option.step)"
      @on-input="changeValue"
    ></Slider>
  </div>
</template>  
<script>
import { getVal, writePlcData } from "@/api/visual";

export default {
  name: "baseSlider",
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      value: "",
    };
  },
  computed: {
    styleChange() {
      return {
        "--width": this.component.width + "px",
        "--height": this.component.height + "px",
        "--diameter": this.option.diameter + "px",
        "--baseColor": this.option.baseColor,
        "--progressColor": this.option.progressColor,
        // "--background": '#e74c3c',
      };
    },
    styleName() {
      return Object.assign({
        transform: "rotate(" + this.option.rotate + "deg)",
      });
    },
  },
  created() {
    console.log(111, this.styleChange);
    this.getInfo();
    //setInterval(this.getInfo, 10000);
  },
  mounted() {},
  // 销毁监听，防止内存泄露
  destroyed() {},
  methods: {
    //是否显示
    getInfo() {
      if (this.option.valNm) {
        getVal(this.option.valNm).then((res) => {
          this.value = res.data.data;
        });
      }
    },
    changeValue(val) {
      console.log("修改滑动条", val);
      if (this.option.valNm) {
        writePlcData(this.option.valNm, val).then((res) => {
          if (res.data.code === 401) {
            this.$message.error("没有修改权限");
          } else this.getInfo();
        });
      }
      //console.log(val)
    },

    format(val) {
      return "进度" + val + "%";
    },
  },
};
</script>
<style lang="scss" >
.ivu-slider-button {
  width: var(--diameter);
  height: var(--diameter);
  border-color: var(--progressColor) !important;
}
.ivu-slider-button-wrap {
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: var(--diameter);
  height: var(--diameter);
}
.ivu-slider-wrap {
  height: 12px;
  background: var(--baseColor);
}

.ivu-slider-bar {
  height: 12px;
  background: var(--progressColor);
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
