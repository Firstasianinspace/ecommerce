import { setField } from './helpers';

const state = () => ({
  isCartSidebarOpen: false,
  basket: [],
  totalPrice: null,
});

const getters = {
  isCartSidebarOpen: ({ isCartSidebarOpen }) => isCartSidebarOpen,
  basket: ({ basket }) => basket,
  basketCount: ({ basket }) => basket.length,
  basketTotal: ({ basket }) => {
    if (basket.length === 0) {
      return 0;
    }
    return basket.map(x => x.discountPrice === 0 ? x.price : x.discountPrice).reduce((a, b) => a + b)
  }
};

const actions = {
  addToBasket({ state, commit }, product) {
    commit('addToBasket', product)
  },
  removeFromBasket({ commit }, index) {
    commit('removeFromBasket', index)
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
  removeFromBasket(state, index) {
    state.basket.splice(index, 1)
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};