<template>
  <div>
    <div
      class="form-field form-field__password"
      :class="[{ showButton: showButton == true }, { hasError: v.$error }]"
    >
      <label v-if="label" class="form-label">{{ label }}</label>
      <input
        v-if="showPassword"
        v-model="password"
        value=""
        type="text"
        :placeholder="placeholder"
      />
      <input
        v-else
        v-model="password"
        value=""
        type="password"
        :placeholder="placeholder"
      />
      <div v-if="showButton" class="control">
        <div class="button-toggle" @click.stop="toggleShow()">
          <!-- <font-awesome-icon
            v-if="showPassword === true"
            :icon="['fas', 'eye-slash']"
          />
          <font-awesome-icon v-else :icon="['fas', 'eye']" /> -->
        </div>
      </div>
      <div v-if="v.$error" class="form-field__errors">
        <div v-if="!v.required">{{ label }} is a required field</div>
        <!-- <span v-if="!v.minLength">Password must have at least 6 letters.</span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    v: {
      type: Object,
      required: true,
    },
    showButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showPassword: false,
    }
  },
  computed: {
    password: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
