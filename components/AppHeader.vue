<template>
  <div class="sf-header">
    <div class="sf-header__wrapper">
      <header ref="header" class="sf-header__header">
        <SfLink link="/catalog">
          <SfImage
            v-if="logo"
            :src="logo"
            :alt="title"
            :width="logoWidth"
            :height="logoHeight"
            class="sf-header__logo"
          />
          <h1 v-else class="sf-header__logo-text">{{ title }}</h1>
        </SfLink>
        <div class="sf-header__actions">
          <nav
            class="sf-header__navigation"
            :class="{ 'is-visible': isNavVisible }"
          >
            <SfHeaderNavigationItem
              class="nav-item"
              data-cy="app-header-url_women"
              label="Женское"
              link="#"
            />
            <SfHeaderNavigationItem
              class="nav-item"
              data-cy="app-header-url_men"
              label="Мужское"
              link="#"
            />
            <SfHeaderNavigationItem
              class="nav-item"
              data-cy="app-header-url_men"
              label="Детям"
              link="#"
            />
          </nav>
          <SfSearchBar
            :value="searchValue"
            :placeholder="searchPlaceholder"
            aria-label="Search"
            class="sf-header__search"
            @input="$emit('change:search', $event)"
            @enter="$emit('enter:search', $event)"
          />
          <div class="sf-header__icons">
            <SfButton
              v-if="accountIcon"
              class="sf-button--pure sf-header__action"
              data-testid="accountIcon"
              @click="handleAccountClick"
            >
              <SfIcon
                :icon="accountIcon"
                size="1.25rem"
                :class="{
                  'sf-header__icon is-active': activeIcon === 'account',
                }"
              />
            </SfButton>
            <SfButton
              v-if="wishlistIcon"
              class="sf-button--pure sf-header__action"
              data-testid="wishlistIcon"
              @click="toggleWishSidebar2"
            >
              <SfIcon
                class="sf-header__icon"
                :icon="wishlistIcon"
                size="1.25rem"
                :class="{
                  'sf-header__icon is-active': activeIcon === 'wishlist',
                }"
              />
            </SfButton>
            <SfButton
              v-if="cartIcon"
              class="sf-button--pure sf-header__action"
              data-testid="cartIcon"
              @click="toggleCartSidebar2"
            >
              <SfIcon
                class="sf-header__icon"
                :icon="cartIcon"
                size="1.25rem"
                :class="{
                  'sf-header__icon is-active': activeIcon === 'cart',
                }"
              />
            </SfButton>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import SfHeaderNavigationItem from '@/components/SfPack/atoms/SfHeaderNavigationItem/SfHeaderNavigationItem.vue'
import SfImage from '@/components/SfPack/atoms/SfImage/SfImage.vue'
import SfSearchBar from '@/components/SfPack/molecules/SfSearchBar/SfSearchBar.vue'
import SfButton from '@/components/SfPack/atoms/SfButton/SfButton.vue'
import SfIcon from '@/components/SfPack/atoms/SfIcon/SfIcon.vue'
import SfLink from '@/components/SfPack/atoms/SfLink/SfLink.vue'
export default {
  name: 'SfHeader',
  components: {
    SfHeaderNavigationItem,
    SfImage,
    SfSearchBar,
    SfButton,
    SfIcon,
    SfLink,
  },
  props: {
    /**
     * Header logo
     */
    logo: {
      type: [String, Object],
      default: '',
    },
    /**
     * Header logo height
     */
    logoHeight: {
      type: Number,
      default: 35,
    },
    /**
     * Header logo width
     */
    logoWidth: {
      type: Number,
      default: 34,
    },
    /**
     * Header title
     */
    title: {
      type: String,
      default: 'STORENAME',
    },
    /**
     * Header cartIcon (accepts same value as SfIcon)
     */
    cartIcon: {
      type: [String, Boolean, Array],
      default: 'empty_cart',
    },
    /**
     * Header wishlistIcon (accepts same value as SfIcon)
     */
    wishlistIcon: {
      type: [String, Boolean, Array],
      default: 'heart',
    },
    /**
     * Header accountIcon (accepts same value as SfIcon)
     */
    accountIcon: {
      type: [String, Boolean, Array],
      default: 'profile',
    },
    /**
     * Header activeIcon (accepts account, wishlist and cart)
     */
    activeIcon: {
      type: String,
      default: '',
      validator(value) {
        return ['', 'account', 'wishlist', 'cart'].includes(value)
      },
    },
    /**
     * Header search placeholder
     */
    searchPlaceholder: {
      type: String,
      default: 'Искать',
    },
    /**
     * Header search phrase
     */
    searchValue: {
      type: String,
      default: '',
    },
    /**
     * Header wishlist items quantity
     */
    wishlistItemsQty: {
      type: [String, Number],
      default: '0',
    },
    /**
     * Header cart items quantity
     */
    cartItemsQty: {
      type: [String, Number],
      default: '0',
    },
    /**
     * Header sticky to top
     */
    isSticky: {
      type: Boolean,
      default: false,
    },
    /**
     * Is nav slot visible on mobile view
     */
    isNavVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      icons: [],
      test: true,
    }
  },
  computed: {
    ...mapGetters('basket', ['basketCount']),

    cartHasProducts() {
      return parseInt(this.cartItemsQty, 10) > 0
    },
    wishlistHasProducts() {
      return parseInt(this.wishlistItemsQty, 10) > 0
    },
  },
  methods: {
    ...mapMutations('basket', ['toggleCartSidebar']),
    toggleCartSidebar2() {
      this.$router.push('/cart')
    },
    toggleWishSidebar2() {
      console.log('testing')
    },
    handleAccountClick() {
      console.log('test2')
    }
  },
}
</script>
<style lang="scss">
@import '~@storefront-ui/shared/styles/components/organisms/SfHeader.scss';
.sf-header__logo-text {
  font-size: 22px;
  font-weight: 700;
  font-family: 'Raleway', sans-serif;
  text-decoration: none;
  color: #000;
  &:hover {
    
  }
}
</style>
