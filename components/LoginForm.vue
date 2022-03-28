<template>
  <form class="login-form" autocomplete="it-course-login-form" @submit.prevent="signInUser()">
    <CustomInputEmail
      v-model="formData.email"
      :label="'Email'"
      :uniq="`it-course-user-email`"
      :placeholder="'Ваш email'"
      :v="$v.formData.email"
    />
    <CustomInputPassword
      v-model="formData.password"
      :show-button="false"
      :label="'Пароль'"
      :placeholder="'Ваш пароль'"
      :v="$v.formData.password"
    />
    <div v-if="error" class="login-form__errors">
      {{ error }}
    </div>
    <custom-button
      :label="'Вход'"
      :type="'submit'"
      class="login-form__btn"
    />
    <a href="#" class="login-form__restore"> Забыли пароль? </a>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import { debounce } from 'lodash'
import CustomInputEmail from '@/components/common/CustomInputEmail'
import CustomInputPassword from '@/components/common/CustomInputPassword'

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
      email: {
        required,
        email,
        maxLength: maxLength(30),
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(25),
      },
    },
  },
  computed: {
    ...mapGetters('user', ['error']),

    email: (vm) => vm.formData.email,
    password: (vm) => vm.formData.password,
  },
  watch: {
    email(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.debouncedWatch(newValue, oldValue)
      }
    },
  },
  created() {
    this.debouncedWatch = debounce(() => {
      this.$v.formData.email.$touch()
    }, 1000)
  },
  beforeUnmount() {
    this.debouncedWatch.cancel()
  },
  methods: {
    ...mapActions('user', ['signInAction']),

    signInUser() {
      if (this.$v.$invalid) {
        this.$v.formData.$touch()
      } else {
        this.signInAction({
          email: this.formData.email,
          password: this.formData.password,
        })
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
    padding: 0 0 0 25px;
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