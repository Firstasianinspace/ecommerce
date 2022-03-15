<template>
  <div class="promo-box">
    <font-awesome-icon :icon="['fas', 'tag']" />
    <div class="promo-box__text">
      ТОЛЬКО СЕЙЧАС <br />
      Получи скидку -20% c промокодом:
      <span>ISAINTCHEAP</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromoBox',
}
</script>

<style lang="scss">
.promo-box {
  display: flex;
  flex-direction: row;
  column-gap: 20px;
  padding: 15px;
  background: #cde2f5;

  & svg {
    transform: scaleX(-1) translateY(5px);
  }
}
</style>