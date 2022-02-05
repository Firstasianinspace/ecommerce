import { setField } from './helpers';

const state = () => ({
  dialogs: [],
  products: [],
});

const getters = {
  products: ({ products }) => products,
};

const actions = {
  async getProducts({ commit }) {
    const data = await this.$axios.$get('https://api.npoint.io/7065dcc47bae35f189a6');
    commit('setField', { field: 'products', value: data.items });
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