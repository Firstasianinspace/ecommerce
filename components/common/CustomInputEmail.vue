<template>
  <div class="form-field" :class="{ hasError: v.$error }">
    <label v-if="label" :for="uniq" class="form-label">{{ label }}</label>
    <input
      :id="uniq"
      v-model="email"
      value=""
      type="email"
      :autocomplete="uniq"
      :placeholder="placeholder"
    />

    <ul v-if="v.$error" class="form-field__errors">
      <li v-if="!v.required" class="form-field__errors-item">
        Email обязательное поле
      </li>
      <li v-if="!v.email" class="form-field__errors-item">
        Email введен некорректно
      </li>
      <li v-if="!v.maxLength" class="form-field__errors-item">
        Email максимально 30 символов
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
    v: {
      type: Object,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Placeholder',
    },
    uniq: {
      type: String,
      default: 'uniq',
    },
    label: {
      type: String,
      default: '',
    },
  },
  computed: {
    email: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  watch: {},
}
</script>

<style lang="scss" scoped>
</style>
