<template>
  <div>
    <!--  鼠标划入显示框  -->
    <div v-if="seen" class="hover_con" :style="positionStyle">
      <iframe :src="fcUrl" frameborder="0" height="200"  width="300"></iframe>
    </div>
    <!-- 事件触发浮窗 -->
    <div v-if="seen_event" class="hover_con" :style="positionStyle_event">
      <i v-if="seen_event_click" class="el-icon-close" @click="seen_event = false" style="font-size: 24px;color: white;position: absolute;top:-10px;right:-10px"></i>
      <iframe :src="fcUrl_event" frameborder="0" height="200"  width="300"></iframe>
    </div>
    <!-- 事件触发文字提示 -->
    <div v-if="title_event" class="hover_con_title" :style="positionStyleTitle_event">
      <i v-if="title_event_click" class="el-icon-close" @click="title_event = false" style="font-size: 24px;color: white;position: absolute;top:-10px;right:-10px"></i>
      <p class="title-box">{{title_event_word}}</p>
    </div>
    <!--  弹窗 popupWidth -->
    <el-dialog custom-class="dialog" append-to-body :modal="false" :visible.sync="show" :width="popupWidth" v-dialogdrag>
      <iframe :src="popupUrl" scrolling="no" frameborder="0"  :height="height" :width="width" id="iframe"></iframe>
    </el-dialog>
    <!-- 事件触发弹窗 -->
    <el-dialog custom-class="dialog" append-to-body :modal="false" :visible.sync="show_event" :width="popupWidth_event" v-dialogdrag>
      <iframe :src="popupUrl_event" scrolling="no" frameborder="0"  :height="height_event" :width="width_event" id="iframe_event"></iframe>
    </el-dialog>
    <div v-for="item in nav" :key="item.index"
         @click="eventMethod($event,item,'click')"
         @dblclick="eventMethod($event,item,'dbclick')"
         @mouseover="eventMethod($event,item,'over')"
         @mouseout="eventMethod($event,item,'out')"
         @contextmenu.prevent="contain.handleContextMenu && contain.handleContextMenu($event,item)">
      <avue-draggable v-if="!item.children && !item.iframeShow"
                      v-bind="item"
                      :scale="container.stepScale"
                      :disabled="!contain.menuFlag || !contain.menuFlag2"
                      :step="container.stepScale"
                      :width="item.component.width"
                      :height="item.component.height"
                      :ref="common.DEAFNAME+item.index"
                      :active-flag="contain.active.includes(item.index)"
                      v-show="!item.display && (item.show||(item.show2&&show3&&contain.menuFlag))"
					  @move="handleMove"
                      @over="handleOver"
                      @focus="handleFocus"
                      @blur="handleBlur">
        <!--out鼠标划出  over鼠标划入-->
        <!--<p style="color: #fff;font-size: 30px">{{item.mirrorTop}}</p>-->
        <div
                :style="{transform:(item.mirrorTop ? 'scaleY(-1)' : 'scaleY(1)')+' '+(item.mirrorLeft ? 'scaleX(-1)' : 'scaleX(1)'),width:'100%',height:'100%'}"
        >
          <component :ref="common.NAME+item.index"
                     :id="common.NAME+item.index"
                     :is="common.COMPNAME+item.component.name"
                     v-bind="item"
                     :data-formatter="getFunction(item.dataFormatter)"
                     :click-formatter="getFunction(item.clickFormatter,true)"
                     :echart-formatter="getFunction(item.echartFormatter)"
                     :label-formatter="getFunction(item.labelFormatter)"
                     :styles-formatter="getFunction(item.stylesFormatter)"
                     :sql-formatter="sqlFormatter"
                     :formatter="getFunction(item.formatter)"
                     :width="item.component.width"
                     :data-query="getJson(item.dataQuery)"
                     :height="item.component.height"
                     :animation="!contain.menuFlag || !contain.menuFlag2"
                     :theme="(item.option || {}).theme"
                     :disabled="!contain.menuFlag || !contain.menuFlag2"
                     :scale="container.stepScale"
                     :option="item.option"
                     :home-url="contain.config.url"
                     title=""
                     :click="handleClick"/>
        </div>

      </avue-draggable>
      <subgroup :nav="item.children"></subgroup>
    </div>
  </div>
</template>

<script>
//注册自定义组件
import components from '@/components/';
// import { addUrlParam } from '@/utils/utils'
// import crypto from '@/utils/crypto';
import {dynamicSql} from '@/api/db'
import common from '@/config'
import echartComponents from '../../echart/'

