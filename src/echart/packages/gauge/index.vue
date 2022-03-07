<template>
  <div :class="b()"
       :style="styleSizeName">
    <div :ref="id"
         :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "gauge",
  computed: {
    x2 () {
      return this.option.gridX2 || 20;
    }
  },

  methods: {

    updateChart () {
      let value = 0
      if (this.option.valueName) {
        value = localStorage.getItem(this.option.valueName)
        // getCommonVal(this.option.valueName).then(res => {
        //     let data = res.data;
        //     if (data.code === 200 && data.msg !== '暂无承载数据') {
        //         this.value = data.data
        //         localStorage.setItem(this.option.valueName,this.value)
        //     }else {
        //         localStorage.setItem(this.option.valueName,'')
        //     }
        // })
      }
      console.log('value:'+value)
      const optionData = this.deepClone(this.dataChart);
      console.log(optionData)
      const option = {
        title: this.ishasprop(this.option.titleShow, {
          text: this.option.title,
          subtext: this.option.subtext || '',
          textStyle: {
            color: this.option.titleColor || '#333',
            fontSize: this.option.titleFontSize || 16
          },
          left: this.option.titlePostion || 'auto',
          subtextStyle: {
            color: this.option.subTitleColor || '#aaa',
            fontSize: this.option.subTitleFontSize || 14
          }
        }, {}),
        grid: {
          left: this.option.gridX || 20,
          top: this.option.gridY || 60,
          right: this.x2,
          bottom: this.option.gridY2 || 60
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: {
              fontSize: this.option.valueFontSize || 30,
              formatter: value + this.option.unit
            },
            min: this.option.min,
            max: this.option.max,
            axisLine: {
              lineStyle: {
                color: (() => {
                  let list = [];
                  (this.option.barColor || []).forEach(ele => {
                    list.push([ele.postion, ele.color1]);
                  });
                  if (this.validatenull(list)) {
                    list = [
                      [0, 2, "#91c7ae"],
                      [0.8, "#638693"],
                      [1, "#c23531"]
                    ];
                  }
                  return list;
                })(),
                width: this.option.lineSize || 5
              }
            },
            axisLabel: {
              show: this.vaildData(this.option.axisLabelShow, true),
              fontSize: this.option.axisLabelFontSize || 25
            },
            axisTick: {
              lineStyle: {
                color: this.option.lineColor || "#eee"
              }
            },
            title: {
              color: this.option.nameColor,
              fontSize: this.option.nameFontSize || 20
            },
            data: value
          }
        ]
      };
      this.myChart.resize();
      this.myChart.setOption(option, true);
    }
  }
});
</script>

