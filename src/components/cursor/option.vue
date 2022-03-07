<!-- 自定义配置 -->
<template>
  <div>
    <el-form-item label="选择图标">
      <el-button type="text" @click="openImg()">选择素材</el-button>
    </el-form-item>
    <el-form-item label="图标">
      <el-image style="width: 30px; height: 30px" v-if="main.activeOption.url"  :src="main.activeOption.url"  fit="fit"></el-image>
    </el-form-item>
    <el-form-item label="图标宽" v-if="main.activeOption.url">
      <avue-input-number v-model="main.activeOption.w"></avue-input-number>
    </el-form-item>
    <el-form-item label="图标高" v-if="main.activeOption.url">
      <avue-input-number v-model="main.activeOption.h"></avue-input-number>
    </el-form-item>
    <el-form-item label="变量">
      <el-input  v-model="main.activeOption.valNm"></el-input>
    </el-form-item>

    <el-form-item label="开始位置" v-if="main.activeOption.url">
      <avue-input-number v-model="main.activeOption.start"></avue-input-number>
    </el-form-item>
    <el-form-item label="结束位置" v-if="main.activeOption.url">
      <avue-input-number v-model="main.activeOption.end"></avue-input-number>
    </el-form-item>

    <!--  素材弹窗 -->
<!--    <el-dialog custom-class="tc" title="选择素材" :close-on-click-modal="false"-->
<!--               :visible.sync="dialogVisible" :modal="false" width="50%">-->
<!--      <source-list></source-list>-->
<!--    </el-dialog>-->

    <imglist ref="imglist"   @change="handleSetImg"></imglist>

  </div>
</template>

<script>
import imglist from '../../page/group/imglist'
export default {
  inject: ["main"],
  components: {imglist},
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    openImg(){
      this.$refs.imglist.openImg('activeObj.data.value', 'border');
    },
    handleSetImg(val, type){
      this.main.activeOption.url = val;
      this.$forceUpdate()
    }
  }
}
</script>

<style>
.tc {
  background-color: #ffffff;
}
</style>
