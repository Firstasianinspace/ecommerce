<template>
  <div class="catalog-grid">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @addToBasket="addToBasket(product)"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ProductCard from './ProductCard';
  export default {
    name: 'CatalogGrid',
    components: {
      ProductCard
    },
    props: {
      products: {
        type: Array,
        default: () => [],
      }
    },
    methods: {
          ...mapActions('basket', ['addToBasket'])
    }
  }
</script>

<style lang="scss" scoped>
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 30px;
}
</style>