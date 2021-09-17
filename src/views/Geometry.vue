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

@Component

export default class Geometry extends Vue {
  public mounted () {
    const scene = new THREE.Scene()
    const matrixList: any[] = []
    // 初始化geometry
    const geometry = new THREE.Geometry()
    // 初始化贴图
    const texture = new THREE.TextureLoader().load('/self/sprite.png')
    const material = new THREE.PointsMaterial({
      transparent: true,
      size: 5,
      map: texture
    }) // 材质对象Material
    // 初始变换点组
    for (let i = 0; i < 7524; i++) {
      let vertex = new THREE.Vector3()
      vertex.x = 1000 * Math.random() - 500
      vertex.y = 1000 * Math.random() - 900
      vertex.z = 1000 * Math.random() - 500
      geometry.vertices.push(vertex)
    }
    const particles = new THREE.Points(geometry, material)
    let mixer: any
    // scene.add(particles)
    const loader = new THREE.BufferGeometryLoader()
    loader.load(
      '/self/huge_gun.json',
      (geo) => {
        let object = new THREE.Points(geo, material)
        geo.center()
        geo.scale(10, 10, 10)
        // geo.rotateX( -Math.PI / 2 );
        // geo.rotateY( Math.PI / 2 );
        // scene.add(object)
      }
    )
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
          const text = new THREE.TextBufferGeometry('L-X-C-X', {
            font: font,
            size: 14,
            height: 20,
            curveSegments: 12,
            bevelThickness: 10,
            bevelSize: 8,
            bevelEnabled: false
          })
          text.center()
          text.scale(5, 5, 5)
          text.rotateX(-Math.PI / 5)
          text.rotateY(Math.PI / 4)
          let textFont = new THREE.Mesh(text, fontMaterial)
          scene.add(textFont)
        }
    )
    /**
     * 缓冲几何体数据加载器
     */
    // const loader = new THREE.JSONLoader();
    // loader.load('/self/car.js', function (geo: any) {
    //   // 粒子数据
    //     let colors = [];
    // 		for (let i = 0; i < geo.vertices.length; i++) {
    // 			colors.push(new THREE.Color("rgb(255, 255, 255)"))
    // 		}
    // 		geo.center();
    // 		geo.normalize();
    // 		geo.scale(150, 150, 150)
    // 		geo.rotateX(-Math.PI / 4)
    // 		geo.rotateY(Math.PI / 8)
    // 		matrixList.push(geo)
    //     let mesh = new THREE.Points(geo, material); // 网格模型对象Mesh
    //     scene.add(mesh); //网格模型添加到场景中
    //   }
    // )
    // tween
    // function tweenObj (index: number) {
    //   geometry.vertices.forEach(function (e: any, i: number, arr: any[]) {
    //     let length = matrixList[index].vertices.length
    //     let o = matrixList[index].vertices[i % length]
    //     new TWEEN.Tween(e).to({
    //       x: o.x,
    //       y: o.y,
    //       z: o.z
    //     }, 2000)
    //     .easing(TWEEN.Easing.Exponential.In)
    //     .delay(300 * Math.random())
    //     .start()
    //   })
    // }
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
      // TWEEN.update();
      if (mixer) {
        mixer.update(clock.getDelta())
      }
      particles.rotateY(0.01)// 每次绕y轴旋转0.01弧度
      camera.lookAt(scene.position)
      geometry.verticesNeedUpdate = true
      renderer.render(scene, camera)
    }
    // 创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
    const controls = new OrbitControls(camera)
  }
}
</script>
<style>
</style>
