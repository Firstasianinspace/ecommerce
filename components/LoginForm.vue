<template>
  <form
    class="login-form"
    autocomplete="it-course-login-form"
    @submit.prevent="loginUser()"
  >
    <custom-input-login
      v-model="$v.email.$model"
      :error-model="$v.email"
      @input="handleInput"
    />
    <custom-input-password
      v-model="$v.password.$model"
      :error-model="$v.password"
      placeholder="Пароль"
      autocomplete="current-password"
      @input="handleInput"
    />
    <p
      v-if="errorFromServer"
      class="notification-message error-message"
      v-text="errorFromServer"
    />
    <custom-button :label="'Вход'" :type="'submit'" class="login-form__btn" />
    <a href="#" class="login-form__restore"> Забыли пароль? </a>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import required from 'vuelidate/lib/validators/required'
import { handleFirebaseAuthError } from '@/helpers'
import CustomInputLogin from '@/components/common/CustomInputLogin'
import CustomInputPassword from '@/components/common/CustomInputPassword'

export default {
  name: 'LoginForm',
  components: {
    CustomInputLogin,
    CustomInputPassword,
  },
  data: () => ({
    email: '',
    password: '',
    remember: false,
    errorFromServer: '',
  }),
  validations: {
    email: {
      required,
    },
    password: {
      required,
    },
    signInValidationGroup: ['email', 'password'],
  },
  computed: {
    ...mapGetters('user', ['error']),
  },
  methods: {
    ...mapActions('user', ['signInAction']),

    handleInput() {
      this.errorFromServer = ''
    },
    isValid() {
      this.$v.signInValidationGroup.$touch()
      return !this.$v.signInValidationGroup.$error
    },
    async loginUser() {
      if (!this.isValid()) return
      try {
        await this.signInAction({
          email: this.email,
          password: this.password,
        })
      } catch (error) {
        this.errorFromServer = handleFirebaseAuthError(error.code)
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