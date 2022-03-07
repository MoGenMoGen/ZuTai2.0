<!-- 自定义配置 -->
<template>
  <div>
    <el-form-item label="撤销" v-show="main.activeOption.optionArr.length">
      <p @click="toBack" style="cursor: pointer">撤销</p>
    </el-form-item>
    <el-form-item label="绘图">
      <avue-switch v-model="main.activeOption.setUp"></avue-switch>
    </el-form-item>
    <el-collapse accordion>
      <el-collapse-item title="起始点设置">
        <el-form-item label="是否显示">
          <avue-switch v-model="main.activeOption.pointShow"></avue-switch>
        </el-form-item>
        <el-form-item label="圆点大小">
          <el-input placeholder="请输入值" v-model="main.activeOption.pointWidth" clearable></el-input>
        </el-form-item>
        <el-form-item label="圆点颜色">
          <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.pointBgColor" ></avue-input-color>
        </el-form-item>
        <el-form-item label="圆点透明度">
          <avue-slider v-model="main.activeOption.pointOpacity"
                       :max="1"
                       :step="0.1">
          </avue-slider>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
    <el-form-item label="编辑">
      <avue-switch v-model="main.activeOption.ifEdit"></avue-switch>
    </el-form-item>
   <!-- <el-form-item label="路径坐标">
     <p v-for="(item,index) in main.activeOption.optionArr" :key="index">{{item.x}},{{item.y}}</p>
   </el-form-item> -->
    <el-form-item label="填充颜色">
      <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.bgColor" ></avue-input-color>
    </el-form-item>
    <el-form-item label="边框颜色">
      <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.borderColor" ></avue-input-color>
    </el-form-item>

    <el-form-item label="边框宽度">
      <avue-input-number v-model="main.activeOption.borderWidth"></avue-input-number>
    </el-form-item>
    <el-form-item label="X轴缩放比">
      <avue-input-number v-model="main.activeOption.scaleX"></avue-input-number>
    </el-form-item>
    <el-form-item label="Y轴缩放比">
      <avue-input-number v-model="main.activeOption.scaleY"></avue-input-number>
    </el-form-item>
<!--    <el-form-item label="动画速度">-->
<!--      <avue-input-number  v-model="main.activeOption.speed"></avue-input-number>-->
<!--    </el-form-item>-->

<!--    <el-form-item label="显示条件">-->
<!--      <avue-input v-model="main.activeOption.addr" style="width: 120px"></avue-input>-->
<!--      =-->
<!--      <avue-input v-model="main.activeOption.openVal" style="width: 70px"></avue-input>-->
<!--    </el-form-item>-->
    <eventOption></eventOption>
  </div>
</template>

<script>
import eventOption from '../options/eventOption'
export default {
  inject: ["main","contain"],
  data() {
    return {

    }
  },
  components:{
    eventOption
  },
  computed(){
    //this.init()
  },
  watch:{
    'main.activeOption.setUp':{
      handler(e){
        // console.log(e)
         this.contain.menuFlag2 = !e
          if(!e){
              this.main.activeOption.ifEdit = false
          }
      },
      immediate:true
    },
      "main.activeOption.ifEdit":{
          handler:function (e) {
              if(e) {
                  this.main.activeOption.setUp = true
              }
          },
          immediate:true
      },
    'main.activeOption.index':{
      handler(){
        this.main.activeOption.setUp = false
        this.main.activeOption.ifEdit = false
      },
      immediate:true
    }
  },
  mounted() {

      this.main.activeOption.setUp = false
      this.main.activeOption.ifEdit = false
     // console.log(this.main)
     //  console.log(this.contain)

  },
    beforeDestroy(){
      this.contain.menuFlag2 = true
    //  document.removeEventListener('click',this.click)
  },
  methods: {

      toBack(){
          this.main.activeOption.optionArr.splice(this.main.activeOption.optionArr.length-1)
          // console.log(this.main.activeOption.optionArr)
      },


  }
}
</script>

<style>
</style>
