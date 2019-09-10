<template>
  <div class="hello">
    <van-nav-bar
      title="黑马程序员.vant"
      :left-text="flag==='true' ? '返回' : ''"
      :left-arrow="flag"
      @click-left="goBack"
    />
    <router-view />

    <van-tabbar v-model="active" v-show="showTabber">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o" v-on:click="goShopCar">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: '',
      flag: false,
      showTabber: true
    }
  },
  created() {
    this.flag = this.$route.path === '/index' ? false : true
    this.showTabber = this.$route.path === '/shopcar' ? false : true
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    goShopCar() {
      this.$router.push('/shopcar')
    }
  },
  watch: {
    // 当页面刷新的时候，不会触发 watch 中监听的 路由地址的变化 如果是首页 不显示
    '$route.path': function(newVal, oldVal) {
      if (newVal === '/index') {
        this.showTabber = true
        this.flag = false
      } else if (newVal === '/shopcar') {
        this.showTabber = false
        this.flag = true
      } else {
        this.flag = true
        this.showTabber = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background: #1989fa;
}
</style>
