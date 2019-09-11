import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Index from './components/Index.vue'
import ShopCar from './components/ShopCar.vue'
import Search from './components/Search.vue'
import AddGoods from './components/AddGoods.vue'
import Member from './components/Member.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/index'
  }, {
    path: '/home',
    redirect: '/index',
    component: Home,
    children: [{
      path: '/index',
      component: Index
    }, {
      path: '/shopcar',
      component: ShopCar
    }, {
      path: '/search',
      component: Search
    }, {
      path: '/addgoods',
      component: AddGoods
    }, {
      path: '/member',
      component: Member
    }]
  }]
})
