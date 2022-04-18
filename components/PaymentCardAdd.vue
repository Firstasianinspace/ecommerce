<template>
  <div class="payment-card-form">
    <div class="payment-card">
      <div class="payment-card__column relative">
        <CustomInputCard
          v-model="$v.cardForm.number.$model"
          :error-model="$v.cardForm.number"
          :mask-type="'card-number'"
          :placeholder="'Номер карты'"
          class="payment-card__numbers"
        />
        <CustomInputCard
          v-model="$v.cardForm.date.$model"
          :error-model="$v.cardForm.date"
          :mask-type="'card-date'"
          :placeholder="'ММ / ГГ'"
          :label="'Действует до'"
          class="payment-card__date"
        />
        <CustomInput
          v-model="$v.cardForm.name.$model"
          :label="'Имя'"
          :placeholder="'Ваше имя'"
          :v="$v.cardForm.name"
        />
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
      <div class="payment-card__column">
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
      </div>
      <div class="payment-card__decor">
        <div class="payment-card__decor-front" />
        <div class="payment-card__decor-back" />
      </div>
    </div>
    <custom-button :label="'Продолжить'" class="payment-page__button" @click="handleClick" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { convertDate } from '@/helpers'
// import { getCardTypes } from '@/helpers'
import CustomInputCard from '@/components/common/CustomInputCard'

const dateValidations = (date) => {
  const month = date.slice(0, 2)
  const year = date.slice(-2)
  console.log(year)
  return month
}

export default {
  name: 'PaymentCardAdd',
  components: {
    CustomInputCard,
  },
  data: () => ({
    cardForm: {
      number: '',
      date: '',
      name: '',
      cvv: '',
    },
  }),
  validations: {
    cardForm: {
      number: {
        required,
        maxLength: maxLength(30),
      },
      date: {
        required,
        maxLength: maxLength(30),
      },
      name: {
        required,
        maxLength: maxLength(30),
      },
      cvv: {
        required,
        maxLength: minLength(3),
      },
    },
    creditCardValidationGroup: [
      'cardForm.number',
      'cardForm.date',
      'cardForm.cvv',
    ],
  },
  computed: {
    ...mapGetters('payment', ['userID', 'paymentMethods']),

    minCardMonth: () => new Date().getMonth(),
    minCardYear: () => new Date().getFullYear(),
    generateCardMask: () => '#### #### #### ####',
    maxMonth: (vm) => dateValidations(vm.cardForm.date),
    // getCardType: (vm) => getCardTypes(vm.cardForm.number),
  },
  methods: {
    ...mapActions('payment', ['addPaymentCard', 'getPaymentMethods', 'defaultPaymentCard']),

    isValid() {
      this.$v.creditCardValidationGroup.$touch()
      return !this.$v.creditCardValidationGroup.$error
    },
    async handleClick() {
      // console.log(convertDate(this.cardForm.date))
      const cardObject = {
        number: this.cardForm.number,
        cvv: this.cardForm.cvv,
        expiration_date: convertDate(this.cardForm.date),
        name: this.cardForm.name,
        user_id: this.userID,
      }
      await this.addPaymentCard(cardObject)
      await this.getPaymentMethods()
      await this.defaultPaymentCard({
        card_id: this.paymentMethods.at(-2).id,
        user_id: this.userID
      })
      await this.buyItems()
      this.$router.push('/success')
    }
  },
}
</script>

<style lang="scss">
.payment-card {
  position: relative;
  display: grid;
  grid-template-columns: 71.6% 28.4%;
  margin: 20px 0 0 0;

  &__decor {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;

    &-front {
      width: 350px;
      height: 216px;
      margin-bottom: 16px;
      padding: 12px 24px 28px;
      background-color: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      z-index: 2;
      position: relative;
    }

    &-back {
      display: block;
      position: absolute;
      top: 16px;
      right: 0;
      height: 216px;
      width: 350px;
      background-color: #f1f2f6;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      z-index: 1;

      &::before {
        content: '';
        display: block;
        top: 20px;
        height: 48px;
        width: 100%;
        position: absolute;
        background-color: #727275;
      }
    }
  }
}
.payment-page__button {
  margin: 90px 0 0 0;
}

// Payment Card fields
.payment-card {
  margin: 50px 0 0 0;
  height: 232px;

  & .form-field {
    &__input {
      border: none;
      border-bottom: 1px solid lightblue;
    }
  }

  &__numbers {
    padding: 80px 15px 30px 15px !important;
  }

  &__date {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-end;
    padding: 0 15px 0 0;

    & label {
      font-size: 14px;
      align-self: center;
      text-transform: unset;
    }

    & input {
      width: 25%;
      text-align: center;
    }
  }

  &__cvv {
    padding: 100px 15px;
    font-size: 14px;

    & p {
      font-size: 12px;
    }

    & input {
      padding: 10px 0;
      text-align: center;
    }
  }
}
</style>