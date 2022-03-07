<!--能耗统计-->
<template>
  <div class="energy">
    <div style="text-align: left;margin-left: 70px">
      <el-radio-group v-model="value"   @change="changeSelect" fill="#139a95" text-color="">
        <el-radio-button label="累计"></el-radio-button>
        <el-radio-button label="日"></el-radio-button>
        <el-radio-button label="周"></el-radio-button>
        <el-radio-button label="月"></el-radio-button>
        <el-radio-button label="年"></el-radio-button>
        <el-radio-button label="自定义"></el-radio-button>
      </el-radio-group>


      <el-date-picker  v-if="value === '自定义'" @change="changeTime"
                      style="margin-left: 20px;margin-top: 2px"
                      v-model="value1" size="medium"
                      type="datetimerange"
                      range-separator="至" value-format="yyyy-MM-dd HH:mm:ss"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
    </div>


    <el-row :gutter="20" style="margin-top: 30px">
      <el-col :span="8" style="text-align: center">
        <div style="height: 180px;">
          <img src="./ydl.png" alt="">
          <span
              style="position: absolute;left: 170px;font-size: 28px;color: rgba(36, 247, 240, 1);top: 10px">用电量统计</span>
          <span style="position: absolute;left: 170px;font-size: 22px;color: rgb(255,255,255);top: 67px">{{setValue()}}用电量统计</span>
          <span style="position: absolute;left: 170px;font-size: 22px;color: rgb(255,255,255);top: 112px">{{ Number(total1).toFixed(2)  }} KWH</span>
        </div>
        <div>
          <div id="myChart1" :style="{width: '600px', height: '700px'}"></div>
        </div>
      </el-col>


      <el-col :span="8" style="text-align: center">
        <div style="height: 180px">
          <img src="./ysl.png" alt="">
          <span
              style="position: absolute;left: 730px;font-size: 28px;color: rgba(36, 247, 240, 1);top: 10px">用水量统计</span>
          <span style="position: absolute;left: 730px;font-size: 22px;color: rgb(255,255,255);top: 67px">{{setValue()}}用水量统计</span>
          <span style="position: absolute;left: 730px;font-size: 22px;color: rgb(255,255,255);top: 112px">{{ Number(total2).toFixed(2)  }} m³</span>
        </div>
        <div id="myChart2" :style="{width: '600px', height: '700px'}"></div>
      </el-col>


      <el-col :span="8" style="text-align: center">
        <div style="height: 180px">
          <img src="./yql.png" alt="">
          <span
              style="position: absolute;left: 1295px;font-size: 28px;color: rgba(36, 247, 240, 1);top: 10px">燃气用量统计</span>
          <span style="position: absolute;left: 1295px;font-size: 22px;color: rgb(255,255,255);top: 67px">{{setValue()}}燃气用量统计</span>
          <span style="position: absolute;left: 1295px;font-size: 22px;color: rgb(255,255,255);top: 112px">{{ Number(total3).toFixed(2) }} m³</span>
        </div>
        <div id="myChart3" :style="{width: '600px', height: '700px'}"></div>

      </el-col>
    </el-row>
  </div>
</template>
<script>
import {energy} from '@/api/visual'

