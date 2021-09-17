<template>
  <div class="Geometry">
    <div id="Geometry">
      <div class="operate">
        <button class='play' @click="display">play</button>
        <!-- <button class='stop' @click="stop">stop</button> -->
      </div>
    </div>
    <div v-show="percentage !== 100" class="mask">
      <el-progress
        :text-inside="true" 
        :stroke-width="18" 
        :percentage="percentage" 
        status="success"
      >
      </el-progress>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as THREE from 'three'
import * as OrbitControls from 'three-orbitcontrols'
import FBXLoader from 'three-fbxloader-offical' // threejs-fbxloader不太给力

@Component

export default class Geometry extends Vue {
  private percentage: number = 0
  private AnimationAction: any
  public display () {
    this.AnimationAction.play()
  }
  // public stop () {
  //   this.AnimationAction.stop()
  // }
  public mounted () {
    const scene = new THREE.Scene()
    let mixer: any

    const loader = new FBXLoader()
    loader.load('/self/SambaDancing.fbx', (obj: any) => {
      // console.log('fbxobj:',obj)
      scene.add(obj)
      obj.translateY(-80)
      mixer = new THREE.AnimationMixer(obj)
      this.AnimationAction = mixer.clipAction(obj.animations[0])
      // this.AnimationAction.timeScale = 1; // 默认1，可以调节播放速度
      this.AnimationAction.loop = THREE.LoopOnce // 不循环播放
      this.AnimationAction.clampWhenFinished = true // 暂停在最后一帧播放的状态
      // this.AnimationAction.play()
    },// 资源加载过程中的回调函数
    (xhr: any) => {
      this.percentage = xhr.loaded / xhr.total * 100
    })
    /**
     * 光源设置
     */
    // 点光源
    const point = new THREE.PointLight(0xffffff)
    point.position.set(400, 200, 300) // 点光源位置
    scene.add(point) // 点光源添加到场景中
    // 环境光
    const ambient = new THREE.AmbientLight(0x444444)
    scene.add(ambient)
    /**
     * 相机设置
     */
    const width = window.innerWidth - 50 // 窗口宽度
    const height = window.innerHeight - 100 // 窗口高度
    const k = width / height // 窗口宽高比
    const s = 150 // 三维场景显示范围控制系数，系数越大，显示的范围越大
    // 创建相机对象
    const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
    camera.position.set(200, 300, 200) // 设置相机位置
    camera.lookAt(scene.position) // 设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height) // 设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1) // 设置背景颜色
    const Geometry: HTMLElement | null = document.getElementById('Geometry')
    if (Geometry) {
      Geometry.appendChild(renderer.domElement)
    }

    // 渲染函数
    function render () {
      requestAnimationFrame(render) // 请求再次执行渲染函数render，渲染下一帧
      rend()
    }
    render()
    const clock = new THREE.Clock()
    function rend () {
      if (mixer) {
        mixer.update(clock.getDelta())
      }
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    // 创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
    const controls = new OrbitControls(camera)
  }
}
</script>
<style lang="less">
  .operate{
    position: fixed;
    font-size: 24px;
    bottom: 20px;
    left: 50%;
  }

  .mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;

    .el-progress-bar{
      width: 50%;
      margin: 300px auto;

      .el-progress-bar__inner{
        border-radius: 8px;
      }
    }
  }
</style>
