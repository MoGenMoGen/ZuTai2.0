<template>
  <div class="top-nav">
    <el-menu class="nav"
             mode="horizontal"
             background-color="#212528"
             text-color="#fff"
             active-text-color="#409EFF"
             @mousedown="contain.handleMouseDown">
      <el-submenu :index="index+''"
                  v-for="(item,index) in baseList"
                  :key="index">
        <template slot="title">
          <el-tooltip effect="dark"
                      :content="item.label"
                      placement="top">
            <i :class="'nav__icon iconfont '+item.icon"></i>
          </el-tooltip>
        </template>
        <div style="width:390px">
          <el-menu-item v-for="(citem,cindex) in item.children"
                        @click="handleAdd(citem.option,true)"
                        :key="cindex"
                        class="menu-inline"
                        :index="`${index}-${cindex}`">
            <div class="usehove">
              <img :src="citem.option.img"
                   class="inside-img">
              <div class="bottom-text">{{ citem.label }}</div>
            </div>

          </el-menu-item>
        </div>
      </el-submenu>
      <el-menu-item index="11"
                    @click="handleImg">
        <el-tooltip effect="dark"
                    content="导出图片"
                    placement="top">
          <i class="nav__icon el-icon-camera"
             style="font-size:18px"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="6"
                    @click="handleReset"
                    v-show="!contain.menuFlag">
        <el-tooltip effect="dark"
                    content="还原"
                    placement="top">
          <i class="nav__icon iconfont icon-reset"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="7"
                    @click="handleView"
                    v-show="contain.menuFlag">
        <el-tooltip effect="dark"
                    content="预览"
                    placement="top">
          <i class="nav__icon iconfont icon-view"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="8"
                    @click="handleBuild">
        <el-tooltip effect="dark"
                    content="保存"
                    placement="top">
          <i class="nav__icon iconfont icon-build"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="9"
                    :disabled='!contain.canUndo'
                    @mousedown.native="contain.editorUndo">
        <el-tooltip effect="dark"
                    content="撤销"
                    placement="top">
          <i class="nav__icon el-icon-arrow-left"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="10"
                    :disabled='!contain.canRedo'
                    @click="contain.editorRedo">
        <el-tooltip effect="dark"
                    content="重做"
                    placement="top">
          <i class="nav__icon el-icon-arrow-right"></i>
        </el-tooltip>
      </el-menu-item>
<!--      <el-menu-item index="12"-->
<!--                    @click="$refs.result.show=true">-->
<!--        <el-tooltip effect="dark"-->
<!--                    content="大屏结构"-->
<!--                    placement="top">-->
<!--          <i class="nav__icon el-icon-info"></i>-->
<!--        </el-tooltip>-->
<!--      </el-menu-item>-->
		<el-menu-item index="12"
		              @click="handleSelect">
		  <el-tooltip effect="dark"
		              content="选择图层"
		              placement="top">
		    <i class="nav__icon iconfont icon-tuceng"></i>
		  </el-tooltip>
		</el-menu-item>
		<el-menu-item index="13"
		              @click="handleSelect2">
		  <el-tooltip effect="dark"
		              content="选择组"
		              placement="top">
		    <i class="nav__icon iconfont icon-zu"></i>
		  </el-tooltip>
		</el-menu-item>
      <el-menu-item index="10">
        <el-tooltip effect="dark"   content="自动保存"     placement="top">
          <el-switch
              v-model="ifSave"  active-text="自动保存"
              active-color="#13ce66"
              inactive-color="#ff4949">
          </el-switch>
        </el-tooltip>
      </el-menu-item>
    </el-menu>
    <result ref="result"></result>
	<el-dialog :visible.sync="dialogVisible" title="图层选择" width="60%" @close="off" append-to-body>
		<div class="select-box" v-for="(item,index) in componentObj" :key="index" @click="pushObj(item)">
			<img src="../../assets/cancel.png" class="del-logo" @click.stop="delObj(index)">
			<img :src="item.img">
			<span>{{item.name}}</span>
		</div>
	</el-dialog>
	<el-dialog :visible.sync="dialogVisible2" title="组选择" width="60%" @close="off2" append-to-body>
		<div class="select-box" v-for="(item,index) in fileObj" :key="index" @click="pushFile(item)">
			<img src="../../assets/cancel.png" class="del-logo" @click.stop="delFileObj(index)">
			<img src="../../assets/base/file.png">
			<span>{{item.name}}</span>
		</div>
	</el-dialog>
  </div>
