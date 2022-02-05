<template>
  <div
  class="form-field"
  :class="{ 'hasError': v.$error }"
  >
    <label v-if="label" class="form-label">{{ label }}</label>
    <input
      :id="uniq"
      v-model="email"
      :name="uniq"
      value=""
      type="email"
      autocomplete="email"
      :placeholder="placeholder"
    />
    <div v-if="v.$error" class="form-field__errors">
      <div v-if="!v.required">Email is a required field</div>
      <div v-if="!v.email">Email is not a properly formatted email address</div>
      <div v-if="!v.maxLength">Email max length is 30 symbols</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    v: {
      type: Object,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Placeholder'
    },
    uniq: {
      type: String,
      default: 'uniq'
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    email: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
