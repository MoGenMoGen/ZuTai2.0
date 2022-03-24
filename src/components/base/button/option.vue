<!-- 按钮 -->
<template>
  <div>

    <el-form-item label="变量名称">
      <el-input   type="text"  placeholder="请输入变量名称"    v-model="main.activeOption.valNm" @focus="selectVar('main.activeOption.valNm')">  </el-input>
    </el-form-item>
    <el-form-item label="变量值">
      <el-input   type="text"  placeholder="请输入变量值"    v-model="main.activeOption.val">  </el-input>
    </el-form-item>

    <el-form-item label="文本内容">
      <el-input   type="text"  placeholder="请输入文本内容"    v-model="main.activeOption.textarea">  </el-input>
    </el-form-item>
    <el-form-item label="背景颜色">
      <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.bgColor" ></avue-input-color>
    </el-form-item>
    <el-form-item label="按下背景色">
      <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.bgColor2" ></avue-input-color>
    </el-form-item>
    <el-form-item label="背景图片">
      <el-image style="width: 30px; height: 30px"  :src="main.activeOption.bgImg" v-show="main.activeOption.bgImg"  fit="fit">
      </el-image>
      <el-button type="text" @click="clickSource('1')">选择图标</el-button>
      <el-button type="text" @click="main.activeOption.bgImg=''">删除图标</el-button>
    </el-form-item>
    <el-form-item label="按下背景图片">
      <el-image style="width: 30px; height: 30px"  :src="main.activeOption.bgImg2" v-show="main.activeOption.bgImg2"  fit="fit">
      </el-image>
      <el-button type="text" @click="clickSource('2')">选择图标</el-button>
      <el-button type="text" @click="main.activeOption.bgImg2=''">删除图标</el-button>
    </el-form-item>
    <el-form-item label="透明度">
      <avue-slider v-model="main.activeOption.opacity"></avue-slider>
    </el-form-item>
    <font-style></font-style>
    <border-style></border-style>
    <el-form-item label="圆角弧度">
      <avue-input-number v-model="main.activeOption.radius"></avue-input-number>
    </el-form-item>
    <el-form-item label="按下字体颜色">
      <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.color2" ></avue-input-color>
    </el-form-item>
    <imglist ref="imglist"   @change="handleSetImg"></imglist>

	<el-form-item label="旋转">
	  <avue-input-number v-model="main.activeOption.rotate"></avue-input-number>
	</el-form-item>
  </div>
</template>

<script>
    import borderStyle from '../options/borderStyle'
    import fontStyle from '../options/fontStyle'
    import imglist from '../../../page/group/imglist'
export default {
  inject: ["main"],
  data() {
    return {
      type:'1'

    }
  },
    components:{borderStyle,fontStyle,imglist},
  computed(){
    //this.init()
  },
  mounted() {
    window.addEventListener('keyup', this.handleKeyup)

  },
  methods: {
    handleSetImg(val){
      if(this.type==='1'){
        this.main.activeOption.bgImg = val
      }else {
        this.main.activeOption.bgImg2 = val
      }
      this.$forceUpdate()
    },
    clickSource(type) {
      this.type = type
      this.$refs.imglist.openImg('activeObj.data.value', 'background');
    },
    selectVar(item) {
        this.main.handleOpenPoint(item)
    }
  }
}
</script>

<style>
</style>
