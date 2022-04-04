<template>
  <div class="product-card">
    <div class="product-card__header">
      <custom-image
        :src="productImage"
        :resize="resize"
        class="product-card__image"
        alt="img"
      />
      <div class="product-card__header_bar">
        <div class="product-card__header_bar-quick-view" @click="addToBasket(product)">
          QUICK LOOK
        </div>
        <ProductFavoriteIcon />
      </div>
    </div>
    <div class="product-card__body">
      <h6 class="product-card__body-title">{{ productName }}</h6>
    </div>
    <div class="product-card__footer">
      <custom-button
        :label="'Подробнее'"
        class="product-card__footer-btn btn-text"
        @click="addToBasket(product)"
      />
      <ProductPrice v-bind="bindProps" />
    </div>
    <div v-if="discountAvailable" class="product-card__discount">
      <span>-{{ discountPercentage }}%</span>
    </div>
  </div>
</template>

<script>
import { calculateDiscountPercentage } from '@/helpers'
import ProductPrice from '@/components/product/ProductPrice'
import ProductFavoriteIcon from '@/components/product/ProductFavoriteIcon'

export const NOIMAGE_URL = '/img/noimg.png';

export default {
  name: 'ProductCard',
  components: {
    ProductPrice,
    ProductFavoriteIcon,
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
    defaultName: {
      type: String,
      default: 'Имя по умолчанию',
    },
    resize: {
      type: String,
      default: '250x180',
    },
  },
  computed: {
    productName: (vm) => vm.product?.title || vm.defaultName,
    productImage: (vm) => vm.product?.images ? vm.product?.images[0].url : NOIMAGE_URL,
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
    addToBasket(product) {
      this.$emit('addToBasket', product)
    },
  },
}
</script>

<style lang="scss">
</style>