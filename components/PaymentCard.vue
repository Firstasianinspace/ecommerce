<template>
  <div class="existing-card">
    <!-- <h6 class="existing-card__title">
      {{ cardType }}
    </h6> -->
    <p class="existing-card__numbers">
      {{ cardNumbers | VMask(cardNumberMask) }}
    </p>
    <div class="payment-card__cvv">
      <p>Код безопасности</p>
      <CustomInputCard
        v-model="$v.cardForm.cvv.$model"
        :error-model="$v.cardForm.cvv"
        :mask-type="'card-cvv'"
        :placeholder="'CVV/CVC'"
        class="payment-card__cvv-input"
      />
    </div>
    <!-- <div class="card-logo">
      <custom-image
        v-if="getCardType"
        :key="getCardType"
        :src="
          'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +
          getCardType +
          '.png'
        "
        alt=""
        class="card-logo__typeImg"
      />
    </div> -->
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { getCardTypes, maskCardNumber } from '@/helpers'
import CustomInputCard from '@/components/common/CustomInputCard'

export default {
  name: 'PaymentCard',
  components: {
    CustomInputCard,
  },
  props: {
    card: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    cardForm: {
      cvv: null,
    },
  }),
  validations: {
    cardForm: {
      cvv: {
        required,
      },
    },
    creditCardValidationGroup: ['cardForm.cvv'],
  },
  computed: {
    getCardType: (vm) => getCardTypes(vm.card.number),
    cardName: (vm) => vm.card.name,
    cardNumbers: (vm) => maskCardNumber(vm.card?.number),
    dynamicLogo: () => 'https://picsum.photos/64/64',
    cardNumberMask: () => 'XXXX XXXX XXXX XXXX',
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
}

.card-logo {
  position: absolute;
  top: 25px;
  right: 25px;
  max-width: 64px;
  min-height: 64px;
}
</style>