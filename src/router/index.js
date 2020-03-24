import VueRouter from 'vue-router'
import Vue from 'vue'
// 导入组件
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
Vue.use(VueRouter)

//路由 规则
const routes = [
    // 登录
    { path: '/login', component: Login },
    // 首页
    {
        path: '/',
        component: Home,
        children: [
            { path: '/', component: Welcome }
        ]
    }
]
const router = new VueRouter({ routes });
export default router