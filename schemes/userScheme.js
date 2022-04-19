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
      const token = response.headers['grpc-metadata-authorization']
      this.$auth.strategy.token.set(token)
      let user = response.data.userID
      this.$auth.setUser(user)
      this.$auth.$storage.setUniversal('user', user, true)
      user = this.$auth.$storage.getUniversal('user')
    })
  }
}
