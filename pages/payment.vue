<template>
  <div class="payment-page container">
    <div class="payment-page-grid">
      <div class="payment-page-grid__column">
        <h6 class="shipping-form__title">Платеж в "Название магазина"</h6>
        <PaymentInfo v-bind="bindProps" />
        <div class="payment-cards">
          <SelectCard :items="userCards" :choosen-one="selectedCardNumbers" />
        </div>
        <PaymentCardAdd v-if="addNewCard" />
        <PaymentCard v-else :card="choosenCard" />
        <custom-button v-if="!addNewCard" :label="'Продолжить'" class="payment-page__button" @click="handleClick" />
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
    ...mapGetters('payment', ['paymentMethods', 'selectedCard', 'choosenOne']),

    bindProps: (vm) => ({
      total: vm.basketTotal,
      sumTotal: vm.basketTotal,
    }),

    choosenCard: (vm) => vm.choosenOne,
    selectedCardNumbers: (vm) =>
      vm.choosenOne?.name === 'Новая карта' ? vm.choosenOne?.name : vm.choosenOne?.number,
    userCards: (vm) => vm.paymentMethods.filter((s) => s.name),
    addNewCard: (vm) => vm.selectedCard?.name === 'Новая карта',
  },
  mounted() {
    this.getPaymentMethods()
  },
  methods: {
    ...mapActions('payment', ['getPaymentMethods', 'buyItems', 'addPaymentCard']),

    async handleClick() {
      // if (this.addNewCard) {
      //   const cardObject = {
          
      //   }
      // }
      try {
        await this.buyItems()
        this.$router.push('/success')
      } catch (e) {
        console.log(e)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.payment-page {
  &-grid {
    padding: 50px 0;
    max-width: 690px;
    margin: 0 auto;
    &__column {
      padding: 50px 100px;
      border: 1px solid black;
    }
  }
  &__button {
    margin: 80px 0 0 0;
    z-index: 1000;
  }
}
</style>