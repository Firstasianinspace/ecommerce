<template>
  <div class="order-summary">
    <div class="order-summary__header">
      <h6>Total</h6>
    </div>
    <div class="order-summary__body">
      <Property name="Всего" :value="pluralProducts" />
      <Property name="Доставка" :value="deliveryPrice" />
      <Property name="Итого" :value="total + ' руб.'" />
    </div>
    <div class="order-summary__footer">
      <CustomButton
        class="none"
        @click="$emit('click:back')"
        >В каталог</CustomButton
      >
    </div>
  </div>
</template>

<script>
import Property from '@/components/common/Property'
import { pluralProducts } from '@/helpers'

export default {
  name: 'OrderSummary',
  components: {
    Property,
  },
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
    basketProducts: {
      type: Array,
      default: null,
    },
    subTotal: {
      type: Number,
      default: null,
    },
    total: {
      type: Number,
      default: null,
    },
    totalItems: {
      type: Number,
      default: null,
    },
  },
  computed: {
    pluralProducts: (vm) => pluralProducts(vm.totalItems),
    deliveryPrice: (vm) => 'Бесплатно',
  },
}
</script>

<style lang="scss" scoped>
</style>