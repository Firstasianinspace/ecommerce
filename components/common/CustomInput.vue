<template>
  <CustomInputScope v-bind="bindProps" v-on="$listeners">
    <template #default="{ input }">
      <input
        v-bind="input.attrs"
        :class="input.className"
        v-on="input.listeners"
      />
    </template>
  </CustomInputScope>
</template>

<script>
import CustomInputScope from './CustomInputScope.vue';

export default {
  name: 'CustomInput',
  components: {
    CustomInputScope,
  },
  inheritAttrs: false,
  computed: {
    bindProps: (vm) => ({ ...vm.$props, ...vm.$attrs }),
  },
};
</script>