export default {
  name: 'subgroup',
  inject: ["contain", 'container'],
  provide() {
    return {
      contain: this.contain,
      container: this.container
    };
  },
  components: components,
  props: {
    nav: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
watch:{
  $route:{
	handler(newVal,oldVal) {
		if(newVal.name=='build') {
			this.show3 = true
		} else {
			this.show3 = false
		}
	},
	deep: true,
	immediate: true
  },
},
computed:{

},
  data() {
    return {
      popupUrl: '',
      height:'460',
      width:'800',
      popupWidth:'820px',
      fcUrl:'',
      show: false,
      seen: false,
      positionStyle: "",
      sqlFormatter: dynamicSql,
      common: common,
	  show3: false,
      show_event: false,
      popupUrl_event: '',
      height_event: '460',
      width_event: '460',
      popupWidth_event: '820px',
      seen_event: false,
      seen_event_click: false,
      positionStyle_event: '',
      fcUrl_event: '',
      title_event: false,
      title_event_click: false,
      title_event_word: ''
    }
  },
  created() {
    Object.keys(echartComponents).map(ele => {
      let component = echartComponents[ele];
      Vue.component(component.name, component);
    });
  },
  methods: {
    //弹窗显示
    // clickNav(e, item) {
    //   if (item.option.popup) {
    //     this.popupUrl = item.option.popupUrl
    //     if (item.option.popupH){
    //         this.height = item.option.popupH
    //     }else {
    //       this.height = "460"
    //     }
    //     if (item.option.popupW){
    //       this.width = item.option.popupW
    //     }else {
    //       this.width = "800"
    //     }
    //     this.popupWidth =(Number(this.width) + Number(18))  +'px'
    //     this.show = true
    //   }
    // },
    //鼠标划入
    // over(url,left,top) {
    //   if (url !== undefined){
    //     this.fcUrl = url
    //     this.seen = true
    //     this.positionStyle = {top: top-200 + 'px', left: left+120 + 'px'};
    //   }
    // },
    //鼠标划出
    // leave() {
    //   this.seen = false
    // },
    eventMethod(e,thisItem,type) {
        if(thisItem.name!="多边形" && !this.contain.menuFlag&&thisItem.option.interact) {
            thisItem.option.interact.forEach((item,index) => {
                if(item.event==type) {
                    if (item.action == 'popup') {
                        this.clickEvent(item.popupW, item.popupH, item.popupLink)
                    } else if (item.action == 'fc') {
                        this.overEvent(item.fcLink, e.offsetX+thisItem.left, e.offsetY+thisItem.top,true)
                    } else if (item.action == 'title') {
                        this.overTitle(item.titleWord, e.offsetX+thisItem.left, e.offsetY+thisItem.top,true)
                    } else if (item.action == 'link') {
                        this.toPage(item)
                    } else if (item.action == 'fcClose') {
                        this.leaveEvent()
                    } else if (item.action == 'titleClose') {
                        this.leaveTitle()
                    }
                }
            })
        }
    },
    toPage(item) {
        let myUrl = item.linkHref.indexOf('http')==-1 ? window.location.origin+'/view/'+item.linkHref : item.linkHref
        if (item.linkTarget == '_blank') {
            window.open(myUrl)
        } else if (item.linkTarget == '_self') {
            if (window != top){
                window.location.href = myUrl
            }else {
                top.location.href = myUrl;
            }
        }
    },
    overEvent(url,left,top,click=false) {
      this.seen_event_click = click
      if (url !== undefined){
        this.fcUrl_event = url
        this.seen_event = true
        this.positionStyle_event = {top: top + 'px', left: left + 'px'};
      }
    },
    leaveEvent() {
      this.seen_event = false
    },
    overTitle(title,left,top,click = false) {
        this.title_event_click = click
        if (title !== undefined){
          this.title_event_word = title
          this.title_event = true
          this.positionStyleTitle_event = {top: top + 'px', left: left + 'px'};
        }
    },
    leaveTitle() {
        this.title_event = false
    },
    clickEvent(width,height,url) {
        this.popupUrl_event = url
        if(width) {
            this.width_event = width
        } else {
            this.width_event = "800"
        }
        if(height) {
            this.height_event = height
        } else {
            this.height_event = "460"
        }
        this.popupWidth_event =(Number(this.width_event) + Number(18))  +'px'
        this.show_event = true
    },
    clickEventClose() {
        this.show_event = false
    },
    getFunction(fun, def) {
      if (!this.validatenull(fun)) {
        try {
          return eval(fun);
        } catch {
          return () => {
          }
        }
      }
      if (def) return () => {
      }
    },
    getJson(str) {
      if (this.validatenull(str)) return {};
      if (typeof str == "string") {
        try {
          return JSON.parse(str);
        } catch {
          return {}
        }
      }
      return str;
    },
    //点击事件交互
    handleClick({type, child, value}) {
      if (type === 'tabs') {
        const indexList = child.index;
        indexList.forEach((index) => {
          const paramName = child.paramName;
          const item = this.contain.findlist(index);
          if (!item.url) return
          let params = {};
          if (item.dataQuery) {
            params = this.getJson(item.dataQuery)
          } else {
            params = {}
          }
          params[paramName] = value;
          item.dataQuery = JSON.stringify(params);
          this.$refs[this.common.NAME + index].forEach(ele => {
            ele.updateData();
          })
        })
      }
    },
	getItemObj () {
	  return this.$refs[this.common.NAME + this.contain.activeObj.index][0];
	},
    //刷新数据
	handleRefresh () {
	  return this.getItemObj().updateData();
	},
    //获取对象
    handleGetObj(val) {
      return this.$refs[`${this.common.DEAFNAME}${val}`];
    },
	handleMove ({ index, left, top }) {
        console.log('----------move---------------')
        //   console.log(this.contain.activeIndex)
        // console.log(this.contain.inputPosChange)
        // if(this.contain.num>5){
        //   console.log('111111111111111111111111111')
        //   return
        // }
        // this.contain.num++
        if(this.contain.inputPosChange==='moveAll') return
        if(!this.contain.inputPosChange){
            this.contain.inputPosChange = 'move'
        }
        if(this.contain.ifMove && this.contain.activeIndex === index) { //变量为真且为当前选择项时，说明数组已经循环改完数据了，可以把变量换成false
		  this.contain.ifMove = false
          return
        }else if(this.contain.ifMove){ //变量为真时下面的不再触发
          return
        }else { //正常的多个组件的拖动
            if (this.contain.activeIndex !== index) return
            this.contain.activeList.forEach(item => {

            if ((this.contain.activeIndex === item.index && this.contain.inputPosChange === 'input') || this.contain.activeList.length===1) return  //通过输入框更改坐标值导致发生位置的，不再累加
				item.left = item.left + left;
				item.top = item.top + top
              if (this.contain.activeIndex === item.index) this.contain.inputPosChange = 'input' //通过拖动更改坐标后把值改下，，不然会再次触发滑动事件继续累加
			})

        }
        if(this.contain.inputPosChange==='input'){ //通过输入框更改坐标值导致发生位置的，更改后把值改成初始值，不然会无限循环
          this.contain.inputPosChange = ''
        }
	},
    //配置界面鼠标划入
    handleOver({index}) {
      this.contain.overactive = index;
    },
    handleFocus({index}) {
	  this.contain.activeIndex = index;
	  this.container.gradeFlag = true;
	  this.contain.selectNav(index);
    },
    handleBlur({index,left, top, width, height}) {
      if (index !== this.contain.activeIndex) return
      this.container.gradeFlag = false;
      if(Array.isArray(this.contain.activeObj)){ //是数组则说明是在进行多选
		  return
      }
	  if(this.contain.activeObj.component && this.contain.activeObj.component.prop=='baseModel' && !this.contain.activeObj.display &&
		  this.contain.activeObj.component.width!==width
	  ){ //是显示的模板并且宽有变化
		  this.$set(this.contain.activeObj, 'iframeShow', true)
		  setTimeout(()=>{
			  this.$set(this.contain.activeObj, 'iframeShow', false)
			},10)
	  }
      this.$set(this.contain.activeObj.component, 'width', width)
      this.$set(this.contain.activeObj.component, 'height', height)
      this.$set(this.contain.activeObj, 'left', left)
      this.$set(this.contain.activeObj, 'top', top)

    },
  }
}
</script>
<style lang="scss">
  .dialog {
    overflow: hidden;
    box-shadow: none;
    background: transparent!important;
    .el-dialog__body {
      padding:14px 4px 10px 14px;  /*右边多出来10像素，下面多出来4像素，需要减掉*/
      background: rgba(9,31,55,0.75);
      border-radius: 10px;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #ffffff;

    }
    .el-dialog__headerbtn {
      top: 8px;
      right:10px
    }
    .el-dialog__header {
      padding: 0;
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
  </style>
<style lang="scss" scoped>

.mirrorLeft{
  transform: rotateY(180deg);
}
.mirrorTop{
  transform: rotateX(180deg);
}
.hover_con {
  position: fixed;
  height: 200px;
  width: 300px;
  z-index: 9999;
}

.hover_con_title {
    position: fixed;
    z-index: 999;
}
.title-box {
    background-color: #fff;
    font-size: 14px;
    color: black;
    border: 1px solid black;
    padding: 5px 10px;
    max-width: 100px;
    word-break: break-all;
}

.font {
  list-style: none;
  color: #FFFFFF;
}
.avue-group__item, .el-dialog, .el-message-box{
  background: transparent;
}
body{
  /*background: transparent;*/
}
.content{
  /*background-color: transparent !important;*/
}
  /*.dialog body{background: transparent}*/
.dialog .build .middle{
  /*background-color: transparent !important;*/
}
</style>
