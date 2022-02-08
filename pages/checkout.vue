<template>
  <div class="checkout-page container">
    <div class="checkout-page-grid">
      <div class="checkout-page-content__left">
        <SfSteps v-model="active" :steps="steps" can-go-back>
          <SfStep v-for="(step, key) in steps" :key="key" :name="step">
            <component :is="dynamicComponent" />
          </SfStep>
        </SfSteps>
      </div>
      <div class="checkout-page-content__right">
        <SfOrderSummary
          :products="products"
          :sub-total="subTotal"
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
import SfSteps from '@/components/SfSteps.vue'
import SfOrderSummary from '@/components/SfOrderSummary'
import SfStep from '@/components/SfStep.vue'

const details = () => import('@/components/details.vue');
const Shipping = () => import('@/components/Shipping.vue');

export default {
  name: 'CheckoutPage',
  components: {
    SfSteps,
    SfStep,
    SfOrderSummary,
  },
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
    dynamicComponent() {
      if (this.active === 0) {
        return details
      }
      if (this.active === 1) {
        return Shipping
      }
      return null
    },
  },
  methods: {
    ...mapActions('basket', ['removeFromBasket']),
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
      border: 1px solid lightgrey;
    }
    &__right {
      padding: 25px;
      border: 1px solid lightgrey;
      max-height: 550px;
      position: sticky;
      top: 0;
    }
  }
}
</style>