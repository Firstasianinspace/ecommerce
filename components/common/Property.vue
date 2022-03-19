<template functional>
  <li class="property-field">
    <slot name="name" v-bind="{ props }">
      <span class="property-field__name">
        {{ props.name }}
      </span>
    </slot>
    <slot name="value" v-bind="{ props }">
      <span class="property-field__value">
        {{ props.value }}
      </span>
    </slot>
  </li>
</template>

<script>
export default {
  name: 'Property',
  props: {
    name: {
      type: String,
      default: () => '',
    },
    value: {
      type: [String, Number],
      default: () => '',
    },
  },
}
</script>

<style lang="scss" scoped>
.property-field {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;

  &__name {
    color: #43464e;
  }

  &__value {
    font-weight: 500;
  }
}
</style>