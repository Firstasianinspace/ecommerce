<template>
  <div class="product-card-horizontal">
    <div class="product-card-horizontal__remove" @click="removeHandler">X</div>
    <custom-image
      :src="productImage"
      :resize="resize"
      class="product-card-horizontal__image"
      alt="img"
    />
    <h6 class="product-card-horizontal__title">{{ productName }}</h6>
    <div class="product-card-horizontal__size">SIZE</div>
    <div class="product-card-horizontal__quantity">QUANTITY INPUT</div>
    <ProductPrice v-bind="bindProps" />
  </div>
</template>

<script>
import { calculateDiscountPercentage } from '@/helpers'
import ProductPrice from '@/components/product/ProductPrice'

export default {
  name: 'ProductCardHorizontal',
  components: {
    ProductPrice,
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    productName: (vm) => vm.product?.item || vm.defaultName,
    productImage: (vm) => vm.product?.itemImageUrl,
    productDescription: (vm) => vm.product?.description,
    regularPrice: (vm) => vm.product?.price,
    specialPrice: (vm) => vm.product?.discountPrice,
    discountAvailable: (vm) => vm.specialPrice > 0,
    discountPercentage() {
      const { specialPrice, regularPrice } = this
      return calculateDiscountPercentage({
        current: specialPrice,
        previous: regularPrice,
      })
    },
    bindProps: (vm) => ({
      regularPrice: vm.regularPrice,
      specialPrice: vm.specialPrice,
      discountAvailable: vm.discountAvailable,
    }),
  },
  methods: {
    removeHandler() {
      this.$emit('click:remove')
    },
  },
}
</script>

<style lang="scss" scoped>
.product-card-horizontal {
  display: grid;
  grid-template-columns: 5% 20% 25% 10% auto auto;
  gap: 5px;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid grey;
}
</style>