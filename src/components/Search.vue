<template>
  <div class="search">
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />

    <van-cell-group>
      <van-swipe-cell v-for="item in searchList" :key="item.id" :on-close="onClose">
        <van-cell :title="item.name" :value="'商品上架时间：' + item.ctime.substr(0, 10)" />
        <template slot="right">
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </van-cell-group>

    <div class="searchHistory">
      <span>搜索历史</span>
      <van-icon name="delete" v-on:click="clearHistory" />
    </div>
    <div class="historyTag">
      <van-tag v-for="(item, index) in historyList" :key="index">{{item.content}}</van-tag>
      <van-divider v-show="this.historyList.length === 0">暂无搜索历史</van-divider>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      // 存储查询历史的列表
      historyList: [],
      //   存储查询返回数据的列表
      searchList: []
    }
  },
  created() {
    if (sessionStorage.getItem('history')) {
      this.historyList = JSON.parse(sessionStorage.getItem('history'))
    }
  },
  methods: {
    async onSearch() {
      const { data: res } = await this.$http.get('/api/getprodlist')
      console.log(res)
      if (res.status !== 0) {
        this.$notify({ type: 'danger', message: '查询失败' })
      } else {
        this.searchList = res.message
        this.historyList.push({ content: this.value })
        sessionStorage.setItem('history', JSON.stringify(this.historyList))
      }
    },
    onCancel() {
      this.searchList = []
      this.value = ''
    },
    clearHistory() {
      this.historyList = []
      sessionStorage.removeItem('history')
      this.$toast('已清空')
    },
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case 'outside':
          instance.close()
          break
        case 'right':
          this.$dialog
            .confirm({
              message: '确定删除吗？'
            })
            .then(() => {
              this.delItem(instance._uid)
              instance.close()
              this.onCancel()
            })
          break
      }
    },
    async delItem(id) {
      const { data: res } = await this.$http.get('/api/delproduct/' + id)
      if (res.status !== 0) {
        this.$notify({ type: 'danger', message: '删除失败' })
      } else {
        this.$notify({ type: 'success', message: '删除成功' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell-group {
  position: absolute;
  width: 100%;
  z-index: 1;
}
.searchHistory {
  padding: 0 10px;
  height: 20px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.historyTag {
  margin-top: 20px;
  margin-left: 5px;
  .van-tag {
    margin: 0 5px;
  }
}
.search {
  margin-top: 40px;
}
</style>
