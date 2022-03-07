<template>
  <div>
    <el-radio-group v-model="radio" :style="styleVar" @change="changeRadio">
      <el-radio style="margin-bottom: 5px;" :label="item.value" v-for="(item,index) in option.list" :key="index">
        {{ item.name }}
      </el-radio>
    </el-radio-group>
  </div>
</template>
<script>
import {writePlcData} from "@/api/visual";

export default {
  name: 'baseRadio',
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      radio: 1,
    }
  },
  computed: {
    styleVar() {
      return {
        "--color": this.option.color,
        "--selectColor": this.option.selectColor,
        "--fontSize": this.option.fontSize + "px",
        "--scale": `scale(${this.option.scale})`,
        "--flex": this.option.flex ? 'flex' : 'block',
        // "--borderWidth": this.option.borderWidth + "px",
        // "--innerWidth": this.option.innerWidth + "px",
      };
    },
  },
  created() {
  },
  mounted() {
    this.getInfo()
  },
  watch: {},
  // 销毁监听，防止内存泄露
  destroyed() {

  },
  methods: {
    //是否显示
    getInfo() {
      if (this.option.valNm) {
        this.value = localStorage.getItem(this.option.valNm)
      }
    },
    changeRadio(val) {
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
    }

  }
}
</script>
<style lang="scss" scoped>
.el-radio-group {
  width: 100%;
  height: 100%;
  display: var(--flex);
  // font-size: var(--fontSize);
}

/deep/ {
  .el-radio {
    display: flex;
    align-items: center;
    //鼠标滑过改变字体和小圆圈边框的样式
    &:hover {
      border-color: var(--selectColor) !important;
      color: var(--selectColor) !important;

      //鼠标滑过时小圆点边框显示
      .el-radio__inner {
        border-color: var(--selectColor);
      }
    }

    .el-radio__input {
      //选中时的样式
      &.is-checked {
        .el-radio__inner {
          //选中时小圆圈的的颜色
          // width: var(--borderWidth);
          // height: var(--borderWidth);
          transform: var(--scale);
          background-color: var(--selectColor);
          border-color: var(--selectColor);
        }

        + .el-radio__label {
          //选中时字体的颜色
          font-size: var(--fontSize);
          line-height: var(--fontSize);
          color: var(--selectColor) !important;
        }

        // .el-radio__inner::after {
        // 	width: var(--innerWidth);
        // 	height: var(--innerWidth);
        // }
      }

      .el-radio__inner {

        // 鼠标滑过小圆点时的样式
        &:hover {
          border-color: var(--selectColor);
        }
      }
    }

    .el-radio__input {
      .el-radio__inner {
        //未选中时小圆圈的的颜色
        // width: var(--borderWidth);
        // height: var(--borderWidth);
        transform: var(--scale);
        background-color: var(--color);
        border-color: var(--color);
      }

      + .el-radio__label {
        //未选中时字体的颜色
        font-size: var(--fontSize);
        line-height: var(--fontSize);
        color: var(--color) !important;
      }

      // .el-radio__inner::after {
      // 	width: var(--innerWidth);
      // 	height: var(--innerWidth);
      // }
    }
  }
}
</style>
