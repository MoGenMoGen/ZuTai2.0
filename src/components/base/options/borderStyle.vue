<!-- 自定义配置 -->
<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="边框样式" name="1">
        <el-form-item label="边框颜色">
          <avue-input-color placeholder="请选择颜色" v-model="main.activeOption.borderColor" ></avue-input-color>
        </el-form-item>
        <el-form-item label="边框宽度">
          <avue-input-number v-model="main.activeOption.borderWidth" @change="borderWidthChange"></avue-input-number>
        </el-form-item>
        <el-form-item label="边框样式">
          <avue-select v-model="main.activeOption.borderType" placeholder="请选择样式" type="tree" :dic="dicBorder"></avue-select>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>


  </div>
</template>

<script>
export default {
  inject: ["main"],
  data() {
    return {
        dicBorder:[{
            label:'实线',
            value:'solid'
        },{
            label:'虚线',
            value:'dashed'
        },{
            label:'点状',
            value:'dotted'
        },{
            label:'双实线',
            value:'double'
        },{
            label:'凹槽',
            value:'groove'
        },{
            label:'垄状',
            value:'ridge'
        }],
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
	borderWidthChange(currentValue, oldValue) {
		if(currentValue*2>=this.main.activeComponent.height.toFixed(0)||currentValue*2>=this.main.activeComponent.width.toFixed(0)) {
			let minWidth = 0
			if(this.main.activeComponent.height<this.main.activeComponent.width) {
				minWidth = this.main.activeComponent.height
			} else {
				minWidth = this.main.activeComponent.width
			}
			this.main.activeOption.borderWidth = (minWidth.toFixed(0)-10)/2
			this.$message.error('边框设置过大')
			return
		}
	}
  },
}
</script>

<style>
</style>
