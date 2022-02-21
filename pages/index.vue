<template>
  <div class="welcome-page">
    <div class="welcome-forms">
      <div class="welcome-forms__header">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="welcome-forms__header-link"
          :class="tab.class"
          @click="toggleComponent"
        >
          <div>
            {{ tab.label }}
          </div>
        </div>
      </div>
      <div class="welcome-form">
        <keep-alive>
          <component :is="dynamicComponent" />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm'
import RegistrationForm from '@/components/RegistrationForm'

export default {
  name: 'IndexPage',
  components: {
    LoginForm,
    RegistrationForm,
  },
  layout: 'login',
    middleware: 'authenticated',
  data: () => ({
    selectedIndex: 0,
    isLogin: true,
  }),
  computed: {
    dynamicComponent: (vm) => (vm.isLogin ? LoginForm : RegistrationForm),
    tabs() {
      return [
        {
          label: 'Вход',
          class: this.isLogin ? 'active' : null,
        },
        {
          label: 'Регистрация',
          class: this.isLogin ? null : 'active',
        },
      ]
    },
  },
  methods: {
    toggleComponent() {
      this.isLogin = !this.isLogin
    },
  },
}
</script>
<style lang="scss" scoped>
.welcome-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eee;
}

.welcome-forms {
  background: #fff;
  width: 650px;
  &__header {
    display: flex;
    justify-content: space-between;
    padding: 25px;
    &-link {
      flex: 1;
      text-align: center;
      text-transform: uppercase;
      font-weight: 700;
      padding: 10px;
      color: #767676;
    }
  }
}

.welcome-form {
  padding: 0 30px;
}

.active {
  color: #222;
  border-bottom: 1px solid #5ECE7B;
  pointer-events: none;
}
</style>