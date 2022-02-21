import { setField } from './helpers';

const state = () => ({
  products: [],
});

const getters = {
  products: ({ products }) => products,
  allCategories: ({ products }) => [...new Set(products.map((product) => product.category))]
};

const actions = {
  async getProducts({ commit }) {
    const data = await this.$axios.$get('https://api.npoint.io/307094c9f6932e4631bf');
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
