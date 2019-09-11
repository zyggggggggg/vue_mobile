<template>
  <div id="ReBox">
    <van-row>
      <van-col>
        <h4>发表评论</h4>
      </van-col>
    </van-row>
    <!-- <van-divider :style="{ borderColor: '#1989fa'}"></van-divider> -->
    <hr />
    <!--  -->
    <van-cell-group>
      <van-field v-model="writing"
                 type="textarea"
                 placeholder="请输入留言"
                 rows="1"
                 autosize />
    </van-cell-group>
    <!-- 评论 -->
    <!-- <textarea placeholder="请输入留言"
              id="remarkBox"
              v-model="writing"></textarea> -->
    <van-button type="info"
                @click="publish">发表评论</van-button>
    <ul v-for="(item,i) in remarkList"
        :key="i"
        class="remarkBox">
      <li>第{{i+1}}楼 &nbsp;&nbsp;用户:{{item.user_name}} 发表时间:{{item.add_time|dateFormat}}</li>
      <div>{{item.content}}</div>
    </ul>
    <van-button plain
                type="danger"
                class="btnStyle"
                @click="btnAll">加载更多</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      writing: '',
      remarkList: [],
      pageindex: 1

    }
  },
  created () {
    this.getRemarkList()
  },
  methods: {
    async getRemarkList () {
      const { data: res } = await this.$http.get(`api/getcomments/${this.$route.params.id}?pageindex=${this.pageindex}`)

      if (res.status !== 0) return false
      this.remarkList = res.message
      console.log(this.remarkList)
    },
    async publish () {
      // 内容为空
      if (this.writing.trim() === '') return false
      // 内容不为空，发送请求 ${this.$route.params.id}
      const { data: res } = await this.$http.post(`/api/postcomment/${this.$route.params.id}`, {
        //过滤敏感字
        content: this.writing.replace(/激情|gay/g, '**')
      })
      // 判断请求是否成功
      if (res.status !== 0) return false

      // 清空表单内容
      this.writing = ''
      // 刷新数据
      this.getRemarkList()
    },
    async btnAll () {
      this.pageindex++
      const { data: res } = await this.$http.get(`api/getcomments/${this.$route.params.id}?pageindex=${this.pageindex}`)
      // 判断请求是否成功
      if (res.status !== 0) return false
      // 追加数组
      this.remarkList.push(...res.message)
      console.log(this.remarkList)
    }
  }
}
</script>

<style lang="less" scoped>
#ReBox {
  margin-top: 40px;
  padding: 0 10px;
  position: relative;
  // min-height: 1366px !important;
}
.remarkBox {
  overflow: hidden;
}
.van-field {
  min-height: 100px;
  margin-top: 7px;
  border: 1px solid #ccc;
  margin-top: 7px;
}
li {
  width: 100%;
  padding: 5px;
  background-color: rgb(245, 209, 243);
  color: #333;
  font-size: 14px;
  margin: 10px 0;
}
.van-button {
  margin-top: 7px;
  width: 100%;
}
.btnStyle {
  position: absolute;
  width: 95%;
  // background-color: #1989fa;
  color: #fff;
  bottom: 50px;
}
</style>