<!-- 表格配置 -->
<template>
    <div class="tableOption">
        <el-form-item label="样式">
            <el-checkbox-group v-model="main.activeOption.config">
                <!-- <el-checkbox  label="stripe">斑马纹</el-checkbox> -->
                <el-checkbox label="border">边框</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <!-- <el-form-item label="背景色">
      <avue-input-color type="textarea"  v-model="main.activeOption.bgColor"></avue-input-color>
    </el-form-item> -->
        <!-- <el-form-item label="开启滚动">
      <avue-switch v-model="main.activeOption.scroll">
      </avue-switch>
    </el-form-item> -->
        <!-- <el-form-item label="开启显隐">
      <avue-switch v-model="main.activeOption.columnShow">
      </avue-switch>
    </el-form-item> -->
        <!-- <el-form-item label="全部数据">
      <avue-switch v-model="main.activeOption.columnViews">
      </avue-switch>
    </el-form-item>
    <template v-if="main.activeOption.scroll">
      <el-form-item label="滚动时间">
        <avue-input-number v-model="main.activeOption.scrollTime">
        </avue-input-number>
      </el-form-item>
      <el-form-item label="滚动行数">
        <avue-input-number v-model="main.activeOption.scrollCount">
        </avue-input-number>
      </el-form-item>
    </template>
    <el-form-item label="开启排名">
      <avue-switch v-model="main.activeOption.index"></avue-switch>
    </el-form-item> -->
        <el-collapse accordion>
            <el-collapse-item title="表头设置">
                <el-form-item label="是否显示">
                    <avue-switch v-model="main.activeOption.showHeader"></avue-switch>
                </el-form-item>
                <el-form-item label="背景">
                    <avue-input-color type="textarea" v-model="main.activeOption.headerBackground"></avue-input-color>
                </el-form-item>
                <el-form-item label="字体大小">
                    <avue-input-number v-model="main.activeOption.headerFontSize">
                    </avue-input-number>
                </el-form-item>
                <el-form-item label="字体颜色">
                    <avue-input-color type="textarea" v-model="main.activeOption.headerColor"></avue-input-color>
                </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="表格设置">
                <el-form-item label="字体大小">
                    <avue-input-number v-model="main.activeOption.fontSize">
                    </avue-input-number>
                </el-form-item>
                <!-- <el-form-item label="显示行数">
          <avue-input-number v-model="main.activeOption.count">
          </avue-input-number>
        </el-form-item> -->
                <el-form-item label="文字颜色">
                    <avue-input-color type="textarea" v-model="main.activeOption.bodyColor"></avue-input-color>
                </el-form-item>
                <el-form-item label="边框颜色">
                    <avue-input-color type="textarea" v-model="main.activeOption.borderColor"></avue-input-color>
                </el-form-item>
                <el-form-item label="首列颜色">
                    <avue-input-color type="textarea" v-model="main.activeOption.firstLineColor"></avue-input-color>
                </el-form-item>
                <el-form-item label="奇行颜色">
                    <avue-input-color type="textarea" v-model="main.activeOption.nthColor"></avue-input-color>
                </el-form-item>
                <el-form-item label="偶行颜色">
                    <avue-input-color type="textarea" v-model="main.activeOption.othColor"></avue-input-color>
                </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="表格列设置">
                <avue-crud :option="tableOption" :data="main.activeOption.column" @row-save="rowSave" @row-del="rowDel"
                    @row-update="rowUpdate"></avue-crud>
            </el-collapse-item>
            <el-collapse-item title="表格行数据">
                <el-button type="text" @click="add">添加行</el-button>
                <el-collapse accordion>
                    <div v-for="(item,index) in main.activeOption.data" :key="index">
                      <el-collapse-item :title="`第${index+1}行`">
                          <div v-for="(cItem,cIndex) in main.activeOption.column" :key="cIndex">
                              <el-form-item :label="cItem.title">
                                <avue-input placeholder="请输入值" v-model="item[cItem.key]" clearable></avue-input>
                              </el-form-item>
                              <el-form-item :label="`${cItem.title}变量名称`">
                                <avue-input placeholder="请输入变量名称" v-model="item['mqtt_'+cItem.key]" clearable></avue-input>
                              </el-form-item>
                              <el-form-item :label="`${cItem.title}后缀`">
                                <avue-input placeholder="请输入后缀" v-model="item['hz_'+cItem.key]" clearable></avue-input>
                              </el-form-item>
                              <div style="width: 100%;height: 1px;margin: 10px 0;background: #fff;"></div>
                          </div>
                      </el-collapse-item>
                    </div>
                </el-collapse>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    import {
        tableOption,
        dicOption
    } from '@/option/config'

    export default {
        data() {
            return {
                timer: '',
                dicOption: dicOption,
                tableOption: tableOption
            }
        },
        inject: ["main"],
        computed: {
            column() {

            }
        },
        watch: {
            column: {
                handler: function() {
                    // let arr=[]
                    // this.main.activeOption.column.forEach(item=>{
                    //     arr.push({
                    //       title: item.title,
                    //       key: item.key,
                    //       width:item.width,
                    //       fixed: item.fiexed,
                    //     })
                    // })
                    // this
                },
                deep: true
            },
            'main.activeOption.column': {
                handler: function() {
                    // let arr=[]
                    // this.main.activeOption.column.forEach(item=>{
                    //     arr.push({
                    //       title: item.title,
                    //       key: item.key,
                    //       width:item.width,
                    //       fixed: item.fiexed,
                    //     })
                    // })
                    // this
                },
                deep: true
            }
        },
        mounted() {
            this.setVal()
            this.timer = setInterval(this.setVal,1000)
        },
        methods: {
            rowSave(row, done, loading) {
                // console.log('保存')
                // console.log(row)
                // let index = this.main.activeOption.column.findIndex(item => {
                //     return item.key === row.key
                // })
                // if (index != -1) {
                //     this.$message.error('key值已经存在了');
                //     loading()
                //     return
                // }
                // row.forEach(v => {
                //     if (v['__id'] !== undefined) delete v['__id']
                // })
                row.key = 'type'+new Date().getTime()
                row.slot = row.key
                this.main.activeOption.column.push(row);
                done()
            },
            rowDel(row, index) {
                this.main.activeOption.column.splice(index, 1);
            },
            rowUpdate(row, index, done) {
                this.main.activeOption.column.splice(index, 1, row);
                done()
            },
            add() {
                let keys = this.main.activeOption.column.map(item => {
                    return item.key
                })
                let obj = {}
                keys.forEach(item => {
                    obj[item] = ''
                })
                this.main.activeOption.data.push(obj)
            },
            del(index) {
                this.main.activeOption.data.splice(index,1)
            },
            setVal() {
                this.main.activeOption.data.forEach((item,index) => {
                    this.main.activeOption.column.forEach((cItem,cIndex) => {
                        if(item['mqtt_'+cItem.key]) {
                            item[cItem.key] = window.localStorage.getItem(item['mqtt_'+cItem.key])?window.localStorage.getItem(item['mqtt_'+cItem.key]):''
                        }
                        // if(item['hz_'+cItem.key]) {
                        //     item[cItem.key] = item[cItem.key] + item['hz_'+cItem.key]
                        // }
                    })
                })
            }
        },
        beforeDestroy() {
            clearInterval(this.timer)
        },
    }
</script>

<style lang="scss">
    .tableOption {

        .el-table th,
        .el-table tr,
        .el-table,
        .el-table__expanded-cell {
            background: #000 !important;
        }
    }
</style>
