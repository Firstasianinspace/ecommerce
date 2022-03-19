<template>
  <div class="order-review">
    <h5 class="shipping-form__title">Детали заказа</h5>
    <OrderItems />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OrderItems from '@/components/OrderItems'

export default {
  name: 'OrderDetails',
  components: {
    OrderItems,
  },
  computed: {
    ...mapGetters('user', ['paymentMethod', 'shippingData']),
    ...mapGetters('basket', ['basket', 'basketTotal']),
  },
}
</script>

<style lang="scss" scoped>
</style>