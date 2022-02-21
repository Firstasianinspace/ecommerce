<template>
  <div class="order-review">
    <h4>Детали заказа</h4>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OrderDetails',
  computed: {
    ...mapGetters('user', ['paymentMethod', 'shippingData']),
    ...mapGetters('basket', ['basket', 'basketTotal']),
  },
}
</script>

<style lang="scss" scoped>
</style>