// 进行axios二次封装:使用请求响应拦截器
import useUserStore from '@/store/modules/user'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 利用axios对象的create方法  创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
})

request.interceptors.request.use((config) => {
  let userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }

  // 返回配置对象，headers(请求头),给服务器携带公共参数
  return config
})
request.interceptors.response.use(
  (response) => {
    // 成功回调
    // 简化数据
    return response.data
  },
  (error) => {
    console.log(error)

    // 失败回调，一般处理http网络错误
    // 定义一个变量
    let message = ''
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TonKen过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务异常'
        break
      default:
        message = '网络异常'
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  }
)
// 导出request
export default request
