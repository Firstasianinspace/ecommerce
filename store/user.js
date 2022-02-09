import { setField } from './helpers';

const state = () => ({
  error: null,
  user: null,
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
  },
  paymentMethods: null,
});

const getters = {
  user: ({ user }) => user,
  error: ({ error }) => error,
  paymentMethods: ({ paymentMethods }) => paymentMethods,
};

const actions = {
  async signUpAction({ commit }, payload) {
    await this.$fire
      .auth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        commit('setField', { field: 'user', value: response });
      })
      .catch(error => {
        commit('setField', { field: 'error', value: error });
      });
  },
  async signInAction({ commit }, payload) {
    await this.$fire
      
      .auth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        commit("setUser", response.user);
      })
      .catch(error => {
        commit("setError", error.message);
      });
  },
  setShippingInfo({ commit }, shippingData) {
    commit('setField', shippingData)
  }
};

const mutations = {
  setField,
  setUser(state, payload) {
    state.user = payload;
  },
  setError(state, payload) {
    state.error = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
