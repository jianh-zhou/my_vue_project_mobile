<template>
  <div class="content">
    <van-button
      type="primary"
      class="next-btn"
      :disabled="disabled"
      @click="varify"
      >{{ text }}</van-button
    >
  </div>
</template>

<script>
import { Button, Toast } from 'vant'
// 引入对应的api接口函数
import { reqTencentVerify } from '@api/common'
export default {
  name: 'TencentPhone',
  components: {
    [Button.name]: Button,
    [Toast.name]: Toast,
  },
  // 接收数据
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '确定',
    },
    verifyPhone: {
      type: Function,
      default() {
        return () => {}
      },
    },
  },
  mounted() {
    // console.log(this)
  },
  methods: {
    // 腾讯验证码滑块的回调函数
    varify() {
      let appid = '2030765311' // 腾讯云控制台中对应这个项目的 appid
      const { verifyPhone } = this
      //生成一个滑块验证码对象
      let captcha = new TencentCaptcha(appid, async function (res) {
        // 用户滑动结束或者关闭弹窗，腾讯返回的内容
        if (res.ret === 0) {
          try {
            //发送腾讯验证码的要求
            await reqTencentVerify(res.randstr, res.ticket)
            // 调用父级组件传递过来的方法
            verifyPhone()
          } catch (err) {
            Toast(err)
          }
        } else {
          // 提示用户完成验证
        }
      })
      // console.log(captcha)
      // 滑块显示
      captcha.show()
    },
  },
}
</script>

<style scoped>
.next-btn {
  /* background-color: pink; */
  border-radius: 20px;
  width: 80%;
  text-align: center;
  border: none;
}
.content {
  text-align: center;
  margin-top: 20px;
}
</style>
