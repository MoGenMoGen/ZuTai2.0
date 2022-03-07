<!-- 图片配置 -->
<template>
  <div>
    <el-form-item label="开启旋转">
      <avue-switch v-model="main.activeOption.rotate"></avue-switch>
    </el-form-item>


    <el-form-item label="开启弹窗">
      <avue-switch v-model="main.activeOption.popup"></avue-switch>
    </el-form-item>

    <el-form-item label="弹窗高度" v-if="main.activeOption.popup">
      <el-input v-model="main.activeOption.popupH"></el-input>
    </el-form-item>
    <el-form-item label="弹窗宽度" v-if="main.activeOption.popup">
      <el-input v-model="main.activeOption.popupW"></el-input>
    </el-form-item>


    <el-form-item label="弹窗链接" v-if="main.activeOption.popup">
      <el-input v-model="main.activeOption.popupUrl"></el-input>
    </el-form-item>

    <el-form-item label="跳转连接">
      <el-input v-model="main.activeOption.tzUrl"></el-input>
    </el-form-item>

    <el-form-item label="旋转">
      <el-slider v-model="main.activeOption.rotate2" :max="360"  :step="1"></el-slider>
    </el-form-item>

    <el-form-item label="悬浮特效">
      <avue-switch v-model="main.activeOption.suspension"></avue-switch>
    </el-form-item>

    <el-form-item label="特效颜色" v-if="main.activeOption.suspension">
      <avue-input-color v-model="main.activeOption.suspensionColor"></avue-input-color>
    </el-form-item>

    <el-form-item label="开启浮窗">
      <avue-switch v-model="main.activeOption.fc"></avue-switch>
    </el-form-item>
    <el-form-item label="浮窗链接" v-if="main.activeOption.fc">
      <el-input v-model="main.activeOption.fcUrl"></el-input>
    </el-form-item>
    <el-form-item label="透明度">
      <el-slider v-model="main.activeOption.opacity" :max="1"  :step="0.1"></el-slider>
    </el-form-item>
    <template v-if="main.activeOption.rotate">
      <el-form-item label="旋转时间">
        <avue-input-number v-model="main.activeOption.duration"></avue-input-number>
      </el-form-item>
    </template>
    <el-form-item label="图片地址">
      <img v-if="main.activeObj.data.value"
           :src="main.activeObj.data.value"
           alt=""
           width="100%" />
      <el-input v-model="main.activeObj.data.value">
        <div @click="main.handleOpenImg('activeObj.data.value')"
             slot="append">
          <i class="iconfont icon-img"></i>
        </div>
      </el-input>
    </el-form-item>
	<el-form-item label="提示文字">
	  <el-input v-model="main.activeOption.title"></el-input>
	</el-form-item>
  </div>
</template>

<script>
export default {
  inject: ["main"],
  methods:{

  }
}
</script>

<style>
</style>
