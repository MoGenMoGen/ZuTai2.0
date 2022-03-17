<template>
  <div class="middle">
    <div id="wrapper" class="wrapper" @mousedown="contain.handleMouseDown">
      <div :style="topStyle" v-if="layoutObj.navType == 'top' || layoutObj.navType == 'topALeft'">
        <img :src="layoutObj.logo" v-if="layoutObj.logo" style="width: 60px;height: 20px;"><span v-if="layoutObj.topTitleShow" :style="topTitleStyle">{{title}}</span>
      </div>
      <div style="display: flex" :style="{width: ((contain.config.scale * contain.config.width) / 100)+'px'}">
          <div :style="leftStyle" style="display: flex;flex-direction: column;overflow-y: auto;flex-shrink: 0;"
           v-if="layoutObj.navType == 'left' || layoutObj.navType == 'topALeft'">
            <block v-if="layoutObj.navList">
                <div v-for="(item,index) in layoutObj.navList" 
                :style="navStyle" class="nav-customize" :class="item.id==selectId?'nav-active':''"
                @click="selectNav(item)">{{item.name}}</div>
            </block>
          </div>
          <div class="content" id="content" ref="content" :style="contentStyle">
            <div class="container" :style="styleName" id="container" ref="container">
              <div class="grade" v-if="gradeFlag || contain.config.gradeShow"
                   :style="gradeLenStyle"></div>
              <subgroup ref="subgroup" :nav="contain.list" ></subgroup>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import subgroup from './subgroup'
