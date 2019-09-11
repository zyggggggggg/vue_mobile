<template>
  <div id="news">
  <!-- 新闻列表 -->
    <van-list >
      <van-cell v-for="(item,index) in newsList.message" :key="index">
        <router-link :to="'/newsinfo/'+item.id">
          <div class="newsList">
            <img :src="item.img_url" alt />
            <div class="newsRight">
              <span class="title">{{item.title}}</span>
              <div class="timeLine">
                <span>{{item.add_time | dateFormat}}</span>
                <span>点击:{{item.click}}次</span>
              </div>
            </div>
          </div>
        </router-link>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsList: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getNewsList() {
      this.$http.get("/api/getnewslist").then(res => {
        console.log(res.data);
        this.newsList = res.data;
      });
    }
  },
  created() {
    this.getNewsList();
  }
};
</script>
<style lang="less" scoped>
#news {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  // padding-top: 40px;
  margin-top: 40px;
  margin-bottom: 45px;
}
.newsList {
  display: flex;
  // justify-content: space-between;
  //  vertical-align: middle;
  img {
    width: 40px;
    height: 40px;
   
  }
  .newsRight {
    color: #333;
    margin-left: 8px;
    width: 200px;
    .timeLine {
      color: cornflowerblue;
      display: flex;
      justify-content: space-between;
    }
    .title {
      overflow: hidden;
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
