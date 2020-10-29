
// 引入注册手机号码组件
// const Verifyphone = () => import('@/pages/regist/Verifyphone')
const Verifyphone = () => import('@pages/regist/Verifyphone')
// import moduleName from '@utils/'
const routes = [
  // 手机号码验证注册的组件
  {
    path: '/regist/verifyphone',
    component: Verifyphone
  }
]
export default routes