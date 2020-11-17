import Vue from 'vue'
import App from './App.vue'
import Vuerouters from 'vue-router'
import Routers from './routers'

Vue.use(Vuerouters)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router:Routers,
}).$mount('#app')
