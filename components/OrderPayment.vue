<template>
  <div class="order-payment">
    <h4>Способы оплаты</h4>
    <div v-if="paymentMethod === null" class="order-payment__empty">
      Нет доступных способов оплаты
      <custom-button
        :label="'Добавить способ оплаты'"
        class="classic-btn"
        @click="addPaymentMethod('credit-card')"
      />
    </div>
    <div v-else class="order-payment__methods">
      {{ lastFourDigits }}
    </div>
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
    ...mapGetters('user', ['paymentMethod']),

    lastFourDigits: (vm) => vm.paymentMethod?.cardNumber,

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