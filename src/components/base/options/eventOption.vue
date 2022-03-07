<!-- 自定义配置 -->
<template>
  <div>
    <el-form-item label="点击事件">
      <avue-switch v-model="main.activeOption.isClick"></avue-switch>
    </el-form-item>
    <block v-if="main.activeOption.isClick">
        <el-form-item label="事件选择">
          <avue-select v-model="main.activeOption.eventOption_click" placeholder="请选择" type="tree" :dic="dicOption"></avue-select>
        </el-form-item>
        <el-form-item label="弹窗高度" v-if="main.activeOption.eventOption_click=='popup'">
          <el-input v-model="main.activeOption.popupH_click"></el-input>
        </el-form-item>
        <el-form-item label="弹窗宽度" v-if="main.activeOption.eventOption_click=='popup'">
          <el-input v-model="main.activeOption.popupW_click"></el-input>
        </el-form-item>
        <el-form-item label="弹窗链接" v-if="main.activeOption.eventOption_click=='popup'">
          <el-input v-model="main.activeOption.popupUrl_click"></el-input>
        </el-form-item>
        <el-form-item label="浮窗链接" v-if="main.activeOption.eventOption_click=='fc'">
          <el-input v-model="main.activeOption.fcUrl_click"></el-input>
        </el-form-item>
        <el-form-item label="提示文字" v-if="main.activeOption.eventOption_click=='title'">
          <el-input v-model="main.activeOption.title_click"></el-input>
        </el-form-item>
    </block>
    <!-- <el-form-item label="双击事件">
      <avue-switch v-model="main.activeOption.isDbclick"></avue-switch>
    </el-form-item> -->
    <block v-if="main.activeOption.isDbclick">
        <el-form-item label="事件选择">
          <avue-select v-model="main.activeOption.eventOption_dbclick" placeholder="请选择" type="tree" :dic="dicOption"></avue-select>
        </el-form-item>
        <el-form-item label="弹窗高度" v-if="main.activeOption.eventOption_dbclick=='popup'">
          <el-input v-model="main.activeOption.popupH_dbclick"></el-input>
        </el-form-item>
        <el-form-item label="弹窗宽度" v-if="main.activeOption.eventOption_dbclick=='popup'">
          <el-input v-model="main.activeOption.popupW_dbclick"></el-input>
        </el-form-item>
        <el-form-item label="弹窗链接" v-if="main.activeOption.eventOption_dbclick=='popup'">
          <el-input v-model="main.activeOption.popupUrl_dbclick"></el-input>
        </el-form-item>
        <el-form-item label="浮窗链接" v-if="main.activeOption.eventOption_dbclick=='fc'">
          <el-input v-model="main.activeOption.fcUrl_dbclick"></el-input>
        </el-form-item>
        <el-form-item label="提示文字" v-if="main.activeOption.eventOption_dbclick=='title'">
          <el-input v-model="main.activeOption.title_dbclick"></el-input>
        </el-form-item>
    </block>
    <el-form-item label="移入移出事件">
      <avue-switch v-model="main.activeOption.isHover"></avue-switch>
    </el-form-item>
    <block v-if="main.activeOption.isHover">
        <el-form-item label="事件选择">
          <avue-select v-model="main.activeOption.eventOption_hover" placeholder="请选择" type="tree" :dic="dicOption"></avue-select>
        </el-form-item>
        <el-form-item label="弹窗高度" v-if="main.activeOption.eventOption_hover=='popup'">
          <el-input v-model="main.activeOption.popupH_hover"></el-input>
        </el-form-item>
        <el-form-item label="弹窗宽度" v-if="main.activeOption.eventOption_hover=='popup'">
          <el-input v-model="main.activeOption.popupW_hover"></el-input>
        </el-form-item>
        <el-form-item label="弹窗链接" v-if="main.activeOption.eventOption_hover=='popup'">
          <el-input v-model="main.activeOption.popupUrl_hover"></el-input>
        </el-form-item>
        <el-form-item label="浮窗链接" v-if="main.activeOption.eventOption_hover=='fc'">
          <el-input v-model="main.activeOption.fcUrl_hover"></el-input>
        </el-form-item>
        <el-form-item label="提示文字" v-if="main.activeOption.eventOption_hover=='title'">
          <el-input v-model="main.activeOption.title_hover"></el-input>
        </el-form-item>
    </block>
  </div>
</template>

<script>
export default {
  inject: ["main"],
  data() {
    return {
        dicOption:[{
            label:'弹窗',
            value:'popup'
        },{
            label:'浮窗',
            value:'fc'
        },{
            label:'提示文字',
            value:'title'
        }]
    }
  },
  computed(){
    
  },
  mounted() {

  },
  methods: {
    
  },
}
</script>

<style>
</style>
