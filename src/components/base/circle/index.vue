<template>
  <div :style="{width:component.width+'px',height:component.height+'px'}">
    <p :style="{
    background:option.color,
    opacity:option.opacity/100,
    borderWidth:option.borderWidth+'px',
    borderColor:option.borderColor,
    borderStyle:option.borderType,

    }">

    </p>
  </div>
</template>
<script>
import {getVal} from '@/api/visual'

export default {
  name: 'baseCircle',
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      show: true,
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
  border-radius: 50%;
}
</style>
