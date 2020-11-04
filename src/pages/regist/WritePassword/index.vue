<template>
  <div>
    <MyNavBar title="硅谷注册" :goBack="goBack" />
    <p class="messageImg">
      <img src="./msg.png" alt="" />
    </p>
    <p class="reminder">请设置登录密码</p>
    <van-form validate-trigger="onChange">
      <div class="password-message">
        <van-field
          v-model="password"
          center
          clearable
          placeholder="请设置8-20位登录密码"
          class="megInput"
          :rules="[{ validator, message: '请输入正确内容' }]"
          :type="passwordView ? 'password' : 'text'"
        >
          <template #button>
            <span
              size="small"
              type="primary"
              round
              @click="passwordView = !passwordView"
              :class="
                'iconfont view ' + (!passwordView ? 'icon-browse' : 'icon-hide')
              "
            ></span>
          </template>
        </van-field>
      </div>
    </van-form>
    <p class="set-password-tips">
      密码由8-20位字母、数字或半角符号组成，不能是10位以下纯数字/字母/半角符号，字母需区分大小写
    </p>
    <van-button
      @click="toRegist"
      class="verify-password-btn"
      :disabled="isDisabled"
      >下一步</van-button
    >
    <p class="query">遇到问题? 请 <span @click="gohome">联系客服</span></p>
  </div>
</template>

<script>
// 引入导航栏组件
import MyNavBar from '@comp/MyNavBar'
// 引入验证短信验证码的api接口函数
import { reqRegistPhone } from '@api/regist'
// 引入验证密码的正则表达式
import { reg } from '@utils/reg'
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
      password: '', //动态的面试
      isDisabled: false, //按钮是否禁用
      passwordView: false, //密码的显示方式
    }
  },
  // 计算属性,获取到手机号
  computed: {
    ...mapState({ phone: (state) => state.phone.phone }),
  },
  methods: {
    goBack() {},
    gohome() {
      this.$router.push('/')
    },

    // 密码输入的验证函数
    validator(val) {
      // console.log(1)
      this.isDisabled = !reg.test(val)
      return reg.test(val)
    },

    //切换密码的显示方式
    toChangePasswordView() {
      this.passwordView = !passwordView
    },

    // 下一步按钮,进行注册手机号
    async toRegist() {
      const { phone, password } = this
      try {
        await reqRegistPhone(phone, password)
        // 跳转到主页
        this.$router.replace('/')
      } catch (err) {
        Toast(err)
        // console.log(err);
      }
    },
  },

  // 界面加载完毕的生命周期回调函数
  mounted() {
    this.validator()
  },
}
</script>

<style  scoped>
.set-password-tips {
  color: #999;
  padding: 0 40px;
  font-size: 14px;
}
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
  margin: 10px auto 30px;
  padding: 0 30px;
  text-align: center;
}
.megInput {
  position: absolute;

}
/deep/.van-field__control {
  font-size: 18px;
  width: 70%;
}
.query {
  padding: 30px 40px;
  font-size: 14px;
  color: #888;
}
.query span {
  color: #3b7adb;
}
.verify-password-btn {
  background-color: red;
  border-radius: 20px;
  width: 80%;
  text-align: center;
  border: none;
  height: 40px;
  color: #ffffff;
  margin: 0 30px;
}
.password-message {
  position: relative;
  padding: 0 30px 56px 30px;
}
.view{
  font-size: 24px;
}
</style>
