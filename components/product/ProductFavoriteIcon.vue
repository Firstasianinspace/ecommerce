<template>
  <div class="product-card__favorite-icon">
    <font-awesome-icon v-if="isFavorite" :icon="['fas', 'check']" />
    <font-awesome-icon v-else :icon="['fas', 'heart']" />
  </div>
</template>

<script>
export default {
  name: 'ProductFavoriteIcon',
  props: {
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.product-card__favorite-icon {
  background: #999;
  padding: 5px;
}
</style>