<template>
  <div
    :class="className"
    @mouseover="isFocused = true"
    @mouseleave="isFocused = false"
  >
    <ClickOutside
      v-if="isOpen"
      selector=".b-field__caption, .b-field__options"
      @click="close"
    />
    <div class="b-field__caption" @click="isOpen = !isOpen">
      <span v-if="choosenOne === 'Новая карта'">{{ choosenOne }}</span>
      <span v-else>{{ choosenOne | VMask(cardNumberMask)}}</span>
    </div>
    <div class="b-field__options">
      <template v-if="items.length">
        <div
          v-for="item in items"
          :key="item.id"
          class="b-field__item"
          @click="onSelect(item)"
        >
        <span v-if="item.name === 'Новая карта'">{{ item.name }}</span>
        <span v-else>{{ item.number | VMask(cardNumberMask) }}</span>
        </div>
      </template>
      <div v-else class="b-field__item b-field__item--disabled">
        {{ noDataText }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import { maskCardNumber } from '@/helpers'
import ClickOutside from '@/components/common/ClickOutside.vue'

export default {
  name: 'SelectCard',
  components: {
    ClickOutside,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    noDataText: {
      type: String,
      default: 'Список пуст',
    },
    choosenOne: {
      type: String,
      default: 'Choosen one'
    }
  },
  data() {
    return {
      isOpen: false,
      isFocused: false,
    }
  },
  computed: {
    className() {
      const { isOpen, isFocused } = this
      const classNames = ['b-field b-field--select']
      isOpen && classNames.push('is-open')
      ;(isOpen || isFocused) && classNames.push('is-focused')
      return classNames
    },
    // itemList: (vm) => vm.items.map((s) => ({
    //   id: s.id,
    //   name: s.name === 'Новая карта' ? 'Новая карта' : maskCardNumber(s.number),
    // })),
    cardNumberMask: () => 'XXXX XXXX XXXX XXXX',
  },
  methods: {
    ...mapActions('payment', ['setPaymentMethod']),

    close() {
      this.isOpen = false
    },
    onSelect(value) {
      this.isOpen = false;
      this.setPaymentMethod(value)
    },
  },
}
</script>

<style lang="scss" scoped>
.b-field {
  position: relative;
  padding: 10px 0 0;

  &.is-open &__caption::after {
    border: 5px solid transparent;
    border-top: none;
    border-bottom-color: black;
  }

  &.is-open &__options {
    display: block;
  }

  &__item {
    position: relative;
    padding: 10px 32px 10px 17px;
    cursor: pointer;

    &--disabled {
      pointer-events: none;
      cursor: not-allowed;
      opacity: 0.5;
    }

    &:hover {
      color: green;
    }
  }

  &__options {
    position: absolute;
    top: 57px;
    right: 0;
    left: 0;
    z-index: 6;
    display: none;
    max-height: 190px;
    padding: 5px 0;
    overflow: auto;
    background: #fff;
    border: 1px solid black;
  }

  &__caption {
    position: relative;
    display: flex;
    align-items: center;
    max-width: 100%;
    height: 48px;
    padding: 0 32px 0 17px;
    margin-bottom: 6px;
    overflow: hidden;
    font-weight: normal;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid black;
    border-radius: 2px;

    &::after {
      position: absolute;
      top: 21px;
      right: 19px;
      content: '';
      border: 5px solid transparent;
      border-top-color: black;
      border-bottom: none;
    }

    &.error {
      border-color: red;
    }

    .is-focused > & {
      border: 1px solid black;
      transition: all 0.2s;
    }
  }

  &__error {
    padding-left: 1px;
    color: red;
  }
}
</style>