import common from '@/config'
import {getObj,getVisualApp} from '@/api/visual'
export default {
  name: 'contents',
  inject: ["contain"],
  props: {
    option: Object,
    props: {
      type: Object,
      default: () => {
        return {}
      }
    },
    wscale: Number,
    layoutObj:Object,
    pageList: Array
  },
  provide() {
    return {
      contain: this.contain,
      container: this
    };
  },
  components: {
    subgroup
  },
  data() {
    return {
      contentStyle: {},
      selectCount: {},
	  selectCountWH: {},
      scale: 1,
      gradeFlag: false,
      layoutObj: {},
      selectId: '',
      title: ''
    }
  },
  computed: {

    stepScale() {
      let scale = Number((100 / (this.scale * this.wscale))).toFixed(2)
      return scale
    },
    //计算中央可视化大屏比例
    styleName() {
      const scale = this.contain.config.scale;
      const val = (scale / 100);
      let width = 0,
      height = 0
      if(this.layoutObj.navType=='top'||this.layoutObj.navType=='topALeft') {
        height = this.setPx(this.contain.config.height - this.layoutObj.height)
      } else {
        height = this.setPx(this.contain.config.height)
      }
      if(this.layoutObj.navType=='left'||this.layoutObj.navType=='topALeft') {
        width = this.setPx(this.contain.config.width - this.layoutObj.width)
      } else {
        width = this.setPx(this.contain.config.width)
      }
      return Object.assign({
        transform: `scale(${val}, ${val})`,
        width: width,
        height: height,
        backgroundColor: this.contain.config.backgroundColor
      }, (() => {
        if (this.contain.config.backgroundImage) {
          return {
            // background: `url(${this.contain.config.backgroundImage}) 0% 0% / 100% 100% rgb(3, 12, 59)`,
              background: `url(${this.contain.config.backgroundImage}) 0% 0% / 100% 100% `,
          }
        }
        return
      })())
    },
    gradeLenStyle() {
      return {
        backgroundSize: `${this.setPx(this.contain.config.gradeLen)} ${this.setPx(this.contain.config.gradeLen)},${this.setPx(this.contain.config.gradeLen)} ${this.setPx(this.contain.config.gradeLen)}`
      }
    },
    topStyle() {
        return {
            width: this.setPx((this.contain.config.scale * this.contain.config.width) / 100),
            height: this.setPx((this.contain.config.scale *this.layoutObj.height)/100),
            background: this.layoutObj.topBg,
            display: 'flex',
            padding:'0 20px',
            boxSizing: 'border-box',
            alignItems: 'center',
            zIndex:'1'
        }
    },
    leftStyle() {
        let height = 0
        if(this.layoutObj.navType=='top'||this.layoutObj.navType=='topALeft') {
          height = this.layoutObj.height
        } else {
          height = 0
        }
        return {
            width: this.setPx((this.contain.config.scale *this.layoutObj.width)/100),
            height: this.setPx((this.contain.config.scale * (this.contain.config.height - height)) / 100),
            background: this.layoutObj.navBg,
            zIndex:'1'
        }
    },
    topTitleStyle() {
        return {
            fontFamily: this.layoutObj.topFontFamily,
            color: this.layoutObj.topColor,
            marginLeft: '10px'
        }
    },
    navStyle() {
        return {
            '--colorDefault': this.layoutObj.color,
            '--colorSelect': this.layoutObj.colorSelect,
            '--bgHover': this.layoutObj.menuColorHover,
            '--bgSelect': this.layoutObj.menuColorSelect,
        }
    }
  },
  mounted() {
    this.initData();
    this.initFun();
  },

  methods: {
    initFun() {
      ['handleRefresh', 'handleGetObj', 'handleRes'].forEach(ele => {
        this[ele] = this.$refs.subgroup[ele]
      });
    },
    //初始化数据
    initData() {
      const pid = this.$route ? this.$route.params.id : ''
      getVisualApp(pid).then(res => {
          this.layoutObj = JSON.parse(res.data.data.layout)
          this.pageList = res.data.data.visuals
          this.title = res.data.data.name
          document.title = res.data.data.name
          const id = this.$route.query.id ? this.$route.query.id : this.pageList[0].id
          this.selectId = id
          this.contain.id = id;
          this.contain.contentWidth = this.$refs.content.offsetWidth;
          const isBuild = this.$route ? this.$route.name === 'build' : this.props.name;
          const width = isBuild ? this.contain.contentWidth : document.body.clientWidth
          let config;
          const callback = () => {
            //赋值属性
            if (this.contain.config.mark.show && !isBuild) {
              this.watermark(this.contain.config.mark);
            }
            this.calcData();
            this.setScale(width);
          }
          if (id) {
            const loading = this.$loading({
              lock: true,
              text: '正在加载中，请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            getObj(id).then(res => {
              const data = res.data.data;
              this.contain.obj = data;
              config = data.config;
              this.contain.json = {
                detail: JSON.parse(config.detail) || {},
                component: JSON.parse(config.component) || [],
              }
              this.contain.config = JSON.parse(config.detail) || {};
              this.contain.nav = JSON.parse(config.component) || [];
              this.contain.visual = data.visual;
              //添加水印。只有查看页面生效
              if (!isBuild) {
                const password = this.contain.visual.password
                if (!this.validatenull(password)) {
                  this.$prompt('请输入密码', '提示', {
                    confirmButtonText: '确定',
                    showCancelButton: false,
                    showClose: false,
                    closeOnClickModal: false,
                    inputPattern: new RegExp(password),
                    inputErrorMessage: '密码不正确，请重新输入'
                  }).then(() => {
                    callback();
                  })
                } else {
                  callback();
                }
              } else {
                callback();
              }
              loading.close();
            }).catch((err) => {
              console.log(err)
              loading.close();
            })
          } else if (this.option) {
            config = this.option;
            this.contain.config = config.detail || {};
            this.contain.nav = config.component || [];
            callback();
          } else {
            this.setScale(width);
          }
      })
    //   const id = this.$route ? this.$route.params.id : this.props.id
    //   this.contain.id = id;
    //   this.contain.contentWidth = this.$refs.content.offsetWidth;
    //   const isBuild = this.$route ? this.$route.name === 'build' : this.props.name;
    //   const width = isBuild ? this.contain.contentWidth : document.body.clientWidth
    //   let config;
    //   const callback = () => {
    //     //赋值属性
    //     if (this.contain.config.mark.show && !isBuild) {
    //       this.watermark(this.contain.config.mark);
    //     }
    //     this.calcData();
    //     this.setScale(width);
    //   }
    //   if (id) {
    //     const loading = this.$loading({
    //       lock: true,
    //       text: '正在加载中，请稍后',
    //       spinner: 'el-icon-loading',
    //       background: 'rgba(0, 0, 0, 0.7)'
    //     });
    //     getObj(id).then(res => {
    //       const data = res.data.data;
    //       this.contain.obj = data;
    //       config = data.config;
    //       this.contain.json = {
    //         detail: JSON.parse(config.detail) || {},
    //         component: JSON.parse(config.component) || [],
    //       }
		  // document.title = data.visual.title
    //       this.contain.config = JSON.parse(config.detail) || {};
    //       this.contain.nav = JSON.parse(config.component) || [];
    //       this.contain.visual = data.visual;
    //       //添加水印。只有查看页面生效
    //       if (!isBuild) {
    //         const password = this.contain.visual.password
    //         if (!this.validatenull(password)) {
    //           this.$prompt('请输入密码', '提示', {
    //             confirmButtonText: '确定',
    //             showCancelButton: false,
    //             showClose: false,
    //             closeOnClickModal: false,
    //             inputPattern: new RegExp(password),
    //             inputErrorMessage: '密码不正确，请重新输入'
    //           }).then(() => {
    //             callback();
    //           })
    //         } else {
    //           callback();
    //         }

    //       } else {
    //         callback();
    //       }
    //       loading.close();
    //     }).catch((err) => {
    //       console.log(err)
    //       loading.close();
    //     })
    //   } else if (this.option) {
    //     config = this.option;
    //     this.contain.config = config.detail || {};
    //     this.contain.nav = config.component || [];
    //     callback();
    //   } else {
    //     this.setScale(width);
    //   }
    },
    //适配尺寸
    setResize() {
      let width = 0,
      height = 0
      if(this.layoutObj.navType=='top'||this.layoutObj.navType=='topALeft') {
        height = this.setPx((this.contain.config.scale * (this.contain.config.height - this.layoutObj.height)) / 100)
      } else {
        height = this.setPx(this.contain.config.scale * this.contain.config.height /100)
      }
      if(this.layoutObj.navType=='left'||this.layoutObj.navType=='topALeft') {
        width = this.setPx((this.contain.config.scale * (this.contain.config.width - this.layoutObj.width)) / 100)
      } else {
        width = this.setPx(this.contain.config.scale * this.contain.config.width /100)
      }
      this.contentStyle = {
        width: width,
        height: height
      }
    },
    //计算比例
    setScale(width) {
      this.contain.config.scale = (width / this.contain.config.width) * 100
      this.scale = this.contain.config.scale;
      this.setResize();
    },
    calcData() {
      if (!this.contain.config.mark) this.contain.config.mark = {}
      if (!this.contain.config.query) this.contain.config.query = {}
    },
    //进行镜像
    toMirror(type){
        this.contain.active.forEach((ele,eleIndex) => {
            ele = this.contain.findlist(ele)
            if (type=='left') {
                this.$set(ele, 'mirrorLeft', ele.mirrorLeft ? false: true);
            }else if(type=='top'){
                this.$set(ele, 'mirrorTop',  ele.mirrorTop ? false: true);
            }
        })
    },
    handlePostionSelect(postion) {
      console.log('对齐',postion)
      this.contain.ifMove = true //这个为真时不再触发move函数，以防位置数据重新计算出错
      this.handleCalcPostionSelect();
      const x1 = this.selectCount.x1;
      const x2 = this.selectCount.x2;
      const y1 = this.selectCount.y1;
      const y2 = this.selectCount.y2;
      console.log(x1,x2,y1,y2)
      if (postion === 'left') {
        this.handleMoveSelectList(x1, undefined, true, postion);
      } else if (postion === 'center') {
        this.handleMoveSelectList(x1 + (x2 - x1) / 2, undefined, true, postion);
      } else if (postion === 'right') {
        this.handleMoveSelectList(x2, undefined, true, postion);
      } else if (postion === 'top') {
        this.handleMoveSelectList(undefined, y1, true, postion);
      } else if (postion === 'middle') {
        this.handleMoveSelectList(undefined, y1 + (y2 - y1) / 2, true, postion);
      } else if (postion === 'bottom') {
        this.handleMoveSelectList(undefined, y2, true, postion);
      } else if (postion === 'horizontal') {
		this.handleAverageSelectList(postion)
	  } else if (postion === 'vertical') {
		this.handleAverageSelectList(postion)
	  }
    },
    handleMoveSelectList(left, top, type, postion) {
          console.log('left1')
          // this.contain.active.push('')
      this.contain.active.forEach((ele,eleIndex) => {
          // if(eleIndex==this.contain.active.length-1){
          //     return
          // }
          ele = this.contain.findlist(ele)
        const ele_component = ele.component;
        //水平情况
        if (left || left===0) {
            console.log('left2')
          let baseLeft = Number(type ? left : (ele.left + left).toFixed(2));
          if (postion === 'right') {
            baseLeft = baseLeft - ele_component.width
          }
          else if (postion === 'center') {
            const obj_center = ele.left + ele_component.width / 2;
            baseLeft = ele.left + (left - obj_center)
          }
          this.$set(ele, 'left', baseLeft);
        }
        //垂直情况
        if (top || top===0) {
          let baseTop = Number(type ? top : (ele.top + top).toFixed(2));
          if (postion === 'bottom') {
            baseTop = baseTop - ele_component.height
          }
          else if (postion === 'middle') {
            const obj_middle = ele.top + ele_component.height / 2;
            baseTop = ele.top + (top - obj_middle)
          }
          this.$set(ele, 'top', baseTop)
        }
      })
    },
	// 均分方法
    handleAverageSelectList(postion) {
		const x1 = this.selectCount.x1;
		const x2 = this.selectCount.x2;
		const y1 = this.selectCount.y1;
		const y2 = this.selectCount.y2;
		const width = this.selectCountWH.width;
		const height = this.selectCountWH.height;
		if((x2 - x1) <= width && postion == 'horizontal') {
			this.$message.warning('无法均分')
			return
		}
		if((y2 - y1) <= height && postion == 'vertical') {
			this.$message.warning('无法均分')
			return
		}
		let newActive = []
		this.contain.active.forEach((ele,eleIndex) => {
			ele = this.contain.findlist(ele)
			newActive.push(ele)
		})
		newActive = newActive.sort((a,b)=>{
			if (postion == 'horizontal') {
				return a.left - b.left
			} else if (postion == 'vertical') {
				return a.top - b.top
			}
		})
		newActive.forEach((ele,eleIndex) => {
			if(postion == 'horizontal') {
				let widthOffset = Number((x2 - x1 - width) / (newActive.length - 1)).toFixed(2)
				if(eleIndex!=0&&eleIndex!=newActive.length - 1) {
					let eleLast = this.contain.findlist(newActive[eleIndex - 1].index)
					widthOffset = Number(widthOffset) + Number(eleLast.left) + Number(eleLast.component.width)
					this.$set(ele, 'left', widthOffset)
				}
			}
			if(postion == 'vertical') {
				let heightOffset = Number((y2 - y1 - height) / (newActive.length - 1)).toFixed(2)
				if(eleIndex!=0&&eleIndex!=newActive.length - 1) {
					let eleLast = this.contain.findlist(newActive[eleIndex - 1].index)
					heightOffset = Number(heightOffset) + Number(eleLast.top) + Number(eleLast.component.height)
					this.$set(ele, 'top', heightOffset)
				}
			}
		})
	},
	//计算多选状态下的最大边界值
    handleCalcPostionSelect() {
      this.selectCount = {
        x1: null,
        x2: null,
        y1: null,
        y2: null,
      }
	  this.selectCountWH = {
		width: null,
		height: null
	  }
      this.contain.active.forEach(ele => {
        ele = this.contain.findlist(ele)
        const left = ele.left;
        const top = ele.top;
        const width = ele.component.width;
        const height = ele.component.height;
        if (this.selectCount.x1==null) {
          this.selectCount = {
            x1: left,
            x2: left + width,
            y1: top,
            y2: top + height,
          }
        }
        if (this.selectCount.x1 > left) this.selectCount.x1 = left;
        if (this.selectCount.x2 < left + width) this.selectCount.x2 = left + width;
        if (this.selectCount.y1 > top) this.selectCount.y1 = top;
        if (this.selectCount.y2 < top + height) this.selectCount.y2 = top + height;
		this.selectCountWH = {
			width: this.selectCountWH.width + width,
			height: this.selectCountWH.height + height
		}
      })
    },
    selectNav(item) {
        this.selectId = item.id
        if (item.type=='_self') {
            if(item.typeLink=='self') {
                this.$router.push({query:{id:item.id}})
                this.initData()
            } else if (item.typeLink=='out') {
                window.location.href = item.id
            }
        } else if (item.type=='_blank') {
            if(item.typeLink=='self') {
                window.open(this.$route.path+'?id='+item.id)
            } else if (item.typeLink=='out') {
                window.open(item.id)
            }
        }
    }
  }
}
</script>

<style>
  body{
    background: transparent;

  }
   .content{
     background-color: transparent !important;
  }
   .middle{
     background-color: transparent !important;
  }
  .nav-customize {
    padding: 10px;
    box-sizing: border-box;
    color: var(--colorDefault);
    cursor: pointer;
  }
  .nav-customize:hover {
    background-color: var(--bgHover);
  }
  .nav-active {
    color: var(--colorSelect);
    background-color: var(--bgSelect);
  }
</style>
