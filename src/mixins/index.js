// 查看页面和编辑页面公用的参数和方法
import common from '@/config'
import { config } from '@/option/config'
import container from '@/page/group/container'
import { getList } from '@/api/map'
export default {
  components: {
    container
  },
  provide () {
    return {
      main: this,
      contain: this
    };
  },
  data () {
    return {
      DIC: {
        MAP: []
      },
      contentWidth: '',
      config: config,
      obj: {},
      id: '',
      visual: {},
      nav: [],
      common: common,
      active: [],
	  activeIndex: null,
      overactive: '',
      ifMove:false,//是否是在用对齐方式
        ifBack:false,
        num:0,
      historyCache: [],// 历史操作数据用于undo redo
      currentHistoryIndex: -1,     // redo undo 指针
      copyNav: '' // 用于监听去干扰,字符串类型,方便比较
    }
  },
  watch: {
    nav: {
      handler (val, oldval) {

          console.log('nav变化了-----------------------')
          //表格组件如果有下面这个参数删掉，这个参数是组件自己添加的，不知道是在什么情况下会更新，然后一直触发监听事件 ，这个必须要有
          val.forEach(item=>{
            if(item.title=='表格'){
               item.option.column.forEach(v=>{
                 if(v['__id']!==undefined )  delete v['__id']
               })
            }
          })
          //下面是检查问题时找不同用的
          // console.log(JSON.stringify(val))
          // console.log(JSON.stringify(oldval))
          // for(let i=0;i<JSON.stringify(val).length;i++){
          //     if(JSON.stringify(val)[i]!=JSON.stringify(oldval)[i]){
          //         console.log('-----------不同的地方--------')
          //         console.log(i)
          //         console.log(JSON.stringify(val)[i]+'*****************'+JSON.stringify(oldval)[i])
          //         break;
          //     }
          // }
          // console.log('------------nav变化end-------------')
          if(this.ifMove){
              this.recordMain(val, oldval,true)
          }else {
              this.recordMain(val, oldval)
          }
      },
      deep: true
    }
  },
  computed: {
    list () {
      // console.log('获取list值')
      // console.log(this.nav)
      let result = [];
      //循环处理数据
      const detail = (item) => {
        if (item.children) {
          item.children.forEach(ele => {
            detail(ele);
          })
        } else {
            if(!item.vars){   //没有绑定变量
                item.show = true
                result.push(item)
                return
            }
            //下面是防止模板在更新时被保存了显示不出来，所以每次渲染时这个值如果有就定义为false,true不显示，false显示
            if(item.iframeShow){
                item.iframeShow = false
            }
            let val = localStorage.getItem(item.vars);
            if(item.con=='等于'){
                item.show = item.val==val
            }else if(item.con=='不等于'){
                item.show = item.val!=val
            }else if(item.con=='小于'){
                item.show = val < item.val
            }else if(item.con=='大于'){
                item.show = val > item.val
            }else if(item.con=='大于等于'){
                item.show = val >= item.val
            }else if(item.con=='小于等于'){
                item.show = val <= item.val
            }
             result.push(item)
        }
      }
      this.nav.forEach(ele => { //不要让现在的操作影响到nav，不然nav会触发watch事件  当前操作只是根据nav数据再判断了下，nav里不需要
        detail(ele);
      })
      const len = result.length - 1;
      result.forEach((ele, index) => {
        ele.zIndex = len - index;
      })
      return result
    },
    // 能否撤销
    canUndo () {
      console.log('是否撤销',this.currentHistoryIndex)
      return this.currentHistoryIndex > 0
    },
    canRedo () {
      return this.historyCache.length > this.currentHistoryIndex + 1
    },
  },
  created () {
    this.initDic();
  },
  methods: {
    //初始化字典
    initDic () {
      getList({
        current: 1,
        size: 100,
      }).then(res => {
        const data = res.data.data;
        this.DIC.MAP = data.records.map(ele => {
          return {
            label: ele.name,
            value: this.url + '/map/data?id=' + ele.id
          }
        });
      })
    },
    findnav (id, type) {
      //循环处理数据
      let obj = undefined;
      let count = 0;
      let parent = undefined;
      let pcount = 0;
      let len = 0;
      const detail = (item, list, i, number = 0) => {
        if (!item.children || type) {
          if (id === item.index) {
            obj = item;
            len = Array.isArray(list) ? list.length - 1 : list.children.length - 1;
            parent = list;
            pcount = number;
            count = i;
          }
        }
        if (item.children) {
          item.children.forEach((ele, index) => {
            detail(ele, item, index, number + 1);
          })
        }
      }
      this.nav.forEach((ele, index) => {
        detail(ele, this.nav, index);
      })
      return {
        obj,
        count,
        len,
        pcount,
        parent
      }
    },
    findlist (index) {
      return this.list.find(ele => ele.index == index) || {}
    },
    handleInitActive () {
      if (this.active.isNull()) return
      this.active = []
      this.activeIndex = null
    },
    handleMouseDown () {
      this.handleInitActive();
    },
    // =====================历史纪录=======================
    // 监听调用主程序
    recordMain (val, oldval,type) {
      // console.log('index',this.currentHistoryIndex)
      //   console.log('this.ifBack',this.ifBack)

      if(this.ifBack){ //是撤销的，不用监听
        return
      }
      if(this.activeList.length>1 && !type){  //防止多选移动时一直记录，只有鼠标抬起才会记录
        return
      }

      //分两种情况:
      // 1. 版本在回撤时, 不要走监听(同时啥也没改)
      // 2. 版本回撤改了呢?那也要走监听重新推新的
      if (JSON.stringify(val) != this.copyNav) { // 不一样的东西才值得记录
        // 这里监听不用deep,很多移动操作无法监听,但用了deep杂质很多,随便鼠标点一下就能触发监听
        // 注意不要这么判断 (val !== oldval)  因为很多时候新老值对比是一样的
        //   console.log('不一样了')
        let newst = JSON.stringify(val)

        if (newst != this.copyNav) {
          console.log('我不一样哦');
            // console.log(JSON.stringify(val))
            // console.log('-----------------')
            // console.log(this.copyNav)
            // for(let i=0;i<JSON.stringify(val).length;i++){
            //     if(JSON.stringify(val)[i]!=this.copyNav[i]){
            //         console.log('-----------不同的地方--------')
            //         console.log(i)
            //         console.log(JSON.stringify(val)[i]+'*****************'+this.copyNav[i])
            //         break;
            //     }
            // }
            this.copyNav = newst

            // console.log(this.copyNav)
          this.addHistoryCache(JSON.parse(JSON.stringify(val)))
        } else {
          // console.log("一模一样,你记录个锤子啊!!");
          return
        }
      }
    },
    /**
  * 新增一条历史纪录
  * @param
  */
    addHistoryCache (val) {
        val.forEach(item=>{
            if(item.title=='表格'){
                item.option.column.forEach(v=>{
                      if(v['__id']!==undefined )  delete v['__id']

                        console.log(v)
                })
            }
         })
      console.log('currentHistoryIndex',this.currentHistoryIndex)
      console.log('historyCache.length',this.historyCache.length)
      if (this.currentHistoryIndex + 1 < this.historyCache.length) {
          this.historyCache.splice(this.currentHistoryIndex + 1)
          this.historyCache.push({
              nav: this.deepClone(val),
          })
          this.currentHistoryIndex++
      } else {
		this.historyCache.push({
		  nav: this.deepClone(val),
		  // activePageUUID: this.activePageUUID,
		  // activeElementUUID: this.activeElementUUID
		})
		// 限制undo 纪录步数，最多支持100步操作undo
		this.historyCache.splice(100)
		if(this.currentHistoryIndex>99) {
			return
		} else {
			this.currentHistoryIndex++
		}
		// console.log('this.currentHistoryIndex2',this.currentHistoryIndex)
		console.log('this.historyCache2',this.historyCache)
	  }
    },
    //撤销
    editorUndo () {
        this.ifBack = true
        // console.log('回退1111',this.currentHistoryIndex)
      if (!this.canUndo) {
        return;
      }
      this.active = []
      this.activeIndex = null
        // this.inputPosChange = 'input'
        // console.log('回退',this.currentHistoryIndex)
      this.currentHistoryIndex--
        // console.log('回退',this.currentHistoryIndex)
      this.relapceEditorState()
    },
    editorRedo () {
      if (!this.canRedo) {
        return;
      }
      this.currentHistoryIndex++
      this.relapceEditorState()
    },
    /**
  * 更新编辑器项目数据，从history中拿数据替换
  * @param data
  */
    relapceEditorState () {
      // console.log(this.currentHistoryIndex)
      const prevState = this.historyCache[this.currentHistoryIndex]
        prevState.nav.forEach(item=>{
            if(item.title=='表格'){
              item.option.column.forEach(v => {
                  if(v['__id'] !== undefined) delete v['__id']

               })
            }
        })
        this.nav = this.deepClone(prevState.nav)
      // 版本回退,本地保存一个,方便后面对比
      this.copyNav = JSON.stringify(prevState.nav)
        // console.log('版本回退后的数据')
        // console.log(this.copyNav)
        console.log(JSON.stringify(this.nav))

    },
  }
}
