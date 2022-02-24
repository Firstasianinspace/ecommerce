<template>
  <div class="favorite-button">
    <font-awesome-icon v-if="isFavorite" :icon="['fas', 'heart']" />
    <font-awesome-icon v-else :icon="['far', 'heart']" />
  </div>
</template>

<script>
export default {
  name: 'FavoriteButton',
  props: {
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.favorite-button {
  display: flex;
  place-self: center;
  border: 1px solid lightgray;
  border-radius: 50%;
  padding: 10px;
}
</style>