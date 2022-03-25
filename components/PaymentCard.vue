<template>
  <div class="existing-card">
    <h6 class="existing-card__title">
      {{ cardType }}
    </h6>
    <p class="existing-card__numbers">
      {{ cardNumbers }}
    </p>
    <div class="payment-card__cvv">
      <p>Код безопасности</p>
      <CustomInput
        v-model="formData.cardCvv"
        :uniq="`it-course-user-cvv`"
        :placeholder="'CVV/CVC'"
        :v="$v.formData.cardCvv"
        class="payment-card__cvv-input"
      />
    </div>
    <img :src="dynamicLogo" alt="" class="existing-card__logo" />
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { getCardTypes } from '@/helpers'

export default {
  name: 'PaymentCard',
  props: {
    card: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    formData: {
      cardCvv: 'CVV/CVC',
    },
  }),
  validations: {
    formData: {
      cardCvv: { required, minLength: minLength(3), maxLength: maxLength(3) },
    },
  },
  computed: {
    cardType: (vm) => getCardTypes(vm.card?.number),
    cardName: (vm) => vm.card?.name,
    cardNumbers: (vm) => vm.card?.number,
    dynamicLogo: () => 'https://picsum.photos/64/64',
  },
}
</script>
    

<style lang="scss">
.existing-card {
  padding: 32px 16px 32px 24px;
  margin: 20px 0 0 0;
  width: 350px;
  height: 216px;
  background-color: #f1f2f6;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  position: relative;
  // existing-card__numbers
  & h6 {
    font-size: 22px;
  }

  &__numbers {
    color: #888;
    font-size: 18px;
    padding: 10px 0 0 0;
  }

  & .payment-card__cvv {
    padding: 0;
    display: flex;
    flex-direction: column-reverse;

    & .form-field {
      max-width: 100px;
      padding: 25px 0 10px 0;

      & input {
        border-radius: 6px;
        height: 44px;
        padding: 11px 12px;
        border: 1px solid #d5d5d6;
        text-align: center;
      }
    }
  }

  &__logo {
    position: absolute;
    top: 25px;
    right: 25px;
  }
}
</style>