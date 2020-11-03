
// 引入注册手机号码组件
const Verifyphone = () => import('@pages/regist/Verifyphone')
// 引入短信验证码组件
const VerifyMessagePhone = () => import('@pages/regist/VerifyMessagePhone')
// 引入注册账号输入密码的组件
const WritePassword = () => import('@pages/regist/WritePassword')
const routes = [
  // 手机号码验证注册的组件
  {
    path: '/regist/verifyphone',
    component: Verifyphone,
    name: "verifyphone"
  },
  // 发送验证码
  {
    path: '/regist/verifycode',
    component: VerifyMessagePhone,
    name: 'verifyMessagePhone'

  },
  // 输入注册账号密码
  {
    path: "/regist/verifypassword",
    component: WritePassword,
    name: 'writePassword'
  }
]
export default routes