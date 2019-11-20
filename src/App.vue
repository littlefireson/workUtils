<template>
  <div id='app'>
      <v-Header></v-Header>
      <router-view class="main"></router-view>
      <v-footer></v-footer>
  </div>
</template>

<script>
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import store from './vuex/store.js'
import baseUrl from './model/config.js'
export default {
  data () {
    return {
      key: '1',
      webconfig: {},
    }
  },
  methods: {
    // getWebConfig () {
    //   this.$http.get(`${baseUrl}/websiteConfig/list`).then((res) => {
    //       res.body.body.map((ele,ind)=>{
    //         if(ele.keyName == 'logo'){
    //           debugger;
    //           this.webconfig.logoSrc = baseUrl+'public/file/preview/'+ele.value;
    //         }
    //       })
    //     this.$store.commit('getWebConfig', this.webconfig);
    //   });
    // }
  },
  components: {
    'v-Header': Header,
    'v-footer': Footer
  },
  // store,
  created () {

  },
  mounted () {
    // var webconfig = this.$store.state.webconfig;
    //     var arr = Object.keys(webconfig);
    //     if(arr.length == 0){
    //       this.getWebConfig();
    //     }else{
    //       this.webconfig = webconfig;
    //     }
  }
}
</script>

<style lang="scss">
.main{
  padding:20px;
  min-height:460px;
}
</style>
