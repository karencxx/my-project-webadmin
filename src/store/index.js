import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import app from './modules/app'

Vue.use(Vuex)

const getters = {
  sidebar: state => state.app.sidebar,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles
}

export default new Vuex.Store({
  modules: {
    user,
    app
  },
  getters
}) 