</template>

<script>
import {uuid} from '@/utils/utils'
import baseList from '@/option/base'
import {updateComponent,updateVisualApp} from '@/api/visual'
import result from './result';

export default {
  inject: ["contain"],
  provide() {
    return {
      contain: this.contain,
    };
  },
  props: {
      layout: {
          type: Object,
          default() {
              return {}
          }
      },
  },
  components: {
    result
  },
  data() {
    return {
      timer: null,
      ifSave: true,//是否需要自动保存
      baseList: baseList,
	  dialogVisible: false,
	  dialogVisible2: false,
	  componentObj: [],
	  fileObj: []
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.ifSave) {
        this.handleBuild2()
      }
    }, 60000)
  },
  beforDestory() {
    clearInterval(this.timer)
  },
  methods: {
    vaildData(id) {
      const list = [];
      for (var i = 0; i < 20; i++) {
        list.push(i + '')
      }
      return list.includes(id)
    },
    handleImg() {
      this.$confirm('是否导出大屏图片？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$Screenshot(document.querySelector("#wrapper")).then(canvas => {
          this.downFile(canvas.toDataURL("image/jpeg", 0.8), new Date().getTime());
          this.$message.success('图片导出成功')
        });
      }).catch(() => {

      });

    },
    handleView() {
      this.contain.menuFlag = false;
      this.contain.handleInitActive();
      this.contain.setScale(document.body.clientWidth);
    },
    handleReset() {
      this.contain.menuFlag = true;
      this.contain.setScale(this.contain.contentWidth);

    },
    //保存不上传图片封面
    handleBuild3(){
      this.contain.handleInitActive();
      const loading = this.$loading({
        lock: true,
        text: '正在保存配置，请稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      const formdata = {
        visual: {
          id: this.contain.visual.id,
          backgroundUrl: ''
        },
        config: {
          id: this.contain.obj.config.id,
          visualId: this.contain.visual.id,
          detail: JSON.stringify(this.contain.config),
          component: JSON.stringify(this.contain.nav),
        },
      }
      let layoutData = {
          id: this.$route.params.id,
          layout: JSON.stringify(this.layout)
      }
      updateVisualApp(layoutData)
      updateComponent(formdata)
      loading.close();

    },

    handleBuild() {
      this.contain.handleInitActive();
      const loading = this.$loading({
        lock: true,
        text: '正在保存配置，请稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$nextTick(() => {
        html2canvas(document.getElementById('content'), {
          useCORS: true,
          backgroundColor: null,
          allowTaint: true
        }).then(canvas => {
          function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type: mime});
          }

          var file = dataURLtoFile(canvas.toDataURL('image/jpeg', 0.05), new Date().getTime() + '.jpg');
          var formdata = new FormData();
          formdata.append('file', file)
          axios.post('/api/blade-resource/oss/endpoint/put-file-base64', formdata, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Blade-Auth": 'bearer ' + JSON.parse(localStorage.getItem('zt-token'))
            }
          }).then(res => {
            //const data = res.data.data;
            const url = res.data.data;
            console.log(this.contain);
            const formdata = {
              visual: {
                id: this.contain.visual.id,
                backgroundUrl: url
              },
              config: {
                id: this.contain.obj.config.id,
                visualId: this.contain.visual.id,
                detail: JSON.stringify(this.contain.config),
                component: JSON.stringify(this.contain.nav),
              },
            }
            let layoutData = {
                id: this.$route.params.id,
                layout: JSON.stringify(this.layout)
            }
            updateVisualApp(layoutData)
            return updateComponent(formdata)
          }).then(() => {
            loading.close();
            this.$message.success('保存成功')
            // this.$confirm('保存成功大屏配置, 是否打开预览?', '提示', {
            //   confirmButtonText: '确定',
            //   cancelButtonText: '取消',
            //   type: 'warning'
            // }).then(() => {
            //   let routeUrl = this.$router.resolve({
            //     path: '/view/' + this.contain.id
            //   })
            //   window.open(routeUrl.href, '_blank');
            // }).catch(() => { });

          }).catch(() => {
            this.$message.error('模版例子不能修改')
            loading.close();
          })
        })
      })
    },
    handleBuild2() {
      const formdata = {
        visual: {
          id: this.contain.visual.id,
        },
        config: {
          id: this.contain.obj.config.id,
          visualId: this.contain.visual.id,
          detail: JSON.stringify(this.contain.config),
          component: JSON.stringify(this.contain.nav),
        },
      }
      let layoutData = {
          id: this.$route.params.id,
          layout: JSON.stringify(this.layout)
      }
      updateVisualApp(layoutData)
      updateComponent(formdata)
    },
    //导入组件到大屏
    handleAdd(option, first = false) {

      let obj = this.deepClone(option);
      obj.left = 500;
      obj.top = 200
      obj.index = uuid();
      obj.option.index = obj.index
      if (first) {
        this.contain.nav.unshift(obj);
      } else {
        this.contain.nav.push(obj);
      }

    },
    handleUndo() {
      this.contain.editorUndo()
    },
    handleRedo() {
      this.contain.editorRedo()
    },
	handleSelect() {
	  this.dialogVisible = true
	  console.log(this.dialogVisible)
	  if(localStorage.getItem('componentObj')) {
		  this.componentObj = JSON.parse(localStorage.getItem('componentObj'))
	  }
	},
	handleSelect2() {
		this.dialogVisible2 = true
		if(localStorage.getItem('fileObj')) {
			this.fileObj = JSON.parse(localStorage.getItem('fileObj'))
		}
	},
	off() {
		console.log(1111)
		this.dialogVisible = false
		console.log(this.dialogVisible)
	},
	off2() {
		console.log(222)
		this.dialogVisible2 = false
	},
	pushObj(item) {
		let obj = this.deepClone(item)
		obj.index = uuid()
		obj.option.index = obj.index
		this.contain.nav.unshift(obj)
	},
	pushFile(item) {
		let fileObj = this.deepClone(item)
		fileObj.index = uuid()
		fileObj.children.forEach(v => {
			v.index = uuid()
			v.option.index = v.index
		})
		this.contain.nav.unshift(fileObj)
	},
	delObj(index) {
		this.$confirm('是否删除此图层？', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() => {
			let oldObj = this.deepClone(this.componentObj)
			oldObj.splice(index,1)
			this.$message({
				message: '删除成功',
				type: 'success'
			})
			localStorage.setItem('componentObj',JSON.stringify(oldObj))
			this.componentObj = oldObj
		}).catch(()=>{})
	},
	delFileObj(index) {
		this.$confirm('是否删除此组？', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() => {
			let oldObj = this.deepClone(this.fileObj)
			oldObj.splice(index,1)
			this.$message({
				message: '删除成功',
				type: 'success'
			})
			localStorage.setItem('fileObj',JSON.stringify(oldObj))
			this.fileObj = oldObj
		}).catch(()=>{})
	}
  }
}
</script>

