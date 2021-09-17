import Vue from 'vue'
import Router from 'vue-router'
import Geometry from './views/Geometry.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Geometry',
      component: Geometry
    },
    {
      path: '/BufferGeometry',
      name: 'BufferGeometry',
      component: () => import(/* webpackChunkName: "BufferGeometry" */ './views/BufferGeometry.vue')
    },
    {
      path: '/Animation',
      name: 'Animation',
      component: () => import(/* webpackChunkName: "Animation" */ './views/Animation.vue')
    },
    {
      path: '/Car',
      name: 'Car',
      component: () => import(/* webpackChunkName: "Car" */ './views/Car.vue')
    },
    {
      path: '/Water',
      name: 'Water',
      component: () => import(/* webpackChunkName: "Car" */ './views/Water.vue')
    }
  ]
})
