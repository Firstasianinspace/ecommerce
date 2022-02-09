<template>
  <form class="shipping-form" autocomplete="new-form-itcourse">
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
        <label class="form-label">Адрес</label>
        <vue-dadata
          token="7cfe8e0d350eddb5b9c550019194bcabb315b1e4"
          placeholder="Адрес"
          :autocomplete="`new-form-field-it-course`"
        />
      </div>
    </div>
    <div class="shipping-form__row-single">
      <CustomInput
        v-model="shippingData.phone"
        :uniq="`phone-field-it-course`"
        :label="'Номер телефона'"
        :placeholder="'Номер телефона'"
        :type-prop="`phone`"
        :v="$v.shippingData.phone"
      />
    </div>
    <button class="testing" @click.prevent="submitShippingInfo">click!</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { required, maxLength } from 'vuelidate/lib/validators'
import VueDadata from 'vue-dadata'
import CustomInput from '@/components/common/CustomInput'

export default {
  name: 'ShippingForm',
  components: {
    CustomInput,
    VueDadata,
  },
  data: () => ({
    shippingData: {
      firstName: null,
      lastName: null,
      address: null,
      phone: null,
      shippingMethod: null,
    },
  }),
  validations: {
    shippingData: {
      firstName: { required, maxLength: maxLength(30) },
      lastName: { required, maxLength: maxLength(30) },
      streetName: { required, maxLength: maxLength(30) },
      city: { required, maxLength: maxLength(30) },
      phone: { required, maxLength: maxLength(30) },
      shippingMethod: { required, maxLength: maxLength(30) },
    },
  },
  methods: {
    ...mapActions('user', ['setShippingInfo']),

    submitShippingInfo() {
      this.setShippingInfo(this.shippingData)
    },
  },
}
</script>

<style lang="scss">
.shipping-form {
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
  &:focus {
    box-shadow: none;
    border-color: #000;
  }
}
</style>