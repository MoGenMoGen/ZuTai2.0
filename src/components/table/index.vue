<template>
  <div :style="[styleName,styleVar]" >
    <Table :id="option.index"
        :show-header="option.showHeader"
        :border="option.config.indexOf('border')!=-1"
        :width="component.width" :columns="option.column" :data="option.data">
        <template v-for="(cItem,cIndex) in option.column" slot-scope="{ row, index }" :slot="cItem.slot">
          <span>{{row[cItem.key]}}{{row['hz_'+cItem.key]}}</span>
        </template>
    </Table>
    <!-- :stripe="option.config.indexOf('stripe')!=-1" -->
    <!--<el-table-->
            <!--:stripe="option.config.indexOf('stripe')!=-1"-->
            <!--:border="option.config.indexOf('border')!=-1"-->
            <!--:data="option.data"-->
            <!--style="width: 100%">-->
      <!--<el-table-column-->
              <!--v-for="(item,i) in option.column"-->
              <!--:key="i"-->
              <!--:prop="item.prop"-->
              <!--:label="item.label"-->
              <!--:width="item.width"-->
              <!--&gt;-->
      <!--</el-table-column>-->
    <!--</el-table>-->
  </div>
</template>

<script>
export default ({
  name: "myTable",
  data () {
    return {
      visible: false,
      listVisible: false,
      tableData: [],
      indexWidth: 80,
      top: 0,
      prop: "",
      scrollCheck: "",
      activeIndex: 0,
      query: {}
    };
  },
  watch: {
    columnOption: {
      handler () {
        this.columnData = [];
        this.columnOption.forEach(ele => {
          if (ele.hide != true) {
            this.columnData.push(ele.prop);
          }
        });
      },
      immediate: true
    },
    scrollCount () {
      this.setTime();
    },
    count () {
      this.setTime();
    },
    scrollTime () {
      this.setTime();
    },
    scroll: {
      handler (val) {
        this.setTime();
      },
      immediate: true
    },
    // 'option.headerBackground': {
    //     handler (val) {
    //         this.$nextTick(()=>{
    //             let dom = document.getElementById(this.option.index)
    //             let child = dom.getElementsByClassName('ivu-table-header')[0].querySelectorAll('.ivu-table-column-left')
    //             child.forEach(item => {
    //                 item.style.backgroundColor = val
    //             })
    //         })
    //     },
    //     immediate: true,
    //     deep: true
    // },
    // 'option.headerColor': {
    //     handler (val) {
    //         this.$nextTick(()=>{
    //             let dom = document.getElementById(this.option.index)
    //             let child = dom.getElementsByClassName('ivu-table-header')[0]
    //             child.style.color = val
    //         })
    //     },
    //     immediate: true,
    //     deep: true
    // },
    // 'option.headerFontSize': {
    //     handler (val) {
    //         this.$nextTick(()=>{
    //             let dom = document.getElementById(this.option.index)
    //             let child = dom.getElementsByClassName('ivu-table-header')[0]
    //             child.style.fontSize = val+'px'
    //         })
    //     },
    //     immediate: true,
    //     deep: true
    // },
    // 'option.fontSize': {
    //     handler (val) {
    //         this.$nextTick(()=>{
    //             let dom = document.getElementById(this.option.index)
    //             let child = dom.getElementsByClassName('ivu-table-body')[0]
    //             child.style.fontSize = val+'px'
    //         })
    //     },
    //     immediate: true,
    //     deep: true
    // },
    // 'option.bodyColor': {
    //     handler (val) {
    //         this.$nextTick(()=>{
    //             let dom = document.getElementById(this.option.index)
    //             let child = dom.getElementsByClassName('ivu-table-body')[0]
    //             child.style.color = val
    //         })
    //     },
    //     immediate: true,
    //     deep: true
    // },
    // 'option.nthColor': {
    //     handler (val) {
    //         this.$nextTick(()=>{
    //             let dom = document.getElementById(this.option.index)
    //             let child = dom.getElementsByClassName('ivu-table-body')[0].querySelectorAll('.ivu-table-row')
    //             child.forEach((item,index) => {
    //                 if(index%2==0) {
    //                     item.querySelectorAll('.ivu-table-column-left').forEach(cItem => {
    //                         cItem.style.backgroundColor = val
    //                     })
    //                 }
    //             })
    //         })
    //     },
    //     immediate: true,
    //     deep: true
    // },
    // 'option.othColor': {
    //     handler (val) {
    //         this.$nextTick(()=>{
    //             let dom = document.getElementById(this.option.index)
    //             let child = dom.getElementsByClassName('ivu-table-body')[0].querySelectorAll('.ivu-table-row')
    //             child.forEach((item,index) => {
    //                 if(index%2==1) {
    //                     item.querySelectorAll('.ivu-table-column-left').forEach(cItem => {
    //                         cItem.style.backgroundColor = val
    //                     })
    //                 }
    //             })
    //         })
    //     },
    //     immediate: true,
    //     deep: true
    // },
    // 'option.borderColor': {
    //     handler (val) {
    //         this.$nextTick(()=>{
    //             let dom = document.getElementById(this.option.index)
    //             let child = dom.querySelectorAll('.ivu-table-column-left')
    //             child.forEach(item => {
    //                 item.style.borderColor = val
    //             })
    //             dom.style.borderColor = val
    //         })
    //     },
    //     immediate: true,
    //     deep: true
    // },
  },
  computed: {
    styleName() {
        return
        {
            width:this.component.width+'px'
            height:this.component.height+'px'
            background:this.option.bgColor
        }
    },
    styleVar() {
        return {
            '--headerBackground':this.option.headerBackground,
            '--headerFontSize':this.option.headerFontSize+'px',
            '--headerColor':this.option.headerColor,
            '--fontSize':this.option.fontSize+'px',
            '--bodyColor':this.option.bodyColor,
            '--borderColor':this.option.borderColor,
            '--nthColor':this.option.nthColor,
            '--othColor':this.option.othColor,
            '--firstLineColor':this.option.firstLineColor?this.option.firstLineColor:'inherit'
        }
    },
    listOption () {
      return Object.assign(
        {
          align: "center",
          headerAlign: "center",
          size: "mini",
          menu: false,
          header: false,
          height: 500,
          sumText: "合计",
          showSummary: true,
          column: this.option.column
        },
        (() => {
          return {
            sumColumnList: this.totalList.map(column => {
              return {
                name: column,
                type: "sum"
              };
            })
          };
        })()
      );
    },
    totalList () {
      return this.option.totalList || [];
    },
    totalFlag () {
      return !this.validatenull(this.totalList);
    },
    totalData () {
      let obj = {};
      this.totalList.forEach(prop => {
        this.dataChart.forEach(ele => {
          obj[prop] = (obj[prop] || 0) + Number(ele[prop]);
          obj[prop] = Number(obj[prop].toFixed(2));
        });
      });
      return obj;
    },
    columnShow () {
      return this.option.columnShow;
    },
    columnViews () {
      return this.option.columnViews;
    },
    columnShowWhite () {
      return this.option.columnShowWhite || [];
    },
    columnShowList () {
      return this.option.columnShowList || [];
    },
    dataTabelLen () {
      return this.dataChart.length;
    },
    dataTabel () {
      let list = this.dataChart;
      if (!this.validatenull(this.prop)) {
        list = this.sortArrys(list, this.prop);
      }
      return list;
    },
    allHeight () {
      const count = this.count - (this.totalFlag ? 2 : 1);
      const calcState = this.dataChartLen - count;
      return calcState * this.lineHeight;
    },
    count () {
      return (this.option.count || 10) + 1;
    },
    dataChartLen () {
      return (this.dataChart || []).length;
    },
    lineHeight () {
      return parseInt(this.height / this.count);
    },
    index () {
      return this.option.index;
    },
    scroll () {
      return this.option.scroll;
    },
    scrollTime () {
      return this.option.scrollTime || 5000;
    },
    fontSize () {
      return this.option.fontSize || 14;
    },
    scrollCount () {
      return this.option.scrollCount || this.count;
    },
    speed () {
      return this.scrollCount * this.lineHeight;
    },
    styleThName () {
      return {
        fontSize: this.setPx(this.fontSize),
        background: this.option.headerBackground || "rgba(0, 0, 0, 0.01)",
        color: this.option.headerColor || "rgba(154, 168, 212, 1)"
      };
    },
    columnOption () {
      return this.crudOption.column || [];
    },
    styleTdName () {
      return {
        fontSize: this.setPx(this.fontSize),
        lineHeight: this.setPx(this.lineHeight),
        height: this.setPx(this.lineHeight),
        color: this.option.bodyColor || "rgba(154, 168, 212, 1)",
        borderColor: this.option.borderColor || "rgba(51, 65, 107, 1)"
      };
    },
    styleMenuName () {
      return {
        lineHeight: this.setPx(this.lineHeight),
        color: this.option.headerColor || "rgba(154, 168, 212, 1)"
      };
    },
    sortableProp () {
      return this.option.sortableProp || "order";
    },
    crudOption () {
      return Object.assign(this.option, {
        menu: false,
        align: "center",
        headerAlign: "center",
        header: false
      });
    }
  },
  props: {
      option: Object,
      component: Object,
  },
  methods: {
    styleWidth (width) {
      return {
        width: this.setPx(width),
        flex: width ? "initial" : 1
      };
    },
    resetData () {
      this.top = 0;
    },
    handleSortable (prop) {
      this.propQuery[this.sortableProp] = prop;
      this.updateData();
    },
    setTime () {
      this.top = 0;
      clearInterval(this.scrollCheck);
      setTimeout(() => {
        if (this.scroll) {
          this.scrollCheck = setInterval(() => {
            if (this.top <= -this.allHeight) {
              this.top = 0;
            } else {
              this.top = this.top - this.speed;
            }
          }, this.scrollTime);
        }
      }, 2000);
    },
    styleTrName (index) {
      let result = {
        lineHeight: this.setPx(this.lineHeight)
      };
      if (index % 2 === 0) {
        result.background = this.option.othColor;
      } else {
        result.background = this.option.nthColor;
      }
      return result;
    },
    rowClick (item, index) {
      this.clickFormatter && this.clickFormatter({
        type: index,
        value: item,
        data: this.dataChart
      });
    },
    handleClick (value, index) {
      this.activeIndex = index;
      this.query.type = value;
      this.updateData();
    }
  }
});
</script>

<style lang="scss" scoped>
    ::v-deep .ivu-table:before {
        background-color: var(--borderColor);
    }
    ::v-deep .ivu-table:after {
        background-color: var(--borderColor);
    }
    ::v-deep .ivu-table-wrapper-with-border {
        border-color: var(--borderColor);
    }
    ::v-deep .ivu-table-header {
        font-size: var(--headerFontSize);
        color: var(--headerColor);
        .ivu-table-column-left {
            border-color: var(--borderColor);
            background: var(--headerBackground);
        }
    }
    ::v-deep .ivu-table-body {
        font-size: var(--fontSize);
        color: var(--bodyColor);
        .ivu-table-row:nth-child(odd) {
            background: var(--nthColor);
            .ivu-table-column-left {
                border-color: var(--borderColor);
                background: var(--nthColor);
            }
        }
        .ivu-table-row:nth-child(even) {
            background: var(--othColor);
            .ivu-table-column-left {
                border-color: var(--borderColor);
                background: var(--othColor);
            }
        }
        .ivu-table-row {
            .ivu-table-column-left:first-child {
                background: var(--firstLineColor);
            }
        }
    }
</style>
