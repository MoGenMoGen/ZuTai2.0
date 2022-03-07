<!-- 自定义配置 -->
<template>
  <div>
    <el-tabs stretch v-model="activeName">
      <el-tab-pane label="导航数据" name="first">
        <div class="nav">
          <el-button @click="add">添加导航 +</el-button>
          <div class="navItem" v-for="(item,index) in main.activeOption.navList" :key="index">
            <i class="el-icon-error" @click="delet(index)"></i>
            <el-form-item label="标题">
              <avue-input v-model="item.nm"></avue-input>
            </el-form-item>
            <el-form-item label="链接">
              <avue-input v-model="item.linkHref"></avue-input>
            </el-form-item>
          </div>
        </div>

      </el-tab-pane>
      <el-tab-pane label="导航样式" name="second">
        <el-form-item label="背景颜色">
          <avue-input-color placeholder="请选择颜色" v-model="main.activeOption.bgColor" ></avue-input-color>
        </el-form-item>
        <el-form-item label="高亮背景颜色">
          <avue-input-color placeholder="请选择颜色" v-model="main.activeOption.bgColorActive" ></avue-input-color>
        </el-form-item>
        <el-form-item label="字体颜色">
          <avue-input-color placeholder="请选择颜色" v-model="main.activeOption.color" ></avue-input-color>
        </el-form-item>
        <el-form-item label="高亮字体颜色">
          <avue-input-color placeholder="请选择颜色" v-model="main.activeOption.colorActive" ></avue-input-color>
        </el-form-item>
        <el-form-item label="宽度">
          <avue-input-number v-model="main.activeOption.itemWidth"></avue-input-number>
        </el-form-item>
        <el-form-item label="高度">
          <avue-input-number v-model="main.activeOption.itemHeight"></avue-input-number>
        </el-form-item>
        <el-form-item label="间距">
          <avue-input-number v-model="main.activeOption.itemSpace"></avue-input-number>
        </el-form-item>
        <el-form-item label="圆角">
          <avue-input-number v-model="main.activeOption.itemRadius"></avue-input-number>
        </el-form-item>
        <font-style></font-style>
        <border-style></border-style>
      </el-tab-pane>
      <el-tab-pane label="其他设置" name="third">
        <el-form-item label="打开方式">
          <avue-radio v-model="main.activeOption.linkTarget"
                      :dic="dicOption.target">
          </avue-radio>
        </el-form-item>
        <el-form-item label="排列方式">
          <avue-radio v-model="main.activeOption.navStyle"
                      :dic="navStyle">
          </avue-radio>
        </el-form-item>
        <el-form-item label="对齐方式">
          <avue-radio v-model="main.activeOption.textAlign"
                      :dic="dicOption.textAlign">
          </avue-radio>
        </el-form-item>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import fontStyle from '../options/fontStyle'
  import borderStyle from '../options/borderStyle'
  import { dicOption } from '@/option/config'
export default {
  inject: ["main"],
    components:{fontStyle,borderStyle},
  data(){
    return {
        navStyle:[
            { label: '横排', value: 'horizontal' }, { label: '竖排', value: 'vertical' }
        ],
        dicOption: dicOption,
        activeName:'first'
    }
  },
  methods:{
    add(){
        this.main.activeOption.navList.push({
            nm:'',
            linkHref:'',
        })
    },
    delet(index){
        this.main.activeOption.navList.splice(index,1)
    }
  }
}
</script>
<style>
  .is-top{
    color: #fff;
  }
</style>
<style lang="scss" scoped>
  .nav{
     padding: 10px;
     .navItem{
        border-bottom: 1px solid rgba(255,255,255,0.3);
        position: relative;
       i{
         position: absolute;
         right: 0;
         top: 25px;
         cursor: pointer;
       }
     }
  }
</style>