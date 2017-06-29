import Vue from 'vue'
import App from './App'
import router from './router'
import blogcz from './plugins'

Vue.use(blogcz)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
