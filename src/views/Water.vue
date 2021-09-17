<template>
  <div class="Geometry">
    <div id="Geometry">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as THREE from 'three'
import * as TWEEN from 'es6-tween'
import * as OrbitControls from 'three-orbitcontrols'
// import { DoubleSide } from 'three'
// import * as Water from '../common/Water.js'

@Component

export default class Geometry extends Vue {
  public mounted () {
    const scene = new THREE.Scene()
    // 字体加载
    const loaderFont = new THREE.FontLoader()
    const font = loaderFont.load(
        // resource URL
        '/self/fonts/optimer_bold.typeface.json',
        // onLoad callback
        (font) => {
            // do something with the font
          console.log(font)
            // scene.add( font );
          const fontMaterial = new THREE.MeshPhongMaterial({
            color: 'yellow',
            specular: '0xffffff',
            shininess: 30
          })
          const text = new THREE.TextBufferGeometry('Water Effect', {
            font: font,
            size: 14,
            height: 20,
            curveSegments: 12,
            bevelThickness: 10,
            bevelSize: 8,
            bevelEnabled: false
          })
          text.center()
          text.scale(2, 2, 2)
          text.translate(0, 0, -600)
          text.rotateX(-Math.PI / 5)
          text.rotateY(Math.PI / 4)
          let textFont = new THREE.Mesh(text, fontMaterial)
            // scene.add(textFont)
        }
    )
    // water加载
    const groundGeometry = new THREE.PlaneBufferGeometry(960, 540, 960, 540)
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI * 0.5
    // ground.rotation.y = Math.PI * 3 / 8;
    scene.add(ground)

    let textureLoader = new THREE.TextureLoader()
      // textureLoader.load( 'textures/floors/FloorsCheckerboard_S_Diffuse.jpg', function( map ) {
    textureLoader.load('/self/2.jpg', function (map) {
        // map.wrapS = THREE.RepeatWrapping;
        // map.wrapT = THREE.RepeatWrapping;
        // map.anisotropy = 16;
        // map.repeat.set( 4, 4 );
      groundMaterial.map = map
      groundMaterial.needsUpdate = true
    })

    let waterGeometry = new THREE.PlaneBufferGeometry(20, 20)
      // var flowMap = textureLoader.load( 'textures/water/Water_1_M_Flow.jpg' );
      // var flowMap = textureLoader.load( 'textures/water/clouds.jpg' );
    let flowMap = textureLoader.load('/self/water/crystalize.jpg')
      // var flowMap = textureLoader.load( 'textures/water/fibers.jpg' );
      // var flowMap = textureLoader.load( 'textures/water/pointilize.jpg' );
      // var flowMap = textureLoader.load( 'textures/water/ripple.jpg' );
      // var flowMap = textureLoader.load( 'textures/water/ripple_2.jpg' );

    // const	water = new Water( waterGeometry, {
    //   scale: 2,
    //   textureWidth: 1024,
    //   textureHeight: 1024,
    //   flowMap: flowMap
    // } );

    // water.position.y = 1;
    // water.rotation.x = Math.PI * - 0.5;
    // scene.add( water );
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
    const s = 300 // 三维场景显示范围控制系数，系数越大，显示的范围越大
    // 创建相机对象
    const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
    camera.position.set(0, 400, 0) // 设置相机位置
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
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    // 创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
    const controls = new OrbitControls(camera)
  }
}
</script>
<style>
</style>
