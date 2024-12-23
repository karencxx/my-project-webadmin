const state = {
  tenantId: localStorage.getItem('tenantId') || '',
  tenantInfo: null
}

const mutations = {
  SET_TENANT_ID: (state, id) => {
    state.tenantId = id
    localStorage.setItem('tenantId', id)
  },
  SET_TENANT_INFO: (state, info) => {
    state.tenantInfo = info
  }
}

const actions = {
  // 预留租户相关actions
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
} 