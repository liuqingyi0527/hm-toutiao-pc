// 管理用户信息，身份认证信息，操作函数相关
// 设置用户信息
// 1、确定本地存储信息的方式：sessionStorage(关闭浏览器登录失效)
const KEY = 'hm-toutiao-pc-95-user'
/**
 * @param {Object} user-用户信息对象
 */
const setUser = (user) => {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
}
// 获取用户信息
const getUser = () => {
    //考虑KEY对应没有信息获取的是null,
    //执行getUser().id不会报错,undefined不会导致程序中断执行
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
}
// 删除用户信息
const delUser = () => {
    window.sessionStorage.removeItem(KEY)
}
export default { setUser, getUser, delUser }