<template>
  <div
    :class="{
      'is-filled': isFilled,
      'is-twins': isTwins,
      'is-focused': isFocused,
      'is-price-filter': isPriceFilter,
      'with-inner-legend': legendInInput,
      'is-button': isButton,
    }"
    class="form-field"
  >
    <slot :input="input" />
    <div
      v-if="errorMessageInner"
      class="form-field__errors"
      v-text="errorMessageInner"
    />

    <div
      v-if="legend"
      :class="{
        'form-field__button': legendIsButton,
        'form-field__inner': legendInInput,
        'form-field__right': legendRight,
      }"
      class="form-field__legend"
      @click="() => legendIsButton && $emit('legend-clicked')"
    >
      {{ legend }}
    </div>
    <slot :input="input" name="after" />
  </div>
</template>

<script>
import { getError } from '@/helpers';

export default {
  name: 'CustomInputScope',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: [String, Number],
      default: '',
    },
    errorModel: {
      type: Object,
      default: () => ({}),
    },
    errorMessage: {
      type: String,
      default: '',
    },
    legend: {
      type: String,
      default: '',
    },
    legendRight: {
      type: Boolean,
      default: true,
    },
    legendIsButton: {
      type: Boolean,
      default: false,
    },
    isButton: {
      type: Boolean,
      default: false,
    },
    legendInInput: {
      type: Boolean,
      default: false,
    },
    filledIcon: {
      type: Boolean,
      default: false,
    },
    isPriceFilter: {
      type: Boolean,
      default: false,
    },
    useCustomFill: {
      type: Boolean,
      default: false,
    },
    hasBackgroundOnDisable: {
      type: Boolean,
      default: false,
    },
    placeholderInInput: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isFocused: false,
    };
  },
  computed: {
    preparedAttrs() {
      const {
        placeholder,
        name,
        autocomplete,
        value,
        type,
        disabled,
        readonly,
      } = {
        ...this.$attrs,
        ...this.$props,
      };
      const attrs = {
        placeholder,
        name,
        autocomplete,
        value,
        type,
        disabled,
        readonly,
      };
      if (this.placeholderInInput) delete attrs.placeholder;
      return attrs;
    },
    isFilled() {
      if (this.useCustomFill) return this.filledIcon;
      return !!this.value && this.filledIcon && !this.errorMessageInner;
    },
    isTwins() {
      return Object.keys(this.$attrs)
        .join('')
        .includes('twins');
    },
    errorMessageInner() {
      if (this.errorMessage) return this.errorMessage;
      const { $error, $params } = this.errorModel;
      if ($error) {
        const field = Object.keys($params).find(
          (s) => !this.errorModel[s] && getError({ field: s }),
        );
        return getError({ context: this.errorModel, field });
      }
      return '';
    },
    hasPlaceholderInInput() {
      if (!this.placeholderInInput) return false;
      return this.value === this.$attrs.placeholder;
    },
    input() {
      const {
        preparedAttrs,
        $listeners,
        value,
        errorMessageInner,
        hasBackgroundOnDisable,
        hasPlaceholderInInput,
        onFocus,
        onBlur,
        onInput,
      } = this;
      const className = {
        'form-field__input': true,
        error: !!errorMessageInner,
        'has-bg-on-disable': hasBackgroundOnDisable,
        'has-placeholder-in-input': hasPlaceholderInInput,
      };
      const listeners = {
        ...$listeners,
        blur: onBlur,
        focus: onFocus,
        input: onInput,
      };
      return {
        error: errorMessageInner,
        attrs: preparedAttrs,
        listeners,
        value,
        className,
      };
    },
  },
  methods: {
    onFocus() {
      this.isFocused = true;
      this.$emit('focus');
      if (!this.placeholderInInput) return;
      if (this.value === this.$attrs.placeholder) {
        this.$emit('input', '');
      }
    },
    onBlur() {
      this.isFocused = false;
      this.$emit('blur');
      if (!this.placeholderInInput) return;
      if (!this.value) {
        this.$emit('input', this.placeholder);
      }
    },
    onInput(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>

<style lang="scss">
</style>
