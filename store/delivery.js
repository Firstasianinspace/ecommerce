import { setField } from './helpers';

const state = () => ({
  user: {
    isLoggedIn: false,
    data: null,
  },
  shippingData: {
    firstName: null,
    lastName: null,
    address: null,
    phone: null,
    shippingMethod: null,
  },
  suggestions: null,
});

const getters = {
  user: ({ user }) => user,
};

const actions = {
  setShippingInfo({ commit }, shippingData) {
    commit('setField', shippingData)
  }
};

const mutations = {
  setField,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
