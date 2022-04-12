<template>
  <div class="home-page">
    <nuxt-link to="/catalog">To catalog</nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
<style lang="scss" scoped>
.welcome-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eee;
}

.welcome-forms {
  background: #fff;
  width: 650px;
  &__header {
    display: flex;
    justify-content: space-between;
    padding: 25px;
    &-link {
      flex: 1;
      text-align: center;
      text-transform: uppercase;
      font-weight: 700;
      padding: 10px;
      color: #767676;
    }
  }
}

.welcome-form {
  padding: 0 30px;
}

.active {
  color: #222;
  border-bottom: 1px solid #5ECE7B;
  pointer-events: none;
}
</style>