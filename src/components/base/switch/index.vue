<template>
  <div
    :style="styleChange"
    @click="change"
    :class="{ 'avue-echart-img--rotate': rotate == true }"
  >
    <img
      v-if="option.openValue === value && option.openUrl"
      :src="option.openUrl"
    />
    <p
      :style="openStyle"
      v-else-if="option.openValue === value"
      :class="{ active: classShow }"
      @mousedown="classShow = true"
    >
      {{ option.openText }}
    </p>
    <img
      v-if="option.closeValue === value && option.closeUrl"
      :src="option.closeUrl"
    />
    <p
      :style="closeStyle"
      v-else-if="option.closeValue === value"
      :class="{ active2: classShow }"
      @mousedown="classShow2 = true"
    >
      {{ option.closeText }}
    </p>
  </div>
</template>
<script>
import { writePlcData } from "@/api/visual";

export default {
  name: "baseSwitch",
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      value: "",
      classShow: false,
      classShow2: false,
    };
  },
  computed: {
    styleChange() {
      return {
        width: this.component.width + "px",
        height: this.component.height + "px",
        fontSize: this.option.fontSize + "px",
        transform: "rotate(" + this.option.rotate + "deg)",
      };
    },
    openStyle() {
      return {
        color: this.option.openColor,
        backgroundColor: this.option.openBgColor,
        "--bgColor": this.option.openBgColor2,
        borderWidth: this.option.openBorderWidth + "px",
        borderColor: this.option.openBorderColor,
        borderStyle: this.option.openBorderType,
        borderRadius: this.option.openRadius + "px",
        // "boxShadow" : '0 9px #999',
        // "--boxShadow": '0 5px #666',
        "--transform": "translateY(4px)",
      };
    },
    closeStyle() {
      return {
        color: this.option.closeColor,
        backgroundColor: this.option.closeBgColor,
        "--bgColor": this.option.closeBgColor2,
        borderWidth: this.option.closeBorderWidth + "px",
        borderColor: this.option.closeBorderColor,
        borderStyle: this.option.closeBorderType,
        borderRadius: this.option.closeRadius + "px",
        // "boxShadow" : '0 9px #999',
        // "--boxShadow": '0 5px #666',
        "--transform": "translateY(4px)",
      };
    },
  },
  watch: {
    "option.openValue"() {
      this.getInfo();
    },
    "option.closeValue"() {
      this.getInfo();
    },
    "option.valueName"() {
      this.getInfo();
    },
  },
  created() {
    this.getInfo();
  },
  mounted() {},
  // 销毁监听，防止内存泄露
  destroyed() {},
  methods: {
    //是否显示
    getInfo() {
      //console.log(this.option)
      if (this.option.valueName) {
        this.value = localStorage.getItem(this.option.valueName);
      } else {
        this.value = 0;
      }
    },
    change() {
        if(this.option.ifConfirm){
            this.$confirm(this.option.confirmContent, this.option.confirmTitle, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.changeValue()
            }).catch(() => {
  
            });
        }else {
            this.changeValue()  
        }

    },
     changeValue(){
         this.value = this.option.openValue === this.value ? this.option.closeValue : this.option.openValue
         if (this.option.valueName) {
             writePlcData(this.option.valueName,this.value).then(res=>{
                 if (res.data.code === 401){
                     this.value = localStorage.getItem(this.option.valueName)
                     this.$message.error('没有修改权限');
                 }
                 if (res.data.code === 200){
                     localStorage.setItem(this.option.valueName, this.value)
                     this.$message.success('操作成功');
                 }
             })
         }
     }
  }
}
</script>
<style lang="scss" scoped>
div {
  img {
    width: 100%;
    height: 100%;
  }
  p {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .active {
    background-color: var(--bgColor) !important;
    background-image: var(--bgImg) !important;
    color: var(--fontColor) !important;
    box-shadow: var(--boxShadow) !important;
    transform: var(--transform) !important;
  }
  .active2 {
    background-color: var(--bgColor) !important;
    background-image: var(--bgImg) !important;
    color: var(--fontColor) !important;
    box-shadow: var(--boxShadow) !important;
    transform: var(--transform) !important;
  }
}
</style>
