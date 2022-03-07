<template>
  <!-- 报警数 -->
  <div>
    <div class="circle" @click="toPage" v-if="num>0">
      <span @click="open" class="font" :style="{fontSize:fontSize,color:'#fff'}">{{ num }}</span>
    </div>

    <Modal v-model="show" title="报警列表" :mask-closable="false" draggable="true"
           :mask="false" :footer-hide="true" width="1000" >

      <el-table :data="list" style="width: 100%" stripe max-height="520" >
        <el-table-column prop="createTime" label="首次发生时间" width="220"></el-table-column>
        <el-table-column prop="updateTime" label="最近发生时间" width="220"></el-table-column>
        <el-table-column prop="msg" label="消息问题" width="220"></el-table-column>
        <el-table-column prop="details" label="详情"></el-table-column>
      </el-table>


    </Modal>



  </div>
</template>
<script>
import {getAlertNum, getAlertList} from '@/api/visual'

export default {
  name: 'alert',
  data() {
    return {
      num: 0,
      query: {
        status: '1',
        addr: ''
      },
      show:false,
      list: []
    }
  },
  props: {
    option: Object,
    component: Object
  },
  computed: {
    fontSize() {
      return (this.option.fontSize || 30) + 'px'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    open() {

      this.query.addr = this.option.device
      getAlertList(1, 99, this.query).then(res => {
       // console.log(res.data.data)
        this.list = res.data.data.records
      //  console.log(this.list)
        this.show = true
      })
      // console.log(this.option.device)
    },


    toPage() {
      if (this.option.url != undefined) {
        window.location.href = this.option.url
      }
    },
    init() {
      if (this.option.device != undefined) {
        getAlertNum(this.option.device).then(res => {
          this.num = res.data.data
        })
      }
    }
  }
}
</script>
<style>
.circle {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #ec0b0b;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
}

.font {
  font-weight: bold;
}
.ivu-modal-content{
  background-color: #091F37FF;
}
.ivu-modal-header p, .ivu-modal-header-inner{
  color: #f5f7fa;
}
</style>
