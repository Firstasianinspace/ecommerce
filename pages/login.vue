<template>
  <div class="welcome-page">
    <div class="welcome-forms">
      <div class="welcome-forms__header">
        <!-- <div
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
      </div> -->
        <div class="welcome-form">
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/welcome/LoginForm'

export default {
  name: 'LoginPage',
  components: {
    LoginForm,
  },
  layout: 'login',
  computed: {
    authTest: (vm) => vm.$auth
  }
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
  border-bottom: 1px solid #5ece7b;
  pointer-events: none;
}
</style>