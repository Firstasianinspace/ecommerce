<template>
  <header class="header">
    <div class="header-inner">
      <div class="header-info">
        <nuxt-link to="/">EN</nuxt-link>
        <nuxt-link to="/">Lookbook</nuxt-link>
        <nuxt-link to="/">Editorial</nuxt-link>
      </div>
      <nuxt-link
        class="header-logo"
        to="/catalog"
      >
      <custom-image
        :src="storeLogo"
        :alt="storeName"
      />
      </nuxt-link>
      <HeaderServices />
    </div>
  </header>
</template>

<script>
import HeaderServices from '@/components/header/headerServices/HeaderServices'

export const HEADER_LOGO_URL = '/img/hydra.svg';

export default {
  name: 'TheHeader',
  components: {
    HeaderServices,
  },
  computed: {
    storeName: () => 'StoreName',
    storeLogo: () => HEADER_LOGO_URL,
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 15px 0;

  &-inner {
    max-width: 1920px;
    padding: 0 80px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  &-info {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    & a {
      color: #000;
      margin: 0 30px 0 0;
      text-decoration: none;
    }
  }

  &-logo {
    justify-self: center;

    & .custom-image {
      max-width: 80px;
    }
  }

  &-search {
    flex-basis: 50%;
  }
}
</style>
