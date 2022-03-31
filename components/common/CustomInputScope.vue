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
      v-html="errorMessageInner"
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
        'b-field__input': true,
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
// @import '~@/assets/scss/variables';

// .b-field {
//   padding: 10px 0 0;

//   @media (max-width: 768px) {
//     padding: 11px 0 0;
//   }

//   &.is-price-filter {
//     padding: 0;
//     margin: 0;

//     .b-field__input {
//       height: 36px;
//       padding: 0 8px;
//       margin: 0;
//       font-family: $MontserratM;
//       line-height: 36px;
//       // убирает кнопки стрелок из инпута в FF
//       &[type='number'] {
//         -moz-appearance: textfield;
//       }
//     }
//   }

//   &.with-inner-legend {
//     position: relative;
//   }

//   &.is-button input {
//     font-family: $MontserratR;
//     font-size: 14px;
//     line-height: 1.1;
//     color: #7a7a7a;
//     text-decoration: underline;
//     text-decoration-style: dashed;

//     @media (max-width: 768px) {
//       font-size: 12.5px;
//     }

//     &:not([disabled]) {
//       color: $blue;
//       cursor: pointer;
//     }
//   }

//   &__input {
//     width: 100%;
//     height: 48px;
//     padding: 0 32px 0 17px;
//     margin-top: 2px;
//     margin-bottom: 6px;
//     line-height: 1;
//     border: 1px solid $grey3;
//     border-radius: 2px;

//     @media (max-width: 768px) {
//       height: 36px;
//       padding: 0 9px;
//       margin-bottom: 4px;
//     }

//     &[twins-left] {
//       position: relative;
//       right: -1px;
//       width: 100%;
//       border-top-right-radius: 0;
//       border-bottom-right-radius: 0;
//     }

//     &[twins-right] {
//       position: relative;
//       width: 100%;
//       border-top-left-radius: 0;
//       border-bottom-left-radius: 0;
//     }

//     &[placeholder='+7 (___) ___ __ __'] {
//       &::placeholder {
//         font-size: 15px;
//         color: $grey;
//         opacity: 1;
//       }
//     }

//     .is-focused > & {
//       border: 1px solid $blue2;
//       transition: all 0.2s;
//     }

//     &.error {
//       z-index: 1;
//       border-color: $red;
//     }

//     &.has-placeholder-in-input {
//       font-family: $MontserratR;
//       color: $grey;
//     }
//   }

//   &__legend {
//     font-size: 13px;
//     line-height: 1.54;
//     color: $grey;

//     &--right {
//       text-align: right;

//       @media (max-width: 768px) {
//         text-align: left;
//       }
//     }

//     &--button {
//       text-decoration: underline;
//       text-decoration-style: dashed;
//       cursor: pointer;

//       &:hover {
//         color: $blue;
//       }
//     }

//     &--inner {
//       position: absolute;
//       top: 20px;
//       left: 17px;
//       font-size: 14px;
//       line-height: 1;
//       text-decoration: none;
//       text-decoration-style: unset;
//       border-bottom: 1px dotted;
//     }
//   }

//   &__sms-block {
//     display: inline-block;
//     line-height: 1.1;
//     color: $grey2;
//     cursor: default;
//     border-bottom: 1px dashed $grey2;

//     @media (max-width: 768px) {
//       margin-right: -15px;
//       line-height: 1;
//     }

//     @media (max-width: 414px) {
//       font-size: 13px;
//     }
//   }

//   &__password-level {
//     margin: -2px 0 6px;
//     font-size: 0;
//     line-height: 1;

//     & span {
//       display: inline-block;
//       width: calc(20% - 1px);
//       height: 2px;
//       margin-right: 1px;
//       vertical-align: top;
//       background: $blue;
//     }
//   }

//   &__password-level[data-level='1'] span:nth-child(n + 2) {
//     background: $grey3;
//   }

//   &__password-level[data-level='2'] span:nth-child(n + 3) {
//     background: $grey3;
//   }

//   &__password-level[data-level='3'] span:nth-child(n + 4) {
//     background: $grey3;
//   }

//   &__password-level[data-level='4'] span:nth-child(n + 5) {
//     background: $grey3;
//   }

//   &__error {
//     padding-left: 1px;
//     font-size: 13px;
//     line-height: 1.54;
//     color: $red;
//   }

//   &.is-filled {
//     position: relative;

//     &::after {
//       position: absolute;
//       top: 28px;
//       right: 20px;
//       width: 6px;
//       height: 14px;
//       content: '';
//       border-right: 2px solid $blue;
//       border-bottom: 2px solid $blue;
//       transform: rotate(45deg);

//       @media (max-width: 768px) {
//         top: 22px;
//         right: 15px;
//       }
//     }
//   }

//   &.is-twins {
//     width: 100%;
//     max-width: 50%;

//     // частный случай
//     @media (max-width: 415px) {
//       max-width: initial;
//     }
//   }

//   //event
//   &.is-active &__sms-block {
//     color: $blue;
//     cursor: pointer;
//     border-bottom: 1px dashed $blue;
//   }

//   &.is-active &__password-level {
//     display: block;
//   }

//   &.is-send &__sms-block {
//     display: none;
//   }

//   &.is-send &__input--sms-block {
//     display: inline-block;
//   }

//   &__input:not(.has-bg-on-disable)[disabled],
//   &__input:not(.has-bg-on-disable)[disabled]:-webkit-autofill,
//   &__input:not(.has-bg-on-disable)[disabled]:-webkit-autofill:hover,
//   &__input:not(.has-bg-on-disable)[disabled]:-webkit-autofill:focus,
//   &__input:not(.has-bg-on-disable)[disabled]:-webkit-autofill:active {
//     background: $grey4;
//     -webkit-box-shadow: 0 0 0 1000px $grey4 inset !important;
//     box-shadow: 0 0 0 1000px $grey4 inset !important;
//   }
// }
</style>
