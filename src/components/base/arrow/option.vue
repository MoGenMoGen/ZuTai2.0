<!-- 自定义配置 -->
<template>
  <div>

    <el-form-item label="线条颜色">
      <avue-input-color placeholder="请选择颜色" v-model="main.activeOption.color" ></avue-input-color>
    </el-form-item>
    <!-- <border-style></border-style> -->
    <!-- <el-form-item label="圆角弧度">
      <avue-input-number v-model="main.activeOption.radius"></avue-input-number>
    </el-form-item> -->
	<el-form-item label="高度">
	  <avue-input-number v-model="main.activeOption.height"></avue-input-number>
	</el-form-item>

	<el-form-item label="旋转">
	  <avue-input-number v-model="main.activeOption.rotate"></avue-input-number>
	</el-form-item>
  </div>
</template>

<script>
    import borderStyle from '../options/borderStyle'
export default {
  inject: ["main"],
  data() {
    return {

    }
  },
    components:{borderStyle},
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
    touchmove(e) {
      //console.log(e)
    }
  }
}
</script>

<style>
</style>
