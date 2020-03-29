// 导出配置好的axios提供给main.js去使用
import axios from 'axios'
//导入auth获取用户信息模块
import auth from '@/utils/auth'
// 导入路由
import router from '@/router/index'
import JSONBINGINT from 'json-bigint'

// 1、进行axios的配置，将来这回又很多axios相关的配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// axios.defaults.headers.Authorization=`Bearer ${auth.getUser().token}`// 请求头配置token(但是刷新页面时候才能实现)

//2、 请求拦截器（类似于ajax的beforesend）
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 本 地存储的token追加
    const { token } = auth.getUser()//结构出token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
}, function (err) {
    // 对请求错误做些什么
    return Promise.reject(err);
});
// 3、添加响应拦截器(假的token情况)
axios.interceptors.response.use((res)=> {
    // 对响应数据做点什么
        return res;
},  (err)=> {
        // 监听状态码为401的时候拦截
    if (err.message && err.response.status === 401) {
        // 1、清除本地token
        auth.delUser()
        // 2、跳转到登录界面
        router.push('/login')
    }
    return Promise.reject(err);
});
//4、 转换响应格式
axios.defaults.transformResponse = [data => {
    // 进行格式转换 data有可能不是json格式  极端情况
    // return JSONBINGINT.parse(data) 可能会报错
    try {
      // 正常转换
      return JSONBINGINT.parse(data)
    } catch (e) {
      // 转换异常，还是使用原始数据
      return data
    }
  }]
export default axios