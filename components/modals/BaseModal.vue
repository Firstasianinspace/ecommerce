<template>
  <div v-if="isOpen">
    <div class="fixed-bg">
      <div class="modal-outside" @click.self="closeModalMethod()"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BaseModal',
  props: {
    name: {
      type: String,
      required: true
    },
  },
  computed: {
    ...mapGetters('modals', ['active', 'allOpenModals']),
  
    isActive: (vm) => vm.active === vm.name,
    isOpen: (vm) => vm.allOpenModals.includes(vm.name),
  },
  beforeDestroy() {
    if (this.isOpen) this.closeModal()
  },
  methods: {
    ...mapActions('modals', ['closeModal']),

    closeModalMethod() {
      this.closeModal(this.name);
    },
  },
}
</script>

<style lang="scss" scoped>
.fixed-bg {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-outside {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
</style>