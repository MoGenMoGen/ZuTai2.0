<!-- 自定义配置 -->
<template>
  <div>
    <el-button type="text" style="margin:0 10px;" @click="AddInput">新增选项</el-button>
    <el-form-item label="选项" v-for="(item,index) in main.activeOption.List" :key="index">
      <el-input style="width: 120px" type="input" placeholder="文本内容" v-model="item.input"></el-input>
      <el-input style="width: 80px" type="input" placeholder="值" v-model="item.value"></el-input>
      <el-button type="danger" style="margin-top:3px;" @click="Del(index)">删除</el-button>
    </el-form-item>

    <el-form-item label="变量名称">
      <el-input   type="text"  placeholder="请输入变量名称"   v-model="main.activeOption.valNm">  </el-input>
    </el-form-item>
    <el-form-item label="选择框默认文字">
      <el-input   type="text"  placeholder="请输入文本内容"   v-model="main.activeOption.placeholder">  </el-input>
    </el-form-item>
    <el-form-item label="背景颜色">
      <avue-input-color
          color-format="hex"
          :show-alpha="false"
          placeholder="请选择颜色"
          v-model="main.activeOption.bgColor"
      ></avue-input-color>
    </el-form-item>
    <el-form-item label="透明度">
      <avue-slider v-model="main.activeOption.opacity"></avue-slider>
    </el-form-item>

    <border-style></border-style>

    <el-form-item label="圆角弧度">
      <avue-input-number v-model="main.activeOption.radius"></avue-input-number>
    </el-form-item>
    <font-style></font-style>
  </div>
</template>

<script>
import fontStyle from "../options/fontStyle";
import borderStyle from "../options/borderStyle";

export default {
  inject: ["main"],
  data() {
    return {
      dic: [
        {
          label: "默认",
          value: "normal",
        },
        {
          label: "粗",
          value: "bold",
        },
        {
          label: "细",
          value: "lighter",
        },
      ],
      dic2: [
        {
          label: "微软雅黑",
          value: "微软雅黑",
        },
        {
          label: "等线",
          value: "Deng",
        },
        {
          label: "仿宋",
          value: "simfang",
        },
        {
          label: "黑体",
          value: "simhei",
        },
        {
          label: "楷体",
          value: "simkai",
        },
      ],
    };
  },
  components: {fontStyle, borderStyle},
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
      if (this.main.activeOption.borderColor === undefined) {
        this.main.activeOption.color = "#DCDFE6";
      }
      if (this.main.activeOption.radius === undefined) {
        this.main.activeOption.color = 20;
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
    AddInput() {
      //最多10条数据
      if (this.main.activeOption.List.length > 10) {
      } else
        this.main.activeOption.List.push({input: ''})
    },
    Del(index) {
      if (this.main.activeOption.List.length == 1) {
      } else
        this.main.activeOption.List.splice(index, 1)
    }
  },
};
</script>

<style>
</style>
