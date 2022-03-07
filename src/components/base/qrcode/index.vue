<template>
  <div class="qrCode" :style="{
  opacity:option.opacity/100,
  borderWidth:option.borderWidth+'px',
  borderColor:option.borderColor,
  borderStyle:option.borderType,
  width:component.width+'px',
  height:component.height+'px'
  }">
    <vue-qr
        :size="Math.min(component.width,component.height)"
        :bgSrc='option.bgUrl'
        :logoSrc="option.logoUrl"
        :text="option.text"
        :backgroundColor="option.bgColor"
        :margin="option.margin"
        :colorDark="option.colorDark"
        :colorLight="option.colorLight"
    ></vue-qr>
  </div>
</template>
<script>
// import {getVal} from '@/api/visual'
import vueQr from 'vue-qr'

export default {
  name: 'baseQrcode',
  props: {
    option: Object,
    component: Object,
  },
  components: {vueQr},
  data() {
    return {
      show: true,
      fabricObj: null,
      mouseFrom: {},
      lineCounter: 0,
      pointIndex: 0,
    }
  },
  computed: {},
  created() {

  },
  mounted() {

  },
  // 销毁监听，防止内存泄露
  destroyed() {

  },
  watch: {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.qrCode {

}

</style>
