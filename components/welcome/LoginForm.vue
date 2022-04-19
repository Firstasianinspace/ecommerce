<template>
  <div class="login-form">
    <label>Имя пользователя</label>
    <custom-input-login
      v-model="$v.email.$model"
      :error-model="$v.email"
      placeholder="Имя пользователя"
      @input="handleInput"
    />
    <label>Пароль</label>
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
    <custom-button :label="'Вход'" :type="'submit'" class="login-form__btn" @click="loginUser()"/>
  </div>
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
      // if (!this.isValid()) return
      try {
        await this.signInAction({
          username: this.email,
          password: this.password,
        })
      } catch (error) {
        this.errorFromServer = handleFirebaseAuthError(error.code)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  margin: 0 80px;
  & label {
    padding: 0 0 7.5px 0;
  }
  &__btn {
    padding: 12px 0;
    margin: 15px 0 0 0;
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
  padding: 0 0 10px 0;
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