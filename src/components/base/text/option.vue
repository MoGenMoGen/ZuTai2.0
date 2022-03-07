<!-- 自定义配置 -->
<template>
  <div>
    <el-form-item label="文本内容">
      <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入文本内容"
              v-model="main.activeOption.textarea">
      </el-input>
    </el-form-item>
    <el-form-item label="透明度">
      <avue-slider v-model="main.activeOption.opacity"></avue-slider>
    </el-form-item>
	<el-form-item label="对齐方式">
	  <avue-select v-model="main.activeOption.textAlign"
	               :dic="dicOption.textAlign">
	  </avue-select>
	</el-form-item>
    <font-style></font-style>
  </div>
</template>

<script>
    import fontStyle from '../options/fontStyle'
	import { dicOption } from '@/option/config'
export default {
  inject: ["main"],
  data() {
    return {
		dicOption: dicOption,
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
    components:{fontStyle},
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
