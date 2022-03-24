<template>
  <div id="app2" style="background-color: #fff">
    <el-container style="height: 750px">
      <el-aside width="200px">
        <el-menu default-active="0" @select="handleSelect" style="height:750px">
          <el-menu-item :index="index.toString()" :key="item.id" v-for="(item,index) in menuList">
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="height:30px">
          <div STYLE="float: left ; margin-top: 10px">
            <el-select popper-class="mySelect" v-model="dataType" placeholder="分类" size="mini" clearable @change="changeType">
              <el-option v-for="item in typeList" :key="item.dictValue" :label="item.dictValue"
                         :value="item.dictValue"/>
            </el-select>
          </div>


          <div STYLE="float: left ; margin-top: 10px;margin-left: 10px">
            <el-select popper-class="mySelect" v-model="elSpan" placeholder="请选择" size="mini" @change="updW">
              <el-option :key="12" label="2列" :value="12"/>
              <el-option :key="24" label="1列" :value="24"/>
            </el-select>
          </div>


          <div STYLE="float: left ; margin-top: 10px;margin-left: 10px">
            <el-button type="primary" size="mini" @click="show2 = true">显示配置</el-button>
          </div>
        </el-header>
        <el-divider></el-divider>
        <!--  中间  -->
        <el-main>
          <el-row :gutter="5">
            <el-col :span="elSpan" v-for="(item,index) in subList" v-if='show' :key="index">
              <el-card shadow="always" class="line-height" :body-style="{ padding: '5px' }">
                <div slot="header" class="clearfix">
                  <el-dropdown style="float: left" trigger="click" @command="toVal" size="mini">
                    <div @click="setIndex(index)">
                      <span>
                        {{ item.name }}<i class="el-icon-arrow-down el-icon--right"></i>
                       </span>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="(i,index) in subList2" :command="i" :key="index">{{
                          i.name
                        }}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <el-button style="float: right; padding: 3px 0;color: white;margin-left: 5px" type="text"
                             @click="toDtl(item)">历史
                  </el-button>
                  <el-button style="float: right; padding: 3px 0;color: white" type="text" @click="toQp(item)">全屏
                  </el-button>
                </div>
                <my-line :id="item.id+Math.ceil(Math.random()*35)" :addr="item.addr" :unit="item.unit" :elSpan="elSpan"
                         @setData="setData" ref='myLineRef'></my-line>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
        <!-- 底部  -->
        <el-footer style="height: 120px">
          <el-divider></el-divider>
          <div v-for="item in cruxList">
            <div class="tip">
              <li class="li1">{{ item.name }}</li>
              <li class="li2">{{ item.val }} {{ item.unit }}</li>
            </div>
          </div>
        </el-footer>
      </el-container>
    </el-container>

    <!-- 趋势详情 弹窗-->
    <el-dialog custom-class="myDialog" :append-to-body="true" :title="title" :visible.sync="dialogVisible" width="80%" @close="closeDialog">
      <div style="height:100%">
        <div slot="header" class="clearfix">
          <div STYLE="float: left ;margin-bottom: 10px">
            <el-date-picker size="mini" @change="changeDate"
                            v-model="time"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <myLineDtl ref='myLineRefDtl' v-if="dialogVisible"></myLineDtl>
      </div>
    </el-dialog>

    <!-- 趋势详情全屏 弹窗-->
    <el-dialog custom-class="myDialog" :append-to-body="true" :visible.sync="dShow" width="80%" :fullscreen="true">
      <my-line-full v-if="dShow" :id="this.info.id+Math.ceil(Math.random()*35)" :addr="this.info.addr"
                    :unit="this.info.unit" ref='myLineRef'></my-line-full>
    </el-dialog>
    <!-- 趋势详情 弹窗-->
    <el-dialog custom-class="myDialog" :append-to-body="true" :visible.sync="show2" width="45%">
      <el-transfer
          filterable @change="changeData"
          filter-placeholder="请输入名称搜索"
          :props="{key: 'id', label: 'name'}"
          v-model="value"
          :data="data">
      </el-transfer>
    </el-dialog>


  </div>
</template>
<script>
import myLine from "./MyLine";
import myLineDtl from "./MyLineDtl";
import MyLineFull from "./MyLineFull";
import {getDict, listForZt, getAllData, subListForZt} from '@/api/visual'

