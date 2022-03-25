<template>
  <SfHeader
    data-cy="app-header"
    :search-value="term"
    :cart-items-qty="basketCount"
    :account-icon="accountIcon"
    class="sf-header--has-mobile-search"
    :search-placeholder="'Искать товары'"
    @click:cart="toggleCartSidebar2"
    @click:wishlist="toggleWishlistSidebar"
    @click:account="handleAccountClick"
    @enter:search="changeSearchTerm"
    @change:search="(p) => (term = p)"
  >
    <!-- TODO: add mobile view buttons after SFUI team PR -->
    <template #logo>
      <nuxt-link
        data-cy="app-header-url_logo"
        to="/catalog"
        class="sf-header__logo"
      >
        STORENAME
      </nuxt-link>
    </template>
    <template #navigation>
      <SfHeaderNavigationItem
        class="nav-item"
        data-cy="app-header-url_women"
        label="Женское"
        link="#"
      />
      <SfHeaderNavigationItem
        class="nav-item"
        data-cy="app-header-url_men"
        label="Мужское"
        link="#"
      />
      <SfHeaderNavigationItem
        class="nav-item"
        data-cy="app-header-url_men"
        label="Детям"
        link="#"
      />
    </template>
  </SfHeader>
</template>

<script>
import { mapMutations } from 'vuex';
import { SfHeader } from '@storefront-ui/vue'
export default {
  name: 'TheHeader',
  components: {
    SfHeader,
  },
  methods: {
    ...mapMutations('basket', ['toggleCartSidebar', 'basketCount']),
    toggleCartSidebar2() {
      this.$router.push('/cart')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>