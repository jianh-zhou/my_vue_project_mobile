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
margin-bottom: 20px;
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
