// 基于vue的插件
import MyBread from '@/components/my-bread.vue'
export default {
    // Vue来源：main.js使用Vue.use(c插件)，调用install,传入Vue对象
    install(Vue) {
        // 基于Vue对象来
        Vue.component(MyBread.name, MyBread)
    }
}