<template>
  <div class="build">

    <imglist ref="imglist"   @change="handleSetimg"></imglist>

    <top ref="top" :layout="layoutObj"></top>

    <div class="app"  :class="{'app--none':!menuFlag}">
      <div class="menu"  v-show="menuFlag"  @click.self="handleMouseDown">
        <el-collapse accordion>
            <el-collapse-item title="导航布局">
                <div class="nav-box">
                    <div v-for="(item,index) in navTypeList" :key="index"
                     @click="selectLayout(item.type)"
                     class="nav-item"
                     :title="item.name">
                        <div class="nav-top">
                            <div v-if="index==1" style="inset:3px 3px 37px;" class="nav-inset"></div>
                            <div v-if="index==2" style="inset:3px 45px 3px 3px;" class="nav-inset"></div>
                            <div v-if="index==3" style="inset:3px 3px 37px;" class="nav-inset"></div>
                            <div v-if="index==3" style="inset:11px 45px 3px 3px;" class="nav-inset"></div>
                        </div>
                        <img :src="(layoutObj.navType?layoutObj.navType==item.type:'blank'==item.type)?select:unselect" style="width: 14px;">
                    </div>
                </div>
                <div class="nav-configure" @click="configure">配置</div>
            </el-collapse-item>
            <el-collapse-item title="页面">
                <template slot="title">
                  <div class="collapse-self">
                      <span>页面</span><i @click.stop="addPage" class="header-icon el-icon-plus"></i>
                  </div>
                </template>
                <div style="height: 36px;" 
                :class="['menu__item',{'is-active':pageId==item.id}]" 
                v-for="(item,index) in pageList" :key="index" @click="choosePage(item.id)"
                @dblclick="hangeChangeName(item)">
                    <input type="text" @blur="item.isname=false" @keyup.enter="item.isname=false" v-if="item.isname" v-model="item.title">
                    <span v-else>{{item.title}}</span>
                </div>
            </el-collapse-item>
            <el-collapse-item title="图层">
                <layer ref="layer" :nav="nav"></layer>
            </el-collapse-item>
        </el-collapse>
      </div>
      <!-- 中间区域 -->
      <div ref="wrapper" style="flex:1;overflow:hidden;position:relative;">
        <div class="refer-line-img"
             @click="imgClick">
          <img :src="isShowReferLine?imgOpenData:imgClose">
        </div>
        <sketch-rule :thick="thick"
                     :scale="scale"
                     :width="width"
                     :height="height"
                     :startX="startX"
                     :startY="startY"
                     :isShowReferLine="isShowReferLine"
                     :palette="palette"
                     :shadow="shadow"
                     :horLineArr="lines.h"
                     :verLineArr="lines.v" />
        <div ref='screensRef'
             id="screens"
             :class="dragSlide?'dragghanle':''"
             @mousedown.stop="dragMousedown"
             @mouseup="dragMouseup"
             @mousemove="dragMousemove"
             @wheel="handleWheel"
             @scroll="handleScroll">
          <div ref="containerRef"
               class="screen-container">
            <div class="canvas"
                 id="myCanvas"
                 ref="canvas"
                 :style="canvasStyle">
              <container ref="container"
                         :wscale="scale">
              </container>
            </div>
          </div>
        </div>
      </div>
      <div class="menu params"   v-show="menuFlag">
        <p class="title">操作</p>
        <el-tabs class="tabs"   stretch   v-model="tabsActive">
          <el-tab-pane name="0" v-if="!navConfigure">
            <el-tooltip slot="label"  effect="dark"  content="配置"    placement="top">
              <div><i class="el-icon-setting"></i></div>
            </el-tooltip>
            <el-form label-width="120px"  label-position="left"   size="mini">
              <!-- 组件配置 -->
              <template v-if="!vaildProp('',[undefined])">
                <p class="title">{{activeObj.title}}</p>
                <el-form-item label="图层名称">
                  <avue-input v-model="activeObj.name"></avue-input>
                </el-form-item>
                <el-form-item label="隐藏">
                  <avue-switch v-model="activeObj.display"></avue-switch>
                </el-form-item>
                <el-collapse accordion>
                  <el-collapse-item title="显示条件">
					  <el-form-item label="是否显示">
					    <avue-switch v-model="activeObj.show2"></avue-switch>
					  </el-form-item>
                    <el-form-item label="变量名">
                      <el-input placeholder="请输入变量名" v-model="activeObj.vars" clearable @input="updVal"></el-input>
                    </el-form-item>
                    <el-form-item label="条件">
                      <el-select v-model="activeObj.con" placeholder="请选择" style="width: 100%" @change="updVal">
                        <el-option key="等于" value="等于" label="等于"></el-option>
                        <el-option key="不等于" value="不等于" label="不等于"></el-option>
                        <el-option key="小于" value="小于" label="小于"></el-option>
                        <el-option key="大于" value="大于" label="大于"></el-option>
                        <el-option key="大于等于" value="大于等于" label="大于等于"></el-option>
                        <el-option key="小于等于" value="小于等于" label="小于等于"></el-option>

                      </el-select>
                    </el-form-item>
                    <el-form-item label="值">
                      <el-input placeholder="请输入值" v-model="activeObj.val" clearable @input="updVal"></el-input>
                    </el-form-item>
                  </el-collapse-item>
                </el-collapse>

                <template v-if="vaildProp('colorList')">
                  <el-form-item label="系统配色">
                    <avue-switch v-model="activeOption.switchTheme"></avue-switch>
                  </el-form-item>
                  <el-form-item label="配色选择"
                                v-if="activeOption.switchTheme">
                    <avue-select v-model="activeOption.theme"
                                 :dic="dicOption.themeList">
                    </avue-select>
                  </el-form-item>
                </template>
                <component :is="activeComponent.prop+'Option'"></component>
                <main-option></main-option>
              </template>
              <!-- 多选配置选项 -->
              <template v-else-if="isSelectActive">
                <el-form-item label="水平方式">
                  <el-tooltip content="左对齐"
                              placement="top">
                    <i class="el-icon-s-fold icon"
                       @click="$refs.container.handlePostionSelect('left')"></i>
                  </el-tooltip>
                  <el-tooltip content="居中对齐"
                              placement="top">
                    <i class="el-icon-s-operation icon"
                       @click="$refs.container.handlePostionSelect('center')"></i>
                  </el-tooltip>
                  <el-tooltip content="右对齐"
                              placement="top">
                    <i class="el-icon-s-unfold icon"
                       @click="$refs.container.handlePostionSelect('right')"></i>
                  </el-tooltip>
                </el-form-item>
                <el-form-item label="垂直方式">
                  <el-tooltip content="顶对齐"
                              placement="top">
                    <i class="el-icon-s-fold icon"
                       @click="$refs.container.handlePostionSelect('top')"></i>
                  </el-tooltip>
                  <el-tooltip content="中部对齐"
                              placement="top">
                    <i class="el-icon-s-operation icon"
                       @click="$refs.container.handlePostionSelect('middle')"></i>
                  </el-tooltip>
                  <el-tooltip content="底对齐"
                              placement="top">
                    <i class="el-icon-s-unfold icon"
                       @click="$refs.container.handlePostionSelect('bottom')"></i>
                  </el-tooltip>
                </el-form-item>
				<el-form-item label-width="0">
				  <el-button type="primary"
				             size="mini"
				             class="block"
				             @click="$refs.container.handlePostionSelect('horizontal')">水平等距</el-button>
				</el-form-item>
				<el-form-item label-width="0">
				  <el-button type="primary"
				             size="mini"
				             class="block"
				             @click="$refs.container.handlePostionSelect('vertical')">垂直等距</el-button>
				</el-form-item>
                <el-form-item label-width="0">
                  <el-button type="primary"
                             size="mini"
                             class="block"
                             @click="handleDeleteSelect">删除</el-button>
                </el-form-item>
                <el-form-item label-width="0">
                  <el-button type="danger"
                             size="mini"
                             class="block"
                             @click="handleFloder">成组</el-button>
                </el-form-item>
              </template>
              <!-- 主屏的配置项 -->
              <template v-else>
                <!-- <el-form-item label="大屏名称">
                  <avue-input v-model="config.name"></avue-input>
                </el-form-item> -->
                <el-form-item label="大屏宽度">
                  <avue-input-number v-model="config.width"></avue-input-number>
                </el-form-item>
                <el-form-item label="大屏高度">
                  <avue-input-number v-model="config.height"></avue-input-number>
                </el-form-item>
                <el-form-item label="大屏简介">
                  <avue-input v-model="config.info"
                              type="textarea"
                              :min-rows="5"></avue-input>
                </el-form-item>
                <el-form-item label="背景颜色">
                  <avue-input-color v-model="config.backgroundColor"></avue-input-color>
                </el-form-item>
                <el-form-item label="背景图片">
                  <img :src="config.backgroundImage"
                       @click="handleOpenImg('config.backgroundImage','background')"
                       alt=""
                       width="100%" />
				  <el-button v-if="!config.backgroundImage" @click="handleOpenImg('config.backgroundImage','background')">添加背景图</el-button>
                  <el-button @click="delBackImg()">删除背景图</el-button>


                </el-form-item>
                <el-form-item label="环境地址">
                  <avue-input type="textarea"  :min-rows="3"   v-model="config.url"></avue-input>
                </el-form-item>

                <el-form-item label="参数">
                  <el-button size="mini"
                             type="primary"
                             @click="openCode('query')">编辑</el-button>
                </el-form-item>
                <el-form-item label="水印(预览有效)">
                  <avue-switch v-model="config.mark.show"></avue-switch>
                </el-form-item>
                <template v-if="config.mark.show">
                  <el-form-item label="内容">
                    <avue-input v-model="config.mark.text"></avue-input>
                  </el-form-item>
                  <el-form-item label="大小">
                    <avue-input-number v-model="config.mark.fontSize"></avue-input-number>
                  </el-form-item>
                  <el-form-item label="颜色">
                    <avue-input-color v-model="config.mark.textStyle"></avue-input-color>
                  </el-form-item>
                  <el-form-item label="角度">
                    <avue-input-number v-model="config.mark.degree"></avue-input-number>
                  </el-form-item>
                </template>
              </template>
            </el-form>
          </el-tab-pane>


          <!-- 数据配置 -->
          <el-tab-pane name="1"  v-if="vaildProp('dataList')&&!navConfigure">
            <el-tooltip slot="label"  effect="dark"   content="数据"  placement="top">
              <div><i class="el-icon-document-copy"></i></div>
            </el-tooltip>
            <el-form label-width="120px"  label-position="left"   size="mini">
              <el-form-item label="数据类型">
                <avue-radio v-model="activeObj.dataType"
                            :dic="dicOption.dataType"></avue-radio>
              </el-form-item>
              <el-form-item label="数据值"   label-position="top" v-if="isStatic">
                <el-button size="mini" type="primary"   @click="openCode('data')">编辑</el-button>
              </el-form-item>
              <el-form-item label="静态图片"   label-position="top" v-if="isStatic">
                <div class="staticImgList">
                  <p  v-for="(item,index) in code.obj" :key="index">
                    <i class="el-icon-error" @click="imgDelt(index)"></i>
                    <img :src="item.value" @click="handleOpenImg('config.staticImgList','staticImgList',index)"/>
                  </p>
                </div>
                <el-button size="mini" type="primary"   @click="imgAdd()">新增图片</el-button>
              </el-form-item>
              <el-form-item label="刷新时间">
                <avue-input-number v-model="activeObj.time"></avue-input-number>
              </el-form-item>
              <template v-if="isApi || isSql">
                <el-form-item label-width="0">
                  <el-button size="mini"  type="primary"  class="block"  @click="handleSql">
                    <span v-if="isSql">编辑SQL语句</span>
                    <span v-if="isApi">编辑Api接口</span>
