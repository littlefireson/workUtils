import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/commom.css';
import ElementUI from 'element-ui';
import router from './router/router.js';
import store from './vuex/store';

Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
Vue.use(ElementUI);



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
