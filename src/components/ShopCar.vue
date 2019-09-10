<template>
  <div>
    <van-swipe-cell v-for="item in shopList" :key="item.id">
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
        <van-button square type="danger" text="删除" v-on:click="delItem" />
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
      sumPrice: 0
    }
  },
  mounted() {
    this.getShopList()
  },
  methods: {
    async getShopList() {
      const { data: res } = await this.$http.get('/api/goods/getshopcarlist/87,88,89')
      this.shopList = res.message
      console.log(this.shopList)
    },
    onSubmit() {
      this.$notify({ type: 'success', message: '提交成功' })
    },
    changeCount(id, count) {
      const index = this.shopList.findIndex(item => item.id === id)
      this.shopList[index].cou = count
      console.log(this.shopList)
    },
    delItem() {
        this.$notify({ type: 'success', message: '删除成功' })
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
  //   filters: {
  //     //数据过滤器
  //     priceFormat: function(value) {
  //       if (!value) {
  //         return 0
  //       } else {
  //         var intPart = Number(value).toFixed(0) // 获取整数部分
  //         var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  //         console.log(parseFloat(intPartFormat))
  //         return parseFloat(intPartFormat)
  //       }
  //     }
  //   }
}
</script>

<style lang="less" scoped>
.van-button {
    height: 100%;
}
</style>