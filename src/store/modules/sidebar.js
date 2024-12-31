const state = {
  opened: true
}; 

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.opened = !state.opened
  }
}

const actions = {
  toggleSideBar: ({ commit }) => commit("TOGGLE_SIDEBAR"),
};


export default {
  namespaced: true,
  state,
  mutations,
  actions
} 