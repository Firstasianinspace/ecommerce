<template>
  <header class="header">
    <div class="header-inner">
      <nuxt-link
        class="header-logo"
        to="/catalog"
      > {{ storeName }} </nuxt-link>
      <HeaderSearch />
      <HeaderServices />
    </div>
  </header>
</template>

<script>
import HeaderSearch from '@/components/header/HeaderSearch'
import HeaderServices from '@/components/header/headerServices/HeaderServices'

export default {
  name: 'TheHeader',
  components: {
    HeaderSearch,
    HeaderServices,
  },
  computed: {
    storeName: () => 'StoreName',
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: #222;
  padding: 15px 0;

  &-inner {
    max-width: 1240px;
    padding: 0 16px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  &-logo {
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 22px;
  }

  &-search {
    flex-basis: 50%;
  }
}
</style>
