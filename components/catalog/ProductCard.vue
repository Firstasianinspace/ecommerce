<template>
  <div class="sf-product-card">
    <div class="sf-product-card__image-wrapper">
      <slot
        name="image"
        v-bind="{ images, title, link, imageHeight, imageWidth }"
      >
        <SfButton
          :link="link"
          class="sf-button--pure sf-product-card__link"
          v-on="$listeners"
        >
          <template v-if="Array.isArray(images)">
            <SfImage
              v-for="(picture, key) in images.slice(0, 2)"
              :key="key"
              class="sf-product-card__picture"
              :src="picture.url"
              :alt="picture.name"
              :width="imageWidth"
              :height="imageHeight"
            />
          </template>
          <SfImage
            v-else
            class="sf-product-card__image"
            :src="picture[0].url"
            :alt="picture.name"
            :width="imageWidth"
            :height="imageHeight"
          />
        </SfButton>
      </slot>
      <slot name="badge" v-bind="{ badgeLabel, badgeColor }">
        <SfBadge
          v-if="discountAvailable"
          class="sf-product-card__badge"
          :class="badgeColorClass"
          >- {{ discountPercentage }}%</SfBadge
        >
      </slot>
      <SfButton
        v-if="wishlistIcon !== false"
        :aria-label="`${ariaLabel} ${title}`"
        :class="wishlistIconClasses"
        @click="toggleIsOnWishlist"
      >
        <slot name="wishlist-icon" v-bind="{ currentWishlistIcon }">
          <SfIcon
            :icon="currentWishlistIcon"
            size="22px"
            data-test="sf-wishlist-icon"
          />
        </slot>
      </SfButton>
      <template v-if="showAddToCartButton">
        <slot
          name="add-to-cart"
          v-bind="{
            isAddedToCart,
            showAddedToCartBadge,
            isAddingToCart,
            productName,
          }"
        >
          <SfCircleIcon
            class="sf-product-card__add-button custom-button__add"
            :aria-label="`Add to Cart ${productName}`"
            :has-badge="showAddedToCartBadge"
            :disabled="addToCartDisabled"
            @click="addToBasket(product)"
          >
            <div class="sf-product-card__add-button--icons">
              <transition
                v-if="!isAddingToCart && !isAddedToCart"
                name="sf-pulse"
                mode="out-in"
              >
                <slot name="add-to-cart-icon">
                  <SfIcon
                    key="add_to_cart"
                    icon="add_to_cart"
                    size="20px"
                    color="white"
                  />
                </slot>
              </transition>
              <transition v-else name="sf-pulse" mode="out-in">
                <slot name="adding-to-cart-icon">
                  <SfIcon
                    key="added_to_cart"
                    icon="added_to_cart"
                    size="20px"
                    color="white"
                  />
                </slot>
              </transition>
            </div>
          </SfCircleIcon>
        </slot>
      </template>
    </div>
    <slot name="title" v-bind="{ productName, link }">
      <SfButton
        :link="link"
        class="sf-button--pure sf-product-card__link"
        v-on="$listeners"
      >
        <h3 class="sf-product-card__title">
          {{ productName }}
        </h3>
      </SfButton>
    </slot>
    <slot name="price" v-bind="{ specialPrice, regularPrice }">
      <div class="sf-price">
        <div v-if="discountAvailable">
          <del class="sf-price__old">
            {{ regularPrice | formatPrice }}
            <span class="sf-price__symbol"> руб.</span></del
          >
          <ins class="sf-price__special">
            {{ specialPrice | formatPrice }}
            <span class="sf-price__symbol"> руб.</span></ins
          >
        </div>
        <span v-else class="sf-price__regular">
          {{ regularPrice | formatPrice }}
          <span class="sf-price__symbol"> руб.</span>
        </span>
      </div>
    </slot>
  </div>
</template>

<script>
import {
  SfButton,
  SfIcon,
  SfImage,
  SfBadge,
  SfCircleIcon,
} from '@storefront-ui/vue'
import { calculateDiscountPercentage } from '@/helpers'

export default {
  name: 'ProductCard',
  components: {
    SfButton,
    SfIcon,
    SfImage,
    SfBadge,
    SfCircleIcon,
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
    imageWidth: {
      type: [String, Number],
      default: 300,
    },
    imageHeight: {
      type: [String, Number],
      default: 385,
    },
    badgeLabel: {
      type: String,
      default: 'asdasdasd',
    },
    wishlistIcon: {
      type: [String, Array, Boolean],
      default: 'heart',
    },
    /**
     * Wish list icon for product which has been added to wish list
     * This is the icon for product added to wish list. Default visible on mobile. Visible only on hover on desktop.
     * It can be a icon name from our icons list, or array or string as SVG path(s).
     */
    isOnWishlistIcon: {
      type: [String, Array],
      default: 'heart_fill',
    },
    /**
     * Status of whether product is on wish list or not
     */
    isOnWishlist: {
      type: Boolean,
      default: false,
    },
    /**
     * Status of showing add to cart button
     */
    showAddToCartButton: {
      type: Boolean,
      default: true,
    },
    /**
     * isAddedToCart status of whether button is showed, product is added or not
     */
    isAddedToCart: {
      type: Boolean,
      deafult: false,
    },
    /**
     * addToCartDisabled status of whether button is disabled when out of stock
     */
    addToCartDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isAddingToCart: false,
    link: '#',
  }),
  computed: {
    productName: (vm) => vm.product?.item,
    images: (vm) => vm.product?.images,
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
    currentWishlistIcon() {
      return this.isOnWishlist ? this.isOnWishlistIcon : this.wishlistIcon
    },
    showAddedToCartBadge() {
      return !this.isAddingToCart && this.isAddedToCart
    },
    ariaLabel() {
      return this.isOnWishlist ? 'Remove from wishlist' : 'Add to wishlist'
    },
    wishlistIconClasses() {
      const defaultClass = 'sf-button--pure sf-product-card__wishlist-icon'
      return `${defaultClass} ${this.isOnWishlist ? 'on-wishlist' : ''}`
    },
  },
  methods: {
    addToBasket(product) {
      this.$emit('addToBasket', product)
    },
    toggleIsOnWishlist() {
      console.log('toggle wish')
    }
  },
}
</script>

<style lang="scss">
@import '~@storefront-ui/shared/styles/components/organisms/SfProductCard.scss';

.custom-button__add {
  margin: 0 0 15px 0;
}

.sf-image .sf-image-loaded {
  max-width: 100%;
}

.sf-price__symbol {
  font-size: 12px;
  font-family: 'Raleway', sans-serif;
}

.sf-product-card__title {
  white-space: normal;
  font-size: 14px;
  min-height: 44px;
}
</style>