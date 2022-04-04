<template>
  <CustomInputScope v-bind="bindProps" v-on="$listeners">
    <template #default="{ input }">
      <input
        v-mask="typeOfMask"
        v-bind="input.attrs"
        :placeholder="placeholder"
        :class="input.className"
      />
    </template>
  </CustomInputScope>
</template>

<script>
import { mask } from 'vue-the-mask'
import CustomInputScope from './CustomInputScope.vue'
import { DEFAULT_CARD_NUMBER_MASK, DEFAULT_CARD_CVV_MASK } from '@/constants'

export default {
  name: 'CustomInputCard',
  components: {
    CustomInputScope,
  },
  directives: { mask },
  props: {
    isCvv: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    prevValue: '',
  }),
  computed: {
    typeOfMask: (vm) =>
      vm.isCvv ? DEFAULT_CARD_CVV_MASK : DEFAULT_CARD_NUMBER_MASK,
    placeholder: (vm) => vm.$attrs.placeholder,
    bindProps: (vm) => ({
      ...vm.$props,
      ...vm.$attrs,
      type: 'tel',
      filledIcon: vm.isFilled,
    }),
  },
  methods: {
    handleCardFocusout() {
      const { value } = this.$attrs
      this.$emit('input', value)
    },
  },
}
</script>
