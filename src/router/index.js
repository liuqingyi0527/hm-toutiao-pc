import VueRouter from 'vue-router'
import Vue from 'vue'
// 导入组件
import Login from '../views/Login.vue'
Vue.use(VueRouter)

//路由 规则
const routes = [
    { path: '/login', component: Login }
]
const router = new VueRouter({ routes });
export default router