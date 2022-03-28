<template>
  <div class="header-services">
    <HeaderUser />
    <HeaderFavorites />
    <HeaderCart />
  </div>
</template>

<script>
import HeaderUser from '@/components/header/headerServices/user/HeaderUser'
import HeaderFavorites from '@/components/header/headerServices/favorites/HeaderFavorites'
import HeaderCart from '@/components/header/headerServices/cart/HeaderCart'

export default {
  name: 'HeaderServices',
  compnents: {
    HeaderUser,
    HeaderFavorites,
    HeaderCart,
  },
}
</script>

<style lang="scss" scoped>
.header {
  &-services {
    display: flex;
    align-items: center;
    flex-direction: row;
    &__item {
      display: flex;
      place-self: center;
      padding: 15px;
      position: relative;
    }
  }
}
</style>