<template>
  <form class="shipping-form" autocomplete="new-form-itcourse">
    <div class="shipping-form__column">
      <h5 class="shipping-form__title">Адрес доставки</h5>
      <div class="shipping-form__row">
        <CustomInput
          v-model="shippingData.firstName"
          :uniq="`name-field-it-course`"
          :label="'Имя'"
          :placeholder="'Ваше имя'"
          :v="$v.shippingData.firstName"
        />
        <CustomInput
          v-model="shippingData.lastName"
          :uniq="`lastname-field-it-course`"
          :label="'Фамилия'"
          :placeholder="'Ваша фамилия'"
          :v="$v.shippingData.lastName"
        />
      </div>
      <div class="shipping-form__row-single">
        <div class="form-field">
          <vue-dadata
            token="7cfe8e0d350eddb5b9c550019194bcabb315b1e4"
            placeholder="Адрес"
            :autocomplete="`new-form-field-it-course`"
          />
        </div>
      </div>
      <div class="shipping-form__row-single">
        <CustomInputPhone
          v-model="shippingData.phone"
          :error-model="$v.shippingData.phone"
        />
      </div>
      <!-- <div class="shipping-form__row">
        <input id="save-checkbox" v-model="shippingData.saveInfo" type="checkbox">
        <label for="save-checkbox">
          Сохранить данные
        </label>
      </div> -->
    </div>
    <div class="shipping-form__column">
      <h5 class="shipping-form__title">Дополнительная информация</h5>
      <CustomInput
        v-model="shippingData.additionalInfo"
        :uniq="`additional-info-field-it-course`"
        :label="'Пожелания к заказу'"
        :placeholder="'Пожелания к заказу'"
        :v="$v.shippingData.additionalInfo"
      />
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { required, maxLength } from 'vuelidate/lib/validators'
import VueDadata from 'vue-dadata'
import { RAW_PHONE_LENGTH } from '@/constants'
import CustomInputPhone from '@/components/common/CustomInputPhone'

export default {
  name: 'ShippingForm',
  components: {
    CustomInputPhone,
    VueDadata,
  },
  data: () => ({
    shippingData: {
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      additionalInfo: '',
      saveInfo: false,
    },
  }),
  validations: {
    shippingData: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      address: {
        required
      },
      phone: {
        required,
        phoneLength: (v) => v ? v.replace(/\D/g, '').length === RAW_PHONE_LENGTH : false,
      },
      additionalInfo: {
        maxLength: maxLength(50)
      },
    },
    formShippingValidationGroup: [
      'shippingData.fistName',
      'shippingData.lastName',
      'shippingData.address',
      'shippingData.phone'
    ],
  },
  // validations: {
  //   phone: {
  //     phoneLength: (v) =>
  //       v ? v.replace(/\D/g, '').length === RAW_PHONE_LENGTH : false,
  //   },
  //   name: {
  //     required,
  //   },
  //   email: {
  //     email,
  //   },
  //   code: {
  //     required,
  //   },
  //   pharmacistName: {
  //     required,
  //   },
  // },
  computed: {
    isFormValid() {
      return !this.$v.$invalid;
    },
    isPhoneValid() {
      return !this.$v.phone.$invalid;
    },
  },
  methods: {
    ...mapActions('user', ['setShippingInfo']),

    saveShippingInfo() {
      if (this.shippingData.saveInfo) {
        this.setShippingInfo(this.shippingData)
      }
    },
  },
}
</script>

<style lang="scss">
.shipping-form__title {
  font-size: 22px;
  padding: 25px 0;
}
.shipping-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 35px;

  &__row {
    display: flex;
    flex-direction: row;
    gap: 25px;
    & .form-field {
      flex: 1;
    }
    &-single {
      &.form-field {
        flex: 1;
      }
    }
  }
}

.vue-dadata__input {
  border: 1px solid #000;
  border-radius: 0 !important;
  height: auto;
  &:focus {
    box-shadow: none !important;
    border-color: #000;
  }
}
</style>