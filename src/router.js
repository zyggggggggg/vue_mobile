import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Index from './components/Index.vue'
import ShopCar from './components/ShopCar.vue'
import Photo from './components/photo/Photo.vue'
import ImageDetails from './components/photo/ImageDetails.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',redirect: '/index'}, 
    {path: '/home', redirect: '/index', component: Home,
      children: [
        { path: '/index',component: Index}, 
        {path: '/shopcar',component: ShopCar},
        {path: '/index/photo',component: Photo},
        {path: '/index/images/:id',component: ImageDetails}
      ]
    }
  ]
})
