<!-- 自定义配置 -->
<template>
  <div>
    <el-form-item label="字体">
      <avue-select v-model="main.activeOption.fontFamily" placeholder="请选择字体" type="tree" :dic="dic2"></avue-select>
    </el-form-item>
    <el-form-item label="字体颜色">
      <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.color" ></avue-input-color>
    </el-form-item>
    <el-form-item label="字体大小">
      <avue-input-number v-model="main.activeOption.fontSize"></avue-input-number>
    </el-form-item>
    <el-form-item label="字体行高">
      <avue-slider v-model="main.activeOption.lineHeight"></avue-slider>
    </el-form-item>
    <el-form-item label="字体粗细">
      <avue-radio v-model="main.activeOption.fontWeight" :dic="dic"></avue-radio>
    </el-form-item>
  </div>
</template>

<script>
export default {
  inject: ["main"],
  data() {
    return {
        dic:[{
            label:'默认',
            value:'normal'
        },{
            label:'粗',
            value:'bold'
        },{
            label:'细',
            value:'lighter'
        }],
        dic2:[{
            label:'微软雅黑',
            value:'微软雅黑'
        },{
            label:'等线',
            value:'Deng'
        },{
            label:'仿宋',
            value:'simfang'
        },{
            label:'黑体',
            value:'simhei'
        },{
            label:'楷体',
            value:'simkai'
        }]
    }
  },
  computed(){
    //this.init()
  },
  mounted() {
    window.addEventListener('keyup', this.handleKeyup)

  },
  methods: {
    init(){
      if (this.main.activeOption.speed === undefined){
        this.main.activeOption.speed = 3
      }
      if (this.main.activeOption.opacity === undefined){
        this.main.activeOption.opacity = 1
      }
      if (this.main.activeOption.dasharray === undefined){
        this.main.activeOption.dasharray = 10
      }
      if (this.main.activeOption.width === undefined){
        this.main.activeOption.width = 10
      }
      if (this.main.activeOption.color === undefined){
        this.main.activeOption.color = "#FFFFFF"
      }
      //console.log(this.main.activeOption.speed)
    },


    handleKeyup(e) {
      if (e.key === 'q') {
        let x = Number(this.main.activeObj.left + 40).toFixed(0)
        let y = Number(this.main.activeObj.top + 40).toFixed(0)
        if (this.main.activeOption.points === undefined){
          this.main.activeOption.points = x + "," + y + " "
        }else {
          this.main.activeOption.points = this.main.activeOption.points + x + "," + y + " "
        }
      }

    },

  }
}
</script>

<style>
</style>
