<template>
  <div class="checkout-page container">
    <div class="checkout-page-grid">
      <div class="checkout-page-content__left">
        <ProductCardHorizontal
          v-for="product in basket"
          :key="product.itemId"
          :product="product"
          @click:remove="removeFromBasket(index)"
        />
      </div>
      <div class="checkout-page-content__right">
        <OrderSummary
          :products="products"
          :sub-total="basketTotal"
          :total="basketTotal"
          :shipping-methods="null"
          :total-items="basketCount"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import OrderSummary from '@/components/OrderSummary'
import ProductCardHorizontal from '@/components/product/ProductCardHorizontal'

export default {
  name: 'CheckoutPage',
  components: {
    // SfSteps,
    // SfStep,
    OrderSummary,
    ProductCardHorizontal,
  },
  // middleware: 'emptyCart',
  data: () => ({
    active: 0,
    steps: ['Детали', 'Доставка', 'Оплата', 'Review'],
  }),
  computed: {
    ...mapGetters('basket', [
      'isCartSidebarOpen',
      'basket',
      'basketTotal',
      'basketCount',
    ]),
  },
  methods: {
    ...mapActions('basket', ['removeFromBasket']),

    removeHandler(product) {
      const products = [...this.products]
      this.products = products.filter((element) => element.itemId !== product.itemId)
    },
  },
}
</script>

<style lang="scss" scoped>
.checkout-page {
  padding: 50px 0 0 0;
  &-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 30px;
    position: relative;
  }

  &-content {
    &__left {
      padding: 25px;
      position: relative;
    }
    &__right {
      padding: 25px;
      background: #fafafa;
      max-height: 550px;
      position: sticky;
      top: 0;
    }
  }
}


</style>