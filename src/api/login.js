import request from '@utils/request'
const path = '/login'
// 暴露一个发送验证码的api接口函数
export const reqSendCode = (phone) => request({
  method: 'POST',
  url: `${path}/digits`,
  data: { phone }
})