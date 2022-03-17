<!-- 表格配置 -->
<template>
    <div class="tableOption">
        <el-dialog title="模型库"  width="90%"   :visible.sync="imgVisible">
            <div style="margin:0 auto;" class="upload">
                <el-upload class="upload-demo"
                           :on-success="onSuccess"
                           :show-file-list="false"
                           :headers="headers"
                           :data="{type:tab}"
                           :action="'/api/blade-resource/oss/endpoint/put-file2'"
                           multiple
                           list-type="picture">
                    <el-button size="small"
                               icon="el-icon-upload"
                               type="primary">点击上传</el-button>
                </el-upload>

                <el-input v-model="keyWords" placeholder="请输入内容"></el-input>
                <el-button size="small"
                           icon="el-icon-search"
                           type="primary" @click="toSearch">搜索</el-button>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
                <el-tab-pane :label="item.title" :name="index+1" :key="index" v-for="(item,index) in arrShow">
                    <el-scrollbar class="imgList">
                        <div class="imgList2">
                            <div class="img" @click="handleSetimg(v.value)" :key="i"
                                 v-for="(v,i) in item.children" :style="styleName">
                                <img :src="v.value" height="auto" />
                            </div>
                        </div>
                    </el-scrollbar>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
        <el-form-item label="模型">
            <div class="model">

            </div>
            <div class="btn">
                <button>重置</button>
                <el-button type="text" @click="imgVisible=true">模型库</el-button>
            </div>
        </el-form-item>
        <el-form-item label="材质预设">
            <avue-select v-model="main.activeOption.material" placeholder="请选择" type="tree" :dic="materialList"></avue-select>
        </el-form-item>
        <el-form-item label="模型颜色">
            <avue-input-color v-model="main.activeOption.materialColor"></avue-input-color>
        </el-form-item>
        <el-collapse accordion>
            <el-collapse-item title="背景设置">
                <el-form-item label="背景颜色">
                    <avue-input-color v-model="main.activeOption.backgroundColor"></avue-input-color>
                </el-form-item>
                <el-form-item label="背景">
                    <avue-input-color type="textarea" v-model="main.activeOption.headerBackground"></avue-input-color>
                </el-form-item>

            </el-collapse-item>
            <el-collapse-item title="交互设置">
                <el-form-item label="">
                    <el-checkbox v-model="main.activeOption.ifRoate">自动旋转</el-checkbox>
                </el-form-item>
                <el-form-item label="旋转速度" v-show="main.activeOption.ifRoate">
                    <el-slider v-model="main.activeOption.rotateSpeed" :max="360"  :step="1"></el-slider>
                </el-form-item>
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

        </el-collapse>
    </div>
</template>

<script>
    import {
        tableOption,
        dicOption
    } from '@/option/config'
    import {getFilePath} from '@/api/visual'
    export default {
        data() {
            return {
                tab:'',
                modeUrl:'',
                imgVisible:false,
                timer: '',
                dicOption: dicOption,
                tableOption: tableOption,
                materialList:[{
                        label:'模型自带',
                        value:0
                    },{
                        label:'金属',
                        value:1
                },{
                    label:'哑光',
                    value:2
                },{
                    label:'陶瓷',
                    value:3
                },{
                    label:'印刷',
                    value:4
                },{
                    label:'荧光',
                    value:5
                }]
            }
        },
        inject: ["main"],
        computed: {
            headers(){
                return {"Blade-Auth" : 'bearer ' + JSON.parse(localStorage.getItem('zt-token'))}
            }
        },
        watch: {

        },
        mounted() {
            this.getFileList()
        },
        methods: {
            getFileList(){
                getFilePath().then(res=>{
                    // this.arrShow = res.data.data
                })
            },
            onSuccess (res) {
                // const url = res.data.link;
                // this.imgOption[this.imgActive].unshift({
                //   label: url,
                //   value: url
                // });
                //this.activeName = 2
            },
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
