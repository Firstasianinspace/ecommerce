<template>
  <div class="payment-page container">
    <div class="payment-page-grid">
      <div class="payment-page-grid__column">
        <h6 class="shipping-form__title">Платеж в "Название магазина"</h6>
        <PaymentInfo v-bind="bindProps" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PaymentInfo from '@/components/PaymentInfo'

export default {
  name: 'PaymentPage',
  components: {
    PaymentInfo,
  },
  computed: {
    ...mapGetters('basket', ['basketTotal']),
    bindProps: (vm) => ({
      total: vm.basketTotal,
      sumTotal: vm.basketTotal,
    }),
  },
}
</script>

<style lang="scss" scoped>
.payment-page {
  padding: 50px 0 0 0;

  &-grid {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;

    &__column {
      grid-column: 2 / 2;
    }
  }
}
</style>