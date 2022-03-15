import { setField } from './helpers';

const state = () => ({
  products: [],
  activeOption: 'По умолчанию',
  sortOptions: [
    'По умолчанию',
    'Сначала дороже',
    'Сначала дешевле',
  ],
});

const getters = {
  products: ({ products }) => products,
  allCategories: ({ products }) => [...new Set(products.map((product) => product.category))],
  activeOption: ({ activeOption }) => activeOption,
  sortOptions: ({ sortOptions }) => sortOptions,
};

const actions = {
  async getProducts({ commit }) {
    const data = await this.$axios.$get('https://api.npoint.io/bc97aa3b90affca44a88');
    commit('setField', { field: 'products', value: data.items });
  },
  setSortOption({ commit }, option) {
    commit('setField', { field: 'activeOption', value: option })
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
