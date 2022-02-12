<template>
  <div
    class="form-field form-field__password"
    :class="[{ hasError: v.$error }]"
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
    <div v-if="showButton" class="control" @click.stop="toggleShow()">
      <div class="button-toggle">
        <font-awesome-icon
            v-if="showPassword === true"
            :icon="['fas', 'eye-slash']"
          />
          <font-awesome-icon v-else :icon="['fas', 'eye']" />
      </div>
    </div>
      <ul v-if="v.$error"  class="form-field__errors">
        <li v-if="!v.required" class="form-field__errors-item">
          Обязательное поле
        </li>
        <li v-if="!v.minLength" class="form-field__errors-item">
          Минимум 6 символов.
        </li>
      </ul>
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
.form-field {
  &__password {
    position: relative;
  }

  & .control {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -38%);
    width: 10%;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
