const state = {
    // localStorage.getItem('sidebarStatus') ? !!+localStorage.getItem('sidebarStatus') :
    opened: 1
}

const getters = {
    sidebarStatus: state => state.opened
}  

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.opened = !state.opened
    if (state.opened) {
      localStorage.setItem('sidebarStatus', 1)
    } else {
      localStorage.setItem('sidebarStatus', 0)
    }
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 