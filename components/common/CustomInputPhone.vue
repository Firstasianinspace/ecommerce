<template>
  <CustomInputScope v-bind="bindProps" v-on="$listeners">
    <template #default="{ input }">
      <input
        v-mask="mask"
        v-bind="input.attrs"
        :placeholder="placeholder"
        :class="input.className"
        @paste.prevent="handlePhonePaste"
        @input="handlePhoneInput"
        @focus="input.listeners.focus"
        @blur="input.listeners.blur"
      />
    </template>
  </CustomInputScope>
</template>

<script>
import { mask } from 'vue-the-mask';
import CustomInputScope from './CustomInputScope.vue';
import { getRawPhoneNumber } from '@/helpers';
import { DEFAULT_PHONE_MASK } from '@/constants';

export default {
  components: {
    CustomInputScope,
  },
  directives: { mask },
  props: {
    mask: {
      type: String,
      default: DEFAULT_PHONE_MASK,
    },
    useCustomFill: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      default: 'phone',
    },
    forbiddenFirstCharsByInput: {
      type: Array,
      default: () => ['8', '7'],
    },
  },
  data: () => ({
    prevValue: '',
  }),
  computed: {
    placeholder: (vm) => vm.$attrs.placeholder || vm.mask.replace(/#/g, '_'),
    phoneLen: (vm) => [...vm.mask.matchAll(/[#]/g)].length,
    preEntryValue: (vm) => vm.mask.split('#')[0] || '',
    isFilled() {
      const rawPhone = getRawPhoneNumber(this.$attrs.value, this.phoneLen);
      return rawPhone.length === this.phoneLen;
    },
    bindProps: (vm) => ({
      ...vm.$props,
      ...vm.$attrs,
      type: 'tel',
      filledIcon: vm.isFilled,
    }),
  },
  methods: {
    handlePhonePaste(e) {
      const text = e.clipboardData.getData('text');
      this.$emit('input', getRawPhoneNumber(text, this.phoneLen));
    },
    shouldProceed(value) {
      const { prevValue, preEntryValue } = this;
      if (!value || value.length < preEntryValue.length) {
        this.prevValue = '';
        return true;
      }
      if (value === prevValue) return false;
      if (!value.includes(preEntryValue)) return false;
      return true;
    },
    getInputValue(value) {
      const { prevValue, forbiddenFirstCharsByInput, preEntryValue } = this;
      const strippedValue = value.replace(preEntryValue, '');
      if (forbiddenFirstCharsByInput.includes(strippedValue) && !prevValue) {
        return preEntryValue;
      }
      return value;
    },
    handlePhoneInput(e) {
      const { value } = e.target;
      if (!value) return this.$emit('input', '');
      if (!this.shouldProceed(value)) return;
      const inputValue = this.getInputValue(value);
      if (inputValue !== value) {
        e.target.value = inputValue;
      }
      this.prevValue = inputValue;
      this.$emit('input', inputValue);
    },
  },
};
</script>
