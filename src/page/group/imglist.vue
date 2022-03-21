<template>
  <el-dialog title="模型库" width="90%" :visible.sync="imgVisible">
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
      <el-tabs stretch class="myTabs" v-model="activeName" @tab-click="handleClick">
<!--        <el-tab-pane label="SVG素材" name="0">-->
<!--          <el-scrollbar class="imgList">-->
<!--            <img :src="item.value"-->
<!--                 :style="styleName"-->
<!--                 @click="handleSetimg(item.value)"-->
<!--                 v-for="(item,index) in imgOption[imgActive]"-->
<!--                 :key="index" />-->
<!--          </el-scrollbar>-->
<!--        </el-tab-pane>-->
        <el-tab-pane v-if="canSelect(item.title)" :label="item.title" :name="index+1" :key="index" v-for="(item,index) in arrShow">
          <el-scrollbar class="imgList">
            <div class="imgList2">
              <div class="img" @click="handleSetimg(v.value)" :key="i"
                   v-for="(v,i) in item.children" :style="styleName">
                <img :src="v.value" height="auto" />
                <div class="img-name">{{v.img}}</div>
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
      activeName:1,
      imgVisible: false,
      imgObj: '',
      type: '',
      imgActive: 0,
      arrAll:[],
      imgOption: imgOption,
      imgOption2:[],
      arrShow:[],
      imgTabs: [],
      tab:'',
      title: ''
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
    },
    canSelect(title) {
        return (title)=> {
            if(this.title&&title!='3D模型') {
                return false
            } else if (!this.title&&title=='3D模型') {
                return false
            } else {
                return true
            }
        }
    }
  },
  mounted() {

    // console.log( this.arrShow)
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
      this.getFileList()
      // const url = res.data.link;
      // this.imgOption[this.imgActive].unshift({
      //   label: url,
      //   value: url
      // });
      //this.activeName = 2
    },
    openImg (item, type,title) {
      this.type = type;
      this.imgObj = item
      this.imgVisible = true;
      if (title) {
        this.title = title
        this.activeName = this.arrShow.findIndex(v=>v.title==title) + 1
      }
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
    flex-direction: column;
    float: left;
    // align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border: 1px solid #dedede;
    box-sizing: border-box;
    margin-bottom: 5px;
    cursor: pointer;
    img{
      width: auto!important;
      height: 80% !important;
      max-width: 100%;
      max-height: 80%;
      margin: 0 auto !important;
    }
    .img-name {
        height: 20%;
        background-color: #fafafa;
        color: #555;
        padding: 0 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
  }
  /deep/.el-tabs__item{
    color: #ffffff;
  }
  /deep/.el-tabs__item.is-active{
    color: #409EFF;
  }
  .build .tabs .el-tabs__item {
    padding: 0;
  }
</style>
