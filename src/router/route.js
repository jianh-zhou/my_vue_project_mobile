
// 引入注册手机号码组件
const Verifyphone = () => import('@pages/regist/Verifyphone')
// 引入短信验证码组件
const VerifyMessagePhone = () => import('@pages/regist/VerifyMessagePhone')
// 引入注册账号输入密码的组件
const WritePassword = () => import('@pages/regist/WritePassword')
// 引入手机号码登录的组件
const LoginPhone = () => import('@pages/login/LoginPhone')
// 引入密码登录的组件
const LoginPassword = () => import('@pages/login/LoginPassword')
// 引入主页组件
const Home = () => import('@pages/Home')
// 引入Country组件
const Country = () => import('@comp/Country')

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
    name: 'verifyMessagePhone',
    // 只有通过手机号码注册才能跳转到这个路由组件
    beforeEnter (to, from, next) {
      if (from.path === "/regist/verifyphone") {
        next()
      } else {
        next(from.path)
      }

    }
  },
  // 输入注册账号密码
  {
    path: "/regist/verifypassword",
    component: WritePassword,
    name: 'writePassword',
    //只有通过手机号码登录失败时和手机号注册跳转到设置密码的组件界面
    beforeEnter (to, from, next) {
      function check (path) {
        return from.path.indexOf(path) !== -1
      }
      if (check('/login') || check("/regist/verifycode")) {
        console.log(1);
        next()
      } else {
        // console.log(2);
        // console.log(from.path, to.path);
        next(from.path)
      }
    }
  },
  // 注册主页组件
  {
    path: "/home",
    component: Home,
    name: 'Home'
  },
  {
    path: "/login",
    component: LoginPhone,
    name: 'loginPhone'
  },
  {
    path: "/login/pwd",
    component: LoginPassword,
    name: 'loginPassword'
  },
  {
    path: "/common/countrypicker",
    component: Country,
    name: 'country'
  },
  //重定向
  {
    path: '/',
    redirect: '/login'
  }

]
export default routes