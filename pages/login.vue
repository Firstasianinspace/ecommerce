<template>
  <div class="welcome">
    <div class="welcome-form">
      <LoginForm />
    </div>
    <a href="#" class="welcome-form__restore"> Забыли пароль? </a>
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
}
</script>
<style lang="scss" scoped>
.welcome {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #eee;
}

.welcome-form {
  background: #fff;
  width: 650px;

  &__header {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  &__restore {
    padding: 35px 0;
    text-align: center;
    font-size: 14px;
    color: #767676;
  }
}

.welcome-form {
  padding: 50px;
}

.active {
  color: #222;
  border-bottom: 1px solid #5ece7b;
  pointer-events: none;
}
</style>