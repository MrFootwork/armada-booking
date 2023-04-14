<script setup lang="ts">
// definePageMeta({ auth: false })
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/days',
  }
})
const { signIn } = useAuth()

// input data
const username = ref('')
const password = ref('')

// login
function onLogin() {

  // navigateTo('/days')

  signIn('credentials', { username: username.value, password: password.value })

}
// FIXME implement authentication from nuxt-auth-example
// build login & logout button
// don't restrict login page, call nuxt-auth login page on click
// BUG right now the app directs user directly to login page
// implement Credential Handler function using db functionalities


</script>

<template>
  <div class="wrapper">
    <img class="logo"
         src="/logo.png"
         alt="logo">
    <form class="login"
          @submit.prevent>
      <input type="text"
             name="username"
             id="username"
             placeholder="Enter Username here!"
             v-model="username">
      <input type="password"
             name="password"
             id="password"
             placeholder="Enter Password here!"
             v-model="password">
      <button @click="onLogin">Login</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
div.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  img.logo {
    position: absolute;
    width: 12rem;
    translate: 0 calc(-100vh / 3);
  }

  form.login {
    @include cardStyle;
    outline: none;

    width: clamp(360px, 50vw, 400px);

    input {
      border: none;
      padding: .5rem;
      border-radius: $round-corner;
      box-sizing: border-box;

      width: 100%;

      color: var(--font-color);
      text-align: center;

      background-color: var(--card-color-primary);
      @include inputShadow();
    }

    button {
      border: none;
      padding: .5rem;
      border-radius: 5px;

      width: 100%;
      cursor: pointer;

      color: var(--font-color);
      text-align: center;

      background-color: var(--card-color-primary);
      @include buttonShadow();

      &:hover,
      &:focus {
        background-color: var(--highlight-color);
        color: var(--button-font-hover);
      }

      &:active {
        background-color: var(--highlight-color);
        color: var(--button-font-hover);
        transform: translateY(2px);
      }
    }
  }
}
</style>