<template>
  <ul class="order-list">
    <li class="order-list__item">
      <span>Название товара</span>
      <span>Стоимость</span>
    </li>
    <li
      v-for="product in basket"
      :key="product.itemCode"
      class="order-list__item"
    >
    <span>{{ product.name }}</span>
    <span>{{ product.price | formatPrice  }} руб.</span>
    </li>
    <li class="order-list__item">
      <span>Доставка</span>
      <span>coming soon</span>
    </li>
    <li class="order-list__item">
      <span>Итого</span>
      <span>{{ basketTotal | formatPrice  }} руб.</span>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OrderItems',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters('basket', ['basket', 'basketTotal']),

    // orderItems() {
    //   const products = [...basket]
    // }
  },
}
</script>

<style lang="scss" scoped>
.order-list {
  &__item {
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding: 15px 0;
    border-bottom: 1px solid lightgray;
  }
}
</style>