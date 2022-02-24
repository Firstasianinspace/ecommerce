<template>
  <div class="product-page">
    <div class="container">
      <div class="product-page__content">
        <ProductGallery :images="productImages" />
        <ProductInfo :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductGallery from '@/components/productPage/ProductGallery'
import ProductInfo from '@/components/productPage/ProductInfo'

export default {
  name: 'ProductPage',
  components: {
    ProductGallery,
    ProductInfo,
  },
  computed: {
    ...mapGetters('catalog', ['products']),

    product: (vm) =>
      vm.products.find((s) => s.id === parseInt(vm.$route.params.code)),
    productImages: (vm) => vm.product?.images,
  },

}
</script>

<style lang="scss" scoped>
.product-page {
  &__content {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
  }
}
</style>