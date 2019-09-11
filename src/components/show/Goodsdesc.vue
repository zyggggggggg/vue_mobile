<template>
  <div id="descBox">
    <div class="imageBox"
         v-for="(item,i) in imageList"
         :key="i">
      <!-- 标题 -->
      <h4 class="title">{{item.title}}</h4>
      <hr />
      <!-- 内容与图片 -->
      <p v-html="item.content"></p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageList: []
    }
  },
  created () {
    this.getImageList()
  },
  methods: {
    async getImageList () {
      // ${this.$route.params.id}
      const { data: res } = await this.$http.get(`/api/goods/getdesc/${this.$route.params.id}`)
      this.imageList = res.message
      console.log(this.imageList)
    }
  }
}
</script>

<style lang="less" scoped>
#descBox {
  margin-top: 40px;
}
.title {
  font-size: 16px;
  color: #226aff;
  text-align: center;
  margin: 15px 0;
}
</style>