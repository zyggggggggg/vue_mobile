<template>
  <div class="mtp" id="box">
    <van-card
      v-for="item in goodsList"
      :key="item.id"
      centered
      :price="item.sell_price"
      :origin-price="item.market_price"
      :title="item.title"
      :tag="item.stock_quantity < 100 ? '热卖中' : '' "
      :thumb="item.img_url"
      @click="productDetails(item.id)"
    >
      <div slot="footer" class="foot">剩{{item.stock_quantity}}件</div>
    </van-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [],
      pageindex: 1
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await this.$http.get('/api/getgoods', { params: this.pageindex })
      if (res.status !== 0) {
        return this.$message.error('获取商品列表失败！')
      }
      // console.log(res)
      this.goodsList = res.message
      // console.log(this.goodsList)
    },
    productDetails(id) {
      // console.log(id)
      this.$router.push(`/goods/detail/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.mtp {
  margin-top: 40px;
  padding: 10px;
}
#box {
  margin-bottom: 50px;
}
.van-card {
  padding: 0;
  border: 1px solid #ccc;
  font-size: 14px;
}
.van-card__thumb {
  width: 160px;
  height: 160px;
  margin-left: 10px;
  margin-top: 10px;
}
.van-card__bottom {
  margin-top: 20px;
}
.van-card__origin-price {
  margin-left: 10px;
}
.foot {
  margin: 0 10px 10px 10px;
}
</style>