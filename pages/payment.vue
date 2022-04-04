<template>
  <div class="payment-page container">
    <div class="payment-page-grid">
      <div class="payment-page-grid__column">
        <h6 class="shipping-form__title">Платеж в "Название магазина"</h6>
        <PaymentInfo v-bind="bindProps" />
        <div class="payment-cards">
          <SelectCard :item-value="'Добавить новую'" :items="userCards" />
        </div>
        <PaymentCardAdd v-if="addNewCard" />
        <PaymentCard v-else :card="newestUserCard" />

        <custom-button :label="'Продолжить'" class="payment-page__button" @click="handleClick" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PaymentInfo from '@/components/PaymentInfo'
import SelectCard from '@/components/SelectCard.vue'
import PaymentCard from '@/components/PaymentCard'
import PaymentCardAdd from '@/components/PaymentCardAdd'

export default {
  name: 'PaymentPage',
  components: {
    PaymentInfo,
    SelectCard,
    PaymentCard,
    PaymentCardAdd,
  },
  computed: {
    ...mapGetters('basket', ['basketTotal']),
    ...mapGetters('user', ['user', 'paymentMethods', 'selectedCard']),

    bindProps: (vm) => ({
      total: vm.basketTotal,
      sumTotal: vm.basketTotal,
    }),

    userCards: (vm) => vm.paymentMethods,
    newestUserCard: (vm) => vm.selectedCard,
    addNewCard: (vm) => vm.selectedCard?.number === 'Новая карта',
  },
  mounted() {
    this.getPaymentMethods(this.user)
  },
  methods: {
    ...mapActions('user', ['getPaymentMethods']),
    handleClick() {
      console.log('hi')
    }
  },
}
</script>

<style lang="scss" scoped>
.payment-page {
  &-grid {
    padding: 50px 240px;
    margin: 0 auto;
    &__column {
      padding: 50px 120px;
      border: 1px solid black;
    }
  }
  &__button {
    margin: 30px 0 0 0;
  }
}
</style>