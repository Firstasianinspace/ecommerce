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
    const data = await this.$axios.$get('http://193.168.48.193:8081/v1/items?offset=0&limit=50');
    const newArray = data.items.map((s) => {
      if (s.price) return s
      return ({
        ...s,
        price: 100500,
        discountPrice: 0,
      })
    })
    commit('setField', { field: 'products', value: newArray });
  },
  setSortOption({ commit }, option) {
    commit('setField', { field: 'activeOption', value: option })
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
