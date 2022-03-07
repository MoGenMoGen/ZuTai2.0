<template>
  <div class="contentmenu"
       v-show="contentMenu"
       @click="contentMenu=false"
       :style="styleName">
	<div class="contentmenu__item"
		@click="handleLock()"> <i class="el-icon-close"></i>{{contain.activeObj.lock?'解锁':'锁定'}}
	</div>
    <div class="contentmenu__item"
         @click="handleLogout()"
         v-if="contain.isFolder"> <i class="el-icon-close"></i>解散分组
    </div>
    <div class="contentmenu__item"
         @click="handleCompose()"
         v-if="!contain.isFolder"> <i class="el-icon-close"></i>组合分组
    </div>
    <div class="contentmenu__item"
         @click="handleDel()"
		 v-if="isPartContextMenu"> <i class="el-icon-close"></i>删除图层(ctrl+Q)
    </div>
    <div class="contentmenu__item"
         @click="handleCopy()"
		 v-if="isPartContextMenu"><i class="el-icon-document"></i>复制图层(ctrl+C)
    </div>
	<div class="contentmenu__item"
	     @click="handleDel()"
		 v-if="!isPartContextMenu"> <i class="el-icon-close"></i>删除组
	</div>
	<div class="contentmenu__item"
	     @click="handleCopy4()"
		 v-if="!isPartContextMenu"><i class="el-icon-document"></i>复制组
	</div>
	<div class="contentmenu__item"
	     @click="handleCopy2()"
		 v-if="isPartContextMenu"><i class="el-icon-document"></i>跨屏复制图层
	</div>
	<div class="contentmenu__item"
	     @click="handleCopy3()"><i class="el-icon-document"></i>跨屏复制组
	</div>
    <div class="contentmenu__item"
         @click="handleTop()"><i class="el-icon-arrow-up"></i>置顶
    </div>
    <div class="contentmenu__item"
         @click="handleBottom()"><i class="el-icon-arrow-down"></i>置底
    </div>
    <div class="contentmenu__item"
         @click="handleStepTop()"><i class="el-icon-arrow-up"></i>上移一层
    </div>
    <div class="contentmenu__item"
         @click="handleStepBottom()"><i class="el-icon-arrow-down"></i>下移一层
    </div>
	<div class="contentmenu__item">
	  <small style="font-size:10px">Tip:按住Ctrl可以选择多个图层</small>
	</div>
	<div class="contentmenu__item">
	  <small style="font-size:10px">Tip:按空格可以拖拽画布</small>
	</div>
  </div>
</template>

