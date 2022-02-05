<template>
  <div id="detailed-cart">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="detailed-cart">
      <div v-if="totalItems" class="detailed-cart__aside">
        <SfOrderSummary
          :products="products"
          :shipping-methods="shippingMethods"
          :total-items="basketCount"
        />
      </div>
      <div class="detailed-cart__main">
        <transition name="sf-fade" mode="out-in">
          <div
            v-if="totalItems"
            key="detailed-cart"
            class="collected-product-list"
          >
            <transition-group name="sf-fade" tag="div">
              <CollectedProducts
                v-for="product in basket"
                :key="product.id"
                :image="product.images[0].url"
                :title="product.item"
                :regular-price="
                  product.price.regular && `$${product.price.regular}`
                "
                :special-price="
                  product.price.special && `$${product.price.special}`
                "
                class="sf-collected-product--detailed collected-product"
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
          <div v-else key="empty-cart" class="empty-cart">
            <SfImage
              :src="require('@storefront-ui/shared/icons/empty_cart.svg')"
              alt="Empty cart"
              class="empty-cart__image"
              :width="140"
              :height="200"
            />
            <SfHeading
              title="Your cart is empty"
              :level="2"
              description="Looks like you haven’t added any items to the cart yet. Start
                shopping to fill it in."
            />
            <SfButton
              class="sf-button--full-width color-primary empty-cart__button"
              >Start shopping</SfButton
            >
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import {
  SfButton,
  SfImage,
  SfHeading,
  SfBreadcrumbs,
} from "@storefront-ui/vue";
import SfOrderSummary from '@/components/SfOrderSummary';
import CollectedProducts from '@/components/product/CollectedProducts';

export default {
  name: "DetailedCart",
  components: {
    CollectedProducts,
    SfBreadcrumbs,
    SfImage,
    SfButton,
    SfHeading,
    SfOrderSummary,
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: "Home",
          route: {
            link: "#",
          },
        },
        {
          text: "Cart",
          route: {
            link: "#",
          },
        },
      ],
      products: [
        {
          title: "Cream Beach Bag Modern Style",
          id: "CBB1",
          image: "assets/storybook/Home/productA.jpg",
          price: { regular: "50.00" },
          configuration: [
            { name: "Size", value: "XS" },
            { name: "Color", value: "White" },
          ],
          qty: "1",
        },
        {
          title: "Cream Beach Bag Modern Style",
          id: "CBB2",
          image: "assets/storybook/Home/productB.jpg",
          price: { regular: "50.00" },
          configuration: [
            { name: "Size", value: "XS" },
            { name: "Color", value: "White" },
          ],
          qty: "2",
        },
        {
          title: "Cream Beach Bag Modern Style",
          id: "CBB3",
          image: "assets/storybook/Home/productC.jpg",
          price: { regular: "50.00" },
          configuration: [
            { name: "Size", value: "XS" },
            { name: "Color", value: "White" },
          ],
          qty: "1",
        },
      ],
      shippingMethods: [
        {
          isOpen: false,
          price: "Free",
          delivery: "Delivery from 3 to 7 business days",
          label: "Pickup in the store",
          value: "store",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.",
        },
        {
          isOpen: false,
          price: "$15.90",
          delivery: "Delivery from 4 to 6 business days",
          label: "Delivery to home",
          value: "home",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.",
        },
        {
          isOpen: false,
          price: "$9.90",
          delivery: "Delivery from 4 to 6 business days",
          label: "Paczkomaty InPost",
          value: "inpost",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.",
        },
        {
          isOpen: false,
          price: "$11.00",
          delivery: "Delivery within 48 hours",
          label: "48 hours coffee",
          value: "coffee",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.",
        },
        {
          isOpen: false,
          price: "$14.00",
          delivery: "Delivery within 24 hours",
          label: "Urgent 24h",
          value: "urgent",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.",
        },
      ],
    };
  },
  computed: {
    ...mapGetters('basket', [
      'isCartSidebarOpen',
      'basket',
      'basketTotal',
      'basketCount',
    ]),
    totalItems() {
      return this.products.reduce(
        (totalItems, product) => totalItems + parseInt(product.qty, 10),
        0
      );
    },
  },
  methods: {
    ...mapActions('basket', ['removeFromBasket']),
    removeHandler(product) {
      const products = [...this.products];
      this.products = products.filter((element) => element.id !== product.id);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
#detailed-cart {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
    padding: 0 var(--spacer-sm);
  }
}
.breadcrumbs {
  padding: var(--spacer-base) 0;
}
.detailed-cart {
  &__main {
    padding: 0 var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside {
    box-sizing: border-box;
    width: 100%;
    background: var(--c-light);
    padding: var(--spacer-base) var(--spacer-sm);
  }
  @include for-desktop {
    display: flex;
    &__main {
      flex: 1;
    }
    &__aside {
      flex: 0 0 26.8125rem;
      order: 1;
      margin: 0 0 0 var(--spacer-xl);
      padding: var(--spacer-xl);
    }
  }
}
.collected-product {
  --collected-product-padding: var(--spacer-sm) 0;
  --collected-product-actions-display: flex;
  border: 1px solid var(--c-light);
  border-width: 1px 0 0 0;
  &:first-of-type {
    border-top: none;
  }
  &__properties {
    --property-value-font-weight: var(--font-weight--normal);
    margin: var(--spacer-sm) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;
  }
  @include for-mobile {
    --collected-product-remove-bottom: var(--spacer-sm);
  }
  @include for-desktop {
    --collected-product-padding: var(--spacer-lg) 0;
  }
}
.actions {
  &__button {
    display: block;
    margin: 0 0 var(--spacer-xs) 0;
    color: var(--c-text);
    &:hover {
      color: var(--c-text-muted);
    }
  }
  &__description {
    font-family: var(--font-family--primary);
    font-size: var(--font-size--sm);
    font-weight: var(--font-weight--light);
    color: var(--c-text-muted);
    position: absolute;
    bottom: 0;
    padding-bottom: var(--spacer-lg);
  }
}
.empty-cart {
  --heading-title-color: var(--c-primary);
  --heading-title-margin: 0 0 var(--spacer-base) 0;
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-font-weight: var(--font-weight--semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  &__image {
    --image-width: 13.1875rem;
    margin: var(--spacer-2xl) 0;
  }
  @include for-desktop {
    &__image {
      --image-width: 22rem;
    }
    &__button {
      --button-width: 20.9375rem;
    }
  }
}
</style>