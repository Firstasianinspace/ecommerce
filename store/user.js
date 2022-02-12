import { setField } from './helpers';
import { handleFirebaseAuthError } from '@/helpers/errors';

const state = () => ({
  error: null,
  errors: [],
  user: null,
  shippingData: {
    firstName: null,
    lastName: null,
    address: null,
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
        this.$router.push('/catalog');
      })
      .catch(error => {
        commit('setField', { field: 'error', value: handleFirebaseAuthError(error.code) });
      });
  },
  async signInAction({ commit }, payload) {
    commit('setField', { field: 'error', value: null });
    await this.$fire
      .auth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        commit('setField', { field: 'user', value: response.user });
        this.$router.push('/catalog');
      })
      .catch(error => {
        commit('setField', { field: 'error', value: handleFirebaseAuthError(error.code) })
      });
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
