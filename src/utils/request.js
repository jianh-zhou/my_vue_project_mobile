import axios from 'axios'
const request = axios.create({
  baseURL: '',
  timeout: 10000,
})
const messages = {
  401: '没有相关权限',
  403: '禁止访问',
  404: '没有找到相关资源,请检查'
}
request.interceptors.request.use((config) => {
  // config.headers['authorization'] = `Bearer${token}`
  return config
})
request.interceptors.response.use((response) => {
  // console.log(1);

  // 请求完成成功
  if (response.data.code === 20000) {
    return response.data.data
  } else {//响应成功,但是没有完成真正的功能
    return Promise.reject(response.data.message)
  }
}, (err) => {
  // console.dir(err);
  let message = '没有找到相关错误,请联系管理员'
  // 如果有返回对应响应
  if (err.response) {
    if (messages[err.response.status]) {
      message = err.response.status
    }
  } else {
    if (err.message.indexOf('Network err') !== -1) {
      message = '请检查网络连接'
    } else if (err.message.indexOf('timeout') !== -1) {
      message = '连接超时,请重试'
    }
  }
  return Promise.reject(message)
})
export default request