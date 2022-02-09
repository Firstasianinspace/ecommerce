<template>
  <form class="login-form">
    <CustomInputEmail
      v-model="formData.email"
      :label="'Email'"
      :placeholder="'Ваш email'"
      :v="$v.formData.email"
    />
    <CustomInputPassword
      v-model="formData.password"
      :label="'Пароль'"
      :placeholder="'Ваш пароль'"
      :v="$v.formData.password"
    />
    <custom-button
      :label="'Вход'"
      class="login-form__btn"
      @click="signInUser()"
    />
    <a href="#" class="login-form__restore"> Забыли пароль? </a>
    {{ errorAttempts }}
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import CustomInputEmail from '@/components/common/CustomInputEmail'
import CustomInputPassword from '@/components/common/CustomInputPassword'
import { ERROR_TOO_MANY_ATTEMPTS, ERROR_TOO_MANY_ATTEMPTS_RU, ERROR_INVALID_PASSWORD, ERROR_INVALID_PASSWORD_RU } from '@/helpers/constants';

export default {
  name: 'LoginForm',
  components: {
    CustomInputEmail,
    CustomInputPassword,
  },
  data: () => ({
    formData: {
      email: null,
      password: null,
    },
  }),
  validations: {
    formData: {
      email: { required, email, maxLength: maxLength(30) },
      password: { required, minLength: minLength(6), maxLength: maxLength(25) },
    },
  },
  computed: {
    ...mapGetters('user', ['error']),

    errorAttempts: (vm) => vm.error === ERROR_TOO_MANY_ATTEMPTS ? ERROR_TOO_MANY_ATTEMPTS_RU : null,
    errorWrongPassword: (vm) => vm.error === ERROR_INVALID_PASSWORD ? ERROR_INVALID_PASSWORD_RU : null,

  },
  methods: {
    ...mapActions('user', ['signInAction']),

    async signInUser() {
      try {
        await this.signInAction({ email: this.formData.email, password: this.formData.password })
        if (this.user) {
          this.$router.push('/catalog');
        } else {
          return null;
        }
      } catch (e) {
        alert(e);
      }
    },
  },
}
</script>

<style lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  margin: 0 80px;
  &__btn {
    padding: 12px 0;
    background: #222;
    color: #fff;
    border: none;
    text-transform: uppercase;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      background: #767676;
    }
  }
  &__restore {
    padding: 35px 0;
    text-align: center;
    font-size: 14px;
    color: #767676;
  }
}
/*
** Input field
*/
.form-field {
  display: flex;
  flex-direction: column;
  padding: 0 0 20px 0;
  & label {
    padding: 0 0 10px 0;
    text-transform: uppercase;
    font-weight: 700;
    color: #767676;
  }

  & input {
    padding: 12px 10px;
  }
}
</style>