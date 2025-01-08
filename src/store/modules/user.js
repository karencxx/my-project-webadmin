import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, setUserInfo, removeUserInfo, getUserInfo } from '@/utils/auth'

const user = {
  namespaced: true,
  
  state: {
    token: getToken(),
    // name: '',
    // roles: [],
    userInfo: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
    // SET_NAME: (state, name) => {
    //   state.name = name
    // },
    // SET_ROLES: (state, roles) => {
    //   state.roles = roles
    // }
  },

  actions: {
    // 登录
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const { data } = response
            setToken(data.token)
            setUserInfo(data.userInfo)
            commit('SET_TOKEN', data.token)
            commit('SET_USER_INFO', data.userInfo)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.userInfo) {
          resolve(state.userInfo)
        } else {
          const userInfo = getUserInfo()
          commit('SET_USER_INFO', userInfo)
          resolve(userInfo)
        }
          // if (userInfo) {
          //   commit('SET_ROLES', userInfo.roles)
          //   commit('SET_NAME', userInfo.name)
          //   resolve(userInfo)
        // } else {
        //   reject('getInfo: roles must be a non-null array!')
          // }
        // getInfo(state.token)
        //   .then(response => {
        //     const { data } = response
        //     if (data.roles && data.roles.length > 0) {
        //       commit('SET_ROLES', data.roles)
        //     } else {
        //       reject('getInfo: roles must be a non-null array!')
        //     }
        //     commit('SET_NAME', data.name)
        //     resolve(data)
        //   })
        //   .catch(error => {
        //     reject(error)
        //   })
      })
    },

    // 登出
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            // commit('SET_ROLES', [])
            removeToken()
            removeUserInfo()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user 