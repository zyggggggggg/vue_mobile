<template>
  <div class="hello">
    <!-- 导航栏 -->
    <van-nav-bar
      title="黑马程序员.vant"
      :left-text="flag===true ? '返回' : ''"
      :left-arrow="flag"
      :right-text="showBtn === true ? '添加' : ''"
      @click-left.stop.prevent="goBack"
      @click-right="goAdd"
    />
    <transition name="slide-fade" mode="out-in">
      <router-view />
    </transition>
    <!-- 标签栏 -->
    <van-tabbar
      v-show="showTabber"
      active-color="#07c160"
      inactive-color="#000"
      v-model="active"
      v-on:change="changeTab"
    >
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="friends-o">会员</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" :info="shopCarNum">购物车</van-tabbar-item>
      <van-tabbar-item icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      flag: false,
      showTabber: true,
      showBtn: false,
      shopCarNum: 0
    }
  },
  created() {
    // this.flag = this.$route.path === '/index' ? false : true
    // this.showTabber = this.$route.path === '/shopcar' ? false : true
    // this.showBtn = this.$route.path === '/search' ? true : false
    this.flag = !(this.$route.path === '/index')
    this.showTabber = !(this.$route.path === '/shopcar')
    this.showBtn = this.$route.path === '/search'
    this.getShopCarList()
  },
  mounted() {
    // 页面加载完成之后，从本地存储中拿到之前存储的active值
    this.active = parseInt(localStorage.getItem('active'))
  },
  methods: {
    // 点击返回按钮触发的事件
    goBack() {
      console.log(this.active)
      this.$router.go(-1)
    },
    goAdd() {
      this.$router.push('addgoods')
    },
    async getShopCarList() {
      const { data: res } = await this.$http.get('/api/goods/getshopcarlist/87,88,89')
      if (res.status !== 0) {
        this.$notify({ type: 'danger', message: '获取列表失败' })
      } else {
        this.shopCarNum = res.message.length
      }
    },
    // 切换底部标签栏触发的事件
    changeTab(index) {
      switch (index) {
        case 0:
          this.$router.push('/home')
          break
        case 1:
          this.$router.push('/member')
          break
        case 2:
          this.$router.push('/shopCar')
          break
        case 3:
          this.$router.push('/search')
          break
          defalut: this.$router.push('/home')
      }
    }
  },
  watch: {
    // 当页面刷新的时候，不会触发 watch 中监听的 路由地址的变化 如果是首页 不显示
    // 根据不同的路由地址给active设置不同的值
    '$route.path': function(newVal, oldVal) {
      if (newVal === '/index') {
        this.showTabber = true
        this.flag = false
        this.showBtn = false
        localStorage.setItem('active', 0)
        this.active = 0
      } else if (newVal === '/shopcar') {
        this.showTabber = false
        this.flag = true
        this.showBtn = false
        localStorage.setItem('active', 2)
        this.active = 2
      } else if (newVal === '/search') {
        this.showTabber = true
        this.flag = true
        this.showBtn = true
        localStorage.setItem('active', 3)
        this.active = 3
      } else {
        this.flag = true
        this.showTabber = true
        this.showBtn = false
        localStorage.setItem('active', 1)
        this.active = 1
      }
    }
  }
}
</script>

<style scoped lang="less">
.hello {
  overflow: hidden;
}
.van-nav-bar {
  height: 40px;
  line-height: 40px;
  background: #1989fa;
 
 
}
.van-nav-bar van-hairline--bottom{
  position: fixed;
  font-size: 12px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter {
  transform: translateX(100%);
}
.slide-fade-leave-to {
  opacity: 0;
}
</style>
