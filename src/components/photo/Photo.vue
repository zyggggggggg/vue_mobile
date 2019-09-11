<template>
  <div class="Box">
    <!-- 图片导航栏 -->
    <van-tabs v-model="activeName" @click="getimageListId">
      <van-tab v-for="item in  titleList" :key="item.id" :name="item.id" :title="item.title"></van-tab>
    </van-tabs>
    <!-- 图片展示区域 -->
    <ul class="photo-list">
      <router-link
        v-for="item in  imageList "
        :key="item.id"
        :to="'/index/images/' + item.id"
        tag="li"
      >
        <van-image
          v-lazy="item"
          :key="item.id"
          width="100%"
          height="100%"
          :src="item.img_url"
          radius="10px"
        />
        <!-- 文字介绍 -->
        <div class="info">
          <h1 class="info_title">{{item.title}}</h1>
          <div class="info_body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 图片导航栏标题
      titleList: [
        {
          title: '',
          id: 0
        }
      ],
      activeName: 14,
      // 图片展示
      imageList: []
    }
  },
  created() {
    this.getTitleList()
    //默认刚进入页面，就显示全部图片
    this.getimageListId(0)
  },
  methods: {
    // 图片导航
    async getTitleList() {
      const { data: res } = await this.$http.get('api/getimgcategory')
      // console.log(res)
      if (res.status !== 0) {
        return this.$message.error('请求数据失败')
      }
      this.titleList = res.message
      //   console.log(this.titleList)
      res.message.unshift({ title: '全部', id: 0 })
    },
    // 当进入页面的时候，图片展示
    async getimageListId(id, event) {
      //   console.log(id)
      console.log(this.titleList[id])
      //   console.log(event);
      const { data: res } = await this.$http.get('/api/getimages/' + id)
      console.log(res)
      if (res.status === 0) {
        this.imageList = res.message
      }
    }
  }
}
</script>
<style lang="less" scoped>
.Box {
  margin-top: 40px;
  margin-bottom: 50px;
  overflow: hidden;
  .van-tabs {
    width: 500px;
    overflow: hidden;
  }
  .photo-list {
    list-style: none;
    margin: 0;
    padding: 10px;
    li {
      text-align: center;
      margin-bottom: 2px;
      text-shadow: 0 0 6px #999;
      position: relative;
      .van-image {
        width: 100%;
      }
      .info {
        position: absolute;
        text-align: left;
        color: white;
        bottom: 0;
        background-color: rgba(0 0 0 0.4);
        margin: 5px;
        .info_title {
          font-size: 14px;
        }
        .info_body {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
