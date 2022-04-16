import { setField } from './helpers';

const state = () => ({
  isCartSidebarOpen: false,
  basket: [],
  totalPrice: null,
});

const getters = {
  isCartSidebarOpen: ({ isCartSidebarOpen }) => isCartSidebarOpen,
  basket: ({ basket }) => basket,
  isBasketEmpty: ({ basket }) => basket.length === 0,
  basketCount: ({ basket }) => basket.length,
  basketTotal: ({ basket }) => {
    if (basket.length === 0) {
      return 0;
    }
    return basket.map(x => parseInt(x.discount_price) ? parseInt(x.discount_price) : parseInt(x.price)).reduce((a, b) => a + b)
  }
};

const actions = {
  addToBasket({ state, commit }, product) {
    commit('addToBasket', product)
  },
  removeFromBasket({ commit }, index) {
    commit('removeFromBasket', index)
  },
  async clearBasket({ commit }) {
    await commit('setField', { field: 'basket', value: [] })
  }
};

const mutations = {
  setField,
  toggleCartSidebar(state) {
    state.isCartSidebarOpen = !state.isCartSidebarOpen
  },
  addToBasket(state, product) {
    state.basket.push(product);
  },
  updateQuantity(state, product) {
    
  },
  removeFromBasket(state, index) {
    state.basket.splice(index, 1)
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
