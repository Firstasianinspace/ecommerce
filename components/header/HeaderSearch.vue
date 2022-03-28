<template>
  <SfSearchBar
    placeholder="Search for items"
    :value="null"
    :icon="{ icon: '', size: '', color: '' }"
    aria-label="Search"
  />
</template>

<script>
import { SfSearchBar } from '@storefront-ui/vue'
export default {
  name: 'HeaderSearch',
  components: {
    SfSearchBar,
  },
}
</script>

<style lang="scss" scoped>
.header-search {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  &-wrapper {
    width: 100%;
  }
  &__input {
    padding: 13px 60px 13px 15px;
    border-radius: 20px;
    border: none;
    width: 100%;
  }
  &__button {
    position: absolute;
    top: 50%;
    right: 2%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    & svg {
      width: 15px;
      height: 15px;
      fill: black;
    }
  }
}
</style>