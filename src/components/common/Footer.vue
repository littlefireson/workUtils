<template>
  <div id='footer'>
    <div class="footer-top">
      <img class="footer-top-logo" :src="webconfig.logo" alt="">
      <span>联系我们</span>|
      <span>新闻公告</span>|
      <span>友情链接</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(["webconfig"]),
  },
  created () {
    this.$store.dispatch('getWebConfigList')
  }
}
</script>

<style lang="scss" scoped>
$background: #333;
#footer {
  background-color: $background;
  min-height: 166px;
  padding-top: 1px;
  .footer-top {
    margin-top: 28px;
    margin-bottom: 20px;
    height: 39px;
    text-align: center;
    color:#fff;
    &-logo {
      height: 100%;
    }
    span{
      line-height:39px;
      color:#fff;
      margin:0 40px;
    }
  }
}
</style>