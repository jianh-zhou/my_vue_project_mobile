export default {
  // 包含多个数据状态的对象
  state: {
    phone: window.localStorage.getItem('phone') || ''
    // phone:  ''
  },
  // 包含多个直接修改数据状态的方法的对象
  mutations: {
    GET_PHONE (state, phone) {
      state.phone = window.localStorage.getItem('phone')
    }
  }
}