<template>
  <div class="test">
    <MyNavBar title="硅谷注册" :goBack="goBack"></MyNavBar>
    <van-form validate-trigger="onChange" class="form">
      <van-field
        v-model="phone"
        type="tel"
        label="+86"
        name="validator"
        placeholder="请输入手机号"
        class="phone-input"
        :rules="[{ validator }]"
      >
      </van-field>
      <van-icon name="arrow-down" class="arrow-down" />
      <TencentPhone
        :disabled="isDisabled"
        text="下一步"
        :verifyPhone="verifyPhone"
      />
    </van-form>
  </div>
</template>

<script>
import { Field, Icon, Button, Dialog, Form, Toast } from 'vant'
import TencentPhone from '@/components/TencentPhone'
//引入验证手机号的api接口函数
import { reqVerifyPhone } from '@api/regist'
export default {
  name: 'Verifyphone',
  // 注册组件
  components: {
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Dialog.Component.name]: Dialog.Component,
    [Form.name]: Form,
    TencentPhone,
    [Toast.name]: Toast,
  },
  data() {
    return {
      phone: 15330649175, //手机号码
      isDisabled: false, //按钮是否禁用
    }
  },
  methods: {
    goBack() {},
    // 表单验证的回调函数
    validator(val) {
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      this.isDisabled = !reg.test(val)
      return reg.test(val)
    },
    // 表单提交的回调函数
    // 提交验证手机号码是否主注册过的方法
    async verifyPhone() {
      try {
        const phone = this.phone
        // 验证手机号是否正确
        await reqVerifyPhone(phone)
        // 将手机号码设置为缓存
        // window.sessionStorage.setItem('phone', JSON.stringify(phone))
        // this.$store.commit('GET_PHONE', phone)
        // 发送验证码
        this.$bus.$emit('phone', phone)
        // await
        // 跳转到短信验证码的相关组件
        this.$router.push({
          name: 'verifyMessagePhone',
          params: { phone },
          meta: { phone },
        })  
      } catch (err) {
        Toast(err)
      }
    },
  },
  mounted() {
    Dialog.confirm({
      title: 'Mr.Zhou HObby',
      message:
        'Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动',
    }).catch(() => {
      // on cancel
    })
  },
}
</script>
<style  scoped>
.phone-input {
  font-size: 18px;
  margin-bottom: 20px;
}
.arrow-down {
  font-size: 16px;
  position: absolute;
  left: 60px;
  top: 12px;
  /* bottom: 550px; */
}
/deep/.van-field__label {
  width: 4.2em;
}
.form {
  position: relative;
}
</style>
