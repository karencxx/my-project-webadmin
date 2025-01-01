import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router'
import CryptoJS from 'crypto-js'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 15000
})

// 是否启用加密
const enableEncrypt = process.env.VUE_APP_ENABLE_ENCRYPT === 'true'

// request拦截器
service.interceptors.request.use(
  config => {
    // 不需要token的白名单
    const whiteList = ['/admin/login', '/admin/logout']
    
    // 如果不在白名单中，则添加token
    if (!whiteList.includes(config.url)) {
      const token = getToken()
      if (token) {
        // 让每个需要认证的请求携带token
        // Bearer是JWT的认证头部信息
        config.headers['Authorization'] = 'Bearer ' + token
      }
    }
    if (enableEncrypt && config.method === 'post') {
      config.data = encrypt(config.data)
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    let res = response.data
    res.code = 200
    if (res.code !== 200) {
      // token 过期或无效
      if (res.code === 401) {
        MessageBox.confirm(
          '登录状态已过期，请重新登录',
          '系统提示',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/logout').then(() => {
            router.replace({
              path: '/login',
              query: { redirect: router.currentRoute.fullPath }
            })
          })
        }).catch(() => {
          // 用户点击取消按钮的处理
        })
      } else {
        Message({
          message: '出错了',
          type: 'error',
          duration: 5 * 1000
        })
        console.error(res.message)
      }
      return Promise.reject(new Error(res.message || '出错了'))
    }
    if (response.data.encrypted) {
      response.data = decrypt(response.data.data)
    }
    return res
  },
  error => {
    console.log('err' + error)
    Message({
      message: '出错啦',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

function encrypt(data) {
  return CryptoJS.AES.encrypt(data, 'secret-key').toString()
}

function decrypt(encrypted) {
  const bytes = CryptoJS.AES.decrypt(encrypted, 'secret-key')
  return bytes.toString(CryptoJS.enc.Utf8)
}

export default service 