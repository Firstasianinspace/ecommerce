<template>
  <form class="login-form" @submit.prevent="registerUser()">
    <custom-input
      v-model="$v.formData.email.$model"
      :error-model="$v.formData.email"
      :error-message="errorMessages.email"
      filled-icon
      autocomplete="username"
      type="email"
      placeholder="Электронная почта"
      @input="cleanupError"
    />
    <custom-input-password
      v-model="$v.formData.password.$model"
      :error-model="$v.formData.password"
      :error-message="errorMessages.password"
      filled-icon
      twins-left
      placeholder="Придумайте пароль"
      autocomplete="new-password"
      @input="cleanupError"
    />
    <custom-input-password
      v-model="$v.formData.passwordConfirm.$model"
      :error-model="$v.formData.passwordConfirm"
      filled-icon
      twins-right
      type="password"
      placeholder="Повторите пароль"
      autocomplete="new-password"
      @input="cleanupError"
    />
    <!-- <p class="form__hint">
      Пароль должен содержать более 8 символов, латинские буквы в верхнем и
      нижнем регистре, а также цифры
    </p> -->
    <p
      v-if="errorFromServer"
      class="notification-message error-message"
      v-text="errorFromServer"
    />
    <custom-button :label="'Зарегистрироваться'" class="login-form__btn" />

    <a href="#" class="login-form__restore"> Забыли пароль? </a>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import required from 'vuelidate/lib/validators/required'
import email from 'vuelidate/lib/validators/email'
import sameAs from 'vuelidate/lib/validators/sameAs'
import { handleFirebaseAuthError } from '@/helpers'
import CustomInputPassword from '@/components/common/CustomInputPassword'

const createErrorMessages = () => ({
  email: '',
  password: '',
})

export default {
  name: 'RegistrationForm',
  components: {
    CustomInputPassword,
  },
  data: () => ({
    formData: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    errorMessages: createErrorMessages(),
    errorFromServer: '',
  }),
  validations: {
    formData: {
      email: {
        email,
      },
      password: {
        required,
      },
      passwordConfirm: {
        required,
        passwordIsSame: sameAs('password'),
      },
    },
    signUpValidationGroup: [
      'formData.email',
      'formData.password',
      'formData.passwordConfirm',
    ],
  },
  methods: {
    ...mapActions('user', ['signUpAction']),

    isValid() {
      this.$v.signUpValidationGroup.$touch()
      return !this.$v.signUpValidationGroup.$error
    },
    async registerUser() {
      if (!this.isValid()) return
      try {
        await this.signUpAction({
          email: this.formData.email,
          password: this.formData.password,
        })
      } catch (error) {
        this.errorFromServer = handleFirebaseAuthError(error.code)
      }
    },
    cleanupError() {
      this.errorFromServer = ''
      this.errorMessages = createErrorMessages()
    },
  },
}
</script>

<style lang="scss" scoped>
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

  &__errors {
    padding: 0;
    margin: 0 25px 25px 0;

    &-item {
      font-size: 14px;
    }
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

  &.hasError {
    & input {
      border: 1px solid red;
    }
  }
}
</style>