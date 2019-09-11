import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Index from './components/Index.vue'
import ShopCar from './components/ShopCar.vue'
import Comments from './components/show/Comments.vue'
import Goodsdesc from './components/show/Goodsdesc.vue'

// 测试组件
// import Test from './components/show/Test.vue'

Vue.use(Router)

export default new Router({
  routes: [
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
        { path: '/goodscomments/:id', component: Comments },
        { path: '/goodsdesc/:id', component: Goodsdesc }
        // { path: '/test', component: Test }
      ]
    }
  ]
})
