<template>
  <button
    v-bind="$attrs"
    :type="type"
    :class="{ 'custom-button--loading': loading }"
    class="custom-button"
    v-on="$listeners"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    loading: Boolean,
    label: String,
    type: {
      type: String,
      default: 'button',
    },
  },
}
</script>
<style lang="scss" scoped>
</style>