import request from '@utils/request'
const path = '/common'
//检验腾讯验证码的api的接口函数
export const reqTencentVerify = (randStr, ticket) => request({
  method: "POST",
  url: `${path}/verifycode`,
  data: { randStr, ticket }
})
//请求所有城市的api接口函数
export const reqAllCountry = () => request({
  method: "POST",
  url: `${path}/countryData`,

})