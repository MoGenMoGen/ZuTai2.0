<template>
  <div>
    <Tabs :value="name1" :animated="false" @on-click="clickType">
      <TabPane :label="item.dictValue" :name="item.id" v-for="item in imgTabs" :key="item.id">

        <el-row>
          <el-col :span="2" v-for="i in imgList" :key="i.id" >
            <div @click="clickImg(i)">
              <Avatar shape="square" size="50" :src="i.url"  />
            </div>

          </el-col>
        </el-row>


      </TabPane>

    </Tabs>


  </div>

</template>

<script>
import {imgOption} from '@/option/config'
import {getDict,getSourceList} from '@/api/visual'

export default {
  data() {
    return {
      name1:'',
      imgVisible: false,
      imgObj: '',
      type: '',
      imgActive: 0,
      imgOption: imgOption,
      imgTabs: [],
      imgList:[]
    }
  },
  computed: {

  },
  mounted(){
    this.getType()
  },
  methods: {
    clickImg(val){
      this.$parent.$parent.setImg(val.url)
    },

    clickType(row){
      this.getImgList(row)
    },


    //获取素材分类
    getType() {
      getDict("material").then(res => {
        this.imgTabs =  res.data.data
        this.getImgList(this.imgTabs[0].id)
        //console.log(res.data)
      })
    },
    getImgList(type){
      getSourceList(type).then(res=>{
        this.imgList = res.data.data
      })
    },

    handleClick(res) {
      console.log(res)
    },
    onSuccess(res) {
      const url = res.data.link;
      this.imgOption[this.imgActive].unshift({
        label: url,
        value: url
      });
    },
    openImg(item, type) {
      this.type = type;
      this.imgObj = item
      this.imgVisible = true;
    },
    handleSetimg(item) {
      this.imgVisible = false;
      this.$emit('change', item, this.imgObj);
    }
  }
}
</script>

<style>
</style>
