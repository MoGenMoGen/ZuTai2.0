<!-- 监控 -->
<template>
  <div>
    <el-form-item label="监控图标">
      <img v-if="main.activeOption.url"
           :src="main.activeOption.url"
           alt=""
           width="180px" />
      <el-button @click="openImg()">选择素材</el-button>
    </el-form-item>
    <el-form-item label="IP地址">
      <el-input  v-model="main.activeOption.ip"></el-input>
    </el-form-item>
    <el-form-item label="用户名">
      <el-input  v-model="main.activeOption.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input  v-model="main.activeOption.password"></el-input>
    </el-form-item>

    <el-form-item label="标题">
      <el-input  v-model="main.activeOption.title"></el-input>
    </el-form-item>

    <imglist ref="imglist"   @change="handleSetImg"></imglist>

  </div>
</template>

<script>
import imglist from '../../page/group/imglist'
export default {
  inject: ["main"],
  components: {
    imglist
  },
  methods:{
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
</style>
