<template>
  <div
    class="header-services__item"
    @mouseover="showCart = true"
    @mouseleave="showCart = false"
    @click="handleClick"
  >
    <div class="header-services__cart">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        height="19"
        width="19"
      >
        <path
          d="M18 17.987V7H2v11l16-.013zM4.077 5A5.996 5.996 0 0110 0c2.973 0 5.562 2.162 6.038 5H20v14.986L0 20V5h4.077zm9.902-.005C13.531 3.275 11.86 2 10 2 8.153 2 6.604 3.294 6.144 4.995c.92 0 7.654.03 7.835 0z"
          fill="#FFF"
        />
      </svg>
      <div v-if="showBasketCount" class="header-services__cart-count">
        {{ quantity }}
      </div>
    </div>
    <transition>
      <HeaderCartList
        v-if="showExpandableCart"
        :products="products"
        :quantity="quantity"
        :basket-total="basketTotal"
      />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderCartList from '@/components/header/headerServices/cart/HeaderCartList'

export default {
  name: 'HeaderCart',
  components: {
    HeaderCartList,
  },
  data: () => ({
    showCart: true,
  }),
  computed: {
    ...mapGetters('basket', ['basket', 'basketCount', 'basketTotal']),

    products: (vm) => vm.basket,
    quantity: (vm) => vm.basketCount,
    showBasketCount: (vm) => vm.basketCount > 0,
    showExpandableCart: (vm) =>
      vm.showCart &&
      vm.quantity > 0 &&
      vm.$router.currentRoute.name !== 'checkoutPage',
  },
  methods: {
    handleClick() {
      this.$router.push('/cart')
    },
  },
}
</script>

<style lang="scss" scoped>
.header-services {
  &__cart {
    position: relative;
    cursor: pointer;
    &-count {
      position: absolute;
      top: 25%;
      right: 0;
      background: #fff;
      font-size: 12px;
      text-align: center;
      width: 100%;
    }
  }
}
</style>