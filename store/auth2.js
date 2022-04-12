import { setField } from './helpers';
// import { handleFirebaseAuthError } from '@/helpers/errors';

const state = () => ({
  access_token: null,
  id: null,
});

const getters = {
}

const actions = {
  async signInAction({ commit }, payload) {
    try {
      await this.$auth.loginWith('local', { data: payload })
        .then((response) => {
          let user = response.data.data.userID
          this.$auth.$storage.setUniversal('user', user, true)
          user = this.$auth.$storage.getUniversal('user')
          console.log(user)
        })
      // await this.$axios.post('/auth', payload).then((response) => {
      // commit('setField', { field: 'id', value: response.data.userID })
      // commit('setField', { field: 'access_token', value: response })
      // })
      // commit('setField', { field: 'id', value: userID })
      // commit('setField', { field: 'access_token', value: headers })
    } catch (e) {
      console.log(e)
    }
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
