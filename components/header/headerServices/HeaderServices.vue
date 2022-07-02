<template>
  <div class="header-services">
    <HeaderSearch />
    <HeaderUser />
    <HeaderCart />
  </div>
</template>

<script>
import HeaderUser from '@/components/header/headerServices/user/HeaderUser'
import HeaderSearch from '@/components/header/headerServices/favorites/HeaderSearch'
import HeaderCart from '@/components/header/headerServices/cart/HeaderCart'

export default {
  name: 'HeaderServices',
  compnents: {
    HeaderUser,
    HeaderSearch,
    HeaderCart,
  },
}
</script>

<style lang="scss">
.header {
  &-services {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;

    &__item {
      display: flex;
      align-items: center;
      margin: 0 0 0 30px;
      color: #000;
      margin: 0 30px 0 0;
      text-decoration: none;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.1em;
      text-transform: uppercase;

      & span {
        padding: 0 5px 0 0;
      }
    }
  }
}
// .header {
//   &-services {
//     display: flex;
//     align-items: center;
//     flex-direction: row;
//     &__item {
//       display: flex;
//       place-self: center;
//       padding: 15px;
//       position: relative;
//     }
//   }
// }
</style>