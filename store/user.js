import { setField } from './helpers';
import { handleFirebaseAuthError } from '@/helpers/errors';

const state = () => ({
  error: null,
  errors: [],
  user: null,
  userId: null,
  shippingData: null,
  paymentMethods: null,
  selectedCard: null,
});

const getters = {
  user: ({ user }) => user,
  error: ({ error }) => error,
  shippingData: ({ shippingData }) => shippingData,
  paymentMethods: ({ paymentMethods }) => paymentMethods,
  userId: ({ userId }) => userId,
  selectedCard: ({ selectedCard }) => selectedCard,
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
  async getPaymentMethods({ commit }, payload ) {
    const { createdAt } = payload
    // TO-DO слишком жесткая привязка, переделать
    const data = await this.$axios.$get(`/api/get_cards_by_user_id?user_id=${createdAt}`);
    const mockObject = {
      cvv: '777',
      expirationDate: '2025-03-24T23:24:28.380Z',
      id: '1',
      name: 'Aleksandr Rabdaev',
      number: 'Новая карта',
    }
    const newArray = data.cards.concat(mockObject);
    commit('setField', { field: 'paymentMethods', value: newArray });
  },  
  setPaymentMethod({ commit }, payload) {
    const newData = payload
    commit('setField', { field: 'selectedCard', value: newData })
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
