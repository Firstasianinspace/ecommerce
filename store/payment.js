// import { isEmpty } from 'lodash';
import { setField } from './helpers';

const mockObject = {
  id: null,
  number: null,
  cvv: null,
  expiration_date: null,
  name: 'Новая карта',
  is_default: false
};

const state = () => ({
  paymentMethods: [],
  selectedCard: null,
});

const getters = {
  paymentMethods: ({ paymentMethods }) => paymentMethods,
  defaultCard: ({ paymentMethods }) => {
    if (paymentMethods.length === 0) return null
    return paymentMethods.filter((s) => s.is_default)
  },
  selectedCard(state, getters) {
    return state.selectedCard
  },
  userID(state, getters, rootState, rootGetters) {
    return rootGetters[`user/userID`]
  },
  itemsIDs(state, getters, rootState, rootGetters) {
    return rootGetters[`basket/itemsIDs`]
  },
  choosenOne(state, getters, rootState, rootGetters) {
    const { selectedCard, defaultCard, paymentMethods } = getters
    if (selectedCard) return selectedCard
    if (defaultCard) return defaultCard[0]
    return paymentMethods[0]
  },
}

const actions = {
  async getPaymentMethods({ commit, getters }) {
    const { userID } = getters
    const response = await this.$axios.$get(`/api/get_cards_by_user_id?user_id=${userID}`);
    const cardsArray = response.cards ? [...response.cards].concat(mockObject) : [].concat(mockObject)
    cardsArray.concat(mockObject)
    const uniqueCardsArray = [...new Set(cardsArray)]
    commit('setField', { field: 'paymentMethods', value: uniqueCardsArray });
  },
  async setPaymentMethod({ commit }, payload) {
    await commit('setField', { field: 'selectedCard', value: payload })
  },
  async addPaymentCard({ commit }, payload) {
    await this.$axios.$post(`/api/buy2`, payload);
  },
  async setDefaultPaymentCard({ commit, getters }) {
    const { selectedCard, userID } = getters
    const cardObject = {
      card_id: selectedCard.id,
      user_id: userID
    }
    await this.$axios.$post(`/api/set_default_card`, cardObject)
  },
  async buyItems({ commit, getters }, payload) {
    const { itemsIDs, userID } = getters

    const buyObject = {
      item_id: itemsIDs,
      user_id: userID,
    }
    await this.$axios.$post(`/api/buy2`, buyObject)
    // newArray.forEach(element => {
    //   this.$axios.$post(`/api/buy2`, element);
    // })
    // dispatch('basket/clearBasket', null, { root:true })
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
