import Vue from 'vue'
import VueRouter from 'vue-router'
// 二次封装对应的push
const push = VueRouter.prototype.push
VueRouter.prototype.push = function (url, successCB, errorCB) {
  successCB = () => { }
  errorCB = () => { }
  return push.call(this, url, successCB, errorCB)
}
// 二次封装对应的replace
const replace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (url, successCB, errorCB) {
  successCB = () => { }
  errorCB = () => { }
  return replace.call(this, url, successCB, errorCB)
}
// 引入路由注册数组
import routes from './route'
// 声明使用vue-router组件
Vue.use(VueRouter)
//将路由组件对象暴露出去
export default new VueRouter({
  mode: 'history',
  routes
})