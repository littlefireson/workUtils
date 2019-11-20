<template>
  <div class='header'>

    <el-menu :default-active="activeIndex2" :router='true' class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#252525" text-color="#fff" active-text-color="#d89e6d">
      <el-menu-item>
        <img class="logo" :src="webconfig.logo" alt="">
      </el-menu-item>
      <el-menu-item index="/home">
        首页
      </el-menu-item>
      <el-menu-item index="/myCase">
        我的案件
      </el-menu-item>
      <el-menu-item index="/person">
        个人中心
      </el-menu-item>
      <el-menu-item index="/help">
        帮助中心
      </el-menu-item>
      <el-menu-item index="/backMount">
        回款情况
      </el-menu-item>
      <el-menu-item index="/datepicker">
        时间计算器
      </el-menu-item>
    </el-menu>
    <!-- <img v-bind:src="imgSrc" alt="">
           <a href=""></a>
            <button></button>
            <button></button>
       -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      activeIndex2: "/home",
    };
  }, methods: {
    handleSelect (key, keyPath) {
    //  debugger;
      console.log(key, keyPath);
    },
    getActiveIndex () {
      // debugger;
       console.log(this.activeIndex2)
       var href = location.href.split('#')[1];
       this.activeIndex2 = href;
    }
  },
  computed: {
    ...mapState(["webconfig"]),
  },
  created () {
    this.$store.dispatch('getWebConfigList')

  },mounted(){
    this.getActiveIndex();
  }
};
</script>

<style lang="scss" scoped>
.header {
  .logo {
    height: 39px;
  }
  .el-menu.el-menu--horizontal {
    border: none !important;
    background: #111;
  }
}
</style>
