// 导出配置好的axios提供给main.js去使用
import axios from 'axios'

// 进行axios的配置，将来这回又很多axios相关的配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

export default axios