<template>
  <CustomInputScope v-bind="bindProps" v-on="$listeners">
    <template #default="{ input }">
      <input
        v-bind="input.attrs"
        :class="input.className"
        v-on="input.listeners"
      />
    </template>
    <template #after="{ input }">
      <div
        v-if="showLevels && !input.error"
        :data-level="passwordLevel"
        class="form-field__password-level"
      >
        <span v-for="item in 5" :key="item"></span>
      </div>
    </template>
  </CustomInputScope>
</template>

<script>
import CustomInputScope from './CustomInputScope.vue';

export default {
  components: {
    CustomInputScope,
  },
  props: {
    showLevels: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    bindProps: (vm) => ({ ...vm.$props, ...vm.$attrs, type: 'password' }),
    // TO-DO password levels
    passwordLevel() {
      const { value } = this.bindProps;
      const len = value.length;
      if (len < 7) return 1;
      if (len < 10) return 2;
      if (len < 18) return 3;
      if (len < 26) return 4;
      return 5;
    },
  },
};
</script>
<style lang="scss">
</style>