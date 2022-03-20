<template>
  <div class="">
    <div class="expandable-title" @click="expanded = !expanded">
      {{ title }}
      <font-awesome-icon v-if="chevron" :icon="['fas', 'chevron']" />
    </div>
    <transition-expand>
      <div v-if="expanded" class="expandable-message">
        <slot name="message"> This is the default expanded message</slot>
      </div>
    </transition-expand>
  </div>
</template>

<script>
import TransitionExpand from '@/components/transitions/TransitionExpand'

export default {
  name: 'ExpandableList',
  components: {
    TransitionExpand,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    chevron: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: () => '',
    },
  },
  data: () => ({ expanded: false }),
}
</script>

<style>
.expand-enter-active,
.expand-leave-active {
  transition-property: opacity, height;
}
.expand-enter,
.expand-leave-to {
  opacity: 0;
}
.expandable-title {
  font-size: 16px;
  font-weight: 400;
  padding: 10px 0;
}
</style>