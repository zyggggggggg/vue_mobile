import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Index from './components/Index.vue'
import ShopCar from './components/ShopCar.vue'
import Comments from './components/show/Comments.vue'
import Goodsdesc from './components/show/Goodsdesc.vue'

// 测试组件
// import Test from './components/show/Test.vue'

import GoodsList from './components/goods/GoodsList.vue'
import GoodsDetail from './components/goods/GoodsDetail.vue'
import Search from './components/Search.vue'
import AddGoods from './components/AddGoods.vue'
import Member from './components/Member.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods/list',
      component: GoodsList
    },
    {
      path: '/goods/detail/:id',
      component: GoodsDetail
    },
    {
      path: '/',
      redirect: '/index'
    },

    {
      path: '/home',
      redirect: '/index',
      component: Home,
      children: [
        {
          path: '/index',
          component: Index
        },
        {
          path: '/shopcar',
          component: ShopCar
        },
        {
          path: '/search',
          component: Search
        },
        {
          path: '/addgoods',
          component: AddGoods
        },
        {
          path: '/member',
          component: Member
        },
        { path: '/goodscomments/:id', component: Comments },
        { path: '/goodsdesc/:id', component: Goodsdesc },
        {
          path: '/goods/list',
          component: GoodsList
        },
        {
          path: '/goods/detail/:id',
          component: GoodsDetail
        }
        // { path: '/test', component: Test }
      ]
    }
  ]
})
