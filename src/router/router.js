import Vue from 'vue';
import VueRouter from 'vue-router'


Vue.use(VueRouter);

import Home from '../components/Home.vue'
import MyCase from '../components/myCase/Mycase.vue'
import Person from '../components/person/Person.vue'
import Help from '../components/help/Help.vue'
import BackMount from '../components/backMount/BackMount.vue'
import Datepicker from '../components/datepicker'
const routes = [
  { path: '/home', component: Home },
  { path: '/myCase', component: MyCase },
  { path: '/person', component: Person },
  { path: '/help', component: Help },
  { path: '/backMount', component: BackMount },
  { path: '/datePicker', component: Datepicker },
  { path: '/*', redirect: '/home' }

];

const router = new VueRouter({
  mode: 'hash',
  routes,
})

export default router;
