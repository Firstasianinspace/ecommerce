<template>
  <div class="catalog-page__sort">
    <div class="catalog-page__sort-title">Total</div>
    <div class="catalog-page__sort-options">
      <custom-select
        v-model="selectedOption"
        :items="sortOptions"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CustomSelect from '@/components/common/CustomSelect.vue'

export default {
  name: 'CatalogSort',
  components: {
    CustomSelect,
  },
  computed: {
    ...mapGetters('catalog', ['activeOption', 'sortOptions']),

    selectedOption: {
      get() {
        return this.activeOption
      },
      set(value) {
        this.setSortOption(value)
      } 
    }
  },
  methods: {
    ...mapActions('catalog', ['setSortOption'])
  }
}
</script>

<style lang="scss" scoped>
.catalog-page__sort {
  display: flex;
  justify-content: space-between;
}
</style>