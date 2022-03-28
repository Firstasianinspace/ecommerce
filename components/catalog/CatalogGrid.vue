<template>
  <transition-group name="flip-list" class="catalog-page__grid" tag="div">
    <ProductCard
      v-for="(product, index) in products"
      :key="index"
      :product="product"
      @addToBasket="handleClick(product)"
    />
  </transition-group>
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
      this.$router.push(`product/${product.itemId}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.catalog-page__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 30px;
}
.flip-list-move {
  transition: transform 0.4s;
}
</style>