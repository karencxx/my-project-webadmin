import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import data from './modules/data'
import sidebar from './modules/sidebar'

Vue.use(Vuex)

const getters = {
  sidebarOpened: state => state.sidebar.opened,
  // avatar: state => state.user.avatar,
  // name: state => state.user.name,
  //  roles: state => state.user.roles,
  transferData: state => state.data.transferData
}

export default new Vuex.Store({
  modules: {
    user,
    data,
    sidebar
  },
  getters
}) 