<!--                    <span v-if="isMqtt">编辑mqtt订阅</span>-->
                  </el-button>
                </el-form-item>
              </template>
              <el-form-item label-width="0"  v-if="isStatic">
                <el-button size="mini"
                           type="primary"
                           class="block"
                           @click="handleSql">
                  <span>数据处理</span>
                </el-button>
              </el-form-item>
              <el-form-item label-width="0">
                <el-button size="mini"
                           type="primary"
                           class="block"
                           @click="openCode('stylesFormatter')">编辑样式</el-button>
              </el-form-item>
              <el-form-item label-width="0">
                <el-button size="mini"
                           type="primary"
                           class="block"
                           @click="handleRes">刷新数据</el-button>
              </el-form-item>
            </el-form>

          </el-tab-pane>
          <!-- 交互事件配置 -->
          <el-tab-pane name="2"
                       v-if="vaildProp('eventList')&&!navConfigure">
            <el-tooltip slot="label"
                        effect="dark"
                        content="交互"
                        placement="top">
              <div><i class="el-icon-thumb"></i></div>
            </el-tooltip>
            <el-form label-width="120px"
                     label-position="left"
                     size="mini">
              <el-form-item label="子类">
                <avue-select multiple
                             v-model="activeObj.child.index"
                             :dic="childList"
                             :props="childProps">
                </avue-select>
              </el-form-item>
              <el-form-item label="参数名称">
                <avue-input v-model="activeObj.child.paramName"></avue-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 其他事件配置 -->
          <el-tab-pane name="3"
                       v-if="vaildProp('formatterList')&&!navConfigure">
            <el-tooltip slot="label"
                        effect="dark"
                        content="事件"
                        placement="top">
              <div><i class="iconfont icon-peizhi"></i></div>
            </el-tooltip>
            <el-form label-width="120px"
                     label-position="left"
                     size="mini">
              <el-form-item label="提示事件">
                <el-button size="mini"
                           type="primary"
                           @click="openCode('formatter')">编辑</el-button>
              </el-form-item>
              <el-form-item label="点击事件"
                            v-if="vaildProp('clickFormatterList')">
                <el-button size="mini"
                           type="primary"
                           @click="openCode('clickFormatter')">编辑</el-button>

              </el-form-item>
              <el-form-item label="标题事件"
                            v-if="vaildProp('labelFormatterList')">
                <el-button size="mini"
                           type="primary"
                           @click="openCode('labelFormatter')">编辑</el-button>
              </el-form-item>
              <el-form-item label-width="0">
                <el-button size="mini"
                           type="primary"
                           class="block"
                           @click="handleRefresh">刷新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 基本参数配置 -->
          <el-tab-pane name="4"
                       v-if="isActive&&activeList.length<2&&!navConfigure">
            <el-tooltip slot="label"
                        effect="dark"
                        content="参数"
                        placement="top">
              <div><i class="el-icon-folder"></i></div>
            </el-tooltip>
            <el-form label-width="120px"
                     label-position="left"
                     size="mini">
              <el-form-item label="序号">
                <avue-input v-model="activeObj.index"
                            disabled></avue-input>
              </el-form-item>
              <el-form-item label="X位置">
                <avue-input-number v-model="activeObj.left" @change="posChange" @focus="ifInput=true" @blur="ifInput=false"></avue-input-number>
              </el-form-item>
              <el-form-item label="Y位置">
                <avue-input-number v-model="activeObj.top" @change="posChange" @focus="ifInput=true" @blur="ifInput=false"></avue-input-number>
              </el-form-item>
              <el-form-item label="宽度">
                <avue-input-number v-model="activeComponent.width"></avue-input-number>
              </el-form-item>
              <el-form-item label="高度">
                <avue-input-number v-model="activeComponent.height"></avue-input-number>
              </el-form-item>
              <el-form-item label="镜像">
                <el-button @click="$refs.container.toMirror('left')">左右</el-button>
                <el-button @click="$refs.container.toMirror('top')">上下</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
		  <el-tab-pane name="4"
		               v-if="isActive&&activeList.length>=2&&!navConfigure">
		    <el-tooltip slot="label"
		                effect="dark"
		                content="参数"
		                placement="top">
		      <div><i class="el-icon-folder"></i></div>
		    </el-tooltip>
		    <el-form label-width="120px"
		             label-position="left"
		             size="mini">
		      <el-form-item label="X位置">
		        <avue-input-number v-model="activeObjS.left" @focus="ifInput=true" @blur="ifInput=false"></avue-input-number>
		      </el-form-item>
		      <el-form-item label="Y位置">
		        <avue-input-number v-model="activeObjS.top" @focus="ifInput=true" @blur="ifInput=false"></avue-input-number>
		      </el-form-item>
		    </el-form>
		  </el-tab-pane>
          <!-- 交互事件 -->
          <el-tab-pane name="5" v-if="vaildProp('interactEventList')&&!navConfigure">
            <el-tooltip slot="label"
                        effect="dark"
                        content="交互事件"
                        placement="top">
              <div><i class="el-icon-thumb"></i></div>
            </el-tooltip>
            <el-form label-width="120px"
                     label-position="left"
                     size="mini">
              <div v-for="(item,index) in activeObj.option.interact" :key="index">
                  <el-form-item label="事件">
                    <avue-select v-model="item.event" placeholder="请选择" type="tree" :dic="dicOption.interactList"></avue-select>
                  </el-form-item>
                  <el-form-item label="动作">
                    <avue-select v-model="item.action" placeholder="请选择" type="tree" :dic="dicOption.eventTypeList"></avue-select>
                  </el-form-item>
                  <block v-if="item.action=='popup'">
                      <el-form-item label="弹窗高度">
                        <el-input v-model="item.popupH"></el-input>
                      </el-form-item>
                      <el-form-item label="弹窗宽度">
                        <el-input v-model="item.popupW"></el-input>
                      </el-form-item>
                      <el-form-item label="弹窗链接">
                        <el-input v-model="item.popupLink"></el-input>
                      </el-form-item>
                  </block>
                  <block  v-if="item.action=='fc'">
                      <el-form-item label="浮窗链接">
                        <el-input v-model="item.fcLink"></el-input>
                      </el-form-item>
                  </block>
                  <block v-if="item.action=='title'">
                      <el-form-item label="提示文字">
                        <el-input v-model="item.titleWord"></el-input>
                      </el-form-item>
                  </block>
                  <block v-if="item.action=='link'">
                      <el-form-item label="打开方式">
                        <avue-radio v-model="item.linkTarget"
                                    :dic="dicOption.target">
                        </avue-radio>
                      </el-form-item>
                      <el-form-item label="链接方式">
                        <avue-radio v-model="item.linkType"
                                    :dic="dicOption.linkOption">
                        </avue-radio>
                      </el-form-item>
                      <el-form-item label="外部链接" v-if="item.linkType==1">
                        <avue-input v-model="item.linkHref"></avue-input>
                      </el-form-item>
                      <el-form-item label="内部链接" v-if="item.linkType==2">
                        <el-select v-model="item.linkValue1" filterable>
                          <el-option
                            v-for="(cItem,cIndex) in options1"
                            :key="cItem.categoryValue"
                            :label="cItem.categoryKey"
                            :value="cItem.categoryValue"
                            @click.native ="handleSelect(item,cIndex)">
                          </el-option>
                        </el-select>
                        <el-select v-model="item.linkValue2" filterable>
                          <el-option
                            v-for="(cItem,cIndex) in options1[item.selectIndex?item.selectIndex:0].visuals"
                            :key="cItem.id"
                            :label="cItem.title"
                            :value="cItem.id"
                            @click.native ="handleSelect2(item)">
                          </el-option>
                        </el-select>
                      </el-form-item>
                  </block>
                  <el-form-item label="">
                    <span @click="delInteract(index)" style="cursor: pointer;">删除此项</span>
                  </el-form-item>
                  <div style="width: 100%;height: 1px;margin: 10px 0;background: #fff;"></div>
              </div>
              <el-form-item label-width="0">
                <el-button type="primary"
                           size="mini"
                           class="block"
                           @click="addInteract">新增交互</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 导航布局配置 -->
          <el-tab-pane name="6" v-if="navConfigure && (layoutObj.navType == 'left' || layoutObj.navType == 'topALeft')">
              <el-tooltip slot="label" effect="dark" content="左导航" placement="top">
                <div>左导航</div>
              </el-tooltip>
              <el-form label-width="120px" label-position="left" size="mini">
                <el-collapse accordion>
                    <el-collapse-item title="导航背景样式">
                        <el-form-item label="导航宽度">
                          <el-input v-model="layoutObj.width"></el-input>
                        </el-form-item>
                        <el-form-item label="导航背景颜色">
                          <avue-input-color v-model="layoutObj.navBg"></avue-input-color>
                        </el-form-item>
                    </el-collapse-item>
                    <el-collapse-item title="菜单样式">
                        <el-form-item label="字体">
                          <avue-radio v-model="layoutObj.fontFamily"
                                      :dic="dicOption.fontFamily">
                          </avue-radio>
                        </el-form-item>
                        <el-form-item label="文字默认颜色">
                          <avue-input-color v-model="layoutObj.color"></avue-input-color>
                        </el-form-item>
                        <el-form-item label="文字选中颜色">
                          <avue-input-color v-model="layoutObj.colorSelect"></avue-input-color>
                        </el-form-item>
                        <el-form-item label="子菜单背景色">
                          <avue-input-color v-model="layoutObj.cmenuBg"></avue-input-color>
                        </el-form-item>
                        <el-form-item label="菜单hover颜色">
                          <avue-input-color v-model="layoutObj.menuColorHover"></avue-input-color>
                        </el-form-item>
                        <el-form-item label="菜单选中颜色">
                          <avue-input-color v-model="layoutObj.menuColorSelect"></avue-input-color>
                        </el-form-item>
                    </el-collapse-item>
                </el-collapse>
              </el-form>
          </el-tab-pane>
          <el-tab-pane name="7" v-if="navConfigure && (layoutObj.navType == 'top' || layoutObj.navType == 'topALeft')">
              <el-tooltip slot="label" effect="dark" content="顶部栏" placement="top">
                <div>顶部栏</div>
              </el-tooltip>
              <el-form label-width="120px" label-position="left" size="mini">
                <el-collapse accordion>
                    <el-collapse-item title="顶部栏背景样式">
                        <el-form-item label="顶部栏高度">
                          <el-input v-model="layoutObj.height"></el-input>
                        </el-form-item>
                        <el-form-item label="顶部栏背景颜色">
                          <avue-input-color v-model="layoutObj.topBg"></avue-input-color>
                        </el-form-item>
                    </el-collapse-item>
                    <el-collapse-item title="logo">
                        <el-form-item label="图片地址">
                            <img v-if="layoutObj.logo" :src="layoutObj.logo" width="100%" />
                            <el-input v-model="layoutObj.logo">
                              <div @click="handleOpenImg('layoutObj.logo')" slot="append">
                                <i class="iconfont icon-img"></i>
                              </div>
                            </el-input>
                        </el-form-item>
                    </el-collapse-item>
                    <el-collapse-item title="应用名称">
                        <el-form-item label="字体">
                          <avue-radio v-model="layoutObj.topFontFamily"
                                      :dic="dicOption.fontFamily">
                          </avue-radio>
                        </el-form-item>
                        <el-form-item label="文字颜色">
                          <avue-input-color v-model="layoutObj.topColor"></avue-input-color>
                        </el-form-item>
                    </el-collapse-item>
                </el-collapse>
              </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <codeedit @submit="codeClose"  :type="code.type"  v-model="code.obj"   :visible.sync="code.box"></codeedit>
    <contentmenu ref="contentmenu"></contentmenu>
    <el-dialog append-to-body   title="返回数据"  :visible.sync="show"    width="60%">
      <el-form size="small">
        <div v-show="isSql">
          <el-form-item label="数据源选择">
            <avue-select :dic="DIC.sql"   v-model="db"></avue-select>
          </el-form-item>
          <el-form-item label="SQL语句"  label-position="top">
            <monaco-editor v-model="sql"  language="sql"  height="100"></monaco-editor>
          </el-form-item>
        </div>
        <div v-show="isApi">
          <el-form-item label="接口地址">
            <avue-input v-model="activeObj.url"></avue-input>
          </el-form-item>
          <el-form-item label="接口方式">
            <avue-radio v-model="activeObj.dataMethod"
                        :dic="dicOption.dataMethod">
            </avue-radio>
          </el-form-item>
          <el-form-item label="接口参数">
            <el-button size="mini"
                       type="primary"
                       @click="openCode('dataQuery')">编辑</el-button>
          </el-form-item>
        </div>
        <el-form-item label="响应数据"   label-position="top">
          <monaco-editor v-model="dataRes"
                         disabled
                         height="200"></monaco-editor>
        </el-form-item>
        <el-form-item label-width="0">
          <el-row>
            <el-col span="12">
              <el-button size="mini"
                         type="danger"
                         class="block"
                         @click="openCode('dataFormatter')">数据处理</el-button>
            </el-col>
            <el-col span="12">
              <el-button size="mini"
                         type="primary"
                         class="block"
                         @click="handleRes">刷新数据</el-button>
            </el-col>
          </el-row>

        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>

