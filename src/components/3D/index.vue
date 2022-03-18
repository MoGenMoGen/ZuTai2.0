<template>
  <div :style="styleName" >
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
            this.canvas = document.getElementById('renderCanvas'+this.option.index); // 得到canvas对象的引用
            this.engine = new BABYLON.Engine(this.canvas, true); // 初始化 BABYLON 3D engine
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
                //相机沿纵轴旋转，沿纬度旋转，距离目标的距离，相机的坐标
                var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1.5, 1.5, 10, new BABYLON.Vector3(0, 2, 0), scene);
              //  camera.setPosition(new BABYLON.Vector3(0, 0, -10));
                camera.attachControl(this.canvas, true);
                if(this.option.ifRoate){
                    console.log(this.option.rotateSpeed/6)
                    this.timer = setInterval(()=>{
                        scene.activeCamera.alpha += this.option.rotateSpeed/3600;
                    },100)
                }else {
                    clearInterval(this.timer)
                }


                // 添加一组灯光到场景
                var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 0, 0), scene);
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
                // var sphere = BABYLON.MeshBuilder.CreateSphere(
                //     "sphere",
                //     { diameter: 2 },
                //     scene
                // );
                // sphere.material = myMaterial
                if(this.option.modeUrl){

                    // BABYLON.SceneLoader.Append('','22.obj', scene, function (scene) {
                    //
                    //     // 模型添加成功后，执行场景对象的一些方法
                    //
                    // });
                    // http://192.168.0.29:89/img/model/11.gltf
                    let arr = this.option.modeUrl.split('/')
                    let fileUrl = arr.slice(0,arr.length-1)
                   BABYLON.SceneLoader.ImportMesh('',fileUrl.join('/')+'/', arr[arr.length-1], scene,  (newMeshes,particleSystems,skeletons)=> {
                        console.log('------------------')
                       newMeshes.map(item=>{
                           item.material = myMaterial
                           item.position.x = this.option.posX
                           item.position.y = this.option.posY
                           item.position.z = this.option.posZ
                           item.rotation.x = this.option.rotationX
                           item.rotation.y = this.option.rotationY
                           item.rotation.z = this.option.rotationZ
                           item.scaling.x = this.option.scale
                           item.scaling.y = this.option.scale
                           item.scaling.z = this.option.scale
                           return item
                       })
                       // console.log(newMeshes)
                       // console.log(particleSystems)
                       // console.log(skeletons)
                       // newMeshes[0].position.y = this.option.posY
                       //  newMeshes[0].position.z = this.option.posZ
                         // scene.createDefaultCameraOrLight(true, true, true);

                         // Create a default arc rotate camera and light.
                        // scene.createDefaultCameraOrLight(true, true, true);
                        //  container.material = myMaterial
                        //  container.addAllToScene();
                         // newMesh.scaling = new BABYLON.Vector3(this.option.scale, this.option.scale, this.option.scale);
                        // The default camera looks at the back of the asset.
                        // Rotate the camera by 180 degrees to the front of the asset.
                        // scene.activeCamera.alpha += Math.PI;
                    });
                    // model.material = myMaterial
                    // model.scaling = new BABYLON.Vector3(this.option.scale, this.option.scale, this.option.scale);
                }

                //背景色
                let bgColor = []
                if(this.option.backgroundImage){
                    bgColor = [0,0,0,0]
                }else {
                    bgColor = this.option.backgroundColor.slice(5,this.option.backgroundColor.length-1).split(',').map((item,index)=> index<3 ? item/255 : parseFloat(item))
                }
                scene.clearColor = new BABYLON.Color4(bgColor[0], bgColor[1], bgColor[2], bgColor[3]);

                scene.registerBeforeRender(function () {
                    light.position = camera.position;
                });

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
