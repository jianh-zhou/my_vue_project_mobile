import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由注册数组
import routes from './route'
// 声明使用vue-router组件
Vue.use(VueRouter)
//将路由组件对象暴露出去
export default new VueRouter({
  mode: 'history',
  routes
})