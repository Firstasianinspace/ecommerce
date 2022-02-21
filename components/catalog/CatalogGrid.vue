<template>
  <div class="catalog-grid">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @addToBasket="handleClick(product)"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ProductCard from '@/components/ProductCard'
export default {
  name: 'CatalogGrid',
  components: {
    ProductCard,
  },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapActions('basket', ['addToBasket']),

    handleClick(product) {
      console.log('test')
      this.$router.push(`product/${product.id}`)
    }
  },
}
</script>

<style lang="scss" scoped>
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 30px;
}
</style>