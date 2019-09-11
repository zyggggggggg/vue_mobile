<template>
  <div id="newsinfo">
  <!-- 新闻详情 -->
    <div v-for="(item,index) in newsInfo.message" :key="index">
      <div class="text_container">
        <h4 class="title">{{item.title}}</h4>
        <hr />
        <p class="timeline">
          <span>发表时间：{{item.add_time | dateFormat}}</span>
          <span class="click">点击{{item.click}}</span>
        </p>
        <!-- 主体内容区域 -->
        <div class="content">
          <p v-html="item.content"></p>
        </div>
      </div>
    </div>
    <!-- 评论区 -->
   <Comment :id="this.id"></Comment>

  </div>
</template>

<script>
import Comment from './Comment/comment.vue'
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsInfo: []
    };
  },
  created() {
    this.getNewsInfo();
    this.getComments()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 获取新闻详情
    getNewsInfo() {
      this.$http.get("/api/getnew/" + this.id).then(res => {
        // console.log(res.data);
        this.newsInfo = res.data;
      });
    },
    // 获取评论列表
    getComments(){

    }
  },
  components:{
      Comment
  }
};
</script>
<style lang="less" scoped>
#newsinfo {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  // padding-top: 40px;
  margin-bottom: 60px;
}
.text_container {
  padding: 0 15px;
  color: cornflowerblue !important;
  .timeline {
      display: flex;
    //   justify-content: space-between;
      font-size: 13px;
      .click {
          margin-left: 15px;
      }
  }
  .content {
    color: #333;
  }
}
</style>
