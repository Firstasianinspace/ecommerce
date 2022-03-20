<template>
  <ul class="payment-info">
    <Property name="Сумма" :value="totalValue + ' ₽'" />
    <Property name="Комиссия" :value="totalFees + ' ₽'" />
    <Property name="К списанию" :value="sumTotalValue + ' ₽'" />
    <ExpandableList :title="'Детали платежа'" chevron >
      <template #message>
        <ul class="payment-info__details">
          <Property name="Сумма" :value="totalValue + ' ₽'" />
          <Property name="Комиссия" :value="totalFees + ' ₽'" />
          <Property name="К списанию" :value="sumTotalValue + ' ₽'" />
        </ul>
      </template>
    </ExpandableList>
  </ul>
</template>

<script>
import ExpandableList from '@/components/common/ExpandableList'

export default {
  name: 'PaymentInfo',
  components: {
    ExpandableList
  },
  props: {
    total: {
      type: Number,
      default: () => 0,
    },
    fees: {
      type: Number,
      default: () => 0,
    },
    sumTotal: {
      type: Number,
      default: () => 0,
    },
  },
  computed: {
    totalValue: (vm) => vm.total,
    totalFees: (vm) => vm.fees,
    sumTotalValue: (vm) => vm.totalValue - vm.totalFees,
  },
}
</script>

<style lang="scss">
.payment-info {
  width: 50%;

  &__details {
    padding: 15px;
    background: #fafafa;
  }
}
</style>