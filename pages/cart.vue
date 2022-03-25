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
        <!-- <SfSteps v-model="active" :steps="steps" can-go-back>
          <SfStep v-for="(step, key) in steps" :key="key" :name="step">
            <component :is="dynamicComponent" />
          </SfStep>
        </SfSteps>
        <custom-button
          :label="'Следующий шаг'"
          :class="dynamicClass"
          @click="nextStep()"
        /> -->
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
    <CreditCardModal />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import SfSteps from '@/components/SfSteps.vue'
import OrderSummary from '@/components/OrderSummary'
import ProductCardHorizontal from '@/components/ProductCardHorizontal'
// import SfStep from '@/components/SfStep.vue'
import CreditCardModal from '@/components/cardForm/CreditCardModal';

const details = () => import('@/components/details.vue');
const Shipping = () => import('@/components/Shipping.vue');
const OrderPayment = () => import('@/components/OrderPayment.vue');
const OrderReview = () => import('@/components/OrderReview.vue');

export default {
  name: 'CheckoutPage',
  components: {
    // SfSteps,
    // SfStep,
    OrderSummary,
    ProductCardHorizontal,
    CreditCardModal,
  },
  middleware: 'emptyCart',
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
    dynamicClass: (vm) => vm.active === 3 ? 'btn-checkout-buy' : 'btn-checkout-next',
    dynamicComponent() {
      if (this.active === 0) {
        return details
      }
      if (this.active === 1) {
        return Shipping
      }
      if (this.active === 2) {
        return OrderPayment
      }
      if (this.active === 3) {
        return OrderReview
      }
      return null
    },
  },
  methods: {
    ...mapActions('basket', ['removeFromBasket']),

    removeHandler(product) {
      const products = [...this.products]
      this.products = products.filter((element) => element.itemId !== product.itemId)
    },
    nextStep() {
      if (this.active === 3) {
        return null
      } else {
        this.active +=1
      }
    }
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