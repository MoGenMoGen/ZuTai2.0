<template>
  <el-dialog title="模型库"  width="90%"   :visible.sync="imgVisible">
    <div style="margin:0 auto;" class="upload">
      <el-upload class="upload-demo"
                 :on-success="onSuccess"
                 :show-file-list="false"
                 :headers="headers"
                 :data="{type:tab}"
                 :action="'/api/blade-resource/oss/endpoint/put-file2'"
                 multiple
                 list-type="picture">
        <el-button size="small"
                   icon="el-icon-upload"
                   type="primary">点击上传</el-button>
      </el-upload>

      <el-input v-model="keyWords" placeholder="请输入内容"></el-input>
      <el-button size="small"
                 icon="el-icon-search"
                 type="primary" @click="toSearch">搜索</el-button>
    </div>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
<!--        <el-tab-pane label="SVG素材" name="0">-->
<!--          <el-scrollbar class="imgList">-->
<!--            <img :src="item.value"-->
<!--                 :style="styleName"-->
<!--                 @click="handleSetimg(item.value)"-->
<!--                 v-for="(item,index) in imgOption[imgActive]"-->
<!--                 :key="index" />-->
<!--          </el-scrollbar>-->
<!--        </el-tab-pane>-->
        <el-tab-pane :label="item.title" :name="index+1" :key="index" v-for="(item,index) in arrShow">
          <el-scrollbar class="imgList">
            <div class="imgList2">
              <div class="img" @click="handleSetimg(v.value)" :key="i"
                   v-for="(v,i) in item.children" :style="styleName">
                <img :src="v.value" height="auto" />
              </div>
            </div>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>

  </el-dialog>
</template>

<script>
import { imgOption } from '@/option/config'
import {getFilePath} from '@/api/visual'
export default {
  data () {
    return {
      keyWords:'',
      activeName:0,
      imgVisible: false,
      imgObj: '',
      type: '',
      imgActive: 0,
      arrAll:[],
      imgOption: imgOption,
      imgOption2:[],
      arrShow:[],
      imgTabs: [],
      tab:''
    }
  },
  computed: {
    styleName () {
      if (this.type === 'background') {
        return {
          width: '200px'
        }
      }
      return {}
    },
    headers(){
      return {"Blade-Auth" : 'bearer ' + JSON.parse(localStorage.getItem('zt-token'))}
    }
  },
  mounted() {

    //console.log( this.arrShow)
    this.getFileList()
  },
  watch: {
    type: {
      handler () {
        if (this.type === 'background') {
          this.imgActive = 0;
        } else if (this.type == 'border') {
          this.imgActive = 1;
        } else {
          this.imgActive = 2;
        }
      },
      immediate: true
    }
  },
  methods: {
    getFileList(){
      getFilePath().then(res=>{
        this.imgOption2 = res.data.data
        this.arrShow = res.data.data
      })
    },
    toSearch(){
       this.arrShow = this.imgOption2.filter(item=>{
         return item.title.toLowerCase().indexOf(this.keyWords.toLowerCase())!=-1
       })
    },
    handleClick(val){
      this.tab = val.label
    },
    onSuccess (res) {
      console.log(11111111111)
      this.getFileList()
      // const url = res.data.link;
      // this.imgOption[this.imgActive].unshift({
      //   label: url,
      //   value: url
      // });
      //this.activeName = 2
    },
    openImg (item, type) {
      this.type = type;
      this.imgObj = item
      this.imgVisible = true;
    },
    handleSetimg (item) {
      this.imgVisible = false;
      this.$emit('change', item, this.imgObj);
    }
  }
}
</script>

<style  lang="scss" scoped>
  .upload{
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    .upload-demo{
      flex: 1;
    }
    /deep/.el-input{
      width: 200px;
      margin-left: 20px;
      margin-right: 10px;
    }
  }
  .imgList2{
    overflow: hidden;
  }
  .img{
    display: flex;
    float: left;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    img{
      width: auto!important;
      height: auto!important;
      max-width: 100%;
      max-height: 100%;
    }
  }
  /deep/.el-tabs__item{
    color: #ffffff
  }
  /deep/.el-tabs__item.is-active{
    color: #409EFF;
  }
  .build .tabs .el-tabs__item {
    padding: 0;
  }
</style>