<script>
import { uuid } from '@/utils/utils'
export default {
  name: 'contentmenu',
  inject: ["contain"],
  data () {
    return {
      contentMenu: false,
      contentMenuX: 0,
      contentMenuY: 0,
    }
  },
  computed: {
    styleName () {
      return {
        left: this.setPx(this.contentMenuX),
        top: this.setPx(this.contentMenuY)
      }
    }
  },
  methods: {
    show (X = 0, Y = 0,isPartContextMenu=true) {
      this.contentMenuX = X;
	  if(Y>500){
		this.contentMenuY = Y - 500;
	  } else {
		this.contentMenuY = Y;
	  }
      this.contentMenu = true;
	  this.isPartContextMenu = isPartContextMenu
    },
    hide () {
      this.contentMenuX = 0;
      this.contentMenuY = 0;
      this.contentMenu = false;
    },
    handleStepBottom () {
      this.handleCommon(false, true);
    },
    handleStepTop () {
      this.handleCommon(true, true);
    },
    //文件夹成组逻辑
    handleCompose () {
      let list = this.contain.active;
      this.$confirm(`是否组合所选择的图层?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let floder = {
          "title": "组",
          "name": "组",
          "index": uuid(),
          "children": []
        }
        //查找到每个组件调用核心方法就行组合操作
        //寻找父类
        const params = this.contain.findnav(list[0], true);
        list.forEach(ele => {
          const item = this.contain.findnav(ele, true);
          item.parent.splice(item.count, 1);
          floder.children.push(item.obj);
        });
        params.parent.unshift(floder);
      }).catch(() => { })
    },
    //文件夹解散逻辑
    handleLogout () {
      let ele = this.contain.activeObj
      this.$confirm(`是否解散${ele.name}图层?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //查找到文件夹调用核心方法nav去操作
        const params = this.contain.findnav(ele.index, true);
        const list = this.deepClone(params.obj.children)
        params.parent.splice(params.count, 1);
        list.forEach(ele => {
          params.parent.push(ele);
        });
        this.contain.handleInitActive();
      }).catch(() => { })
    },
    //删除组件的方法
    handleDel () {
      this.$confirm(`是否删除所选图层?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = this.contain.findnav(this.contain.active[0], true);
        this.contain.active.forEach(ele => {
          const item = this.contain.findnav(ele, true);
          if (Array.isArray(params.parent)) {
            params.parent.splice(item.count, 1);
          } else {
            params.parent.children.splice(item.count, 1);
          }
        });
        this.contain.handleInitActive();
      }).catch(() => { })
    },
    //复制组件的方法
    handleCopy () {
      //寻找父类
      const params = this.contain.findnav(this.contain.active[0], true);
      this.contain.active.forEach(ele => {
        const item = this.contain.findnav(ele, true);
        const obj = this.deepClone(item.obj);
        obj.index = uuid();
		if(obj.children) {
			obj.children.forEach(newEle => {
				newEle.index = uuid()
				newEle.option.index = newEle.index
			})
		} else {
			obj.option.index = obj.index
		}
        if(Array.isArray(params.parent)) {
        	params.parent.unshift(obj)
        } else {
        	params.parent.children.unshift(obj)
        }
      });
      this.contain.handleInitActive();
    },
	//复制组的方法，快捷键由于选中的index问题，暂时无法解决
	handleCopy4() {
		//寻找父类
		const params = this.contain.findnav(this.contain.active[0], true);
		this.contain.active.forEach(ele => {
		  const item = this.contain.findnav(ele, true);
		  const obj = this.deepClone(item.obj);
		  obj.index = uuid();
				if(obj.children) {
					obj.children.forEach(newEle => {
						newEle.index = uuid()
						newEle.option.index = newEle.index
					})
				} else {
					obj.option.index = obj.index
				}
		  if(Array.isArray(params.parent)) {
		  	params.parent.unshift(obj)
		  } else {
		  	params.parent.children.unshift(obj)
		  }
		});
		this.contain.handleInitActive();
	},
	//跨屏复制组件的方法
	handleCopy2 () {
	  //寻找父类
	  const params = this.contain.findnav(this.contain.active[0], true);
	  const obj = this.deepClone(params.obj)
	  obj.index = uuid()
	  obj.option.index = obj.index
	  let oldObj = []
	  if(localStorage.getItem('componentObj')) {
		oldObj = JSON.parse(localStorage.getItem('componentObj'))
	  }
	  oldObj.push(obj)
	  localStorage.setItem('componentObj',JSON.stringify(oldObj))
	  this.$message({
          message: '复制成功',
          type: 'success'
        })
	},
	//跨屏复制文件夹的方法
	handleCopy3 () {
	  //寻找父类
	  const params = this.contain.findnav(this.contain.active[0], true);
	  const obj = this.deepClone(params.obj)
	  obj.children.forEach(item => {
		item.index = uuid()
		item.option.index = item.index
	  })
	  obj.index = uuid()
	  let oldObj = []
	  if(localStorage.getItem('fileObj')) {
	  		oldObj = JSON.parse(localStorage.getItem('fileObj'))
	  }
	  oldObj.push(obj)
	  localStorage.setItem('fileObj',JSON.stringify(oldObj))
	  this.$message({
          message: '复制成功',
          type: 'success'
        })
	},
    // 图层的上下移动方法 
    handleCommon (first = false, step = false) {
      // 交换数组元素
      var swapItems = function (arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
      };
      let obj = this.contain.activeObj;
      let data = this.deepClone(obj);
      let params = this.contain.findnav(obj.index, true);
      if (params.pcount !== 0) {
        if (params.len < 1) return;
        if (step) {
          if (first && params.count === 0) return
          if (!first && params.count === params.len) return
          let count = first ? params.count - 1 : params.count + 1
          swapItems(params.parent.children, params.count, count);
        } else {
          if (first) {
            // if (params.count === 0) return
            params.parent.children.splice(params.count, 1);
            // params.parent.children.unshift(data);
			this.contain.nav.unshift(data);
          } else {
            // if (params.count === params.len) return
            params.parent.children.splice(params.count, 1);
            // params.parent.children.push(data);
			this.contain.nav.push(data);
          }
        }
      } else {
        if (this.contain.nav.length < 1) return;
        if (step) {
          if (first && params.count === 0) return
          if (!first && params.count === params.len) return
          let count = first ? params.count - 1 : params.count + 1
          swapItems(this.contain.nav, params.count, count);
        } else {
          if (first) {
            if (params.count === 0) return
            this.contain.nav.splice(params.count, 1)
            this.contain.nav.unshift(data);
          } else {
            if (params.count === params.len) return
            this.contain.nav.splice(params.count, 1)
            this.contain.nav.push(data);
          }
        }
      }
    },
    handleTop () {
      this.handleCommon(true);
    },
    handleBottom () {
      this.handleCommon();
    },
	handleLock () {
	  console.log(this.contain.findnav(this.contain.active[0], true))
	  const params = this.contain.findnav(this.contain.active[0], true)
	  if(params.obj.children) {
		params.obj.children.forEach((item) => {
			if(this.contain.activeObj.lock) {
				item.lock = false
			} else {
				item.lock = true
			}
		})
	  }
	  this.contain.activeObj.lock = !this.contain.activeObj.lock;
	  this.contain.active = []
	}
  }
}
</script>

<style>
.contentmenu {
  width: 160px;
  position: fixed;
  z-index: 99999;
  list-style: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 0;
  background: #27343e;
  color: #bcc9d4;
}
.contentmenu__item {
  z-index: 10000;
  list-style: none;
  padding: 8px 12px;
  cursor: pointer;
  position: relative;
  font-size: 12px;
}
.contentmenu__item:hover {
  background-color: rgba(0, 192, 222, 0.1);
}
.contentmenu__item i {
  margin-right: 5px;
}
.contentmenu__item :first-child {
  padding-top: 5px;
}
</style>