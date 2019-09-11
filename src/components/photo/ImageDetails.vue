<template>
  <div class="photoInfo-container">
    <h3>{{photoInfo.title}}</h3>
    <p class="subTitle">
      <span class="time">发表时间：{{photoInfo.add_time|dateForm }}</span>
      <span class="click">点击：{{photoInfo.click}} 次</span>
    </p>
    <hr />
    <!-- 图片缩略图 -->
    <div class="gizPhoto">
      <img
        class="preview-img"
        v-for="(item,index) in list"
        :key="item.src"
        :src="item.src"
        height="100"
        @click="$preview.open(index, list)"
      />
    </div>
    <!-- 图片内容区域 -->
    <div class="container" v-html="photoInfo.content" ></div>
    <!-- 评论区域  评论子组件 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>
<script>
// 导入评论子组件
import comment from '../Comment/comment.vue'
export default {
  data() {
    return {
      // 从路由中获取到的图片id
      id: this.$route.params.id,
      // 图片详情
      photoInfo: {},
      //  缩略图
      list: [],
      show: true,
      index: 0
    }
  },
  created() {
    this.getPhotoInfo(), this.getGizPhoto()
  },
  methods: {
    async getPhotoInfo() {
      //  获取图片详情
      const { data: res } = await this.$http.get('/api/getimageInfo/' + this.id)
      if (res.status === 0) {
        this.photoInfo = res.message[0]
      }
    },
    onChange() {},
    // 缩略图
    async getGizPhoto() {
      const { data: res } = await this.$http.get('/api/getthumimages/' + this.id)
      // console.log(res)
      if (res.status === 0) {
        //   循环每个图片数据,补全图片的宽和高
        res.message.forEach(item => {
          // this.list.push(item.src)
          item.w = 600
          item.h = 400
        })
        // console.log(this.list)
        // 把完整的数据保存到数组中
        this.list = res.message
      }
    }
  },
  
  components: {
    'comment-box': comment
  }
}
</script>
<style lang="less" scoped>
.photoInfo-container {
  margin-top:40px;
  margin-bottom: 50px;
  padding: 3px;
  overflow: hidden;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subTitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .container {
    font-size: 13px;
    line-height: 30px;
  }
  .gizPhoto {
    img {
      margin: 10px;
      box-shadow: 0 0 6px #999;
    }
  }
}
</style>