<template>
  <div class="box mtp">
    <!-- 轮播图 -->
    <div class="vanhairline mhg">
      <van-swipe :autoplay="3000" indicator-color="#096">
        <van-swipe-item v-for="item in shopcarpic" :key="item.id">
          <div class="picture">
            <img :src="item.src" alt />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 商品参数区和价格，标题等数据 -->
    <div class="vanhairline vanone">
      <van-cell-group v-for="item in shopcatgroies" :key="item.id">
        <van-cell :value="item.title"></van-cell>
        <div class="big">
          <div class="vantwo">
            <span>
              市场价：
              <s>¥{{item.market_price}}</s>
            </span>
            <span class="vaneight">
              销售价：
              <i class="vanfour">¥{{item.sell_price}}</i>
            </span>
          </div>
          <div class="vanfive">
            <span class="vansix">购买数量</span>
            <span class="vanten">
              <van-stepper />
            </span>
          </div>
          <div>
            <van-button type="danger" size="small">加入购物车</van-button>
            <van-button type="info" size="small" class="vanseven">立即购买</van-button>
          </div>
        </div>
      </van-cell-group>
    </div>
    <div class="vanhairline vanone" v-for="item in shopcatgroies" :key="item.id">
      <div class="box">
        <h3>商品参数</h3>
        <div class="small">
          <p>商品货号：{{item.goods_no}}</p>
          <p>库存情况：{{item.stock_quantity}}件</p>
          <p>上架时间：{{item.add_time | dateFormat}}</p>
        </div>
        <van-button plain type="primary" class="vannine" @click="introduce(item.id)">图文介绍</van-button>
        <van-button plain type="danger" class="vannine" @click="goodspl(item.id)">商品评论</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图图片数据
      shopcarpic: [],
      // 商品参数区和价格，标题等数据
      shopcatgroies: []
    }
  },
  created() {
    this.getPictureList()
    this.getShopcarCatgries()
  },
  methods: {
    // 获取商品详情页面中轮播图图片
    async getPictureList() {
      let id = this.$route.params.id
      //  console.log(id)
      const { data: res } = await this.$http.get(`/api/getthumimages/${id}`)
      if (res.status !== 0) {
        return this.$message.error('获取轮播图图片失败！')
      }
      //  console.log(res)
      this.shopcarpic = res.message
      //   console.log(this.shopcarpic)
    },
    // 获取商品参数区和价格，标题等数据
    async getShopcarCatgries() {
      let id = this.$route.params.id
      const { data: res } = await this.$http.get(`/api/goods/getinfo/${id}`)
      if (res.status !== 0) {
        return this.$message.error('获取商品参数区和价格失败！')
      }
      //   console.log(res)
      this.shopcatgroies = res.message
      //   console.log(this.shopcatgroies)
    },
    // 跳转图文介绍页面
    introduce(id) {
      // console.log(id)
      this.$router.push(`/goodsdesc/${id}`)
    },
    // 跳转商品评论页面
    goodspl(id) {
      // console.log(id)
      this.$router.push(`/goodscomments/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.mtp {
  margin-top: 40px;
  margin-bottom: 50px;
}
img {
  width: 100%;
}
.mhg {
  height: 230px;
}
.picture {
  margin: 0 auto;
  width: 200px;
  height: 200px;
}
.vanhairline {
  border: 1px solid #ccc;
}
.box {
  padding: 10px;
  overflow: hidden;
}
.vanone {
  margin-top: 10px;
}
.vanfour {
  color: #ee0a24;
}
.van-stepper {
  display: inline;
  padding: 0 !important;
}
.vanfive {
  margin: 25px 0;
  height: 40px !important;
}
.big {
  padding: 16px;
  border-top: 1px solid #ccc;
}
.vanseven {
  margin-left: 10px;
}
.vaneight {
  margin-left: 10px;
}
.small {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.vannine {
  width: 100%;
  margin-top: 10px;
}
.vanten {
  display: inline-block;
    vertical-align: middle;
  margin-left: 10px;
}
.vansix {
  display: inline-block;
  font-size: 14px
}
</style>