<template>
  <div class="indexPage">
    <!-- 头部搜索栏 -->
    <!-- <div class="search">
      <van-search placeholder="请输入搜索关键词" />
    </div> -->
    <!-- 轮播图区域 -->
    <div>
      <van-swipe :autoplay="3000" indicator-color="white" class="swipe">
        <van-swipe-item v-for="(item,index) in imgUrls.message" :key="index">
          <img :src="item.img" style="height:175px" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 列表分类区域-->
    <van-grid :border="false" :column-num="3">
      <van-grid-item v-for="(item,index) in catListImg" :key = "index" :to='item.path'>
        <van-image :src='item.src' style="width:40px;"/>
        <span class="listName">{{item.name}}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      active: "",
      imgUrls: [],
      catListImg: [
        {
          src: require("../assets/icon/NEWSHEADLINE.png"),
          name: "新闻资讯",
          path: "/newslist"
        },
        { src: require("../assets/icon/share.png"), name: "图片分享" ,path: '/index/photo'},
        { src: require("../assets/icon/SHOPPINGBAG.png"), name: "商品购物", path: '/goods/list' },
        { src: require("../assets/icon/comment.png"), name: "留言反馈" },
        { src: require("../assets/icon/Video.png"), name: "视频专区" },
        { src: require("../assets/icon/telephone.png"), name: "联系我们" }
      ]
    };
  },
  created() {
    this.getImgUrl();
  },
  methods: {
    getImgUrl() {
      this.$http.get("/api/getlunbo").then(res => {
        // console.log(res.data);
        this.imgUrls = res.data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.indexPage {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 40px;
}
.swipe {
  img {
    width: 100%;
  }
}
.listName {
  font-size: 12px;
   margin-top: 3px;
}
</style>