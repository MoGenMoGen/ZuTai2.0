<template>
  <div :style="styleName" >
      <!--<canvas id="renderCanvas" class="renderCanvas"></canvas>-->
      <canvas :id="'renderCanvas'+option.index" class="renderCanvas"></canvas>
  </div>
</template>

<script>
    import * as BABYLON from "babylonjs"


export default ({
  name: "threeD",
  data () {
    return {
        canvas:null,
        engine:null,
        materialColor:[0.0,0.7,0.95,1],
    };
  },
  watch: {
        'option':{
            handler(){
                this.getInit()
            },
            deep:true
        },
      'component.width':function(){
          this.$nextTick(()=>{
              this.getInit()
          })
      },
      'component.height':function(){
          this.$nextTick(()=>{
              this.getInit()
          })
      }
  },
  computed: {

    styleName() {
        return {
            width:this.component.width+'px',
            height:this.component.height+'px',
            background:this.option.bgColor
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
            this.canvas = document.getElementById('renderCanvas'+this.option.index); // 得到canvas对象的引用
            this.engine = new BABYLON.Engine(this.canvas, true); // 初始化 BABYLON 3D engine
            console.log('2222')
            /******* Add the create scene function ******/
            var createScene = ()=> {
                // 创建一个场景scene
                var scene = new BABYLON.Scene(this.engine);

                // 添加一个相机，并绑定鼠标事件
                // var camera = new BABYLON.ArcRotateCamera(
                //     "Camera",
                //     Math.PI / 2,
                //     Math.PI / 2,
                //     2,
                //     new BABYLON.Vector3(0, 0, 5),
                //     scene
                // );
                // camera.attachControl(this.canvas, true);

                var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
                camera.setPosition(new BABYLON.Vector3(0, 0, -10));
                camera.attachControl(this.canvas, true);
                console.log(this.option.ifRoate)
                if(this.option.ifRoate){
                    this.timer = setInterval(()=>{
                        scene.activeCamera.alpha += .02;
                    },100)
                }else {
                    clearInterval(this.timer)
                }


                // 添加一组灯光到场景
                // eslint-disable-next-line no-unused-vars
                var light1 = new BABYLON.HemisphericLight(
                    "light1",
                    new BABYLON.Vector3(1, 1, 0),
                    scene
                );
                // eslint-disable-next-line no-unused-vars
                var light2 = new BABYLON.PointLight(
                    "light2",
                    new BABYLON.Vector3(0, 1, -1),
                    scene
                );
                const myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
                if(this.option.materialColor){
                    this.materialColor = this.option.materialColor.slice(5,this.option.materialColor.length-1).split(',').map((item,index)=> index<3 ? item/255 : parseFloat(item))
                }

                myMaterial.diffuseColor = new BABYLON.Color4(this.materialColor[0],this.materialColor[1],this.materialColor[2]); //漫射色
                myMaterial.alpha = this.materialColor[3]
                // var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
                //
                // myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
                // myMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
                // myMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);

                // 添加一个球体到场景中
                // eslint-disable-next-line no-unused-vars
                var sphere = BABYLON.MeshBuilder.CreateSphere(
                    "sphere",
                    { diameter: 2 },
                    scene
                );
                sphere.material = myMaterial
                // BABYLON.SceneLoader.Append("", "11.gltf", scene, function (scene) {
                //
                //     // 模型添加成功后，执行场景对象的一些方法
                //
                // });
                //背景
                let bgColor = this.option.backgroundColor.slice(5,this.option.backgroundColor.length-1).split(',').map((item,index)=> index<3 ? item/255 : parseFloat(item))
                scene.clearColor = new BABYLON.Color4(bgColor[0], bgColor[1], bgColor[2], bgColor[3]);


                return scene;
            };
            /******* End of the create scene function ******/

            var scene = createScene(); //Call the createScene function

            // 最后一步调用engine的runRenderLoop方案，执行scene.render()，让我们的3d场景渲染起来
            this.engine.runRenderLoop(function () {
                scene.render();
            });
        },

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
