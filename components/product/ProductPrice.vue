<template>
  <div class="product-price">
    <div v-if="discountAvailable">
      <del class="product-price__old">
        {{ regularPrice | formatPrice }}
        <span class="product-price__symbol"> руб.</span></del
      >
      <ins class="product-price__special">
        {{ specialPrice | formatPrice }}
        <span class="product-price__symbol"> руб.</span></ins
      >
    </div>
    <span v-else class="product-price__regular">
      {{ regularPrice | formatPrice }}
      <span class="product-price__symbol"> руб.</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ProductPrice',
  props: {
    discountAvailable: {
      type: Boolean,
      default: false,
    },
    regularPrice: {
      type: [String, Number],
      default: () => '',
    },
    specialPrice: {
      type: [String, Number],
      default: () => '',
    },
  },
}
</script>

<style lang="scss">
.product-price {
  font-size: 16px;
  font-weight: 500;
  padding: 10px 0;
  color: #767676;

  & ins {
    text-decoration: none;
  }
}
</style>