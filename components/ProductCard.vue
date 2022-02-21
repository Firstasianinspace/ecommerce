<template>
  <div class="product-card">
    <div class="product-card__header">
      <custom-image
        :src="productImage"
        :resize="resize"
        class="product-card__image"
        alt="img"
      />
    </div>
    <div class="product-card__body">
      <h6 class="product-card__body-title">{{ productName }}</h6>
      <p class="product-card__body-description">{{ productDescription }}</p>
    </div>
    <div class="product-card__footer">
      <p class="product-card__footer-price">
        {{ productPrice | formatPrice }}
        <span class="product-card__footer-price-symbol">руб.</span>
      </p>
      <custom-button
        :label="'Подробнее'"
        class="product-card__footer-btn"
        @click="addToBasket(product)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      default: () => {},
    },
    defaultName: {
      type: String,
      default: 'Имя по умолчанию',
    },
    resize: {
      type: String,
      default: '250x180',
    },
  },
  computed: {
    productName: (vm) => vm.product?.item || vm.defaultName,
    productImage: (vm) => vm.product?.images[0].url,
    productDescription: (vm) => vm.product?.description,
    productPrice: (vm) => vm.product?.price,
  },
  methods: {
    addToBasket(product) {
      this.$emit('addToBasket', product)
    }
  }
}
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;

  &__image {
    width: 100%;
  }

  &__body {
    &-title {
      font-size: 18px;
      padding: 10px 0;
    }

    &-description {
      font-size: 14px;
    }
  }

  &__footer {
    &-price {
      font-size: 20px;
      font-weight: 500;
      padding: 10px 0;
      color: #767676;
      &-symbol {
      }
    }

    &-btn {
      position: relative;
      padding: 8px 15px;
      color: #fff;
      background: #222;
      border: none;
      cursor: pointer;
    }
  }
}
</style>