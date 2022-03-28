<template>
  <div>
    <TheHeader />
    <Nuxt />
    <!-- <TheCart /> -->
  </div>
</template>

<script>
import TheHeader from '@/components/header/TheHeader';
// import TheCart from '@/components/cart/TheCart';

export default {
  name: 'DefaultLayout',
  components: {
    TheHeader,
    // TheCart,
  },
}
</script>

<style lang="scss" scoped>
</style>