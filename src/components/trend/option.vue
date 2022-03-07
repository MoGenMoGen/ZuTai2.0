<!-- 趋势 -->
<template>
  <div>
    <el-form-item label="图标">
      <img v-if="main.activeOption.url"
           :src="main.activeOption.url"
           alt=""
           width="50px" />
    </el-form-item>

    <el-form-item >
      <el-button @click="openImg()">选择图标</el-button>
    </el-form-item>

    <el-form-item label="变量名">
      <el-input   v-model="main.activeOption.points"></el-input>
    </el-form-item>

    <el-form-item label="显示名称">
      <el-input   v-model="main.activeOption.pointNm"></el-input>
    </el-form-item>
    <el-form-item label="单位">
      <el-input   v-model="main.activeOption.unit"></el-input>
    </el-form-item>
    <!--  素材弹窗 -->
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
      socket:null
    }
  },
  mounted() {

  },
  methods: {
    openImg(){
      this.$refs.imglist.openImg('activeObj.data.value', 'border');
    },
    handleSetImg(val){
      this.main.activeOption.url = val;
      this.$forceUpdate()
    },
    clickSource() {
      this.dialogVisible = true
    },
    setImg(url){
      this.main.activeOption.url = url
      this.dialogVisible = false
    },
  }
}
</script>

<style>
.tc {
  background-color: #ffffff;
}
</style>
