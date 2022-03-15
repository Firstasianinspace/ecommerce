<template>
  <div class="product-card">
    <div class="product-card__header">
      <custom-image
        :src="productImage"
        :resize="resize"
        class="product-card__image"
        alt="img"
      />
      <div class="product-card__header_bar">
        <div class="product-card__header_bar-quick-view" @click="addToBasket(product)">
          QUICK LOOK
        </div>
        <ProductFavoriteIcon />
      </div>
    </div>
    <div class="product-card__body">
      <h6 class="product-card__body-title">{{ productName }}</h6>
    </div>
    <div class="product-card__footer">
      <custom-button
        :label="'Подробнее'"
        class="product-card__footer-btn"
        @click="addToBasket(product)"
      />
      <ProductPrice v-bind="bindProps" />
    </div>
    <div v-if="discountAvailable" class="product-card__discount">
      <span>-{{ discountPercentage }}%</span>
    </div>
  </div>
</template>

<script>
import { calculateDiscountPercentage } from '@/helpers'
import ProductPrice from '@/components/product/ProductPrice'
import ProductFavoriteIcon from '@/components/product/ProductFavoriteIcon'

export default {
  name: 'ProductCard',
  components: {
    ProductPrice,
    ProductFavoriteIcon,
  },
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
    regularPrice: (vm) => vm.product?.price,
    specialPrice: (vm) => vm.product?.discountPrice,
    discountAvailable: (vm) => vm.specialPrice > 0,
    discountPercentage() {
      const { specialPrice, regularPrice } = this
      return calculateDiscountPercentage({
        current: specialPrice,
        previous: regularPrice,
      })
    },
    bindProps: (vm) => ({
      regularPrice: vm.regularPrice,
      specialPrice: vm.specialPrice,
      discountAvailable: vm.discountAvailable,
    }),
  },
  methods: {
    addToBasket(product) {
      this.$emit('addToBasket', product)
    },
  },
}
</script>

<style lang="scss">
.product-card:hover {
  & .product-card {
    &__header {
      &_bar {
        transform: translate(-50%, -111%);
      }
    }
    &__footer {
      & .product-price {
        transform: translate(50%);
        opacity: 0;
      }
      &-btn {
        transform: translate(0);
        opacity: 1;
      }
    }
  }
}

.product-card {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &__header {
    position: relative;
    overflow: hidden;

    &_bar {
      
      color: #fff;
      font-size: 12px;
      font-weight: 500;
      display: flex;
      justify-content: center;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 50%);
      transition: all .3s ease-in-out;

      &-quick-view {
        background: #222;
        padding: 5px 10px;
        cursor: pointer;
      }
    }
  }

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
    margin-top: auto;
    position: relative;

    & .product-price {
      transition: all .3s ease-in-out;
    }

    &-btn {
      font-size: 16px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      position: absolute;
      transform: translate(-100%);
      transition: all .3s ease-in-out;
      opacity: 0;
      color: #767676;
      background: none;
      border: none;
      padding: 10px 0;
      cursor: pointer;
    }
  }

  &__discount {
    position: absolute;
    top: 0;
    right: 0;
    padding: 15px 10px;
    background: #111;

    & span {
      color: #fff;
    }
  }
}
</style>