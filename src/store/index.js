import Vuex from 'vuex'
import Vue from 'vue'
// 引人对应的modules模块
import modules from './modules'
Vue.use(Vuex)
export default new Vuex.Store({
  modules
})  