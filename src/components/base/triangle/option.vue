<!-- 自定义配置 -->
<template>
    <div>
        <el-form-item label="填充颜色">
          <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.fillStyle" ></avue-input-color>
        </el-form-item>
        <el-form-item label="边框宽度">
          <el-input placeholder="请输入值" v-model="main.activeOption.lineWidth" clearable></el-input>
        </el-form-item>
        <el-form-item label="边框颜色">
          <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.strokeStyle" ></avue-input-color>
        </el-form-item>
        <el-form-item label="旋转">
          <el-slider v-model="main.activeOption.rotate" :max="360"  :step="1"></el-slider>
        </el-form-item>
        <el-form-item label="旋转">
          <avue-input-number v-model="main.activeOption.rotate"></avue-input-number>
        </el-form-item>
    </div>
</template>

<script>
    export default {
        inject: ["main", "contain"],
        data() {
            return {

            }
        },
        computed() {
            //this.init()
        },
        watch: {

        },
        mounted() {

        },
        beforeDestroy() {},
        methods: {}
    }
</script>

<style>
</style>
