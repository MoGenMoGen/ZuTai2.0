<!-- 全屏模式 -->
<template>
  <div id="myLineFull">
    <div style="margin-bottom: 5px">
      <span style="font-size: 10px;color: rgb(255,255,255);margin-left: 6px;font-weight: bold">单位:( {{ unit }} )</span>
      <span style="font-size: 10px;color: rgb(203,23,23);margin-left: 6px;font-weight: bold">最大值: {{ max }}</span>
      <span style="font-size: 10px;color: #7bf38f;margin-left: 6px;font-weight: bold">最小值: {{ min }}</span>
    </div>
    <div :id="id" v-if="show"   :style="{height:height+'px'}"></div>
  </div>
</template>

<script>

import {getListH} from '@/api/visual'

export default {
  name: 'myLineFull',
  data() {
    return {
      myChart: null,
      data: [],
      line: null,
      show: true,
      dShow:false,
      xData: [],
      vData: [],
      time: null,
      max: 0,
      min: 0,
      yMin: null,
      height: window.screen.availHeight-95,
    }
  },
  mounted() {
    this.init()

  },
  watch: {
    'addr': {
      handler(newVal, oldVal) {
        this.data = []
        getListH({name: this.addr, hour: 2}).then(res => {
          this.data = res.data.data
        })
      },
    }
  },
  props: ["id", "pid", "addr","unit"],
  methods: {
    init(){
      this.myChart = this.$echart.init(document.getElementById(this.id))
      getListH({name:this.addr,hour:2}).then(res=>{
        this.xData = res.data.data.time
        this.vData = res.data.data.value
        this.max =  this.vData[0]
        this.min =  this.vData[0]
        this.vData.map(res=>{
          res > this.max ? this.max = res : null;
          res < this.min ? this.min = res : null;
        })
        this.setData()
        this.timer = setInterval(this.setData, 5000);
      })
    },
    setData() {
      this.xData.push(this.dateFormat(new Date(), "hh:mm:ss"));
      let item = localStorage.getItem(this.addr);
      this.vData.push(item);
      item > this.max ? this.max = item : null;
      item < this.min ? this.min = item : null;
      if (this.xData.length > 20) {
        this.xData.shift();
        this.vData.shift();
      }
      this.myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: this.xData,
          axisLabel: {
            textStyle: {
              color: "#ffffff" //X轴文字颜色
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine:false,
          axisLabel: {
            textStyle: {
              color: "#ffffff" //X轴文字颜色
            },
          }
        },
        grid: {
          left: '1%',
          right: '2%',
          bottom: '1%',
          top:'5%',
          containLabel: true
        },
        series: [
          {
            data: this.vData,
            type: 'line',
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#ffffff" //折线的颜色
                }
              }
            },
          }
        ]
      });


    },
    //格式化时间
    dateFormat(date, format) {
      format = format || 'yyyy-MM-dd hh:mm:ss';
      if (date !== 'Invalid Date') {
        let o = {
          "M+": date.getMonth() + 1, //month
          "d+": date.getDate(), //day
          "h+": date.getHours(), //hour
          "m+": date.getMinutes(), //minute
          "s+": date.getSeconds(), //second
          "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
          "S": date.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
          if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length === 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        return format;
      }
      return '';

    }

  },


};
</script>

<style>

/*.el-header {*/
/*  background-color: #B3C0D1;*/
/*  color: #333;*/
/*  line-height: 60px;*/
/*}*/
/*.el-footer {*/
/*  background-color: #B3C0D1;*/
/*  color: #333;*/
/*  line-height: 60px;*/
/*}*/
.el-aside {
  color: #333;
}

/* #app {
  font-family: Helvetica, sans-serif;
  text-align: center;

} */
</style>
