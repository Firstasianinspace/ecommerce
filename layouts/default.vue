<template>
  <div>
    <TheHeader />
    <Nuxt />
    <!-- <TheCart /> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TheHeader from '@/components/header/TheHeader';
// import TheCart from '@/components/cart/TheCart';

export default {
  name: 'DefaultLayout',
  components: {
    TheHeader,
    // TheCart,
  },
  mounted() {
    this.getUser()
  },
  methods: {
    ...mapActions('user', ['getUser'])
  }
}
</script>

<style lang="scss" scoped>
</style>