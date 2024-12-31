const state = {
  transferData: {},
};

const mutations = {
  SET_TRANSFER_DATA: (state, data) => {
    state.transferData = data;
  },
};

const actions = {
  setTransferData: ({ commit }, data) => {
    commit("SET_TRANSFER_DATA", data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
