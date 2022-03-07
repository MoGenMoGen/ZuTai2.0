<!--历史-->
<template>
  <div>
    <div id="myLineRefDtl" v-if="show"  style="height: 340px;"></div>
  </div>
</template>

<script>

import {siteHistory} from '@/api/visual'

export default {
  name: 'myLineRefDtl',
  data() {
    return {
      myChart: null,
      time: '',
      line: null,
      show: true,
      xData: [],
      vData: [],
    }
  },
  mounted() {

  },
  props: ["id", "pid"],
  methods: {
    init(data, addr) {
      this.myChart = this.$echart.init(document.getElementById("myLineRefDtl"))
      this.xData = []
      this.vData = []
      siteHistory(addr, data[0], data[1]).then(res => {
        if (res.data.code === 400){
          return  this.$message(res.data.msg);
        }else {
          if (res.data.data.length !== 0){

            res.data.data.map(item => {
              this.xData.push(item.date)
              this.vData.push(item.value)
              //
            })


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



            // this.line = new Line('myLineRefDtl', {
            //   data,
            //   padding: 'auto',
            //   xField: 'Date',
            //   yField: 'scales',
            //   smooth: true,
            //   xAxis: {
            //     tickCount: 2,
            //     label: {
            //       style: {
            //         fill: '#fff',
            //       }
            //     },
            //   },
            //   yAxis: {
            //     grid:null,
            //     label: {
            //       style: {
            //         fill: '#fff',
            //       }
            //     },
            //   },
            //   color: '#ffffff',
            // });
            // this.line.render();
          }
        }




      })
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
