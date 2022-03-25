<template>
  <div>
    <AppHeader />
    <Nuxt />
    <!-- <TheCart /> -->
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';
// import TheCart from '@/components/cart/TheCart';

export default {
  name: 'DefaultLayout',
  components: {
    AppHeader,
    // TheCart,
  },
}
</script>

<style lang="scss" scoped>
</style>