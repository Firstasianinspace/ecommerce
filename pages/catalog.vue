<template>
  <div class="content">
    <div class="container">
      <!-- <CatalogFilters />
      <CatalogGrid /> -->
      <h1>Каталог</h1>
      <CatalogGrid
        :products="products"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CatalogGrid from '@/components/catalog/CatalogGrid';
// import CatalogFilters from '@/components/catalog/CatalogFilters';

export default {
  name: 'IndexPage',
  components: {
    CatalogGrid,
    // CatalogFilters,
  },
    // middleware: 'guest',
  async fetch() {
    await this.getProducts();
  },
  computed: {
    ...mapGetters('catalog', ['products'])
  },
  methods: {
    ...mapActions('catalog', ['getProducts'])
  },
}
</script>
