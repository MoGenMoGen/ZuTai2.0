<template>
  <div class="alertList">

    <!--    <el-button type="primary" @click="openDataShow">报警设置</el-button>-->

    <el-radio-group v-model="query.status" @change="onLoad1" style="margin-bottom: 2px">
      <el-radio-button label="1">实时</el-radio-button>
      <el-radio-button label="2">历史</el-radio-button>
    </el-radio-group>

    <el-input v-model="query.msg" style="width: 200px;margin-left: 10px" placeholder="搜索消息问题"></el-input>
    <el-input v-model="query.details" style="width: 200px;margin-left: 10px" placeholder="搜索详情"></el-input>
    <el-button type="primary" @click="onLoad1" style="margin-left: 10px">搜索</el-button>
    <el-button type="primary" @click="openDataShow" style="margin-left: 10px">报警设置</el-button>

    <el-table :data="list" style="width: 100%" stripe max-height="620" @row-dblclick="dblclick">
      <el-table-column prop="createTime" label="首次发生时间" width="220"></el-table-column>
      <el-table-column prop="updateTime" label="最近发生时间" width="220"></el-table-column>
      <el-table-column prop="msg" label="消息问题" width="220"></el-table-column>
      <el-table-column prop="details" label="详情"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == '1'" @click="delAlert(scope.row)" type="text">消除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background @size-change="sizeChangeHandle1"
        @current-change="currentChangeHandle1"
        :current-page="page1.currentPage"
        :page-size="page1.pageSize"
        :total="page1.total"
        layout="prev, pager, next">
    </el-pagination>


    <el-dialog title="报警设置" :visible.sync="dataShow" width="30%" append-to-body fullscreen>
      <el-input placeholder="请输入设备名称搜索" v-model="name">
        <template slot="prepend">输入设备名称搜索</template>
        <el-button slot="append" icon="el-icon-search" @click="onLoad"></el-button>
      </el-input>
      <el-table :data="data" style="width: 100%">
        <el-table-column prop="name" label="设备名称"></el-table-column>
        <el-table-column prop="unit" label="单位" width="180"></el-table-column>
        <el-table-column prop="faultVal" label="上限" width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.faultVal" placeholder="请输入上限警报值" @change="updVal(scope.row,1)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="lowVal" label="下限" width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.lowVal" placeholder="请输入下限警报值" @change="updVal(scope.row,2)"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          background @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :total="page.total"
          layout="prev, pager, next">
      </el-pagination>

    </el-dialog>

  </div>
</template>
<script>
import {getAlertList, updAlert, getSiteList, updAlertVal} from '@/api/visual'


export default {
  name: 'alertList',
  data() {
    return {
      name: '',
      form: {},
      data: [],
      query: {
        status: '1'
      },
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      page1: {
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      loading: true,
      option2: {
        searchLabelWidth: 150,
        height: 'auto',
        size: 'mini',
        calcHeight: 30,
        tip: false,
        addBtn: false,
        editBtn: false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        viewBtn: true,
        selection: false,
        menu: false,
        dialogClickModal: false,
        column: [
          {
            label: "设备名称",
            prop: "name",
            search: true,
          },
          {
            label: "单位",
            prop: "unit",
            width: 100,
          },
          {
            label: "上限",
            prop: "faultVal",
            width: 120,

            slot: true,
          },
          {
            label: "下限",
            prop: "lowVal",
            width: 120,
          },
        ]
      },
      dataShow: false,
      show: false,
      list: [],
      config: {
        headerHeight: 60,
        index: true,
        rowNum: 10,
        columnWidth: [80, 200, 200, 300, 1000, 80],
        align: ['center'],
        header: ['发生时间', '错误消息文本', '错误点', '错误详情', '操作'],
        data: []
      },
    };
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

  methods: {

    dblclick(row) {
      if (row.addr) {
        let url = "http://" + window.location.host + '/view/' + row.addr
        window.location.href = url;
      }
    },

    openDataShow() {
      this.dataShow = true
      this.onLoad()
    },
    // 分页, 每页条数
    sizeChangeHandle(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.onLoad()
    },
    currentChangeHandle(val) {
      this.page.currentPage = val;
      this.onLoad()
    },

    sizeChangeHandle1(val) {
      this.page1.currentPage = 1;
      this.page1.pageSize = val;
      this.onLoad1()
    },
    currentChangeHandle1(val) {
      this.page1.currentPage = val;
      this.onLoad1()
    },

    updVal(row, type) {
      //上限
      if (type === 1) {
        updAlertVal(row.id, row.faultVal, type).then(res => {
          //console.log(res.data.code)
          if (res.data.code === 200) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }
        })
      }
      //下限
      if (type === 2) {
        updAlertVal(row.id, row.lowVal, type).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }
        })
      }

    },
    //点击行
    delAlert(row) {
      updAlert(row.id, row.siteId).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '消除成功',
            type: 'success'
          });
          this.show = false
          this.onLoad1()
        }
      })
    },


    // toRow(row) {
    //   if (row.columnIndex === 5) {
    //     //消除报警
    //     updAlert(this.list[row.rowIndex].id).then(res => {
    //       if (res.data.code === 200) {
    //         this.$message({
    //           message: '消除成功',
    //           type: 'success'
    //         });
    //         this.show = false
    //         this.init()
    //       }
    //     })
    //   }else {
    //     //跳转页面
    //     window.location.href="http://10086sj.jinkworld.com/view/1435859771960881153";
    //   }
    // },

    init() {
      this.onLoad1()
    },
    onLoad() {
      this.loading = true;
      getSiteList(this.page.currentPage, this.page.pageSize, this.name).then(res => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
        this.loading = false;
      });
    },
    onLoad1() {
      getAlertList(this.page1.currentPage, this.page1.pageSize, this.query).then(res => {
        const data = res.data.data;
        this.page1.total = data.total;
        this.list = data.records;
        // this.show = true
      })
    }


  }
}
</script>
<style lang="scss">
.table {

  width: 1650px;
  height: 900px;
}

.alertList{
  .el-table th, .el-table tr, .el-table, .el-table__expanded-cell {
    background-color: #003B51 !important;
    color: #ffffff !important;
  }

  .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #0A2732;
  }

  .el-table tbody tr:hover > td {
    background-color: #676565 !important
  }
}
</style>
