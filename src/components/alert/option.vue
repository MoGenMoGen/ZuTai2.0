<!-- 报警 -->
<template>
  <div>
    <el-form-item label="数字大小">
      <avue-input-number v-model="main.activeOption.fontSize"></avue-input-number>
    </el-form-item>

    <el-form-item label="设备绑定">
      <avue-input-tree style="width: 100%"  v-model="main.activeOption.device" placeholder="请选择设备" type="tree" :dic="dic" :props="defaultProps"></avue-input-tree>
    </el-form-item>

    <el-form-item label="跳转地址">
      <avue-input v-model="main.activeOption.url"></avue-input>
    </el-form-item>


  </div>
</template>

<script>
import {getDictTree} from '@/api/visual'
export default {
  inject: ["main"],
  data() {
    return {
      form:'',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title',
        value: 'title',
      },
      dic:[]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
      init(){
        getDictTree().then(res=>{
          this.dic = res.data.data;
          let all = {
            title:'全部',
            id:'全部'
          }
          this.dic.push(all)
        })
      }
  }
}
</script>

<style>
</style>
