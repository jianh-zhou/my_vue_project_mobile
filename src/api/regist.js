// 引入request
import request from '@/utils/request'
const path = '/regist'
// 暴露一个手机号码验证的api接口函数
export const reqVerifyPhone = (phone) => request({
  method: 'POST',
  url: `${path}/verify_phone`,
  data: { phone }
})
// 暴露一个验证验证码的api接口函数
export const reqVerifyCode = (phone, code) => request({
  method: 'POST',
  url: `${path}/verify_code`,
  data: { phone, code }
})

