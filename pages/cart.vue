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
          :basket-products="basket"
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
  name: 'CartPage',
  components: {
    OrderSummary,
    ProductCardHorizontal,
  },
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
      const basket = [...this.basket]
      this.basket = basket.filter((element) => element.item_id !== product.item_id)
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