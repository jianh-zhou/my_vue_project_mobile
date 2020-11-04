<template>
  <div>
    <MyNavBar title="硅谷注册登录" />
    <van-form validate-trigger="onChange">
      <div class="phone-login-conutry">
        <van-field
          class="phone-login-ipt"
          v-model="phone"
          name="用户名/邮箱/手机号"
          placeholder="请输入手机号"
          autocomplete="off"
          :rules="[{ validator: vaildatorPhone, message: '请填写手机号' }]"
        />
        <span class="phone-login-country-btn">+86</span>
      </div>
      <van-field
        class="phone-login-code"
        v-model="password"
        placeholder="请输入密码"
        :rules="[{ validator: vaildatorPassword, message: '请填写密码' }]"
        :type="passwordView ? 'password' : 'text'"
      >
        <template #button>
          <span
            :class="
              'iconfont view ' + (!passwordView ? 'icon-browse' : 'icon-hide')
            "
            @click="passwordView = !passwordView"
          ></span>
          <span class="send-code">忘记密码</span>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :disabled="checkphone || checkpassword"
          @click="toLogin"
        >
          登 录
        </van-button>
      </div>
    </van-form>
    <div class="phone-login-other">
      <span class="password-login" @click="$router.push('/login/pwd')"
        >账户密码登录</span
      >
      <span class="phone-regist" @click="$router.push('/regist/verifyphone')"
        >手机快速注册</span
      >
    </div>
    <div class="third-party-login">
      <div class="iconfont icon-github"></div>
      <div class="iconfont icon-QQ"></div>
      <div class="iconfont icon-weixin"></div>
    </div>
    <p class="login-phone-tip">
      未注册的手机号验证后将自动创建硅谷账号, 登录即代表您已同意<a
        href="javascript:;"
        >硅谷隐私政策</a
      >
    </p>
  </div>
</template>

<script>
// 引入头部导航栏组件
import MyNavBar from '@comp/MyNavBar'
// 引入对应的正则表达式
import { PhoneReg, reg } from '@utils/reg'
// 引入发送验证码的api接口函数
import { reqPasswordLogin } from '@api/login'
// 引入vuex的辅助函数
import { mapState } from 'vuex'
// 引入store对象
// 引入vant对应组件
import { Field, Button, Toast, Form } from 'vant'
export default {
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Form.name]: Form,
  },
  name: 'LoginPhone',
  data() {
    return {
      phone: '', //手机号码
      password: '', //验证码
      checkphone: true, //检查手机号
      checkpassword: true, //检查验证码
      passwordView: true, //输入密码的显示方式
    }
  },
  // 组件挂载完毕的生命周期回调函数
  mounted() {},
  // 组件卸载后的生命周期回调函数
  computed: {
    ...mapState({
      token: (state) => state.user.user.token,
    }),
  },
  methods: {
    // 验证手机号的规则
    vaildatorPhone(val) {
      const result = PhoneReg.test(val)
      // console.log(result);
      this.checkphone = !result

      return result
    },
    // 验证验证码的规则
    vaildatorPassword(val) {
      const result = reg.test(val)
      this.checkpassword = !result
      return result
    },

    // 点击按钮进行密码的明密文切换

    // 点击进行登录或者注册的api接口函数
    async toLogin() {
     
      // 获取手机号和验证码
      const { phone, password } = this
      try {
        await this.$store.dispatch('getUserInforByPassword', {
          phone,
          password,
        })
        console.log(this.token, 111)
        // console.log(result)
        // 将对应的token设置为缓存
        // window.localStorage.setItem('token', result.user.token)
        window.localStorage.setItem('token', this.token)
        this.$router.replace('/home')
      } catch (e) {
        Toast(111111111)
      }
    },
  },
}
</script>

<style  scoped>
.phone-login-conutry {
  position: relative;
}
.phone-login-conutry .van-cell {
  font-size: 16px;
}
.phone-login-country-btn {
  position: absolute;
  z-index: 1;
  top: 30%;
  left: 6%;
}
.phone-login-ipt {
  width: 80%;
  margin: 0 60px;
}
.phone-login-code {
  width: 90%;
  padding-left: 24px;
  font-size: 16px;
}
.phone-login-code::after {
  content: '';
  display: block;
  width: 1px;
  height: 50px;
  background-color: #999;
  position: absolute;
  left: 230px;
  top: -3px;
}
.phone-login-other {
  width: 90%;
  margin: 0 auto;
  height: 180px;
  position: relative;
}
.phone-login-other::after {
  content: '';
  display: block;
  border-bottom: 1px solid #bbb;
  transform: scaleY(0.5);
  position: absolute;
  width: 98%;
  top: 160px;
}
.phone-login-other::before {
  font-size: 12px;
  content: '其他登录方式';
  position: absolute;
  top: 150px;
  width: 30%;
  margin: 0 36%;
  text-align: center;
  background-color: #fff;
  color: #aaa;
  z-index: 4;
}
.password-login {
  float: left;
}
.phone-regist {
  float: right;
}
.van-button--normal {
  font-size: 18px;
}
.third-party-login {
  margin: 20px auto;
  display: flex;
  justify-content: space-around;
  width: 60%;
  font-size: 20px;
}
.third-party-login .iconfont {
  font-size: 34px;
}
.third-party-login div {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ddd;
  text-align: center;
  line-height: 50px;
}
.login-phone-tip {
  width: 90%;
  margin: 0 auto;
  font-size: 14px;
  text-align: center;
  color: #aaa;
}
.send-code {
  border-radius: 20px;
  /* background-color: #999; */
}
.view {
  position: absolute;
  right: 100px;
  font-size: 24px;
}
</style>
