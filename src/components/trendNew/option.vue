<!-- 自定义配置 -->
<template>
  <div>
    <!-- <el-form-item label="选择图标">
      <el-button type="text" @click="clickSource()">选择素材</el-button>
    </el-form-item> -->
    <!-- <el-form-item label="图标">
      <el-image style="width: 30px; height: 30px" v-if="main.activeOption.url"  :src="main.activeOption.url"  fit="fit">   </el-image>
    </el-form-item>


    <el-form-item label="指示图宽" v-if="main.activeOption.url">
      <avue-input-number v-model="main.activeOption.w"></avue-input-number>
    </el-form-item>
    <el-form-item label="指示图高" v-if="main.activeOption.url">
      <avue-input-number v-model="main.activeOption.h"></avue-input-number>
    </el-form-item> -->
	<el-collapse accordion>
	  <el-collapse-item title="线条设置">
	    <el-form-item label="平滑曲线">
	      <avue-switch v-model="main.activeOption.smooth">
	      </avue-switch>
	    </el-form-item>
		<el-form-item label="显示点">
		  <avue-switch v-model="main.activeOption.showSymbol">
		  </avue-switch>
		</el-form-item>
		<el-form-item label="线的颜色">
		  <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.lineStyleColor" ></avue-input-color>
		</el-form-item>
		<el-form-item label="点的颜色">
		  <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.itemStyleColor" ></avue-input-color>
		</el-form-item>
	    <!-- <el-form-item label="面积堆积">
	      <avue-switch v-model="main.activeOption.areaStyle"></avue-switch>
	    </el-form-item>
	    <el-form-item label="线条宽度">
	      <avue-slider v-model="main.activeOption.lineWidth">
	      </avue-slider>
	    </el-form-item>
	    <el-form-item label="点的大小">
	      <avue-slider v-model="main.activeOption.symbolSize">
	      </avue-slider>
	    </el-form-item> -->
	  </el-collapse-item>
	</el-collapse>
	<el-collapse accordion>
		<el-collapse-item title="x轴设置">
			<el-form-item label="文字颜色">
			  <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.xColor" ></avue-input-color>
			</el-form-item>
			<el-form-item label="轴颜色">
			  <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.xLineColor" ></avue-input-color>
			</el-form-item>
			<el-form-item label="字体大小">
			  <avue-input-number v-model="main.activeOption.xFontSize"></avue-input-number>
			</el-form-item>
		</el-collapse-item>
	</el-collapse>
	<el-collapse accordion>
		<el-collapse-item title="y轴设置">
			<el-form-item label="文字颜色">
			  <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.yColor" ></avue-input-color>
			</el-form-item>
			<el-form-item label="y轴显示">
			  <avue-switch v-model="main.activeOption.yAxisLineShow"></avue-switch>
			</el-form-item>
			<el-form-item label="轴颜色">
			  <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.yLineColor" ></avue-input-color>
			</el-form-item>
			<el-form-item label="分隔线颜色">
			  <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.ySplitLineColor" ></avue-input-color>
			</el-form-item>
			<el-form-item label="字体大小">
			  <avue-input-number v-model="main.activeOption.yFontSize"></avue-input-number>
			</el-form-item>
		</el-collapse-item>
	</el-collapse>
	<el-form-item label="按钮文字颜色">
	  <avue-input-color color-format="hex" :show-alpha="false" placeholder="请选择颜色" v-model="main.activeOption.color" ></avue-input-color>
	</el-form-item>
    <el-form-item label="变量列表(多个变量逗号隔开)">
      <el-input type="textarea" :rows="7"  v-model="main.activeOption.points"></el-input>
    </el-form-item>

    <!--  素材弹窗 -->
    <el-dialog custom-class="tc" title="选择素材" :close-on-click-modal="false"
               :visible.sync="dialogVisible" :modal="false" width="50%">
      <source-list></source-list>
    </el-dialog>
	
  </div>
</template>

<script>
import sourceList from "../../page/group/sourceList";
export default {
  inject: ["main"],
  components: {sourceList},
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    clickSource() {
      this.dialogVisible = true
    },
    setImg(url){
      this.main.activeOption.url = url
      this.dialogVisible = false
    }
  }
}
</script>

<style>
.tc {
  background-color: #ffffff;
}
</style>
