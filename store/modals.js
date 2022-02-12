const state = () => ({
  modals: [],
});

const getters = {
  active: ({ modals }) => (modals.length > 0 ? modals[0] : null),
  allOpenModals: ({ modals }) => modals,
};

const actions = {
  openModal: ({ commit }, payload) => commit('openModalMutation', payload),
  closeModal: ({ commit }, payload) => commit('closeModalMutation', payload),
};

const mutations = {
  openModalMutation: ({ modals }, payload) => modals.unshift(payload),
  closeModalMutation: (state, payload) => {
    const value = state.modals.filter((e) => e !== payload);
    console.log(value);
    state.modals = value
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
