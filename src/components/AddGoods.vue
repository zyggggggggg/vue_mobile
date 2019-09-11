<template>
  <div class="addGoods">
    <van-field v-model="value" placeholder="请输入商品名称" clearable />
    <div class="btnBox">
      <van-button type="info" v-on:click="addGood">添加商品</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  methods: {
    async addGood() {
      if (this.value.trim().length === 0) {
        this.$notify('商品名称不能为空')
      } else {
        const { data: res } = await this.$http.post('/api/addproduct', { name: this.value })
        if (res.status !== 0) {
          this.$notify({ type: 'danger', message: '添加失败' })
        } else {
          this.$notify({ type: 'success', message: '增加成功' })
          this.$router.go(-1)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-field__control {
  padding-left: 8px !important;
}
.addGoods {
  margin-top: 40px;
}
.btnBox {
  width: 100%;
  padding: 50px 20px;
  box-sizing: border-box;
  .van-button {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>