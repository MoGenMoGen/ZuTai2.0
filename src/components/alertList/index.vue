<template>
  <div class="alertList">

    <el-radio-group v-model="query.status" @change="onLoad1" style="margin-bottom: 2px">
      <el-radio-button label="1">实时</el-radio-button>
      <el-radio-button label="2">历史</el-radio-button>
    </el-radio-group>

    <el-input v-model="query.name" style="width: 200px;margin-left: 10px" placeholder="设备名称"></el-input>
    <el-input v-model="query.remarks" style="width: 200px;margin-left: 10px" placeholder="搜索详情"></el-input>
    <el-button type="primary" @click="onLoad1" style="margin-left: 10px">搜索</el-button>

    <el-table :data="list" style="width: 100%" stripe max-height="620" @row-dblclick="dblclick">
      <el-table-column v-if="query.status == '2'" prop="createTime" label="发生时间" width="220"></el-table-column>
      <el-table-column prop="name" label="设备名称" width="320"></el-table-column>
      <el-table-column prop="remarks" label="报警详情"></el-table-column>
    </el-table>
    <el-pagination
        background @size-change="sizeChangeHandle1"
        @current-change="currentChangeHandle1"
        :current-page="page1.currentPage"
        :page-size="page1.pageSize"
        :total="page1.total"
        layout="prev, pager, next">
    </el-pagination>



  </div>
</template>
<script>
import {getAlertList, updAlert, updAlertVal} from '@/api/visual'


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
      // if (row.addr) {
      //   let url = "http://" + window.location.host + '/view/' + row.addr
      //   window.location.href = url;
      // }
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
      this.onLoad()
    },
    onLoad() {
      this.loading = true;
      this.query.app = this.$route.params.id
      getAlertList(this.page1.currentPage, this.page1.pageSize, this.query).then(res => {
        const data = res.data.data;
        this.page1.total = data.total;
        this.list = data.records;
        this.loading = false;
        // this.show = true
      })

    },
    onLoad1() {
      this.onLoad()
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
