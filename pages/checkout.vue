<template>
  <div class="checkout-page container">
    <div class="checkout-page-grid">
      <ShippingForm />
      <OrderReview />
      <custom-button
        :label="'К оплате'"
        class="classic-btn btn-to-payment"
        @click="handleClick"
      />
    </div>
  </div>
</template>

<script>
import ShippingForm from '@/components/shipping/ShippingForm'
import OrderReview from '@/components/OrderReview'

export default {
  name: 'CheckoutPage',
  components: {
    ShippingForm,
    OrderReview
  },
  methods: {
    handleClick() {
      this.$router.push('/payment')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-to-payment {
  max-width: 220px;
  margin: 35px 0;
}
.checkout-page {
  padding: 50px 0 0 0;
  &-grid {
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