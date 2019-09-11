import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Index from './components/Index.vue'
import ShopCar from './components/ShopCar.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsDetail from './components/goods/GoodsDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/goods/list',
      component:GoodsList
    },
    {
      path:'/goods/detail/:id',
      component:GoodsDetail
    },
    {
      path: '/',
      redirect: '/index'
    },{
      path: '/home',
      redirect: '/index',
      component: Home,
      children: [{
        path: '/index',
        component: Index
      }, {
        path: '/shopcar',
        component: ShopCar
      }
     ]
    }
  ]
})
