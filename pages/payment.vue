<template>
  <div class="payment-page container">
    <div class="payment-page-grid">
      <div class="payment-page-grid__column">
        <h6 class="shipping-form__title">Платеж в "Название магазина"</h6>
        <PaymentInfo v-bind="bindProps" />
        <div class="payment-cards">
          <custom-select />
        </div>
        <custom-button
          :label="'Клик'"
          @click="handleClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PaymentInfo from '@/components/PaymentInfo'
import CustomSelect from '@/components/common/CustomSelect.vue'

export default {
  name: 'PaymentPage',
  components: {
    PaymentInfo,
    CustomSelect
  },
  data: () => ({
    selectedOption: null,
  }),
  computed: {
    ...mapGetters('basket', ['basketTotal']),
    bindProps: (vm) => ({
      total: vm.basketTotal,
      sumTotal: vm.basketTotal,
    }),
  },
  methods: {
    async handleClick() {
      const data = {
        title: "Белая кепка Puma Ess",
        description: "Бренд Reebok, основанный в 1895 году, использует весь свой опыт для сохранения позиции признанного законодателя уличной моды. Культовые кеды и высокие кроссовки этой марки обладают отличными рабочими характеристиками и выглядят одинаково хорошо и в повседневной жизни, и на спортивной площадке"
      }
      try {
        await this.$axios.$post('http://193.168.48.193:8081/v1/add', data);
      }
      catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.payment-page {
  padding: 50px 0 0 0;

  &-grid {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;

    &__column {
      grid-column: 2 / 2;
    }
  }
}
</style>