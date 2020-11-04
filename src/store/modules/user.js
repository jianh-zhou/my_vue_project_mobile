//引入通过token登录的api接口函数,和手机密登录的api接口函数
import { reqCheckLogin, reqPasswordLogin } from '@api/login'
export default {
  state: {
    user: {},
    token: ''
  },
  mutations: {
    'GET_USER' (state, user) {
      // console.log(user);
      state.user = user
    },
    'GET_TOKEN' (state, token) {
      state.token = token
    }
  },
  actions: {
    // token
    async getUserInfo ({ commit }) {
      try {
        const result = await reqCheckLogin()
        // console.log(result);
        commit('GET_USER', result)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    //手机密码
    async getUserInforByPassword ({ commit }, { phone, password }) {
      try {
        // console.log(phone, password);
        const result = await reqPasswordLogin(phone, password)
        // console.log(result.user);
        commit('GET_USER', result.user.token)
      } catch (e) {
        // console.log(2321312);
        return Promise.reject(e)
      }
    },
  }
}