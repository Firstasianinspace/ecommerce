<template>
  <div class="admin-page container">
    <form @submit.prevent="addProductToDataBase()">
      <custom-input
        v-model="$v.addProduct.title.$model"
        :error-model="$v.addProduct.title"
        :error-message="errorMessages.title"
        filled-icon
        autocomplete="productName"
        type="text"
        placeholder="Название продукта"
        @input="cleanupError"
      />
      <custom-input
        v-model="$v.addProduct.description.$model"
        :error-model="$v.addProduct.description"
        :error-message="errorMessages.description"
        filled-icon
        autocomplete="ProductDesc"
        type="text"
        placeholder="Описание продукта"
        @input="cleanupError"
      />
      <custom-button :label="'Добавить'" :type="'submit'" class="login-form__btn" />
    </form>
  </div>
</template>

<script>
import required from 'vuelidate/lib/validators/required'

const createErrorMessages = () => ({
  email: '',
  password: '',
})

export default {
  name: 'AdminPage',
  data: () => ({
    addProduct: {
      title: null,
      description: null,
    },
    errorMessages: createErrorMessages(),
    errorFromServer: '',
  }),
  validations: {
    addProduct: {
      title: {
        required,
      },
      description: {
        required,
      },
    },
    addProductValidationGroup: [
      'addProduct.title',
      'addProduct.description',
    ],
  },
  methods: {
    isValid() {
      this.$v.addProductValidationGroup.$touch()
      return !this.$v.addProductValidationGroup.$error
    },
    async addProductToDataBase() {
      if (!this.isValid()) return
      try {
        const data = {
          title: this.addProduct.title,
          description: this.addProduct.description,
        }
        await this.$axios.post('/add', data);
        this.addProduct.title = null;
        this.addProduct.description = null;
      } catch (error) {
        console.log(error)
        this.errorFromServer = error.response
      }
    },
    cleanupError() {
      this.errorFromServer = ''
      this.errorMessages = createErrorMessages()
    },
  }
}
</script>

<style lang="scss" scoped>
</style>