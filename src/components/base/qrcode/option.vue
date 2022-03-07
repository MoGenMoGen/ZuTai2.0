<!-- 自定义配置 -->
<template>
  <div>
    <!--  素材弹窗 -->
    <el-dialog custom-class="tc" title="选择素材" :close-on-click-modal="false"
               :visible.sync="dialogVisible" :modal="false" width="50%">
      <source-list></source-list>
    </el-dialog>
    <el-form-item label="内容">
      <el-input
              placeholder="请输入文本内容"
              v-model="main.activeOption.text">
      </el-input>
    </el-form-item>
    <el-form-item label="背景颜色">
      <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.bgColor" ></avue-input-color>
    </el-form-item>
    <el-form-item label="实点颜色">
      <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.colorDark" ></avue-input-color>
    </el-form-item>
    <el-form-item label="空白区颜色">
      <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.colorLight" ></avue-input-color>
    </el-form-item>
    <el-form-item label="边距">
      <avue-input-number v-model="main.activeOption.margin"></avue-input-number>
    </el-form-item>
    <el-form-item label="透明度">
      <avue-slider v-model="main.activeOption.opacity"></avue-slider>
    </el-form-item>
    <el-form-item label="背景图"  style="cursor: pointer">
      <p v-if="!main.activeOption.bgUrl" @click="clickSource('bg')">选择背景图</p>
      <div class="img"  v-else>
        <img :src="main.activeOption.bgUrl" @click="clickSource('bg')" width="50px"/>
        <i class="el-icon-circle-close"  @click="main.activeOption.bgUrl = ''" ></i>
      </div>
    </el-form-item>
    <el-form-item label="logo图片" style="cursor: pointer">
      <p v-if="!main.activeOption.logoUrl" @click="clickSource('logo')">选择logo图</p>
      <div class="img" v-else>
        <img :src="main.activeOption.logoUrl"  @click="clickSource('logo')"  width="50px"/>
        <i class="el-icon-circle-close"  @click="main.activeOption.logoUrl = ''"></i>
      </div>
    </el-form-item>
    <border-style></border-style>

  </div>
</template>

<script>
  import borderStyle from '../options/borderStyle'
  import sourceList from "../../../page/group/sourceList";
export default {
  inject: ["main"],
  data() {
    return {
        type:'',
        dialogVisible:false,
    }
  },
    components:{borderStyle,sourceList},
  computed(){
    //this.init()
  },
  mounted() {

  },
  methods: {
      setImg(img){
        if(this.type=='bg'){
            this.main.activeOption.bgUrl = img
        }else {
            this.main.activeOption.logoUrl = img
        }
          this.dialogVisible = false
      },
      clickSource(type) {
          console.log(type)
          this.type = type
          this.dialogVisible = true
      },
  }
}
</script>

<style lang="scss" scoped>
  .img{
    position: relative;
    width: 50px;
    i{
      position: absolute;
      right: -5px;
      top:-5px;
    }
  }
</style>
