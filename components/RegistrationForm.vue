<template>
  <form class="login-form" autocomplete="it-course-login-form">
    <CustomInputEmail
      v-model="formData.email"
      :label="'Email'"
      :uniq="`it-course-user-email`"
      :placeholder="'Ваш email'"
      :v="$v.formData.email"
    />
    <CustomInputPassword
      v-model="formData.password"
      :label="'Пароль'"
      :placeholder="'Ваш пароль'"
      show-button
      :v="$v.formData.password"
    />
    <div v-if="error" class="login-form__errors">
      {{ error }}
    </div>
    <custom-button
      :label="'Зарегистрироваться'"
      class="login-form__btn"
      @click="signUpUser()"
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
  name: 'RegistrationForm',
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
    ...mapActions('user', ['signUpAction']),

    signUpUser() {
      if (this.$v.$invalid) {
        this.$v.formData.$touch()
      } else {
        this.signUpAction({
          email: this.formData.email,
          password: this.formData.password,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>