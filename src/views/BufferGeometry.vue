<template>
  <div class="BufferGeometry">
    <div id="BufferGeometry">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="100">
      </el-pagination>
    </div>
    <!-- <div v-show="percentage !== 100" class="mask">
      <el-progress
        :text-inside="true" 
        :stroke-width="18" 
        :percentage="percentage" 
        status="success"
      >
      </el-progress>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as THREE from 'three'
// import * as TWEEN from '@tweenjs/tween.js' // 功能不完善,不建议使用
import * as TWEEN from 'es6-tween'
import * as OrbitControls from 'three-orbitcontrols'

@Component

export default class BufferGeometry extends Vue {
  private percentage: number = 0
  private matrixList: any[] = []
  private geometry: any
  private tween: any

  public handleCurrentChange (val: number) {
    this.tweenObj(val - 1)
  }
  public tweenObj (index: number) {
    this.tween = new TWEEN.Tween(this.geometry.attributes.position.array)
    .to(this.matrixList[index])
    .easing(TWEEN.Easing.Exponential.In)
    .delay(300 * Math.random())
    .start()
  }
  public mounted () {
    const _this = this
    const scene = new THREE.Scene()
    // 初始化geometry
    this.geometry = new THREE.BufferGeometry() // 创建一个Buffer类型几何体对象
    // 类型数组创建顶点数据
    const arr = []
    for (let i = 0; i < 25110; i++) {
      arr.push(1000 * Math.random() - 500)
      arr.push(1000 * Math.random() - 900)
      arr.push(1000 * Math.random() - 500)
    }
    const vertices = new Float32Array(arr)
    // 创建属性缓冲区对象
    const attribue = new THREE.BufferAttribute(vertices, 3) // 3个为一组，表示一个顶点的xyz坐标
    // 设置几何体attributes属性的位置属性
    this.geometry.attributes.position = attribue
    // 初始化贴图
    const texture = new THREE.TextureLoader().load('/self/sprite.png')
    const material = new THREE.PointsMaterial({
      transparent: true,
      size: 7,
      // color: 'green'
      map: texture
    }) // 材质对象Material
    console.log('geo', this.geometry)
    const particles: any = new THREE.Points(this.geometry, material) // 点模型对象
    scene.add(particles) // 点对象添加到场景中
    /**
     * 缓冲几何体数据加载器
     */
    const length = this.geometry.attributes.position.array.length
    const loader = new THREE.BufferGeometryLoader()
    let lastLoaded1 = 0
    let lastLoaded2 = 0
    loader.load(
      '/self/huge_alien.json',
      (geo) => {
        let object = new THREE.Points(geo, material)
        geo.center()
        // geo.scale( 150, 150, 150 );
        // geo.rotateX( -Math.PI / 4 );
        // geo.rotateY( Math.PI / 8 );
        // scene.add( object );
        this.matrixList.push(changeToSame(geo.attributes.position.array))
      },
      // 资源加载过程中的回调函数
      (xhr) => {
        this.percentage += (xhr.loaded - lastLoaded1) / xhr.total * 50
        lastLoaded1 = xhr.loaded
      }
    )
    loader.load(
      '/self/huge_monster.json',
      (geo) => {
        let object = new THREE.Points(geo, material)
        // geo.center()
        geo.scale(2, 2, 2)
        // geo.rotateX( -Math.PI / 4 );
        // geo.rotateY( Math.PI / 8 );
        // scene.add( object );
        this.matrixList.push(changeToSame(geo.attributes.position.array))
        console.log(geo.attributes.position.array)
      },
      (xhr) => {
        this.percentage += (xhr.loaded - lastLoaded2) / xhr.total * 50
        lastLoaded2 = xhr.loaded
      }
    )
    loader.load(
      '/self/huge_carton.json',
      (geo) => {
        let object = new THREE.Points(geo, material)
        // geo.center()
        geo.scale(700, 700, 700)
        // geo.rotateX( -Math.PI / 4 );
        // geo.rotateY( Math.PI / 8 );
        // scene.add( object );
        this.matrixList.push(changeToSame(geo.attributes.position.array))
        console.log(geo.attributes.position.array)
      },
      (xhr) => {
        this.percentage += (xhr.loaded - lastLoaded2) / xhr.total * 50
        lastLoaded2 = xhr.loaded
      }
    )
    loader.load(
      '/self/huge_bottle.json',
      (geo) => {
        let object = new THREE.Points(geo, material)
        geo.center()
        geo.scale(500, 500, 500)
        // geo.rotateX( -Math.PI / 2 );
        // geo.rotateY( Math.PI / 2 );
        // scene.add( object );
        this.matrixList.push(changeToSame(geo.attributes.position.array))
        console.log(geo.attributes.position.array)
      },
      (xhr) => {
        this.percentage += (xhr.loaded - lastLoaded2) / xhr.total * 50
        lastLoaded2 = xhr.loaded
      }
    )
    loader.load(
      '/self/huge_wheel.json',
      (geo) => {
        let object = new THREE.Points(geo, material)
        geo.center()
        geo.scale(3000, 3000, 3000)
        // geo.rotateX( -Math.PI / 2 );
        // geo.rotateY( Math.PI / 2 );
        // scene.add( object );
        this.matrixList.push(changeToSame(geo.attributes.position.array))
        console.log(geo.attributes.position.array)
      },
      (xhr) => {
        this.percentage += (xhr.loaded - lastLoaded2) / xhr.total * 50
        lastLoaded2 = xhr.loaded
      }
    )
    loader.load(
      '/self/huge_pressure.json',
      (geo) => {
        let object = new THREE.Points(geo, material)
        geo.center()
        geo.scale(50, 50, 50)
        // geo.rotateX( -Math.PI / 2 );
        // geo.rotateY( Math.PI / 2 );
        // scene.add( object );
        this.matrixList.push(changeToSame(geo.attributes.position.array))
        console.log(geo.attributes.position.array)
      },
      (xhr) => {
        this.percentage += (xhr.loaded - lastLoaded2) / xhr.total * 50
        lastLoaded2 = xhr.loaded
      }
    )
    loader.load(
      '/self/huge_suzanne.json',
      (geo) => {
        let object = new THREE.Points(geo, material)
        geo.center()
        geo.scale(100, 100, 100)
        // geo.rotateX( -Math.PI / 2 );
        // geo.rotateY( Math.PI / 2 );
        // scene.add( object );
        this.matrixList.push(changeToSame(geo.attributes.position.array))
        console.log(geo.attributes.position.array)
      },
      (xhr) => {
        this.percentage += (xhr.loaded - lastLoaded2) / xhr.total * 50
        lastLoaded2 = xhr.loaded
      }
    )
    loader.load(
      '/self/huge_shaver.json',
      (geo) => {
        let object = new THREE.Points(geo, material)
        geo.center()
        geo.scale(2000, 2000, 2000)
        // geo.rotateX( -Math.PI / 2 );
        // geo.rotateY( Math.PI / 2 );
        // scene.add( object );
        this.matrixList.push(changeToSame(geo.attributes.position.array))
        console.log(geo.attributes.position.array)
      },
      (xhr) => {
        this.percentage += (xhr.loaded - lastLoaded2) / xhr.total * 50
        lastLoaded2 = xhr.loaded
      }
    )
    loader.load(
      '/self/huge_gun.json',
      (geo) => {
        let object = new THREE.Points(geo, material)
        geo.center()
        geo.scale(10, 10, 10)
        // geo.rotateX( -Math.PI / 2 );
        // geo.rotateY( Math.PI / 2 );
        // scene.add( object );
        this.matrixList.push(changeToSame(geo.attributes.position.array))
        console.log(geo.attributes.position.array)
      },
      (xhr) => {
        this.percentage += (xhr.loaded - lastLoaded2) / xhr.total * 50
        lastLoaded2 = xhr.loaded
      }
    )
    loader.load(
      '/self/huge_handgun.json',
      (geo) => {
        let object = new THREE.Points(geo, material)
        geo.center()
        geo.scale(200, 200, 200)
        // geo.rotateX( -Math.PI / 2 );
        // geo.rotateY( Math.PI / 2 );
        // scene.add( object );
        // this.matrixList.push(changeToSame(geo.attributes.position.array))
        console.log(geo.attributes.position.array)
      },
      (xhr) => {
        this.percentage += (xhr.loaded - lastLoaded2) / xhr.total * 50
        lastLoaded2 = xhr.loaded
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
          const geo = new THREE.TextBufferGeometry('L-X-C-X', {
            font: font,
            size: 14,
            height: 20,
            curveSegments: 12,
            bevelThickness: 10,
            bevelSize: 8,
            bevelEnabled: false
          })
          geo.center()
          console.log('textGeo: ', geo)
          this.matrixList.push(changeToSame(geo.attributes.position.array))
        }
    )

    function changeToSame (obj: any) {
      let repeat: any = []
      const len = obj.length
      while (repeat.length < length) {
        // repeat = repeat.concat(Array.from(obj))
        repeat = [...repeat, ...obj]
      }
      return new Float32Array(repeat)
    }
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
    console.log('renderer', renderer)
    const BufferGeometry: HTMLElement | null = document.getElementById('BufferGeometry')
    if (BufferGeometry) {
      BufferGeometry.appendChild(renderer.domElement)
    }

    // 渲染函数
    function render () {
      requestAnimationFrame(render) // 请求再次执行渲染函数render，渲染下一帧
      rend()
    }
    render()

    function rend () {
      // _this.percentage += 0.1
      if (_this.tween) {
        _this.tween.update()
      }
      particles.rotateY(0.001)// 每次绕y轴旋转0.01弧度
      camera.lookAt(scene.position)
      const pos: any = _this.geometry.attributes.position
      pos.needsUpdate = true
      renderer.render(scene, camera)
    }

    // 创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
    const controls = new OrbitControls(camera)
  }
}
</script>

<style lang="less">
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
  
  .el-pagination{
    position: absolute;
    bottom: 20px;
    left: 50%;
    margin-left: -100px;
  }
</style>
