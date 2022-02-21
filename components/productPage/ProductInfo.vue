<template>
  <div class="product-info">
    <div class="product-info__name">
      {{ product.item }}
    </div>
    <div class="product-info__price">
      {{ product.price }}
    </div>
    <div class="product-info__colors">
      <div class="product-info__label">Цвет:</div>
      <div class="product-info__colors-single">
        {{ availableColors[0].name }}
      </div>
      <!-- <ColorPicker v-else :colors="availableColors" /> -->
    </div>
  </div>
</template>

<script>
// import ColorPicker from '@/components/productPage/ColorPicker';

export default {
  name: 'ProductInfo',
  components: {
    // ColorPicker
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    availableColors: (vm) => vm.product?.availableColors,
    singleColor: (vm) => vm.availableColors.length === 1,
  },
}
</script>

<style lang="scss" scoped>
</style>