<template>
  <div class="container" :style="{
    width:component.width+'px',
    height:component.height+'px',
    opacity:option.opacity/100,
    color:option.color,
    lineHeight:option.lineHeight+'px',
    fontSize:option.fontSize+'px',
    fontWeight:option.fontWeight,
    fontFamily:option.fontFamily,
    }">
    <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="option.textarea"
			:style="{
				textAlign:option.textAlign
			}">
    </el-input>
  </div>
</template>
<script>
import {getVal} from '@/api/visual'

export default {
  name: 'baseText',
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
}
/deep/.el-textarea{
  height: 100%;
  font-size: inherit !important;
  font-weight: inherit !important;
}
/deep/textarea{
  height: 100%;
  background: transparent !important;
  color: inherit !important;
  border: none !important;
  line-height: inherit;
  font-weight: inherit !important;
  text-align: inherit !important;
}
  /deep/.el-textarea__inner {
    resize: none;
  }
</style>
