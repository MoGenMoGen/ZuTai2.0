<!-- 自定义配置 -->
<template>
  <div>
	<template>
	  <el-form-item label="高亮文字">
	    <avue-input v-model="main.activeOption.linkStorageText"></avue-input>
	  </el-form-item>
	  <el-form-item label="打开方式">
	    <avue-radio v-model="main.activeOption.linkTarget"
	                :dic="dicOption.target">
	    </avue-radio>
	  </el-form-item>
	  <el-form-item label="链接方式">
	    <avue-radio v-model="main.activeOption.type"
	                :dic="linkOption">
	    </avue-radio>
	  </el-form-item>
	  <el-form-item label="外部链接" v-if="main.activeOption.type==1">
	    <avue-input v-model="main.activeOption.linkHref"></avue-input>
	  </el-form-item>
	  <el-form-item label="内部链接" v-if="main.activeOption.type==2">
	      <el-select v-model="main.activeOption.value1" filterable>
			  <el-option
				v-for="(item,index) in options1"
				:key="item.categoryValue"
				:label="item.categoryKey"
				:value="item.categoryValue"
				@click.native ="handleSelect(index)">
			  </el-option>
	      </el-select>
		  <el-select v-model="main.activeOption.value2" filterable>
			  <el-option
				v-for="(item,index) in options1[main.activeOption.selectIndex].visuals"
				:key="item.id"
				:label="item.title"
				:value="item.id"
				@click.native ="handleSelect2">
			  </el-option>
		  </el-select>
	  </el-form-item>
	</template>
  </div>
</template>

<script>
import {getCategoryAll} from '@/api/visual';
import { dicOption } from '@/option/config'
export default {
  inject: ["main"],
  data() {
    return {
		dicOption: dicOption,
		linkOption: [{
		  label: '外部链接',
		  value: 1
		}, {
		  label: '内部链接',
		  value: 2
		}],
		options1: [],
    }
  },
    components:{},
  computed(){
    
  },
  mounted() {
	getCategoryAll().then(res => {
		res.data.data.forEach((item,index) => {
			this.options1.push(item)
		})
	})
  },
  methods: {
	  handleSelect(index) {
		this.main.activeOption.selectIndex = index
	  },
	  handleSelect2() {
		this.main.activeOption.linkHref = window.location.origin + '/view/'+ this.main.activeOption.value2
	  }
  }
}
</script>

<style>
</style>
