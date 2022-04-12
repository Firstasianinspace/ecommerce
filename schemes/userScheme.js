/* eslint-disable */
import {
  LocalScheme
} from '~auth/runtime'

export default class CustomScheme extends LocalScheme {
  async login(endpoint) {
    const response = await this.$auth.request(
      endpoint,
      this.options.endpoints.login
    ).then((response) => {
      console.log(response.headers['grpc-metadata-authorization'])
      const token = response.headers['grpc-metadata-authorization']
      this.$auth.strategy.token.set(token)
      let user = response.data.userID
      commit('setField', { field: 'userID', value: user })
      this.$auth.$storage.setUniversal('user', user, true)
      user = this.$auth.$storage.getUniversal('user')
    })
  }
  // Override `fetchUser` method of `local` scheme
  // async fetchUser (endpoint) {
  //   console.log(endpoint)
  //   // Token is required but not available
  //   // if (!this.check().valid) {
  //   //   return
  //   // }
  //   const test = `${endpoint}?userID=${1}`
  //   console.log(test)
  //   // User endpoint is disabled.
  //   // if (!this.options.endpoints.user) {
  //   //   this.$auth.setUser({})
  //   //   return
  //   // }

  //   // Try to fetch user and then set
  //   return this.$auth.requestWith(
  //     this.name,
  //     test,
  //     this.options.endpoints.user
  //   ).then((response) => {
  //     const user = getProp(response.data, this.options.user.property)
  //     console.log(test)
  //     console.log(user)
  //     // Transform the user object
  //     const customUser = {
  //       ...user,
  //       roles: ['user']
  //     }

  //     // Set the custom user
  //     // The `customUser` object will be accessible through `this.$auth.user`
  //     // Like `this.$auth.user.fullName` or `this.$auth.user.roles`
  //     this.$auth.setUser(customUser)
  //     console.log(response)
  //     return response
  //   }).catch((error) => {
  //     this.$auth.callOnError(error, { method: 'fetchUser' })
  //   })
  // }
}