export default {
  data() {
    return {
      dic: [{
        label: '累计',
        desc: '累计',
        value: '累计'
      }, {
        label: '日',
        desc: '按天统计',
        value: '日'
      }, {
        label: '周',
        desc: '按周统计',
        value: '周'
      }, {
        label: '月',
        desc: '按月统计',
        value: '月'
      }, {
        label: '年',
        desc: '按年统计',
        value: '年'
      }, {
        label: '自定义',
        desc: '自定义时间',
        value: '自定义'
      }],
      total1: '',
      total2: '',
      total3: '',
      value: '累计',
      value1: ''
    }
  },
  name: 'energy',
  props: {
    option: Object,
    component: Object
  },
  mounted() {
    this.drawLine1("累计");
    this.drawLine2("累计");
    this.drawLine3("累计");
  },
  computed: {},
  methods: {
    setValue(){
      if (this.value === '累计' || this.value === '自定义'){
        return this.value
      }else {
        return '当' + this.value
      }
    },

    changeSelect(row) {
      if (row != "自定义") {
        this.drawLine1(row);
        this.drawLine2(row);
        this.drawLine3(row);
      }
    },
    changeTime(row) {
      this.drawLine1(row.toString());
      this.drawLine2(row.toString());
      this.drawLine3(row.toString());
    },


    //用电量
    drawLine1(time) {
      energy(this.option.ydlzl, this.option.ydl, time).then(res => {
        let data = res.data.data.list
        this.total1 = res.data.data.total
        let myChart = this.$echart.init(document.getElementById('myChart1'))
        // console.log(data.sort((a,b)=>{return a.value-b.value}))
        myChart.setOption({
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '420px',
            orient: 'vertical',
            left: '100px',
            bottom: "0",
            textStyle: {
              color: "#fff",
			  rich: {
				  oneone: {
					  align: 'left',
					  width: 300
				  },
				  twotwo: {
					  align: 'right',
					  width: 60
				  }
			  }
            },
            formatter: (name) => {
              if (data.length) {
                const item = data.filter((item) => item.name === name)[0];
				return `{oneone|${name.split('_')[1]}：} {twotwo|${Number(item.value).toFixed(2)}KWH}`;
              }
            },
          },
          series: [
            {
              type: 'pie',
              top: '-250px',
              radius: '50%',
              label: {
                show: false,
                color: '#fff'
              },
              data: res.data.data.list,
            }
          ]
        });
      })
    },
    //用水量
    drawLine2(time) {
      energy(this.option.yslzl, this.option.ysl, time).then(res => {
        let data = res.data.data.list
        this.total2 = res.data.data.total
        let myChart = this.$echart.init(document.getElementById('myChart2'))
        myChart.setOption({
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '420px',
            orient: 'vertical',
            left: '100px',
            bottom: "0",
            textStyle: {
              color: "#fff",
			  rich: {
				  oneone: {
					  align: 'left',
					  width: 300
				  },
				  twotwo: {
					  align: 'right',
					  width: 60
				  }
			  }
            },
            formatter: (name) => {
              if (data.length) {
                const item = data.filter((item) => item.name === name)[0];
				return `{oneone|${name.split('_')[1]}：} {twotwo|${Number(item.value).toFixed(2)}m³}`;
              }
            },
          },
          series: [
            {
              type: 'pie',
              top: '-250px',
              radius: '50%',
              label: {
                show: false,
                color: '#fff'
              },
              data: res.data.data.list,
            }
          ]
        });
      })
    },
    //燃气量
    drawLine3(time) {
      energy(this.option.yqlzl, this.option.yql, time).then(res => {
        let data = res.data.data.list
        this.total3 = res.data.data.total
        let myChart = this.$echart.init(document.getElementById('myChart3'))
        myChart.setOption({
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '420px',
            orient: 'vertical',
            left: '100px',
            bottom: "0",
            textStyle: {
              color: "#fff",
			  rich: {
				  oneone: {
					  align: 'left',
					  width: 300
				  },
				  twotwo: {
					  align: 'right',
					  width: 60
				  }
			  }
            },
            formatter: (name) => {
              if (data.length) {
                const item = data.filter((item) => item.name === name)[0];
                return `{oneone|${name.split('_')[1]}：} {twotwo|${Number(item.value).toFixed(2)}m³}`;
              }
            },
          },
          series: [
            {
              type: 'pie',
              top: '-250px',
              radius: '50%',
              label: {
                show: false,
                color: '#fff'
              },
              data: res.data.data.list,
            }
          ]
        });
      })
    }
  }
}
</script>
<style lang="scss">
  .energy{
    .el-radio-button__inner{
      background: #0e253d;
      color: #ffffff;
      border: none;
      width: 120px;
      &::after{

      }
    }
    .el-radio-button:first-child .el-radio-button__inner{
      border: 0;
    }
    .el-radio-button{
      &:not(:last-child){
        .el-radio-button__inner{
          position: relative;
          &::after{
            position: absolute;
            right: 0;
            top:50%;
            margin-top: -14px;
            content: '';
            display: inline-block;
            width: 1px;
            height: 28px;
            background: #122F4D;
          }
        }

      }
    }
    .el-range-editor.el-input__inner {
      /*background-color: black;*/
    }
    .el-checkbox__inner, input, .el-slider__runway, textarea, .el-dialog input, .el-switch__core, .el-dialog .el-slider__runway, .el-dialog textarea{
      background-color: #ffffff !important;
      color: #000000 !important;
      border-color: #282e3a !important;
    }
    .el-select-dropdown__item {
      color: white;
    }
  }

</style>
