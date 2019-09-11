import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'
import axios from 'axios'
import './assets/css/global.css'


//VuePreview:引入vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview);

Vue.config.productionTip = false

// 配置请求的根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'
Vue.prototype.$http = axios

// 注册时间过滤器
// 参数：过滤器的名字，函数
// originVal就是我们要处理的时间数据
Vue.filter('dateForm',function(originVal){
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  // padStart()字符串函数 参数1：总长度为2，参数2：字符串不足2位，补0
  const m = (dt.getMonth() + 1 +'').padStart(2,'0')
  const d = (dt.getDate()+'').padStart(2,'0')

  const hh = (dt.getHours()+'').padStart(2,'0')
  const mm = (dt.getMinutes()+'').padStart(2,'0')
  const ss = (dt.getSeconds()+'').padStart(2,'0')
  // 返回模板字符串——yyyy-mm-dd hh:mm:ss 加上$符号就可以是const定义的
  return `${y}-${m}-${d} `
})

// 时间过滤器
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
