<template>
  <div class="order-payment">
    <h4>Способы оплаты</h4>
    <div class="order-payment__empty">
      Нет доступных способов оплаты
      <custom-button
        :label="'Добавить способ оплаты'"
        class="login-form__btn"
        @click="addPaymentMethod('credit-card')"
      />
    </div>
    <div class="order-payment__methods"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CreditCardModal from '@/components/cardForm/CreditCardModal';

export default {
  name: 'OrderPayment',
  componets: {
    CreditCardModal
  },
  computed: {
    ...mapGetters('user', ['paymentMethods']),
  },
  methods: {
    ...mapActions('modals', ['openModal']),

    addPaymentMethod(modalName) {
      this.openModal(modalName)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>