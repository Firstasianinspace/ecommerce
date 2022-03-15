<template>
  <div class="content">
    <Breadcrumbs />
    <div class="container">
      <div class="catalog-page">
        <CatalogSort />
        <CatalogGrid
          :products="sortedProducts"
        />
        <CatalogSidebar />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { getCurrentPrice } from '@/helpers';
import Breadcrumbs from '@/components/Breadcrumbs';
import CatalogSort from '@/components/catalog/CatalogSort';
import CatalogGrid from '@/components/catalog/CatalogGrid';
import CatalogSidebar from '@/components/catalog/CatalogSidebar';

export default {
  name: 'IndexPage',
  components: {
    Breadcrumbs,
    CatalogSort,
    CatalogGrid,
    CatalogSidebar,
  },
  middleware: 'guest',
  async fetch() {
    await this.getProducts();
  },
  computed: {
    ...mapGetters('catalog', ['products', 'activeOption']),

    sortedProducts() {
      if (this.activeOption === 'Сначала дешевле') {
        const lowToHigh = [...this.products]
        return lowToHigh.sort((a, b) => parseFloat(getCurrentPrice(a)) - parseFloat(getCurrentPrice(b)))
      }
      if (this.activeOption === 'Сначала дороже') {
        const highToLow = [...this.products]
        return highToLow.sort((a, b) => parseFloat(getCurrentPrice(b)) - parseFloat(getCurrentPrice(a)))
      }
      return this.products
    }
  },
  methods: {
    ...mapActions('catalog', ['getProducts']),
  },
}
</script>
<style lang="scss">
.catalog-page {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 80% auto;
  gap: 15px;

  &__sort {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  &__sidebar {
    grid-column: 2 / 2;
  }

  &__grid {
    grid-row: 2 / 2;
    grid-column: 1 / 1;
  }
}
</style>
