import request from '@utils/request'
const path = '/login'
// 暴露一个发送验证码的api接口函数
export const reqSendCode = (phone) => request({
  method: 'POST',
  url: `${path}/digits`,
  data: { phone }
})

// 暴露一个手机号码登录的api接口函数
export const reqPhoneLogin = (phone, code) => request({
  method: 'POST',
  url: `${path}/phone`,
  data: { phone, code }
})

// 暴露一个手机号和密码登录的api接口函数
export const reqPasswordLogin = (phone, password) => request({
  method: 'POST',
  url: `${path}/user`,
  data: { phone, password }
})

// 验证用户是否登录的api接口函数
export const reqCheckLogin = () => request({
  method: 'POST',
  url: `${path}/verify`,
})

