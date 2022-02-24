<template>
  <div class="delivery-box">
    <div class="delivery-box__row">
      <div class="delivery-box__icon">
        <font-awesome-icon :icon="['fas', 'truck']" />
      </div>

      <div class="delivery-box__text">Бесплатная доставка.</div>
    </div>
    <div class="delivery-box__row">
      <div class="delivery-box__icon">
        <font-awesome-icon :icon="['fas', 'box']" />
      </div>

      <div class="delivery-box__text">Бесплатные возвраты.</div>
    </div>
    <div class="delivery-box__row">
      <div class="delivery-box__icon" :style="{ opacity: 0 }">
        <font-awesome-icon :icon="['fas', 'file']" />
      </div>

      <div class="delivery-box__text">
        Действуют Правила и Условия. <br />
        <nuxt-link to="#">Подробнее</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeliveryBox',
}
</script>

<style lang="scss">
.delivery-box {
  border: 1px solid grey;
  padding: 15px;
  margin: 30px 0 0 0;
  &__row {
    display: grid;
    grid-template-columns: 20px auto;
    align-items: flex-start;
    column-gap: 10px;
    padding: 7.5px 0;
  }

  &__icon {
    justify-self: center;
  }
}
</style>