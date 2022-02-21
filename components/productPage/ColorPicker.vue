<template>
  <div class="color-picker">
    <div v-for="(color, index) in colors" :key="index" class="color-item" :style="{background: color.code}"/>
  </div>
</template>

<script>
export default {
  name: 'ColorPicker',
  props: {
    colors: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.color {
  &-picker {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-item {
    width: 22px;
    height: 22px;
  }
}
</style>