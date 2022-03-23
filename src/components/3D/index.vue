<template>
  <div :style="styleName"
       v-loading="!show"
       element-loading-text="加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 1)"
  >
      <!--<canvas id="renderCanvas" class="renderCanvas"></canvas>-->
      <canvas :id="'renderCanvas'+option.index" class="renderCanvas"></canvas>
  </div>
</template>

<script>
    // import * as BABYLON from "babylonjs"

export default ({
  name: "threeD",
  data () {
    return {
        show:false,
        canvas:null,
        engine:null,
        scene:null,
        materialColor:[0.0,0.7,0.95,1],
        myMeshes:null,
        oldModeUrl:'',
        myMaterial:null,
    };
  },
  watch: {
    'option.modelOption':{
        handler(){
            console.log('---------watch')
            this.setModel()
        },
        deep:true
    },
      'option.modeUrl':function () {
          //先清空模型
          this.scene.importedMeshesFiles = []
          this.scene.meshes = []
          if(this.option.modeUrl){
              this.getModel()
          }
      },
      'option.ifRoate':function () {
          this.setRoate()
      },
      'option.rotateSpeed':function () {
          this.setRoate()
      },
      'option.backgroundColor':function () {
          this.setBg()
      },
      'option.backgroundImage':function () {
          this.setBg()
      },
      'component.width':function(){
          this.$nextTick(()=>{
              this.engine.resize();
          })
      },
      'component.height':function(){
          this.$nextTick(()=>{
              // this.getInit()
              this.engine.resize();
          })
      }
  },
  computed: {

    styleName() {
        return {
            width:this.component.width+'px',
            height:this.component.height+'px',
            backgroundImage:`url('${this.option.backgroundImage}')`,
            backgroundSize:'100% 100%',
            backgroundRepeat:'no-repeat'
        }
    },


    index () {
      return this.option.index;
    },

  },
  props: {
      option: Object,
      component: Object,
  },
    mounted(){
        this.$nextTick(()=>{
            this.getInit()
        })
        // 监听浏览器改变大小的事件，通过调用engine.resize()来自适应窗口大小
        // window.addEventListener("resize", function () {
        //     console.log('111111111111111')
        //     this.engine.resize();
        // });


    },
    methods: {
        getInit(){
            // this.show = false
            this.canvas = document.getElementById('renderCanvas'+this.option.index); // 得到canvas对象的引用
            this.engine = new BABYLON.Engine(this.canvas, true); // 初始化 BABYLON 3D engine
            /******* Add the create scene function ******/
            // 创建一个场景scene
            this.scene = new BABYLON.Scene(this.engine);
            /******* End of the create scene function ******/

            // var scene = createScene(); //Call the createScene function
            this.creatScene()
            // 最后一步调用engine的runRenderLoop方案，执行scene.render()，让我们的3d场景渲染起来
            this.engine.runRenderLoop( ()=> {
                this.scene.render();
            });

        },
        //创造场景
        creatScene(){
                //相机沿纵轴旋转，沿纬度旋转，距离目标的距离，相机的坐标
                var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1.5, 1.5, 10, new BABYLON.Vector3(0, 2, 0), this.scene);
                //  camera.setPosition(new BABYLON.Vector3(0, 0, -10));
                camera.attachControl(this.canvas, true);
                this.setRoate()
                // 添加一组灯光到场景
                var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 0, 0), this.scene);
                // eslint-disable-next-line no-unused-vars
                var light1 = new BABYLON.HemisphericLight(
                    "light1",
                    new BABYLON.Vector3(1, 1, 0),
                    this.scene
                );
                // eslint-disable-next-line no-unused-vars
                var light2 = new BABYLON.PointLight(
                    "light2",
                    new BABYLON.Vector3(0, 1, -1),
                    this.scene
                );

                this.setBg()

                this.scene.registerBeforeRender(function () {
                    light.position = camera.position;
                });

                if(this.option.modeUrl){
                    this.getModel()
                }
        },
        //旋转设置
        setRoate(){
            if(this.option.ifRoate){
                clearInterval(this.timer)

                this.timer = setInterval(()=>{
                    this.scene.activeCamera.alpha += this.option.rotateSpeed/583;
                },100)
            }else{
                // console.log('停止旋转')
                clearInterval(this.timer)
            }
        },
        //设置背景
        setBg(){
            //背景色
            let bgColor = []
            if(this.option.backgroundImage || !this.option.backgroundColor){
                bgColor = [0,0,0,0]
            }else {
                bgColor = this.option.backgroundColor.slice(5,this.option.backgroundColor.length-1).split(',').map((item,index)=> index<3 ? item/255 : parseFloat(item))
            }
            console.log(this.scene)
            this.scene.clearColor = new BABYLON.Color4(bgColor[0], bgColor[1], bgColor[2], bgColor[3]);
        },
        //引入模型
        async getModel(){
            if(this.option.modeUrl){
                this.show = false
                // http://192.168.0.29:89/img/model/11.gltf
                let arr = this.option.modeUrl.split('/')
                let fileUrl = arr.slice(0,arr.length-1)
                this.myMeshes = await BABYLON.SceneLoader.ImportMeshAsync('',fileUrl.join('/')+'/', arr[arr.length-1], this.scene)
                this.setModel()
            }
            console.log(this.scene)
        },
        //设置模型
        setModel(){
            if(!this.myMaterial){
                this.myMaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);
            }
            if(this.option.modelOption && this.option.modelOption.materialColor){
                this.materialColor = this.option.modelOption.materialColor.slice(5,this.option.modelOption.materialColor.length-1).split(',').map((item,index)=> index<3 ? item/255 : parseFloat(item))
                this.myMaterial.diffuseColor = new BABYLON.Color4(this.materialColor[0],this.materialColor[1],this.materialColor[2]); //漫射色
                this.myMaterial.alpha = this.materialColor[3]
            }else {
                this.myMaterial = null
            }
            this.myMeshes.meshes.map(item=>{
                if(this.myMaterial) item.material = this.myMaterial
                else item.material = null
                item.position.x = this.option.modelOption.posX
                item.position.y = this.option.modelOption.posY
                item.position.z = this.option.modelOption.posZ
                item.rotation.x = this.option.modelOption.rotationX
                item.rotation.y = this.option.modelOption.rotationY
                item.rotation.z = this.option.modelOption.rotationZ
                item.scaling.x = this.option.modelOption.scale
                item.scaling.y = this.option.modelOption.scale
                item.scaling.z = this.option.modelOption.scale
                return item
            })
            this.show = true
        }

    },
    beforeDestroy(){
      clearInterval(this.timer)
    }
});
</script>

<style lang="scss" scoped>
    .renderCanvas {
        width: 100%;
        height: 100%;
        touch-action: none;
        z-index: -1;

    }
</style>
