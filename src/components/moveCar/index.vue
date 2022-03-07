<template>
  <div>
    <div :style="{'margin-left': left +'%'}" v-if="show">
      <img :src="option.imgUrl" alt="" width="80px">
      <table class="imagetable">
        <tr>
          <td>小车号 <span style="font-size: 15px">{{ v1 }}</span></td>
        </tr>
        <tr>
          <td>产品号 <span style="font-size: 15px">{{ v2 }}</span></td>
        </tr>
        <tr v-if="option.v3">
          <td>颜色号 <span style="font-size: 15px">{{ v3 }}</span></td>
        </tr>
      </table>

    </div>

  </div>
</template>
<script>
export default {
  name: 'moveCar',
  props: {
    option: Object,
    component: Object
  },
  data() {
    return {
      show: false,
      left: 0,
      v1: null,
      v2: null,
      v3: null,
      v4: ''
    }
  },
  created() {
    this.getInfo()
    setInterval(this.getInfo, 10000);
  },
  methods: {
    getInfo() {
      //获取小车号
      if (this.option.v1 && this.v1 == null) {
        this.v1 = localStorage.getItem(this.option.v1)
      }
      if (this.option.v2 && this.v2 == null) {
        this.v2 = localStorage.getItem(this.option.v2)
      }
      if (this.option.v3 && this.v3 == null) {
        this.v3 = localStorage.getItem(this.option.v3)
      }
      //小车位置 / 最远距离 超出不显示
      if (this.option.v4) {
        // getVal(this.option.v4).then(res => {
        this.v4 = localStorage.getItem(this.option.v4)
        //位置0不显示
        if (this.v4 == 0) {
          this.show = false
          this.left = 0
        }
        if (this.v4 > this.option.v5) {
          this.show = false
          this.left = 0
        }
        if (this.v4 != 0 && Number(this.v4) < Number(this.option.v5)) {
          this.show = true
          this.left = Number(this.v4) / Number(this.option.v5) * 100
        }
      }


      // this.left = Number(this.left) + Number(1)
      // if (this.left === 100){
      //   this.left = 0
      // }
    }
  },
  computed: {
    fontSize() {
      return (this.option.fontSize || 30) + 'px'
    }
  },
}
</script>
<style type="text/css">
table.imagetable {
  width: 86px;
  font-size: 10px;
  color: #333333;
  border-width: 1px;
  border-color: #999999;
  border-collapse: collapse;
}

/*table.imagetable th {*/
/*  background:#b5cfd2 ;*/
/*  border-width: 1px;*/
/*  padding: 8px;*/
/*  font-size:10px;*/
/*  border-style: solid;*/
/*  border-color: #999999;*/
/*}*/
table.imagetable td {
  background: rgba(68, 108, 243, 0.64);
  border-width: 1px;
  padding: 8px;
  color: #FFFFFF;
  font-size: 10px;
  border-style: solid;
  border-color: #565555;
}
</style>
