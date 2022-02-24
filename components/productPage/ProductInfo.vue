<template>
  <div class="product-info">
    <h1 class="product-info__name">
      {{ product.item }}
    </h1>
    <div class="product-info__price">
      {{ product.price }}
    </div>
    <PromoBox />
    <div class="product-info__colors">
      <div class="product-info__label">Цвет:</div>
      <div class="product-info__colors-single">
        {{ availableColors[0].name }}
      </div>
      <!-- <ColorPicker v-else :colors="availableColors" /> -->
    </div>
    <div class="product-info__sizes">
      <div class="product-info__label">Размер:</div>
      <span class="product-info__sizes-single">
        {{ formPharmacyType || availableSizes[0] }}
      </span>
      <custom-select
        v-if="!singleSize"
        v-model="formPharmacyType"
        :items="availableSizes"
      />
    </div>
    <div class="product-info__buttons">
      <custom-button
        :label="'Добавить в корзину'"
        class="button-add"
        @click="addToBasket(product)"
      />
      <FavoriteButton />
    </div>
    <DeliveryBox />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PromoBox from '@/components/PromoBox'
import DeliveryBox from '@/components/DeliveryBox'
import FavoriteButton from '@/components/FavoriteButton'
import CustomSelect from '@/components/common/CustomSelect.vue'

// import ColorPicker from '@/components/productPage/ColorPicker';

export default {
  name: 'ProductInfo',
  components: {
    PromoBox,
    DeliveryBox,
    FavoriteButton,
    CustomSelect,
    // ColorPicker
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    formPharmacyType: null,
  }),
  computed: {
    availableColors: (vm) => vm.product?.availableColors,
    singleColor: (vm) => vm.availableColors.length === 1,
    availableSizes: (vm) => vm.product?.availableSizes,
    singleSize: (vm) => vm.product?.availableSizes.length === 1,
  },
  methods: {
    ...mapActions('basket', ['addToBasket']),
  },
}
</script>

<style lang="scss" scoped>
.product-info {
  padding: 30px 180px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__name {
    font-size: 20px;
    font-weight: 400;
  }

  &__price {
    padding: 15px 0;
  }

  &__label {
    font-weight: 500;
    padding: 0 10px 0 0;
  }

  &__colors {
    display: flex;
    flex-direction: row;
    padding: 15px 0;
  }

  &__sizes {
  }

  &__buttons {
    display: grid;
    grid-template-columns: 86% 10%;
    gap: 4%;
  }
}

.button-add {
  border: none;
  font-weight: 500;
  text-transform: uppercase;
  color: #fff;
  background: #018849;
  padding: 7.5px 0;
}
</style>