<template>
  <div class="shopCar">
    <van-swipe-cell v-for="item in shopList" :key="item.id" :on-close="onClose">
      <van-card
        :num="item.cou"
        :price="item.sell_price"
        :title="item.title"
        :thumb="item.thumb_path"
      >
        <div slot="footer">
          <van-stepper v-model="item.cou" v-on:change="changeCount(item.id,item.cou)" />
        </div>
      </van-card>

      <template slot="right">
        <van-button square type="danger" text="删除" />
      </template>
    </van-swipe-cell>

    <van-submit-bar :price="getSumPrice" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopList: [],
      sumPrice: 0,
      isLoading: false
    }
  },
  mounted() {
    this.getShopList()
  },
  methods: {
    async getShopList() {
      const { data: res } = await this.$http.get('/api/goods/getshopcarlist/87,88,89')
      if (res.status !== 0) {
        this.$notify({ type: 'danger', message: '获取列表失败' })
      } else {
        this.shopList = res.message
        console.log(this.shopList)
      }
    },
    onSubmit() {
      this.$notify({ type: 'success', message: '提交成功' })
    },
    changeCount(id, count) {
      const index = this.shopList.findIndex(item => item.id === id)
      this.shopList[index].cou = count
      console.log(this.shopList)
    },
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case 'outside':
          instance.close()
          break
        case 'right':
          this.$dialog
            .confirm({
              message: '确定删除吗？'
            })
            .then(() => {
              this.delItem()
              instance.close()
            })
          break
      }
    },
    delItem() {
      this.$notify({ type: 'success', message: '删除成功' })
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    }
  },
  computed: {
    getSumPrice() {
      var countSum = 0
      this.shopList.forEach(item => {
        countSum += item.sell_price * item.cou
      })
      return parseFloat(countSum * 100)
    }
  }
}
</script>

<style lang="less" scoped>
.van-button {
  height: 100%;
}
.shopCar {
  margin-top: 40px;
}
</style>
