<template>
  <div class="product-page">
    <div class="container">
      <div class="product-page__content">
        <ProductGallery v-if="galleryActive" :images="productImages" />
        <custom-image v-else :src="productImage" />

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
      vm.products.find(
        (s) => parseInt(s.item_id) === parseInt(vm.$route.params.code)
      ),
    productImage: (vm) => vm.product?.item_image_url,
    galleryActive: (vm) => Array.isArray(vm.product?.item_image_url),
    // productImages: (vm) => vm.product?.itemImageUrl ? vm.product?.itemImageUrl : vm.product?.images,
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