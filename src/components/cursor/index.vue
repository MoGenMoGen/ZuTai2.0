<template>
  <div class="cursor">
    <div :style="{left: left*component.width+'px'}">
      <img :height="h" :width="w" :src="url" alt="">
      <!--      <img src="./img/car.jpg" alt="" width="80px">-->
    </div>
  </div>
</template>
<script>
export default {
  name: 'cursor',
  props: {
    option: Object,
    component: Object
  },
  data() {
    return {
      left: 0,

    }
  },
  created() {
    this.getInfo()
    setInterval(this.getInfo, 10000);
  },


  computed: {
    url() {
      return (this.option.url)
    },
    w() {
      return (this.option.w)
    },
    h() {
      return (this.option.h)
    }
  },
  methods: {
    getInfo() {
      let z = localStorage.getItem(this.option.valNm);
      let total = Math.abs(Number(this.option.end)-Number(this.option.start))
      this.left =   Math.abs(Number(z)-Number(this.option.start))/ Number(total)
    },

  }
}
</script>
<style lang="scss" scoped>
  .cursor{
    position: relative;
    >div{
      position: absolute;
      img{
        transform: translateX(-50%);
      }
    }
  }
</style>
