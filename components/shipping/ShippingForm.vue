<template>
  <form class="shipping-form">
    <div class="shipping-form__row">
      <CustomInput
        v-model="shippingData.firstName"
        :label="'Имя'"
        :placeholder="'Ваше имя'"
        :v="$v.shippingData.firstName"
      />
      <CustomInput
        v-model="shippingData.lastName"
        :label="'Фамилия'"
        :placeholder="'Ваша фамилия'"
        :v="$v.shippingData.lastName"
      />
    </div>
    <div class="shipping-form__row-single">
      <CustomInput
        v-model="shippingData.firstName"
        :label="'Адрес'"
        :placeholder="'Адрес'"
        :v="$v.shippingData.lastName"
      />
    </div>
    <div class="shipping-form__row">
      <CustomInput
        v-model="shippingData.firstName"
        :label="'Город'"
        :placeholder="'Город'"
        :v="$v.shippingData.lastName"
      />
      <CustomInput
        v-model="shippingData.firstName"
        :label="'Регион'"
        :placeholder="'Регион'"
        :v="$v.shippingData.lastName"
      />
    </div>
    <div class="shipping-form__row">
      <CustomInput
        v-model="shippingData.firstName"
        :label="'Индекс'"
        :placeholder="'Индекс'"
        :v="$v.shippingData.lastName"
      />
      <CustomInput
        v-model="shippingData.firstName"
        :label="'Страна'"
        :placeholder="'Страна'"
        :v="$v.shippingData.lastName"
      />
    </div>
    <div class="shipping-form__row-single">
      <CustomInput
        v-model="shippingData.firstName"
        :label="'Номер телефона'"
        :placeholder="'Номер телефона'"
        :v="$v.shippingData.lastName"
      />
    </div>
    <button class="testing" @click.prevent="submitShippingInfo">
      click!
    </button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import { required, maxLength } from 'vuelidate/lib/validators'
import CustomInput from '@/components/common/CustomInput'

export default {
  name: 'ShippingForm',
  components: {
    CustomInput,
  },
  data: () => ({
    shippingData: {
      firstName: null,
      lastName: null,
      streetName: null,
      city: null,
      province: null,
      zipCode: null,
      country: null,
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
      this.setShippingInfo(this.shippingData);
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>