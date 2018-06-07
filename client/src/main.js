// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

// main difference from the normal file is the Buefy framework import

Vue.use(Buefy, {
  defaultIconPack: 'mdi'
})
Vue.use(VueSweetalert2)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
