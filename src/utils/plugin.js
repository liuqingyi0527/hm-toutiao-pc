// 基于vue的插件
import MyBread from '@/components/my-bread.vue'
import MyChannel from "@/components/my-channel"
export default {
    // Vue来源：main.js使用Vue.use(c插件)，调用install,传入Vue对象
    install(Vue) {
        // 基于Vue对象来
        // 将来，你有其他的全局组件，全局过滤器，全局自定义指令及原型属性或函数，都可以在这里进行扩展。
        Vue.component(MyBread.name, MyBread),
            Vue.component(MyChannel.name, MyChannel)

    }
}