import VueRouter from 'vue-router'
import Vue from 'vue'
// 导入组件
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
// 操作用户信息工具模块
import auth from '@/utils/auth'
// 404组件
import NotFound from '@/views/404.vue'
// 设置模块
import Setting from '@/views/Setting.vue'
// 导入Article模块
import Article from '@/views/Article.vue'
Vue.use(VueRouter)

//路由 规则
const routes = [
    // 登录
    { path: '/login', component: Login },
    // 首页
    {
        path: '/',
        component: Home,
        // 二级路由
        children: [
            { path: '/', component: Welcome },
            { path: '/setting', component: Setting },
            { path: '/articles', component: Article },
        ]
    },
    // 除去上面的页面后其他页面显示
    { path: '*', component: NotFound }
]
const router = new VueRouter({ routes });
// 导航守卫
router.beforeEach((to, from, next) => {
    // 访问登录外的路径，并且此时没有登录
    const user = auth.getUser()//得到服务器返回的带有token的响应对象
    // 必须满足两个条件，没有to.path !== '/login'会死循环
    if (to.path !== '/login' && !user.token) return next('/login')
    //其他情况一概放行
    next()
})
export default router