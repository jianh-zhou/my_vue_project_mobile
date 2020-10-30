<template>
  <div>
    <MyNavBar title="硅谷注册" :goBack="goBack" />
    <p class="messageImg">
      <img src="./msg.png" alt="" />
    </p>
    <p class="reminder">
      我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话
    </p>
    <van-field
      v-model="code"
      center
      clearable
      placeholder="请输入短信验证码"
      class="megInput"
    >
      <template #button>
        <van-button size="small" type="primary" round @click="toSendCode"
          >发送验证码</van-button
        >
      </template>
    </van-field>
    <TencentPhone
      :disabled="isDisabled"
      :verifyPhone="toRegistPhone"
      text="下一步"
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
import { Field, Button, Toast } from 'vant'
// 引入vuex的辅助函数
import { mapState } from 'vuex'
export default {
  name: 'VerifyMessagePhone',
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast,
  },
  data() {
    return {
      code: '',
      isDisabled: false,
    }
  },
  // 计算属性
  computed: {
    ...mapState({ phone: (state) => state.phone.phone }),
  },
  methods: {
    goBack() {},
    gohome() {
      this.$router.push('/')
    },

    // 下一步按钮,进行注册手机号
    async toRegistPhone() {
      // console.log(this.phone)
      const { phone, code } = this
      try {
        await reqVerifyCode(phone, code * 1)
      } catch (err) {
        Toast(err)
        // console.log(err);
      }
    },

    // 点击发送验证码
    async toSendCode() {
      console.log(this.phone * 1)
      try {
        await reqSendCode(this.phone * 1)
      } catch (err) {
        Toast(err)
      }
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
</style>
