<template>
  <div>
    <h1>我是{{ user.nickName }}</h1>
    <img :src="user.avatar" alt="" width="200" height="200" />
  </div>
</template>

<script>
import { Toast } from 'vant'
// 引入vuex的辅助函数
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    [Toast.name]: Toast,
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  async mounted() {
    await this.$store.dispatch('getUserInfo').catch((e) => {
      Toast(e)
    })
  },
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
</style>
