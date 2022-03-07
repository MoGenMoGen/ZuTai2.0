<template>
  <div>
    <img width="100%" height="100%" :src="url" alt="" @click="openShow">

    <Modal v-model="dialogVisible" :title="option.pointNm" :mask-closable="false" draggable="true"
           :mask="false" :footer-hide="true" width="1000" @on-cancel="off">
      <span style="font-weight: bold;color: #ffffff"> 单位 : ({{unit}}) </span>
      <span style="font-weight: bold;color: red"> 最大值 :{{max}} </span>
      <span style="font-weight: bold;color: #32e850"> 最小值 :{{min}} </span>
      <div id="myChart" v-if="dialogVisible" :style="{width: '950px', height: '400px'}"></div>
    </Modal>
  </div>
</template>
<script>
import {getListH} from '@/api/visual'
export default {
  name: 'trend',
  props: {
    option: Object,
    component: Object
  },
  data() {
    return {
      vertical: '',
      dialogVisible: false,
      now: '',
      oneDay: '',
      value: '',
      max:0,
      min:0,
      data: [],
      timer: null,
      myChart: null,
      xData: [],
      vData: [],
      imgUrl: '',
      show: false,
      defShow: true,
      type: []
    }
  },
  computed: {
    url() {
      return (this.option.url)
    },
    unit(){
      return (this.option.unit)
    }
  },
  mounted() {
    this.getInfo()
  },

  methods: {
    changeRadio() {
      this.xData = []
      this.vData = []
    },
    getInfo() {
      //this.type = this.option.points.split(",")
      this.vertical = this.option.points
    },
    off() {
      clearInterval(this.timer);
      this.timer = null;
      this.dialogVisible = false
      this.data = []
      this.value = ''
      this.oneDay = ''
      this.now = ''

    },
    openShow() {
      this.dialogVisible = true
      getListH({name:this.vertical,hour:2}).then(res=>{
        this.xData = res.data.data.time
        this.vData = res.data.data.value
        this.max =  this.vData[0]
        this.min =  this.vData[0]
        this.vData.map(res=>{
          res > this.max ? this.max = res : null;
          res < this.min ? this.min = res : null;
        })
      })
      setTimeout(() => {
        this.drawLine()
      }, 500)
    },

    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echart.init(document.getElementById('myChart'))
      this.timer = setInterval(this.setData, 5000);
    },
    setData() {
      this.xData.push(this.dateFormat(new Date(), "hh:mm:ss"));
      let item = localStorage.getItem(this.vertical);
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
          axisLabel: {
            // formatter:'{value}'+" ("+  this.unit+")",
            textStyle: {
              color: "#ffffff" //X轴文字颜色
            },
            // axisLabel:{
            //   formatter:'{value}123123'
            // }
          }
        },
        grid: {
          left: '1%',
          right: '1%',
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
                  color: "#ec0b0b" //折线的颜色
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
  }
}
</script>
<style>
.bj {
  background-color: #ffffff;
}
.ivu-modal-content{
  background-color: #091F37FF;
}
.ivu-modal-header p, .ivu-modal-header-inner{
  color: #f5f7fa;
}
</style>
