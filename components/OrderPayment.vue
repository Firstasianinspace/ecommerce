<template>
  <div class="order-payment">
    <h4>Способы оплаты</h4>
    <!-- <div class="order-payment__empty">
      Нет доступных способов оплаты
      <custom-button
        :label="'Добавить способ оплаты'"
        class="login-form__btn"
        @click="addPaymentMethod()"
      />
    </div> -->
    <div class="order-payment__methods"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'OrderPayment',
  computed: {
    ...mapGetters('user', ['paymentMethods']),
  },
  methods: {
    addPaymentMethod() {
      console.log('modal open');
    },
  },
}
</script>

<style lang="scss" scoped>
</style>