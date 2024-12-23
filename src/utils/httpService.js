import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'

const baseUrl = process.env.VUE_APP_BASE_URL || ''
const httpService = axios.create({
  baseURL: baseUrl + process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
httpService.interceptors.request.use(
  config => {
    // TODO 失效
    // if (store.getters.token) {
    //   config.headers['Authorization'] = `Bearer ${store.getters.token}`
    // }
    // 添加tenantId
    // config.headers['X-Tenant-Id'] = localStorage.getItem('tenantId') || ''
    
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
httpService.interceptors.response.use(
  response => {
    const { res: { code, message = message || 'Error'} } = response.data
    if (code !== 200) {
      Message({
        message,
        type: 'error',
        duration: 5 * 1000
      })
      
      // TODO 需要重新登录的情况
      if(code === 401) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('logOut').then(() => {
            // 为了重新实例化vue-router对象 避免bug
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(message))
    }
    return Promise.resolve(res)
  },
  error => {
    console.error('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default httpService 