import MonacoEditor from '@/page/components/editor'
import layer from './group/layer';
import top from './group/top';
import imglist from './group/imglist'
import contentmenu from './group/contentmenu'
import codeedit from './group/code';
import { dicOption } from '@/option/config'
import init from '@/mixins/'
import { uuid } from '@/utils/utils'
import components from '@/option/components'
import SketchRule from "vue-sketch-ruler";
import { getList } from "@/api/db";
import crypto from '@/utils/crypto'
import {getAllData,getCategoryAll,getVisualApp,getObj,updateVisualApp} from '@/api/visual'
import select from "@/assets/select.png"
import unselect from "@/assets/unselect.png"
export default {
  mixins: [init, components],
  data () {
    return {
        select,
        unselect,
        ifmoseDown:false,
        currentIndex:0,//轮播图图片索引
      show: false,
      keys: {
        ctrl: false,
      },
      dataRes: '',
      db: '',
      sql: '',
      nav: [],
      json: {},
      DIC: {
        sql: [],
      },
      loading: '',
      childProps: {
        label: 'name',
        value: 'index'
      },
      key: '',
      menuFlag: true,
      menuFlag2 : true, //多边形，折线使用
      inputPosChange:'',//null初始值 'input'通过输入框改变组件的坐标 'move'通过移动更改坐标
        ifInput:false,
      code: {
        box: false,
        type: '',
        obj: '',
      },
      form: {},
      dicOption: dicOption,
      tabsActive: 0,
      // 标尺
      scale: 0.9, //初始化标尺的缩放
      startX: 0, //x轴标尺开始的坐标数值
      startY: 0,
      lines: {   //初始化水平标尺上的参考线
        h: [],
        v: []
      },
      rendIndex: 0,//重新渲染组件
      shadow: { x: 0, y: 0 }, // 阴影大小
      thick: 20,  //标尺的厚度
      width: 0,  // 标尺宽,后面会初始化
      height: 0,// 标尺高,后面会初始化
      isShowReferLine: true, // 显示参考线
      isImgOpen: true, //眼镜打开
      imgOpenData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAbCAYAAAAOEM1uAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAQNSURBVHja7JdvSON1HMdfP126/shSmaZ1ntuZbTLihOnSdJlPhIquB0VR1DZM9En0wCB3qCXKVOh86mmakdGDOqyHityBidYN1HPYZqbhOZprMGTOUk/9/XryWyxvek5NIu4Lg/H+fPj8Xt/P98/n8xUkSeK/PIT7gP8GoCAI8cTQAoWAHkgFRCAA3AKmgeBRA8VkOSZgMvAy8DZQCqQf4OcFRoDPgYmzAnwdaAAuxpFlCbgGfAR4ThUwYhcE4QngExnw71FWVuax2WwBk8mkSE9PV+7t7Ymrq6vbw8PD0uDgYO7CwsK5KPc14ENJkj497FtxAwqCYAK+kvcbANXV1U6Hw6HIyMh4GlAckJHwzMzMrM1my3a5XNoo01XgPUmSdk8MCLwEfAmoAPLz872jo6OrOTk5xVGBQ0tLS575+fnt7OzsRIPBcD4pKelctL2/v3+mtrbWLIpigixfA94BNk8C+JoMlyRn7WZvb68mISEhI+IQCASmKyoq0jweT25EU6lU4aGhoZnKykpzdNzl5eWbRqPxyWAwmCZL3wJvAHeOA/iCPMsHARwOx7jdbi+JXs7t7e3lrKys1LW1NVWsJXa73ZN6vb40WltfX3cbDIZ0r9ebKUv9wLvxAhYC1+V7je7u7rG6urrn9vu1tbWNNzU1lR90KgsLC5emp6cfB5TRejgc9mg0msyoTNYDXfEAjgFmQGxpaZlobm6OBbFrMpl+dTqd+YdcLztbW1ve5ORk7X6D3++f0ul0+aFQKAXYAF6RJOn6UQGDQBrgE0VRJQjCw7EAjUbj8tTUVN4hgLubm5u3lUrlhVjG+vr6ya6ursgWaJck6fJRAW8AzwNia2vrRGNjY8xltNvtEx0dHc8eRKfX62+73W418NB+m8/nm9LpdE+Fw+FHgD+AS/Fk8CJwI7IHe3t7x2pqau7agxsbG/NqtTp3a2tLGQtwcnJyvKSk5K7JhcPhnzQaTXYwGEyVpQ+AK8c5xd9EZt/e3v59Q0ND6f5LeXFx8cfy8vILfr9fHdEUCsVOX1/fhMViqdgfOxQKzRUUFKh9Pt+JTnHk76vyPZgcqR49PT3nExMTM/+x0XZ3fePj47/Mzc2RlZVFVVVVRkpKin5/3JWVFWdRUVFeIBCInN7v5NJ55ySV5EUZ8lEArVb728jIiDcvL++ZONqo0MDAwK2ampoyURQTZXlI7ob+PI1aXAR8AegiutVqdXZ2dt6zFs/OzrosFstjLpcr+iR3A+9LkrRzKs2CrGUCV4C3on3NZrPHarX+Xlxc/MARu5nLkiRdPbVuJsa4BDQCxjj6QRH4GvgY+PksOmqF3FG/KVcc9T066s+AH86y5Y8eOXI282XQyJtkRv6d/pvk/rPz/wT41wBibRrpeMs+PAAAAABJRU5ErkJggg==', // 左上角图片
      imgClose: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAPYSURBVHja7JVPTFRXFIe/+96gGRHEhQzBFMJKSKSkLTgtGxemSXcktohW2RBmTAjUClIYZ6Cxi+fQDgOCLJgJhqTSBAtLdjaxaSqQWnDSNp2U0I6FFh0SDdV0oMx7pwuZCUXjnyZNuvBsbnLvufe7555zfleJCP+1qReQfwVRSqWmqoFDIE3A+iZXQDbGlMmmNTatP5xPn/0ohOOgLgNtIB8DOlAKvAzsBTKBP4FF4Dvge1DrzwsBaAAuAJ8CxbpuezU/P397QcFLZGVlcf/+fRYXF1lc/G3VNJM/AJ8Dw8CdZ4QoQI4AIWBXaWkpQ0ND5v79+zW73Z5+n9XVVWZnb8rExIQ2MnKZWCz2M/Dhw1d4eiTngXafz2dmZ2ebPp9P6+vrl5qaI2p8fFyi0aheUlJiHj78tpaTs0sHJB6PW4HAJ3og0I2I+AHPkyAeu91uDA4OmrW1tRpAT09vsr29XXM4ciWZTJKXl2ctLCyoHTsy1ZUro+J0OjNSWR8ZGbFcLpeeSCTOAucfBykDpvr7+7c3NjamS+bevXvJ4uIS4vE7tra2tjW/32+7ffu21Ne7rJmZb7VIJKL27Nmjp0ADAwM0NjauAW+IyM2tkAGn8/WG69e/NjVNS20iHA6vd3Z2qrq6OtMwDFswGLROnz6dcffu3WRRUZEVCARwuVzbUv6WZVmVlZXa9PT0RRFp2gq56na7Dw0ODv6jGc6cOWNdu/Zl8saNb/RgMGi1tLSo7u5uaW5u1srLK8yDBw/aursD2ubmcbtPqnA4dFVE3twKuVBeXv7e5OSkabPZ0pGEQuG/WltbicV+0Xbv3m0LBnvWW1qatbNnvclLl4b0c+c+ErfblcoLa2trptPp1CORSEBEWrdCSoBpwzB2ejyedE6Wl5fNsrIyqaiokFAopBwOh/J4PKbf79/mcDiS0WiUnJwcWyoKr9erDMNYBg6ISOxx1dWg6/pAb2+vtZF8DWBqanr96NEalUgkpKCgQJaWljRN04jH43R1dcmpU6dsgBiGobxer3qoGnz2pD5pBfx1dXWaz+czi4qKNECtrKyYY2NjVjQa1fftK7aqq99hdHRUmpqaVEdHhzU/P58xPDycAN4Hws8iK28B/tzc3LJjx96lqqrKOnCggszMzLRmPHjwQM3MzFj19fX63NwcwDJQBUymK+ApEEDtBDkOnFBKvZafv9deWFhIdnYWKysr3Lr1K0tLvydE5CvgJ1AnQZqBi88DSV1aA0qAV4CCDRX+A1gAZoEfN/w/ALqAEyAjzwvZ8mc8KukblgGqD/gCZOyxkBd//P8G8vcAMK383pmr7aEAAAAASUVORK5CYII=',
      dragSlide: false,  // 拖动滚动条标记
	  minCoordinate: {
		left: null,
		top: null
	  },
	  activeObjS: {
		left: '',
		top: ''
	  },
      options1: [],
      navTypeList: [{
          type: 'blank',
          name: '空白'
      }, {
          type: 'top',
          name: '顶部栏'
      }, {
          type: 'left',
          name: '左导航'
      }, {
          type: 'topALeft',
          name: '顶部栏+左导航'
      }], //导航布局列表
      pageList: [], //页面列表
      pageId: '1', //默认页面选中id
      layoutObj: {
        navType: 'blank',
        width: 200,
        navBg: '#205520',
        fontFamily: '微软雅黑',
        color: '#FFFFFF',
        colorSelect: '#FFFFFF',
        cmenuBg: '#242424',
        menuColorHover: '#0066FF',
        menuColorSelect: '#0066FF',
        height: 48,
        topBg: '#FFFFFF',
        logo: '',
        topFontFamily: '微软雅黑',
        topColor: '#333333',
      }, //导航布局配置对象
      navConfigure: false, //是否导航布局配置
    }
  },
  components: {
    MonacoEditor,
    imglist,
    layer,
    codeedit,
    top,
    contentmenu,
    SketchRule
  },
  computed: {
	isKeysCtrl () {
	  return this.keys.ctrl == true
	},
    isStatic () {
      return this.activeObj.dataType == 0
    },
    isApi () {
      return this.activeObj.dataType == 1
    },
    isSql () {
      return this.activeObj.dataType == 2
    },
    isMqtt () {
      return this.activeObj.dataType == 3
    },
    isFolder () {
      return this.activeObj.children
    },
    isActive () {
      return this.active.length !== 0
    },
    isSelectActive () {
      return this.active.length > 1;
    },
    childList () {
      return this.list.filter(ele => {
        if (['tabs'].includes(ele.component.prop)) {
          return false;
        }
        return true;
      })
    },
    activeComponent () {
      return this.activeObj.component || {}
    },
    activeOption () {
      return this.activeObj.option || {}
    },
    activeObj () {
	  // if (this.validatenull(this.activeIndex)) return {}
	  // let item = this.findlist(this.activeIndex);
	  // if (!item.child) item.child = {}
	  // return item
	  let result
		if (this.validatenull(this.active)) {
		  return {}
		}
		this.active.forEach(ele => {
        const item = this.findnav(ele, true);
		  if (this.active.length > 1) {
			if (!result) result = [];
			result.push(item.obj);
		  } else {
			result = item.obj
		  }
		})
        return result
    },
	activeList () {
	  let result = []
	  this.active.forEach(ele => {
	    const item = this.findnav(ele, true);
	    result.push(item.obj);
	  })
	  return result
	},
    /* 标尺用的 */
    palette () {
      return {
        bgColor: '#181b24', // ruler bg color
        longfgColor: '#BABBBC', // ruler longer mark color
        shortfgColor: '#9C9C9C', // ruler shorter mark color
        fontColor: '#DEDEDE', // ruler font color
        shadowColor: '#525252', // ruler shadow color
        lineColor: '#EB5648',
        borderColor: '#B5B5B5',
        cornerActiveColor: '#fff',
      }
    },
    // 画布大小,一定要是computer里面,否则缩放页面会失效
    canvasStyle () {
      return {
        width: window.innerWidth - 530 + 'px',
        transform: `scale(${this.scale})`
      }
    },
  },
  watch: {
	isStatic:{
	  handler () {
		  if (this.isStatic) {
			  this.openCode('data',1)
		  }
	  },
	  immediate: true
	},
    activeObj: {
      handler () {
        if (this.activeObj.sql && this.isSql) {
          let mode = JSON.parse(crypto.decrypt(this.activeObj.sql));
          this.db = mode.id;
          this.sql = mode.sql;
        } else {
          this.db = '';
          this.sql = '';
        }
      },
      deep: true
    },
	activeObjS: {
		handler () {
		  if(this.ifInput) {
			this.inputPosChange = 'moveAll'
		  }
		  let left = this.activeObjS.left - this.minCoordinate.left
		  let top = this.activeObjS.top - this.minCoordinate.top
		  this.activeList.forEach(item => {
			this.setMove(item,left,top)
		  })
		  setTimeout(()=>{
			this.minCoordinate = JSON.parse(JSON.stringify(this.activeObjS))
			this.inputPosChange = ''
		  },100)
		},
		deep: true
	},
    menuFlag () {
      this.setResize();
    },
    overactive (n, o) {
      [o, n].forEach((ele, index) => {
        if (!ele) return
        this.setActive(ele, index === 1, 'setOverActive');
      })
    },
    active (n, o) {
      [o, n].forEach((ele, index) => {
        ele.forEach(item => {
          this.setActive(item, index === 1, 'setActive');
        })
      })
      //隐藏右键菜单
      this.$refs.contentmenu.hide();
      // 初始化选项卡
      this.tabsActive = '0';
    },
    nav:{
        handler() {
            if(this.activeList.length>1) {
            	this.minCoordinate = {
            		left: null,
            		top: null
            	}
            	this.activeList.forEach(item => {
            		this.getMin(item)
            	})
            	this.$set(this.activeObjS,'left',this.minCoordinate.left)
            	this.$set(this.activeObjS,'top',this.minCoordinate.top)
            }
        },
        deep: true
    }
  },
  created () {
    // this.listen();
    this.iniresize()
    this.initSqlList();
    this.getSiteData();
    setInterval(this.getSiteData, 10000);
  },
  mounted () {
    document.addEventListener('keyup',this.keyUp)
    document.addEventListener('keydown',this.keyDown)
    document.addEventListener('mouseup',this.mouseup2)
    this.initFun()
    getCategoryAll().then(res => {
    	res.data.data.forEach((item,index) => {
    		this.options1.push(item)
    	})
    })
    // this.$route.params.id
    getVisualApp('1501470310035066881').then(res => {
        this.layoutObj = JSON.parse(res.data.data.layout)
        this.pageList = res.data.data.visuals
        this.pageId = this.pageList[0].id
        getObj(this.pageId).then(res => {
            this.nav = JSON.parse(res.data.data.config.component) || []
            this.config = JSON.parse(res.data.data.config.detail) || {};
        })
    })
    this.$nextTick(() => {
      this.initSize()
    })
  },
  methods: {

      mouseup2(){
          console.log('鼠标抬起',this.ifBack)
        if(this.ifBack){ //撤销的不用监听
            this.ifBack = false
        }else { //非撤销的，多个组件拖动手松开鼠标调监听函数
            this.recordMain(this.nav,null,true)
        }
      },
      posChange(){
          if(this.ifInput){ //有焦点再触发下面的，不然在切换组件时由于x.y发生变化就会触发
              if(!this.inputPosChange){
                  this.inputPosChange = 'input'
              }
          }
          if(this.inputPosChange === 'move'){ //通过拖动更改坐标值导致发生位置的，更改后把值改成初始值，不然会无限循环
              this.inputPosChange = ''
          }
      },
      updVal(){
          this.$forceUpdate();
      },
      imgDelt(index){
        this.code.obj.splice(index,1)
      },
      imgAdd(){

          this.code.obj.push({
              value:'',
          })
      },
    delBackImg(){
      this.config.backgroundImage = null
    },


    //请求数据存入浏览器缓存中
    getSiteData(){
      getAllData().then(res=>{
        res.data.data.map(i=>{
          localStorage.setItem(i.name,i.value)
        })
      })
    },
    handleRefresh () {
      return this.$refs.container.handleRefresh();
    },
    handleRes () {
      if (this.isSql) {
        this.$set(this.activeObj, 'sql', crypto.encrypt(JSON.stringify({
          id: this.db,
          sql: this.sql
        })))
      }
      this.handleRefresh().then(res => {
        if (!this.validatenull(res)) {
          this.dataRes = JSON.stringify(res || {}, null, 4);
        } else {
          this.dataRes = '';
        }
        this.$message.success('数据刷新成功')

      })
    },
    handleSql () {
      this.show = true;
      this.dataRes = '';
      this.$nextTick(() => {
        let result = false
        if (this.isSql && !this.validatenull(this.sql)) {
          result = true;
        } else if (this.isApi && !this.validatenull(this.activeObj.url)) {
          result = true;
        } else {
          result = true;
        }
        if (result) this.handleRes()
      })
    },
    initSqlList () {
      getList(1, 100).then(res => {
        const data = res.data.data;
        this.DIC.sql = data.records.map(ele => {
          return {
            label: ele.name,
            value: ele.id
          }
        })
      });
    },
    codeClose (value) {
      if (this.code.type === 'query') {
        this.config.query = value;
      } else {
        this.activeObj[this.code.type] = value;
      }
    },
    openCode (type,ifOpen) {
      this.code.type = type;
      if (type === 'query') {
        this.code.obj = this.config.query;
      } else {
        this.code.obj = this.activeObj[type];
      }
      this.code.box = !ifOpen;
    },
    initFun () {
      ['setScale', 'setResize'].forEach(ele => {
        this[ele] = this.$refs.container[ele]
      });
      ['handleAdd'].forEach(ele => {
        this[ele] = this.$refs.top[ele]
      })
    },
    // 右键菜单
    handleContextMenu (e, item = {},isPartContextMenu) {
      if (!item.index || this.isKeysCtrl) {
        return
      }
      if (!this.isSelectActive) {
        this.active = [item.index];
		this.activeIndex = item.index;
      } 
	  if(isPartContextMenu===false) {
		this.active = [item.index];
	  }
	  this.$nextTick(() => this.$refs.contentmenu.show(e.clientX, e.clientY,isPartContextMenu))
    },
      keyUp(){
          // console.log('键盘抬起')
          this.keys.ctrl = false;

      },
      keyDown(e){
          // console.log('键盘按下')
          this.keys.ctrl = e.keyCode === 17;

          if (e.target.nodeName == 'TEXTAREA' || e.target.nodeName == 'INPUT') {
              // console.log('输入框')
              return;
          }
          // 按下空格键
          if (e.keyCode == 32) {
              e.preventDefault();
              this.keys.space = true
          }
          // 如果是delete按键,那么调用删除组件按钮
          if (e.keyCode === 46) {
              this.deleteMethod()
          }
          if (e.keyCode === 90) {
              this.editorUndo();
          }
          if (e.keyCode === 89) {
              this.editorRedo();
          }
      },
    //监听键盘的按键
    listen () {
        // console.log('listen')
      // document.onkeydown = (e) => {
      //   console.log('键盘按下')
      //   this.keys.ctrl = e.keyCode === 17;
      //
      //   if (e.target.nodeName == 'TEXTAREA' || e.target.nodeName == 'INPUT') {
      //       console.log('输入框')
      //     return;
      //   }
      //   // 按下空格键
      //   if (e.keyCode == 32) {
      //     e.preventDefault();
      //     this.keys.space = true
      //   }
      //   // 如果是delete按键,那么调用删除组件按钮
      //   if (e.keyCode === 46) {
      //     this.deleteMethod()
      //   }
      //   if (e.keyCode === 90) {
      //     this.editorUndo();
      //   }
      //   if (e.keyCode === 89) {
      //     this.editorRedo();
      //   }
      // }
      document.onkeyup = () => {
            console.log('键盘抬起')
        this.keys.ctrl = false;
      }
    },
    deleteMethod () {
      const params = this.findnav(this.active[0], true);
      this.active.forEach(ele => {
        const item = this.findnav(ele, true);
        if (Array.isArray(params.parent)) {
          params.parent.splice(item.count, 1);
        } else {
          params.parent.children.splice(item.count, 1);
        }
      });
      this.handleInitActive()
    },
    setActive (val, result, fun) {
      const obj = this.$refs.container.handleGetObj(val);
      if (!this.validatenull(obj)) obj[0][fun](result)
    },
    //批量成组
    handleFloder () {
      let floder = {
        "title": "组",
        "name": "组",
        "index": uuid(),
        "children": []
      }
      this.active.forEach(index => {
        const params = this.findnav(index);
        floder.children.push(params.obj);
        delete params.parent.splice(params.count, 1);
      })
      this.nav.unshift(floder);
      this.handleInitActive();
    },
    //批量删除
    handleDeleteSelect () {
      this.$confirm(`是否批量删除所选图层?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteMethod()
      })
    },
    vaildProp (name, list) {
      if (list) {
        return list.includes(this.activeComponent.prop)
      }
      return this.dicOption[name].includes(this.activeComponent.prop)
    },
    formatTooltip (val) {
      return parseInt(val);
    },
    //打开图库
    handleOpenImg (item, type,index) {
      this.currentIndex = index
      this.$refs.imglist.openImg(item, type);
    },
    //图库框回调赋值
    handleSetimg (val, type) {
        console.log(type)
      if (type === 'activeObj.data') {
        this.activeObj.data = val;
      } if (type === 'activeObj.data.value') {
        this.activeObj.data.value = val;
      } else if (type === 'activeOption.backgroundImage') {
        this.activeOption.backgroundImage = val;
      } else if (type === 'activeOption.backgroundBorder') {
        this.activeOption.backgroundBorder = val;
      } else if (type === 'activeOption.empBackgroundBorder') {
        this.activeOption.empBackgroundBorder = val;
      } else if (type === 'config.backgroundImage') {
        this.config.backgroundImage = val;
      } else if (type === 'activeOption.symbol') {
        this.activeOption.symbol = val;
      } else if (type === 'activeOption.imgUrl'){
        this.activeOption.imgUrl = val;
        this.activeObj.data.value = val;
      } else if (type === 'config.staticImgList'){
        this.code.obj[this.currentIndex].value = val
      } else if (type === 'layoutObj.logo'){
        this.$set(this.layoutObj,'logo',val)
      }
    },
    /* **************************标尺方法开始******************************* */
    // 滚轮触发
    handleScroll () {
      const screensRect = this.$refs.screensRef.getBoundingClientRect();
      const canvasRect = this.$refs.canvas.getBoundingClientRect();
      // 标尺开始的刻度
      const startX = (screensRect.left + this.thick - canvasRect.left) / this.scale;
      const startY = (screensRect.top + this.thick - canvasRect.top) / this.scale;
      this.startX = startX >> 0;
      this.startY = startY >> 0;
    },
    // 控制缩放值
    handleWheel (e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const nextScale = parseFloat(
          Math.max(0.2, this.scale - e.deltaY / 500).toFixed(2)
        );
        this.scale = nextScale;
      }
      this.$nextTick(() => {
        this.handleScroll();
      });
    },
    // 初始化标尺数值
    initSize () {
      const domW = this.$refs.wrapper
      let width = window.innerWidth - 530
      let height = window.innerHeight - 45
      domW.style.width = width + 'px'
      domW.style.height = height + 'px'
      this.width = width - this.thick;
      this.height = height - this.thick;
      // 画布阴影部分
      this.shadow = { x: 0, y: 0, width, height }
      // 滚动居中
      let dom = this.$refs.containerRef.getBoundingClientRect()
      this.$refs.screensRef.scrollLeft = dom.width / 2 - this.thick;
      this.$refs.screensRef.scrollTop = dom.height / 2 - this.thick;
    },
    // resize
    iniresize () {
      window.addEventListener('resize', () => {
        let width = this.width
        let height = this.height
        this.initSize();
        let rate = Math.min(this.width / width, this.height / height)
        this.scale = rate > 1 ? rate * 0.5 : rate
        this.rendIndex++
      })
    },
    // 图片点击事件
    imgClick () {
      this.isShowReferLine = !this.isShowReferLine
    },
    // 鼠标按下事件
     dragMousedown (e) {
      this.navConfigure = false
      this.tabsActive = '0';
      // 如果按下了空格键,且按下鼠标左键,那么鼠标变抓手,开启滚动条随鼠标拖动的操作
	  this.handleInitActive()
      if (this.keys.space) {
        this.dragSlide = true
        window.stardragEvent = e
        window.startSlideX = this.$refs.screensRef.scrollLeft
        window.startSlideY = this.$refs.screensRef.scrollTop
      }
    },
    //鼠标抬起操作
    dragMouseup () {
      this.dragSlide = false
    },
    // 鼠标移动骚操作
    dragMousemove (e) {
      if (this.dragSlide) {
        let x = e.clientX - window.stardragEvent.clientX
        let y = e.clientY - window.stardragEvent.clientY
        this.$refs.screensRef.scrollLeft = window.startSlideX - x
        this.$refs.screensRef.scrollTop = window.startSlideY - y
      }
    },
	selectNav (item) {
        this.navConfigure = false
        if(this.isKeysCtrl){//ctrl
            if (Array.isArray(item)) { //数组
                item.forEach(v=>{
                    if(this.active.findIndex(v2=>v2==v)==-1){ //没有重复的添加进去
                        this.active.push(v)
                    }
                })
            } else if (!this.active.includes(item)){ //没有重复的添加进去
                  this.active.push(item)
            }else {
               let list = JSON.parse(JSON.stringify(this.active))
                this.active = []
                let i = list.findIndex(v2=>v2==item)
                list.splice(i,1)
                this.active = list
                this.activeIndex = this.active[0];
            }
        }else {
            if (Array.isArray(item)) {
                this.active = item
            } else if(!this.active.includes(item)){ //没有多选时点击则只选中当前
                this.active = [item];
                this.activeIndex = item;
            }
        }
		if(this.activeList.length>1) {
			this.minCoordinate = {
				left: null,
				top: null
			}
			this.activeList.forEach(item => {
				this.getMin(item)
			})
			this.$set(this.activeObjS,'left',this.minCoordinate.left)
			this.$set(this.activeObjS,'top',this.minCoordinate.top)
		}
	},
	getMin(item) {
        if(!item){
            return
        }
		if(item.children) {
			item.children.forEach(cItem => {
				this.getMin(cItem)
			})
		} else {
			if(this.minCoordinate.left==null) {
				this.minCoordinate = {
					left: item.left,
					top: item.top
				}
			}
			if(this.minCoordinate.left>item.left) this.minCoordinate.left = item.left
			if(this.minCoordinate.top>item.top) this.minCoordinate.top = item.top
		}
	},
	setMove(item,left,top) {
		if(item.children) {
			item.children.forEach(cItem => {
				this.setMove(cItem)
			})
		} else {
			this.$set(item,'left',Number(item.left)+Number(left))
			this.$set(item,'top',Number(item.top)+Number(top))
		}
	},
	changeX(e) {
		console.log(e)
	},
    addInteract() {
        let obj = {
            event: '',
            action: ''
        }
        if(this.activeObj.option.interact) {
            this.activeObj.option.interact.push(obj)
        } else {
            this.$set(this.activeObj.option,'interact',[])
            this.activeObj.option.interact.push(obj)
            console.log(this.activeObj.option)
        }
    },
    delInteract(index) {
        this.activeObj.option.interact.splice(index,1)
    },
    // 跳转链接选择
    handleSelect(item,index) {
        this.$set(item,'selectIndex',index)
    },
    handleSelect2(item) {
        this.$set(item,'linkHref',window.location.origin + '/view/'+ item.linkValue2)
    },
    addPage() {
        this.navConfigure = false
    },
    selectLayout(item) {
        this.navConfigure = true
        if(item=='left'||item=='topALeft') {
            this.tabsActive = '6';
        } else if(item=='top') {
            this.tabsActive = '7';
        }
        this.$set(this.layoutObj,'navType',item)
        // let data = {
        //     id: '1501470310035066881',
        //     layout: JSON.stringify(this.layoutObj)
        // }
        // updateVisualApp(data)
    },
    choosePage(id) {
        this.navConfigure = false
        this.pageId = id
        this.tabsActive = '0'
        getObj(id).then(res => {
            this.nav = JSON.parse(res.data.data.config.component) || []
            this.config = JSON.parse(res.data.data.config.detail) || {};
        })
    },
    hangeChangeName(item) {
    	this.$set(item, 'isname', !item.isname)
    },
    configure() {
        this.navConfigure = true
        if(this.layoutObj.navType=='left'||this.layoutObj.navType=='topALeft') {
            this.tabsActive = '6';
        } else if(this.layoutObj.navType=='top') {
            this.tabsActive = '7';
        }
    }
  }
}
</script>
<style lang="scss" scoped>
  .staticImgList{
    padding-right: 10px;
    p{
      margin-bottom: 10px;
      position: relative;
      i{
        position: absolute;
        top:-5px;
        right: -5px;
        cursor: pointer;
      }
      img{
        width: 100%;
        height: 100px;
      }
    }
  }

</style>
<style lang="scss">
@import "../styles/style.scss";
.refer-line-img {
  position: absolute;
  left: 0;
  z-index: 5;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
  }
}
#screens {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.screen-container {
  position: relative;
  width: 5000px;
  height: 3000px;
  background: url(https://img.alicdn.com/tfs/TB184VLcPfguuRjSspkXXXchpXa-14-14.png)
    repeat;
}

.dragghanle {
  cursor: pointer;
}
.canvas {
  position: absolute;
  top: 50%;
  left: 50%;
}

.collapse-self {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 10px;
    box-sizing: border-box;
}
.nav-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 0 0;
    .nav-item {
        width: 45%;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        margin-bottom: 10px;
        .nav-top {
            width: 60px;
            height: 50px;
            background-color: #fff;
            margin-bottom: 10px;
            position: relative;
            border: 1px solid #ebebeb;
            .nav-inset {
                position: absolute;
                background-color: #e0f1ff;
            }
        }
    }
}
.nav-configure {
    width: 90%;
    margin: 0 auto 10px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #333;
    background-color: #fafafa;
    border: 1px solid #dedede;
    box-sizing: border-box;
    cursor: pointer;
}
</style>
