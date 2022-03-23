<!-- 自定义配置 -->
<template>
  <div>
    <el-collapse accordion>
      <el-collapse-item title="数值范围">
        <el-form-item label="最小值">
          <el-input
            type="text"
            placeholder="请输入最小值"
            v-model="main.activeOption.min"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="最大值">
          <el-input
            type="text"
            placeholder="请输入最大值"
            v-model="main.activeOption.max"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="步长">
          <el-input
            type="text"
            placeholder="请输入步长"
            v-model="main.activeOption.step"
          >
          </el-input>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="滑条样式">
        <el-form-item label="圆点直径">
          <el-input
            type="text"
            placeholder="请输入数据"
            v-model="main.activeOption.diameter"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="滑条底色">
          <avue-input-color
            placeholder="请选择颜色"
            v-model="main.activeOption.baseColor"
          ></avue-input-color>
        </el-form-item>
        <el-form-item label="滑条进度色">
          <avue-input-color
            placeholder="请选择颜色"
            v-model="main.activeOption.progressColor"
          ></avue-input-color>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>

    <el-form-item label="旋转">
      <el-slider
        v-model="main.activeOption.rotate"
        :max="360"
        :step="1"
      ></el-slider>
    </el-form-item>
    <el-form-item label="变量">
      <el-input
        type="text"
        placeholder="请输入变量"
        v-model="main.activeOption.valNm"
      >
      </el-input>
    </el-form-item>

    <el-form-item label="是否显示间断点">
      <avue-radio v-model="main.activeOption.showStop" :dic="dic3"></avue-radio>
    </el-form-item>

    <!--    <el-form-item label="是否启用双滑块">-->
    <!--      <avue-radio v-model="main.activeOption.range" :dic="dic1"></avue-radio>-->
    <!--    </el-form-item>-->
    <!--	  <el-form-item label="是否禁用">-->
    <!--	  	<avue-radio v-model="main.activeOption.disabled"  :dic="dic2"></avue-radio>-->
    <!--	  </el-form-item>-->
  </div>
</template>

<script>
import borderStyle from "../options/borderStyle";
import fontStyle from "../options/fontStyle";

export default {
  inject: ["main"],
  data() {
    return {
      dic1: [
        {
          label: "启用",
          value: true,
        },
        {
          label: "不启用",
          value: false,
        },
      ],
      dic2: [
        {
          label: "启用",
          value: false,
        },
        {
          label: "禁用",
          value: true,
        },
      ],
      dic3: [
        {
          label: "显示",
          value: true,
        },
        {
          label: "不显示",
          value: false,
        },
      ],
    };
  },
  components: { borderStyle, fontStyle },
  computed() {
    //this.init()
  },
  mounted() {
    window.addEventListener("keyup", this.handleKeyup);
  },
  methods: {
    init() {
      if (this.main.activeOption.speed === undefined) {
        this.main.activeOption.speed = 3;
      }
      if (this.main.activeOption.opacity === undefined) {
        this.main.activeOption.opacity = 1;
      }
      if (this.main.activeOption.dasharray === undefined) {
        this.main.activeOption.dasharray = 10;
      }
      if (this.main.activeOption.width === undefined) {
        this.main.activeOption.width = 10;
      }
      if (this.main.activeOption.color === undefined) {
        this.main.activeOption.color = "#FFFFFF";
      }
      //console.log(this.main.activeOption.speed)
    },

    handleKeyup(e) {
      if (e.key === "q") {
        let x = Number(this.main.activeObj.left + 40).toFixed(0);
        let y = Number(this.main.activeObj.top + 40).toFixed(0);
        if (this.main.activeOption.points === undefined) {
          this.main.activeOption.points = x + "," + y + " ";
        } else {
          this.main.activeOption.points =
            this.main.activeOption.points + x + "," + y + " ";
        }
      }
    },
  },
};
</script>

<style>
</style>
