<template>
  <CustomInputScope v-bind="bindProps" v-on="$listeners">
    <template #default="{ input }">
      <input
        v-mask="typeOfMask"
        v-bind="input.attrs"
        :placeholder="placeholder"
        :class="input.className"
        v-on="input.listeners"
        @focusout="handleCardFocusout"
      />
    </template>
  </CustomInputScope>
</template>

<script>
import CustomInputScope from './CustomInputScope.vue'
import {
  DEFAULT_CARD_NUMBER_MASK,
  DEFAULT_CARD_CVV_MASK,
  DEFAULT_CARD_DATE_MASK
} from '@/constants'

export default {
  name: 'CustomInputCard',
  components: {
    CustomInputScope,
  },
  props: {
    maskType: {
      type: String,
      default: 'card-number',
    },
  },
  data: () => ({
    prevValue: '',
  }),
  computed: {
    typeOfMask() {
      if (this.maskType === 'card-number') {
        return DEFAULT_CARD_NUMBER_MASK
      }
      if (this.maskType === 'card-cvv') {
        return DEFAULT_CARD_CVV_MASK
      } 
      if (this.maskType === 'card-date') {
        return DEFAULT_CARD_DATE_MASK
      } 
      return '###'
    },
    placeholder: (vm) => vm.$attrs.placeholder,
    bindProps: (vm) => ({
      ...vm.$props,
      ...vm.$attrs,
      type: 'text',
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
