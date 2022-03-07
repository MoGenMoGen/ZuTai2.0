<template>
  <!-- 输入框 -->
  <div>

      <input
              @keydown.enter.native="up"
              :style="{
        opacity: option.opacity / 100,
        borderRadius: option.radius + 'px',
        borderWidth: option.borderWidth + 'px',
        borderColor: option.borderColor,
        borderStyle: option.borderType,
        backgroundColor: option.bgColor,
        color: option.color,
        lineHeight: option.lineHeight + 'px',
        fontSize: option.fontSize + 'px',
        fontWeight: option.fontWeight,
        fontFamily: option.fontFamily,
        height:component.height+'px'
      }"
              style="padding: 0 10px"
              v-model="option.input" placeholder="请输入文本内容"/>
  </div>
</template>
<script>
import { getVal,writePlcData } from "@/api/visual";
export default {
  name: "baseInput",
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      show: true,
    };
  },
  computed: {},
  created() {
    this.getInfo();
    setInterval(this.getInfo, 10000);
  },
  mounted() {},
  // 销毁监听，防止内存泄露
  destroyed() {},
  methods: {
      up(){
          //触发数据写入
          if (this.option.valNm && this.option.val) {
              writePlcData(this.option.valNm,this.option.val).then(res=>{
                  if (res.data.code === 401){
                  this.$message.error('没有修改权限');
              }
              if (res.data.code === 200){
                  this.$message.success('操作成功');
              }
          })
          }
      },
    //是否显示
    getInfo() {
      //console.log(this.option)
      if (this.option.addr) {
        getVal(this.option.addr).then((res) => {
          let data = res.data;
          if (data.code === 200 && data.msg !== "暂无承载数据") {
            let val = data.data;
            this.show = val == this.option.openVal;
          }
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
input {
  width: 100%;
}
</style>
