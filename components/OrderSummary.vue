<template>
  <div class="order-summary">
    <div class="order-summary__header">
      <h6>Total</h6>
    </div>
    <div class="order-summary__body">
      <ul class="order-summary__list">
        <Property name="Всего" :value="pluralProducts" />
        <Property name="Доставка" :value="deliveryPrice" />
        <Property name="Итого" :value="total + ' руб.'" />
      </ul>
    </div>
    <div class="order-summary__footer">
      <CustomButton @click="handleClick">К оплате</CustomButton>
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
    deliveryPrice: () => 'Бесплатно',
  },
  methods: {
    handleClick() {
      this.$router.push('/checkout')
    },
  },
}
</script>

<style lang="scss">
.order-summary__list {
  & .property-field {
    &:last-of-type {
      padding: 15px 0 35px 0;
      border-top: 1px solid grey;
    }
  }
}
</style>