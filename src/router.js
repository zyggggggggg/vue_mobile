import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Index from './components/Index.vue'
import ShopCar from './components/ShopCar.vue'
<<<<<<< HEAD
import GoodsList from './components/goods/GoodsList.vue'
import GoodsDetail from './components/goods/GoodsDetail.vue'
=======
import Search from './components/Search.vue'
import AddGoods from './components/AddGoods.vue'
import Member from './components/Member.vue'
>>>>>>> fc479a3652e61ed663750157fa207ceed5721f50

Vue.use(Router)

export default new Router({
<<<<<<< HEAD
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
=======
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
>>>>>>> fc479a3652e61ed663750157fa207ceed5721f50
})
