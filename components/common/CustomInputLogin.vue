<template>
  <CustomInputScope v-bind="bindProps" v-on="$listeners">
    <template #default="{ input }">
      <input
        v-bind="input.attrs"
        :class="input.className"
        :placeholder="placeholder"
        autocomplete="username"
        type="text"
        v-on="input.listeners"
        @focusout="handleLoginFocusout"
      />
    </template>
  </CustomInputScope>
</template>

<script>
import CustomInputScope from './CustomInputScope.vue';

export default {
  components: {
    CustomInputScope,
  },
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      default: 'Электронная почта',
    },
  },
  computed: {
    bindProps: (vm) => ({ ...vm.$props, ...vm.$attrs }),
  },
  methods: {
    handleLoginFocusout() {
      const { value } = this.$attrs;
      this.$emit('input', value);
    },
  },
};
</script>
