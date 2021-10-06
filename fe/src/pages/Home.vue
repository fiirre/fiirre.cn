<template>
  <div class="home">
    <div class="go-login" @click="goLogin">登录</div>
    <div class="title">F🔥🔥rre</div>
  </div>
</template>
<script lang="ts">
export default {
  methods: {
    goLogin() {
      this.$router.push('/login')
    },
  },
}
</script>
<style lang="scss" scoped>
.home {
  margin-top: 200px;
  .title {
    font-size: 40px;
  }
  .go-login {
    position: absolute;
    top: 20px;
    right: 0;
    width: 90px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
  }
}
</style>