export default {
  name: 'trendPage',
  props: {
  	option: Object,
  	component: Object
  },
  data() {
    return {
      pid: '',
      id:'',
      timer: null,
      map: new Map(),
      map2: new Map(),
      value: [],
      data: [],
      title: '',
      addr: '',
      show2: false,
      show3: true,
      dShow: false,
      dialogVisible: false,
      show: true,
      index: '',
      mainIndex: 0,
      time: '',
      elSpan: 12,
      height: window.screen.availHeight,
      menuList: [],
      subList: [],
      subList2: [],
      cruxList: [],
      typeList: [],
      dataType: '',
      info: {}
    };
  },
  mounted() {
    this.init()
    this.getSiteData();
    setInterval(this.getSiteData, 10000);

  },
  components: {
    MyLineFull,
    myLine, myLineDtl
  },
  methods: {
    //修改
    updW() {

    },

    closeDialog() {
      this.time = null
      this.title = null
    },
    //请求数据存入浏览器缓存中
    getSiteData() {
      getAllData().then(res => {
        res.data.data.map(i => {
          localStorage.setItem(i.name, i.value)
        })
      })
    },


    changeType(type) {
      this.getSub(this.menuList[this.mainIndex].id, 1, this.dataType)
      this.getSub(this.menuList[this.mainIndex].id, 2, this.dataType)
    },

    changeDate(data) {
      this.$refs.myLineRefDtl.init(data, this.addr)
    },

    changeData(data) {
      this.subList = []
      data.map(res => {
        let newVar = this.map.get(res);
        if (newVar != undefined) {
          this.subList.push(newVar)
        }
      })
    },
    toQp(item) {
      this.info = item
      this.dShow = true
    },

    toDtl(item) {
      this.addr = item.addr
      this.title = item.name + "历史详情"
      this.dialogVisible = true
    },
    //切换分类
    handleSelect(key) {
      this.mainIndex = key
      this.getSub(this.menuList[key].id, 1, this.dataType)
      this.getSub(this.menuList[key].id, 2, this.dataType)
    },
    toVal(item) {
      this.subList[this.index] = item
      this.$refs.myLineRef[this.index].reData()
      this.show = false
      this.show = true
    },
    setIndex(index) {
      this.index = index
    },
    setData(val) {
      //this.value.push(this.map2.get(val))

    },
    //获取
    init() {
      listForZt(this.$route.params.id).then(res => {
        this.menuList = res.data.data
        this.getSub(this.menuList[0].id, 1, this.dataType)
        this.getSub(this.menuList[0].id, 2, this.dataType)
      })
      getDict("site_type").then(res => {
        this.typeList = res.data.data;
      })
    },

    getSub(pid, type, dataType) {
      this.subList = []
      this.data = []
      this.show = false
      setTimeout(() => {
        this.show = true
      }, 500);
      this.pid = pid
      if (type === 1) {
        this.map = new Map();
        this.map2 = new Map();
        subListForZt(pid, type, dataType,this.$route.params.id).then(res => {
          res.data.data.map(res => {
            this.data.push(res)
            this.map.set(res.id, res)
            this.map2.set(res.addr, res.id)
            if (res.val != 0){
              this.subList.push(res)
              this.value.push(res.id)
            }
          })
          this.subList2 = JSON.parse(JSON.stringify(this.subList))
        })

      } else {
        subListForZt(this.pid, 2, dataType,this.$route.params.id).then(res => {
          this.cruxList = res.data.data
        })
        this.cruxList = []
        clearTimeout(this.timer)
        this.timer = null;
        this.timer = setInterval(() => {
          subListForZt(this.pid, 2, dataType,this.$route.params.id).then(res => {
            this.cruxList = res.data.data
          })
        }, 10000);


      }
    },

  },
};
</script>
<style lang="scss">
#app2 {
    text-align: center;
}
#app2,.myDialog{
    font-family: Helvetica, sans-serif;
    background-color: #fff;
    .el-container.is-vertical {
      background: #204469;
    }

    .el-menu-item {
      background: #204469;
      color: #ffffff;
      font-weight: bold;
    }

    .el-menu-item:hover {
      background-color: rgb(104, 144, 178) !important;
    }

    .el-menu-item.is-active {
      color: #9b9898;
    }

    .el-dropdown {
      color: #ffffff;
      font-size: 14px;
    }

    .el-card__header {
      border-bottom: 0px solid #ebeef5;
    }

    .el-card {
      border: 0px solid #EBEEF5;
      background-color: #3472ab;
      color: #303133;
      transition: .3s;
    }

    .tip {
      float: left;
      width: 120px;
      border-left: 5px solid #50bfff;
    }

    .li1 {
      margin-left: 5px;
      text-align: left;
      min-width: 40px;
      font-size: 10px;
      color: rgb(255, 255, 255);
      list-style-type: none
    }

    .li2 {
      margin-left: 5px;
      text-align: left;
      min-width: 40px;
      font-size: 25px;
      color: rgb(255, 255, 255);
      list-style-type: none
    }

    .line-height {
      height: 210px;
      margin-top: 5px;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both;
    }

    .el-card__header {
      padding: 5px 20px;
      border-bottom: 1px solid #ebeef5;
      box-sizing: border-box;
    }

    .el-dialog__body {
      padding: 10px 20px;
      background-color: #3472ab;
    }

    .el-dialog__header {
      background-color: #3472ab;
    }

    .el-dialog__title {
      color: white;
    }
    .el-range-editor--mini .el-range-input, .el-input--mini .el-input__inner,.el-input--small .el-input__inner {
        color: #000 !important;
        background: #fff !important;
    }
    .el-input--small .el-input__inner {
        border: 1px solid #DCDFE6 !important;
    }
    .el-transfer-panel .el-checkbox__inner {
        background: #fff !important;
        border: 1px solid #DCDFE6 !important;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #409eff !important;
        border-color: #409eff !important;
    }
}
.el-input--small .el-input__inner {
    color: #000 !important;
    background: #fff !important;
    border: 1px solid #DCDFE6 !important;
}
.mySelect {
    .el-select-dropdown__list {
        background: #fff;
    }
    .el-select-dropdown__item.hover,.el-select-dropdown__item {
        color: #000;
    }
    .el-select-dropdown__item.selected, .el-select-dropdown__item.hover {
        background-color: #e4e6e7;
    }
    .el-select-dropdown__item.selected {
        color: #409eff;
        font-weight: 700;
    }
}
</style>
