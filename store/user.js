import { setField } from './helpers';
// import { handleFirebaseAuthError } from '@/helpers/errors';

const state = () => ({
  // access_token: null,
  user: {},
  // userID: null,
});

const getters = {
  userID: ({ user }) => user.userID,
  // userID: () => this.$auth.user,
  // isAuthenticated: ({ state }) => state.auth.loggedIn,
  // loggedInUser: ({ state }) => state.auth.user
}

const actions = {
  async signInAction({ commit }, payload) {
    try {
      await this.$auth.loginWith('customStrategy', { data: payload })
    } catch (e) {
      console.log(e)
    }
  },
  async getUser({ commit }) {
    if (!this.$auth.user) return
    const userID = this.$auth.$storage.getUniversal('user')
    const user = await this.$axios.get(`/api/user?userID=${userID}`)
    commit('setField', { field: 'user', value: user.data })
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


// import { setField } from './helpers';
// // import { handleFirebaseAuthError } from '@/helpers/errors';

// const state = () => ({
//   error: null,
//   errors: [],
//   user: null,
//   userUid: null,
//   name: null,
//   surname: null,
//   phone: null,
//   address: null,
//   paymentMethods: [],
//   selectedCard: null,
// });

// const getters = {
//   user: ({ user }) => user,
//   error: ({ error }) => error,
//   shippingData: ({ shippingData }) => shippingData,
//   paymentMethods: ({ paymentMethods }) => paymentMethods,
//   selectedCard: ({ selectedCard }) => selectedCard,
//   basket(state, getters, rootState, rootGetters) {
//     return rootGetters[`basket/basket`]
//   },
//   userUid: ({ userUid }) => userUid,
// }

// const actions = {
//   async signUpAction({ commit, dispatch }, payload) {
//     await this.$fire
//       .auth.createUserWithEmailAndPassword(payload.email, payload.password)
//       .then(response => {
//         commit('setField', { field: 'user', value: response.user });
//         this.$router.push('/catalog');
//       })
//   },
//   async signInAction({ commit }, payload) {
//     commit('setField', { field: 'error', value: null });
//     await this.$fire
//       .auth.signInWithEmailAndPassword(payload.email, payload.password)
//       .then(response => {
//         commit('setField', { field: 'user', value: response.user });
//         this.$router.push('/catalog');
//       })
//   },
//   async setUserUid({ commit, getters }) {
//     const { user } = getters
//     const ref = this.$fire.firestore.collection('users').doc(user.uid)
//     try {
//       await ref.set({
//         user_id: Date.now()
//       })
//     } catch (e) {
//       console.log(e)
//     }
//   },
//   async getUserUid({ commit, getters }) {
//     const { user } = getters
//     const ref = await this.$fire.firestore.collection('users').doc(user.uid).get('user_id')
//     if (ref.exists) {
//       const { user_id }  = ref.data()
//       commit('setField', { field: 'userUid', value: user_id })
//     } else {
//       console.log('Did not find user uid')
//     }
//   },
//   async setShippingInfo({ commit, getters }, payload) {
//     const { user } = getters
//     const ref = await this.$fire.firestore.collection('users').doc(user.uid)
//     try {
//       await ref.set({
//         address: payload.address,
//         name: payload.name,
//         surname: payload.surname,
//         phone: payload.phone,
//       })
//     } catch (e) {
//       console.log(e)
//     }
//   },
//   async getShippingInfo({ commit, getters }) {
//     const { user } = getters
//     const ref = await this.$fire.firestore.collection('users').doc(user.uid)
//     if (ref.exists) {
//       const { name }  = ref.data()
//       commit('setField', { field: 'name', value: name })
//     } else {
//       console.log('Did not find user name')
//     }
//   },
//   async getPaymentMethods({ commit, getters }) {
//     const { userUid } = getters
//     // TO-DO слишком жесткая привязка, переделать
//     const response = await this.$axios.$get(`/get_cards_by_user_id?user_id=${userUid}`);
//     const mockObject = {
//       cvv: '777',
//       expirationDate: '2025-03-24T23:24:28.380Z',
//       id: '1',
//       name: 'Aleksandr Rabdaev',
//       number: 'Новая карта',
//     }
//     const newArray = response.cards.concat(mockObject);
//     commit('setField', { field: 'paymentMethods', value: newArray });
//   },  
//   setPaymentMethod({ commit }, payload) {
//     const newData = payload
//     commit('setField', { field: 'selectedCard', value: newData })
//   },
//   async addPaymentCard({ commit }, payload) {
//     const data = await this.$axios.$post(`/buy2${payload}`);
//     commit('setField', { field: 'selectedCard', value: data })
//   },
//   buyItems({ commit, dispatch, getters }) {
//     const { basket, userUid } = getters
//     const newArray = basket.map((s) => ({
//       item_id: s.itemId,
//       user_id: userUid
//     }))
//     newArray.forEach(element => {
//       this.$axios.$post(`/api/buy2`, element);
//     })
//     // dispatch('basket/clearBasket', null, { root:true })
//   }
// };

// const mutations = {
//   setField,
// };

// export default {
//   state,
//   getters,
//   actions,
//   mutations,
// };
