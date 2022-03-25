<template>
  <div class="select-payment-card">
    <div class="select-payment-card__selected">

    </div>
    
  </div>
</template>

<script>
export default {
  name: 'SelectPaymentCard',
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
</style>