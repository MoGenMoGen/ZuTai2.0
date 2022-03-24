<template>
    <el-dialog append-to-body title="采集点选择" :visible.sync="show" width="50%">
        <el-form label-width="120px" label-position="left">
            <el-form-item label="设备选择">
                <el-select v-model="device" filterable placeholder="请选择" class="mySelect">
                    <el-option v-for="(item,index) in deviceOptions" :key="item.id" :label="item.name" :value="item.id" @click.native="selectDevice(item)">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="采集点选择">
                <el-select v-model="point" filterable placeholder="请选择" class="mySelect">
                    <el-option v-for="(item,index) in pointOptions" :key="item.topic" :label="item.name" :value="item.topic" @click.native="selectPoint(item)">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    import {getDeviceList,getPoint} from '@/api/visual'
    export default {
        inject: ["contain"],
        data() {
            return {
                show: false,
                deviceOptions: [],
                pointOptions: [],
                device: '',
                point: '',
                type: ''
            }
        },
        mounted() {
            this.init()
        },
        methods:{
            init() {
                this.device = ''
                this.point = ''
                getDeviceList().then((res)=>{
                    this.deviceOptions = res.data.data
                    getPoint(this.deviceOptions[0].id).then((response)=>{
                        this.pointOptions = response.data.data
                    })
                })
            },
            open(item){
                this.show = true
                this.init()
                this.type = item
            },
            selectDevice(item) {
                this.device = item.name
                getPoint(item.id).then((response)=>{
                    this.point = ''
                    this.pointOptions = response.data.data
                })
            },
            selectPoint(item) {
                this.point = item.name
                this.show = false;
                this.$emit('change', item.topic,this.type);
            }
        }
    }
</script>

<style scoped lang="scss">
    .mySelect {
        width: 100%;
        /deep/ .el-input {
            width: 100%;
        }
    }
</style>