<style lang='scss'>
.top-nav {
  .nav {
    border-bottom: 0 !important;
    height: 45px;
    line-height: 45px;
    overflow: hidden;
  }

  .nav__icon {
    margin-right: 5px;
  }

  .nav .el-submenu .el-submenu__title,
  .nav .el-menu-item {
    height: 45px;
    line-height: 45px;
    font-size: 12px;
  }

  .el-menu-item {
    height: 100px !important;
  }
}

.el-menu--horizontal {
  .menu-inline {
    text-align: center;
    display: inline-block !important;
  }

  .bottom-text {
    color: #b1b1b1;
  }

  .inside-img {
    width: 110px;
    height: 70px;
    border: 2px solid transparent;
    box-sizing: border-box;
  }

  .inside-img:hover {
    border-color: #006eff;
  }

  .usehove:hover {
    .bottom-text {
      color: #fff;
    }
  }
}
.ivu-modal-content{
  background-color: #091F37FF;
}
</style>

<style lang="scss" scoped>
	/deep/.el-dialog__body {
		display: flex;
		flex-wrap: wrap;
	}

	.select-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: 20px;
		cursor: pointer;
		position: relative;

		.del-logo {
			width: 10px;
			height: 10px;
			position: absolute;
			top: 5px;
			right: 5px;
		}

		img {
			width: 110px;
			height: 70px;
		}

		span {
			color: #fff;
			margin-top: 10px;
			margin-bottom: 10px;
		}
	}
</style>
