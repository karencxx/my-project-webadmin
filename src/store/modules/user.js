import { login, loginout } from '@/api/base'
const state = {
  token: localStorage.getItem('loginToken'),
  userInfo: localStorage.getItem('userInfo') || { name: '1'}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    localStorage.setItem('loginToken', token)
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // 登录
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      // TODO: 调用登录接口
      login(userInfo).then(res => {
        const data = res.data
        const tokenStr = 'test-token'
        localStorage.setItem('loginToken', tokenStr)

        commit('SET_TOKEN', tokenStr)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  
  // 获取用户信息
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      // TODO: 调用获取用户信息接口
      commit('SET_USER_INFO', {
        name: 'admin'
      })
      resolve()
    })
  },

  // 退出登录
  logout({ commit }) {
    commit('SET_TOKEN', '')
    commit('SET_USER_INFO', null)
    localStorage.removeItem('loginToken')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
} 