import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入路由 
import router from './router/index'
Vue.use(ElementUi)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载路由
  router
}).$mount('#app')
