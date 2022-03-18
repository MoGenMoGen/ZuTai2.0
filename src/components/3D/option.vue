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
                <input v-model="main.activeOption.modeUrl"/>
                <p>
                    <el-button type="text" @click="main.activeOption.modeUrl = ''">重置</el-button>
                    <el-button type="text" @click="imgVisible=true">模型库</el-button>
                </p>

            </div>
        </el-form-item>
        <!--<el-form-item label="材质预设">-->
            <!--<avue-select v-model="main.activeOption.material" placeholder="请选择" type="tree" :dic="materialList"></avue-select>-->
        <!--</el-form-item>-->
        <el-form-item label="模型颜色">
            <avue-input-color v-model="main.activeOption.materialColor"></avue-input-color>
        </el-form-item>

        <el-collapse accordion>
            <el-collapse-item title="背景设置">
                <el-form-item label="背景颜色">
                    <avue-input-color v-model="main.activeOption.backgroundColor"></avue-input-color>
                </el-form-item>
                <el-form-item label="背景图片">
                    <el-image style="width: 30px; height: 30px"  :src="main.activeOption.backgroundImage" v-show="main.activeOption.backgroundImage"  fit="fit">
                    </el-image>
                    <el-button type="text" @click="$refs.imglist.openImg('activeObj.data.value', 'border')">选择图片</el-button>
                    <el-button type="text" @click="main.activeOption.backgroundImage=''">删除图片</el-button>
                </el-form-item>

            </el-collapse-item>
            <el-collapse-item title="初始设置">
                <el-form-item label="模型X轴位置">
                    <input v-model="main.activeOption.posX"></input>
                </el-form-item>
                <el-form-item label="模型Y轴位置">
                    <input v-model="main.activeOption.posY"></input>
                </el-form-item>
                <el-form-item label="模型Z轴位置">
                    <input v-model="main.activeOption.posZ"></input>
                </el-form-item>
                <el-form-item label="模型X轴角度（。）">
                    <input v-model="main.activeOption.rotationX"></input>
                </el-form-item>
                <el-form-item label="模型Y轴角度（。）">
                    <input v-model="main.activeOption.rotationY"></input>
                </el-form-item>
                <el-form-item label="模型Z轴角度（。）">
                    <input v-model="main.activeOption.rotationZ"></input>
                </el-form-item>
                <el-form-item label="模型绽放">
                    <input v-model="main.activeOption.scale"></input>
                </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="交互设置">
                <el-form-item label="自动旋转">
                    <el-checkbox v-model="main.activeOption.ifRoate"></el-checkbox>
                </el-form-item>
                <el-form-item label="旋转速度(度/s)" v-show="main.activeOption.ifRoate">
                    <el-slider v-model="main.activeOption.rotateSpeed" :max="360"  :step="1"></el-slider>
                </el-form-item>
            </el-collapse-item>

        </el-collapse>
        <imglist ref="imglist"   @change="handleSetImg"></imglist>
    </div>
</template>

<script>
    import {
        tableOption,
        dicOption
    } from '@/option/config'
    import {getFilePath} from '@/api/visual'
    import imglist from '../../page/group/imglist'
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
        components:{imglist},
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
            handleSetImg(val){
                this.main.activeOption.backgroundImage = val

                this.$forceUpdate()
            },
            getFileList(){
                getFilePath().then(res=>{
                    console.log(res.data.data)
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
