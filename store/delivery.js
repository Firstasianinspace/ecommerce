import { setField } from './helpers';

const state = () => ({
  user: {
    isLoggedIn: false,
    data: null,
  },
  shippingData: {
    firstName: null,
    lastName: null,
    streetName: null,
    city: null,
    province: null,
    zipCode: null,
    country: null,
    phone: null,
    shippingMethod: null,
  }
});

const getters = {
  user: ({ user }) => user,
};

const actions = {
  fetchUser({ commit }, user) {
    commit('setField', user !== null);
    if (user) {
      commit('setField', {
        displayName: user.displayName,
        email: user.email
      });
    } else {
      commit('setField', null);
    }
  },
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
