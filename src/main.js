import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'

import Framework7 from 'framework7/framework7.esm.bundle.js';

import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'


// Import F7 Styles
import 'framework7/css/framework7.css';

// Import Icons and App Custom Styles
import './styles/icons.css';
import './styles/app.css';
import utils from './helpers'
import ls from './ls'

Framework7.use(Framework7Vue)

Vue.prototype.$utils = utils
Vue.prototype.$ls = ls
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    const el = document.body;
    el.classList.value = 'theme-dark color-theme-red '
  },
}).$mount('#app')
