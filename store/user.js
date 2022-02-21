import { setField } from './helpers';
import { handleFirebaseAuthError } from '@/helpers/errors';

const state = () => ({
  error: null,
  errors: [],
  user: null,
  shippingData: null,
  paymentMethod: null,
});

const getters = {
  user: ({ user }) => user,
  error: ({ error }) => error,
  shippingData: ({ shippingData }) => shippingData,
  paymentMethod: ({ paymentMethod }) => paymentMethod,
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
  setShippingInfo({ commit }, payload) {
    commit('setField', { field: 'shippingData', value: payload })
  },
  setPaymentMethod({ commit }, payload) {
    commit('setField', { field: 'paymentMethod', value: payload })
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
