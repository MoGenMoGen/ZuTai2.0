<!-- 指示灯 -->
<template>
  <div>
	<el-form-item label="旋转">
	  <el-slider v-model="main.activeOption.rotate2" :max="360"  :step="1"></el-slider>
	</el-form-item>
	<el-form-item label="开启旋转">
	  <avue-switch v-model="main.activeOption.rotate"></avue-switch>
	</el-form-item>
	<el-form-item label="旋转时间">
	  <avue-input-number v-model="main.activeOption.rotateDuration"></avue-input-number>
	</el-form-item>
	<el-form-item label="开启闪烁">
	  <avue-switch v-model="main.activeOption.flash"></avue-switch>
	</el-form-item>
	<el-form-item label="闪烁间隔时间">
	  <avue-input-number v-model="main.activeOption.flashDuration"></avue-input-number>
	</el-form-item>
	<el-form-item label="开启跳动">
	  <avue-switch v-model="main.activeOption.jump"></avue-switch>
	</el-form-item>
	<el-form-item label="跳动间隔时间">
	  <avue-input-number v-model="main.activeOption.jumpDuration"></avue-input-number>
	</el-form-item>
    <el-button type="text" @click="add" style="margin-left: 20px">添加指示灯</el-button>
    <div v-for="(item,index) in main.activeOption.tableData" :key="item">
      <el-form-item label="选择素材">
        <el-button type="text" @click="clickSource(index)">选择图标</el-button>
        <el-button type="text" @click="del(index)">删除当前项</el-button>
      </el-form-item>
      <el-form-item label="指示图" v-if="item.url">
        <el-image style="width: 30px; height: 30px"  :src="item.url"  fit="fit">
        </el-image>
      </el-form-item>
      <el-form-item label="变量名">
        <el-input placeholder="请输入变量名" v-model="item.vars" clearable @input="updVal"></el-input>
      </el-form-item>
      <el-form-item label="条件">
        <el-select v-model="item.con" placeholder="请选择" style="width: 100%" @change="updVal">
          <el-option key="==" value="==" label="等于"></el-option>
          <el-option key="!=" value="!=" label="不等于"></el-option>
          <el-option key="<" value="<" label="小于"></el-option>
          <el-option key=">" value=">" label="大于"></el-option>
          <el-option key=">=" value=">=" label="大于等于"></el-option>
          <el-option key="<=" value="<=" label="小于大于"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="值">
        <el-input placeholder="请输入值" v-model="item.val" clearable @input="updVal"></el-input>
      </el-form-item>
      <el-divider></el-divider>
    </div>

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
      index: '',
      dialogVisible: false,
      form: 'el-icon-info',
      info: {
        w: '',
        h: '',
        url: '',
        vars: '',
        con: '',
        val: '',
        testModel:false
      },
    }
  },
  watch: {
	'main.activeOption.rotate':{
	  handler(e){
		  if(e) {
			  this.main.activeOption.flash = false
			  this.main.activeOption.jump = false
		  }
	  },
	  immediate:true
	},
	'main.activeOption.flash':{
	  handler(e){
		  if(e) {
			  this.main.activeOption.rotate = false
			  this.main.activeOption.jump = false
		  }
	  },
	  immediate:true
	},
	'main.activeOption.jump':{
	  handler(e){
		  if(e) {
			  this.main.activeOption.flash = false
			  this.main.activeOption.rotate = false
		  }
	  },
	  immediate:true
	},
  },
  methods: {
    openImg(){
      this.$refs.imglist.openImg('activeObj.data.value', 'border');
    },
    handleSetImg(val){
      //this.main.activeOption.url = val;
      this.main.activeOption.tableData[this.index].url = val
      this.$forceUpdate()
    },

    updVal(){
      this.$forceUpdate();
    },
    clickSource(index) {
      this.index = index
      this.$refs.imglist.openImg('activeObj.data.value', 'border');
    },
    // setImg(url) {
    //   this.main.activeOption.tableData[this.index].url = url
    //   this.dialogVisible = false
    // },
    del(index) {
      // console.log(this.main.activeOption.tableData)
      this.main.activeOption.tableData.splice(index, 1);
      this.$forceUpdate()
    },
    //添加条件
    add() {
      if (!this.main.activeOption.tableData) {
        this.main.activeOption.tableData = []
      }
      let parse = JSON.parse(JSON.stringify(this.info));
      this.main.activeOption.tableData.push(parse)
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
