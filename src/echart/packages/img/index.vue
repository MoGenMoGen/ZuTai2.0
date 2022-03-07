<template>
  <div>
    <div :class="b()"
         :style="styleSizeName"
         @mouseover="mouseover"
         @mouseout="mouseout"
         @click="handleClick">
<!--  浮窗   -->
      <div class="imgHover" v-if="show" id="imgHoverId">
        <iframe :src="url" frameborder="0" height="100%" width="100%"></iframe>
      </div>

      <div :style="colorStyle">
        <img
            :style="[styleImgName,styleSizeName]"
            :src="dataChart.value"
            :class="b({'rotate': rotate})"
            draggable="false"
			:title="option.title"
			style="display: inherit;"/>
      </div>

    </div>


  </div>


</template>

<script>
//  style="filter: drop-shadow(5px -2px 10px #ff0000);"
import create from "../../create";

export default create({
  name: "img",
  computed: {
    styleImgName() {
      return Object.assign(
          (() => {
            if (this.rotate) {
              return {
                animationDuration: this.duration / 1000 + "s"
              };
            }
            return {};
          })(),
          {
            opacity: this.option.opacity || 1,
            transform:'rotate('+this.option.rotate2+'deg)'
          }
      );
    },

    duration() {
      return this.option.duration || 3000;
    },
    rotate() {
      return this.option.rotate;
    }
  },
  data() {
    return {
      colorStyle: '',
      url: '',
      show: false
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   const body = document.querySelector('body')
    //   console.log(body)
    //   if (body.append) {
    //     body.append(this.$el)
    //   } else {
    //     body.appendChild(this.$el)
    //   }
    // })
  },
  methods: {
    //鼠标划入
    mouseover() {
      //浮窗
      if (this.option.fc) {
        this.$parent.$parent.over(this.option.fcUrl,this.$parent.left,this.$parent.top+80)
      }
      //显示边框颜色
      if (this.option.suspension) {
        if (this.option.suspensionColor == undefined) {
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
    handleClick() {
      //有跳转连接 跳转
      if (this.option.tzUrl){
        window.location.href=this.option.tzUrl
      }

      //console.log(this.option.tzUrl)
      this.clickFormatter && this.clickFormatter({
        data: this.dataChart
      });
    }
  }
});
</script>
<style>
.things {
  /*filter: drop-shadow(1px 0px 3px #ff0000);*/
}

.imgHover {
  position: fixed;
  height: 200px;
  width: 300px;
  margin-left: 80px;
  top: 50px;
  z-index: 9999;
}
</style>
