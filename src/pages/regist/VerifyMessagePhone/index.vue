<template>
  <div>
    <MyNavBar title="硅谷注册" :goBack="goBack" />
    <p class="messageImg">
      <img src="./msg.png" alt="" />
    </p>
    <p class="reminder">
      我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话
    </p>
    <van-form validate-trigger="onChange">
      <van-field
        v-model="code"
        center
        clearable
        placeholder="请输入短信验证码"
        class="megInput"
        :rules="[{ validator }]"
      >
        <template #button>
          <van-button size="small" type="primary" round @click="toSendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
    </van-form>
    <van-button
      class="verify-code-btn"
      :disabled="isDisabled"
      text="下一步"
      @click="toRegistPhone"
    />
    <p class="query">遇到问题? 请 <span @click="gohome">联系客服</span></p>
  </div>
</template>

<script>
// 引入导航栏组件
import MyNavBar from '@comp/MyNavBar'
// 引入全局按钮组件
import TencentPhone from '@comp/TencentPhone'
// 引入发送验证码的api接口函数
import { reqSendCode } from '@api/login'
// 引入验证短信验证码的api接口函数
import { reqVerifyCode } from '@api/regist'
import { Field, Button, Toast, Form } from 'vant'
// 引入vuex的辅助函数
import { mapState } from 'vuex'
export default {
  name: 'VerifyMessagePhone',
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Form.name]: Form,
  },
  data() {
    return {
      code: '',
      isDisabled: true,
    }
  },
  // 计算属性
  computed: {
    ...mapState({ phone: (state) => state.phone.phone }),
  },
  // 组件挂载完毕的生命周期回调函数
  mounted() {
    // console.log(window.localStorage.getItem('phone'))
    // console.log(this.phone)
    // console.log(this.$route)
    this.validator()
    // console.log(this.phone);
    // 全局事件总线,在组件卸载之后,对应的方法并不会消失,但是页面刷新,所有方法会被干掉,因为对应的所有的东西都是重新加载,会把之前的东西全部干掉
    // const s = this.$bus.$on('phone', (phone) => {
    //   this.phone = phone
    //   console.log(1111, phone)
    //   // return phone
    // })
    // console.log(s)
  },

  methods: {
    goBack() {
      this.$router.back()
    },
    gohome() {
      this.$router.push('/')
    },

    // 下一步按钮,进行注册手机号
    async toRegistPhone() {
      console.log(this.phone)
      // const {
      //   code,
      //   $route: {
      //     params: { phone },
      //   },
      // } = this
      const { phone, code } = this
      try {
        // console.log(phone * 1, code * 1)
        await reqVerifyCode(phone * 1, code * 1)
        // 跳转到对应的填写密码页面,并且把手机号作为参数传递过去
        this.$router.push('/regist/verifypassword')
      } catch (err) {
        Toast(err)
        // console.log(err);
      }
    },

    // 点击发送验证码
    async toSendCode() {
      console.log(this.phone * 1)
      const phone = this.phone
      try {
        await reqSendCode(phone)
      } catch (err) {
        Toast(err)
      }
    },

    // 验证码规则校验
    validator(val) {
      const reg = /^\d{6}$/

      this.isDisabled = !reg.test(val)
      return reg.test(val)
    },
  },
}
</script>

<style  scoped>
.messageImg {
  text-align: center;
  /* height: 88px;
   */
  padding: 10px 0;
  margin-top: -20px;
}
.messageImg img {
  height: 70px;
}
.reminder {
  font-size: 16px;
  padding: 0 30px;
}
.megInput {
  padding: 0 30px 10px 30px;
}
/deep/.van-field__control {
  font-size: 18px;
}
.query {
  padding: 30px 40px;
  font-size: 14px;
  color: #888;
}
.query span {
  color: #3b7adb;
}
.verify-code-btn {
  margin: 40px 28px 0;
  width: 86%;
  border-radius: 30px;
  background-color: red;
  color: #fff;
}
</style>
