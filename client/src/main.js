import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes }from './routes'
import axios from 'axios'

axios.defaults.baseURL = 'http://server-todo.hasilpanen.com/api/'
axios.defaults.headers.get['Accepts'] = 'application/json'
// axios.defaults.headers.common['Authorization'] = 'fasfdsa'

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
});

export const eventBus = new Vue();

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
