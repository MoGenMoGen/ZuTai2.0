<template>
  <div :style="[styleName]" :class="{'avue-echart-img--rotate':rotate==true}">
    <p :style="styleChange" :class="{active:classShow}" @mousedown="classShow=true"
       @mouseup="up">
      {{option.textarea}}
    </p>
  </div>
</template>
<script>
import {writePlcData} from '@/api/visual'

export default {
  name: 'baseButton',
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      show: true,
      classShow:false,
    }
  },
  computed: {
    styleChange(){
      //console.log(this.option)
     // console.log(this.option.bgImg)
      let parma = {
        "opacity":this.option.opacity/100,
        "color":this.option.color,
        "lineHeight":this.option.lineHeight+'px',
        "fontSize":this.option.fontSize+'px',
        "fontWeight":this.option.fontWeight,
        "fontFamily":this.option.fontFamily,
        "background-image":'url(\''+this.option.bgImg+'\')',
        "backgroundSize":'100% 100%',
        "backgroundColor":this.option.bgColor,
        "borderWidth":this.option.borderWidth+'px',
        "borderColor":this.option.borderColor,
        "borderStyle":this.option.borderType,
        "borderRadius":this.option.radius+'px',

        "--bgImg":'url(\''+this.option.bgImg2+'\')',
        "--bgColor":this.option.bgColor2,
        "--fontColor":this.option.color2,
      }
      let parma2 = null
      if(!this.option.bgImg){
        parma2 = {
          "boxShadow" : '0 9px #999',
          "--boxShadow": '0 5px #666',
          "--transform": 'translateY(4px)'
        }
      }
      if(parma2){
        parma = {...parma,...parma2}
      }
      return parma
    },
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
    //this.getInfo()
    //setInterval(this.getInfo, 10000);
  },
  mounted() {

  },
  // 销毁监听，防止内存泄露
  destroyed() {

  },
  methods: {
    up(){
      setTimeout(()=>{this.classShow=false},100)
      //触发数据写入
      if (this.option.valNm && this.option.val) {
        writePlcData(this.option.valNm,this.option.val).then(res=>{
          if (res.data.code === 401){
            this.$message.error('没有修改权限');
          }
          if (res.data.code === 200){
            this.$message.success('操作成功');
          }
        })
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
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /*background-image: url("/img/model/./Green(绿色能源)/House.png");*/
}
  .active{
    background-color: var(--bgColor) !important;
    background-image: var(--bgImg) !important;
    color: var(--fontColor) !important;
    box-shadow:var(--boxShadow) !important;
    transform:var(--transform) !important;
  }
</style>
