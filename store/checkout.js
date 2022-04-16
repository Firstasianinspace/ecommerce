import { setField } from './helpers';

const state = () => ({
  paymentMethods: [],
  selectedCard: 'Новая карта',
});

const getters = {
  paymentMethods: ({ paymentMethods }) => paymentMethods,
  selectedCard: ({ selectedCard }) => selectedCard,
  userID(state, getters, rootState, rootGetters) {
    return rootGetters[`user/userID`]
  },
}

const actions = {
  async getPaymentMethods({ commit, getters }) {
    const { userID } = getters
    const response = await this.$axios.$get(`/api/get_cards_by_user_id?user_id=${userID}`);
    const uniqueItems = new Set(response);
    commit('setField', { field: 'paymentMethods', value: uniqueItems });
  },
  async setPaymentMethod({ commit }, payload) {
    await commit('setField', { field: 'selectedCard', value: payload })
  },
  async addPaymentCard({ commit }, payload) {
    await this.$axios.$post(`/api/buy2${payload}`);
  },
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
