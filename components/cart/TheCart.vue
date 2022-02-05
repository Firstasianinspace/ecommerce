<template>
  <div id="cart">
    <SfSidebar
      :visible="isCartSidebarOpen"
      title="Моя корзина"
      class="sf-sidebar--right sf-sidebar--icon"
      @close="toggleCartSidebar"
    >
      <template #content-top>
        <div class="sf-property--large cart-summary desktop-only">
          <span class="sf-property__value">Всего {{ pluralProducts }}</span>
        </div>
      </template>
      <transition name="sf-fade" mode="out-in">
        <div v-if="basketCount" key="my-cart" class="my-cart">
          <div class="collected-product-list">
            <transition-group name="sf-fade" tag="div">
              <CollectedProducts
                v-for="(product, index) in basket"
                :key="index"
                v-model="product.qty"
                :image="product.images[0].url"
                :title="product.item"
                class="collected-product"
                @click:remove="removeFromBasket(index)"
              >
                <template #price>
                  <div class="sf-price">
                    <div v-if="product.discountPrice > 0">
                      <del class="sf-price__old">
                        {{ product.price | formatPrice }}
                        <span class="sf-price__symbol"> руб.</span></del
                      >
                      <ins class="sf-price__special">
                        {{ product.discountPrice | formatPrice }}
                        <span class="sf-price__symbol"> руб.</span></ins
                      >
                    </div>
                    <span v-else class="sf-price__regular">
                      {{ product.price | formatPrice }}
                      <span class="sf-price__symbol"> руб.</span>
                    </span>
                  </div>
                </template>
              </CollectedProducts>
            </transition-group>
          </div>
        </div>
        <div v-else key="empty-cart" class="empty-cart">
          <div class="empty-cart__banner">
            <SfImage
              alt="Empty bag"
              class="empty-cart__image"
              :width="140"
              :height="200"
              :src="require('@storefront-ui/shared/icons/empty_cart.svg')"
            />
            <SfHeading
              title="Ваша корзина пуста"
              :level="2"
              class="empty-cart__heading"
              description="Looks like you haven’t added any items to the bag yet. Start
              shopping to fill it in."
            />
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <transition name="sf-fade">
          <div v-if="basketCount">
            <SfProperty
              name="Итого"
              class="
                sf-property--full-width sf-property--large
                my-cart__total-price
              "
            >
              <template #value>
                <span class="sf-price__regular">
                  {{ basketTotal | formatPrice }}
                  <span class="sf-price__symbol"> руб.</span>
                </span>
              </template>
            </SfProperty>
            <SfButton
              class="sf-button--full-width color-secondary"
              @click="goToCart"
              >К оплате</SfButton
            >
          </div>
          <div v-else>
            <SfButton class="sf-button--full-width color-primary"
              >Начать покупки</SfButton
            >
          </div>
        </transition>
      </template>
    </SfSidebar>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import {
  SfSidebar,
  SfButton,
  SfHeading,
  SfProperty,
  SfImage,
} from '@storefront-ui/vue'
import CollectedProducts from '@/components/product/CollectedProducts'
import { pluralProducts } from '@/helpers'

export default {
  name: 'Cart',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfImage,
    SfProperty,
    CollectedProducts,
  },
  computed: {
    ...mapGetters('basket', [
      'isCartSidebarOpen',
      'basket',
      'basketTotal',
      'basketCount',
    ]),

    pluralProducts: (vm) => pluralProducts(vm.basketCount),
  },
  methods: {
    ...mapActions('basket', ['removeFromBasket']),
    ...mapMutations('basket', ['toggleCartSidebar']),

    goToCart() {
      this.$router.push('/checkout')
      this.toggleCartSidebar()
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
#cart {
  @include for-desktop {
    & > * {
      --sidebar-bottom-padding: var(--spacer-base);
      --sidebar-content-padding: var(--spacer-base);
    }
  }
}
.cart-summary {
  margin-top: var(--spacer-xl);
}

.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__total-items {
    margin: 0;
  }
  &__total-price {
    --price-font-size: var(--font-size--xl);
    --price-font-weight: var(--font-weight--medium);
    margin: 0 0 var(--spacer-base) 0;
  }
}
.empty-cart {
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-color: var(--c-primary);
  --heading-title-font-weight: var(--font-weight--semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  &__banner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
  &__heading {
    padding: 0 var(--spacer-base);
  }
  &__image {
    --image-width: 13.1875rem;
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      --image-width: 23.3125rem;
      margin: 0 0 var(--spacer-2xl) 0;
    }
  }
  @include for-desktop {
    --heading-title-font-size: var(--font-size--xl);
    --heading-title-margin: 0 0 var(--spacer-sm) 0;
  }
}
.collected-product-list {
  flex: 1;
}
.collected-product {
  margin: 0 0 var(--spacer-sm) 0;
  &__properties {
    margin: var(--spacer-xs) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;
    &:first-child {
      margin-bottom: 8px;
    }
  }
  &__actions {
    transition: opacity 150ms ease-in-out;
  }
  &__save,
  &__compare {
    --button-padding: 0;
    &:focus {
      --cp-save-opacity: 1;
      --cp-compare-opacity: 1;
    }
  }
  &__save {
    opacity: var(--cp-save-opacity, 0);
  }
  &__compare {
    opacity: var(--cp-compare-opacity, 0);
  }
  &:hover {
    --cp-save-opacity: 1;
    --cp-compare-opacity: 1;
    @include for-desktop {
      .collected-product__properties {
        display: none;
      }
    }
  }
}
.empty-cart__heading h2 {
  font-size: 24px;
}
</style>