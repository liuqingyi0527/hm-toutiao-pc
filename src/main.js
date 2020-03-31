import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入路由 
import router from './router/index'
Vue.use(ElementUi)
// 导入配置好的axois
// 使用绝对路径就没问题，@ 代表src的绝对路径。补充：vue-cli下才可使用。
import axios from '@/api'
import plugin from '@/utils/plugin'
import '@/styles/index.less'
// 全局文件的导入
Vue.use(plugin)
Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载路由
  router
}).$mount('#app')
