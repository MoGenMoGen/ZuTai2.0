<!-- 表格配置 -->
<template>
    <div class="tableOption">
        <el-form-item label="模型">
            <div class="model">

            </div>
            <div class="btn">
                <input v-model="main.activeOption.modeUrl"/>
                <p>
                    <el-button type="text" @click="main.activeOption.modeUrl = ''">重置</el-button>
                    <el-button type="text" @click="selectModel('model')">模型库</el-button>
                </p>

            </div>
        </el-form-item>
        <!--<el-form-item label="材质预设">-->
            <!--<avue-select v-model="main.activeOption.material" placeholder="请选择" type="tree" :dic="materialList"></avue-select>-->
        <!--</el-form-item>-->
        <el-form-item label="模型颜色">
            <avue-input-color v-model="main.activeOption.modelOption.materialColor"></avue-input-color>
        </el-form-item>

        <el-collapse accordion>
            <el-collapse-item title="背景设置">
                <el-form-item label="背景颜色">
                    <avue-input-color v-model="main.activeOption.backgroundColor"></avue-input-color>
                </el-form-item>
                <el-form-item label="背景图片">
                    <el-image style="width: 30px; height: 30px"  :src="main.activeOption.backgroundImage" v-show="main.activeOption.backgroundImage"  fit="fit">
                    </el-image>
                    <el-button type="text" @click="selectModel('img')">选择图片</el-button>
                    <el-button type="text" @click="main.activeOption.backgroundImage=''">删除图片</el-button>
                </el-form-item>

            </el-collapse-item>
            <el-collapse-item title="初始设置">
                <el-form-item label="模型X轴位置">
                    <input v-model="main.activeOption.modelOption.posX"></input>
                </el-form-item>
                <el-form-item label="模型Y轴位置">
                    <input v-model="main.activeOption.modelOption.posY"></input>
                </el-form-item>
                <el-form-item label="模型Z轴位置">
                    <input v-model="main.activeOption.modelOption.posZ"></input>
                </el-form-item>
                <el-form-item label="模型X轴角度(。)">
                    <input v-model="main.activeOption.modelOption.rotationX"></input>
                </el-form-item>
                <el-form-item label="模型Y轴角度(。)">
                    <input v-model="main.activeOption.modelOption.rotationY"></input>
                </el-form-item>
                <el-form-item label="模型Z轴角度(。)">
                    <input v-model="main.activeOption.modelOption.rotationZ"></input>
                </el-form-item>
                <el-form-item label="模型绽放">
                    <input v-model="main.activeOption.modelOption.scale"></input>
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
                type: '',
                modeUrl:'',
                imgVisible:false,
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
        mounted() {
            
        },
        methods: {
            handleSetImg(val){
                if(this.type=='model') {
                    this.main.activeOption.modeUrl = val
                } else if (this.type=='img') {
                    this.main.activeOption.backgroundImage = val
                }
                this.$forceUpdate()
            },
            selectModel(type) {
                this.type = type
                if(type=='model') {
                    this.$refs.imglist.openImg('activeObj.data.value', 'background','3D模型')
                } else if (type=='img') {
                    this.$refs.imglist.openImg('activeObj.data.value', 'background')
                }
            }
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
