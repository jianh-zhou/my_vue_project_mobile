<template>
  <div>
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="goBack"
      class="backBtn"
    />
  </div>
</template>

<script>
import { NavBar } from 'vant'
// 引入对应的api接口函数,进行验证滑块验证码
// import f from ''
export default {
  name: 'MyNavBar',
  components: {
    [NavBar.name]: NavBar,
  },
  props: {
    title: String,
    goBack: Function,
  },
}
</script>

<style scoped>
.backBtn{
margin-bottom: 40px;
}
/deep/.van-icon {
  color: #000;
  /* font-size: 18px; */
  font-weight: 700;
}
/deep/.van-nav-bar__title {
  font-size: 18px;
}
</style>
