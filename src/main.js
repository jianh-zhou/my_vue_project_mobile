import Vue from 'vue'
import App from './App.vue'
import './utils/vant'
// 引入路由器
import router from './router'
// 引入store对象
import store from './store'
Vue.config.productionTip = false
// 引入全局公共导航栏组件
import MyNavBar from '@/components/MyNavBar'
// 注册全局公共组件
Vue.component("MyNavBar", MyNavBar)
// 引入全局公共按钮组件
import TencentPhone from '@comp/TencentPhone'
Vue.component("TencentPhone", TencentPhone)
new Vue({
  render: h => h(App),
  router,//注册路由器
  store,//vuex
}).$mount('#app')
