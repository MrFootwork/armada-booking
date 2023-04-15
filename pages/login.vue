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
const signInError = ref('')

// FIXME pass credentials to [...] and handle real authentication handler there
const signInHandler = async ({ username, password }: { username: string, password: string }) => {

  const { error, url } = await signIn('credentials', { username, password, redirect: false })

  if (error) {
    signInError.value = error
  } else {
    // No error, continue with the sign in, e.g., by following the returned redirect:
    return navigateTo(url, { external: true })
  }
}

</script>

<template>
  <div class="wrapper">

    <img class="logo"
         src="/logo.png"
         alt="logo">

    <form class="login"
          @submit.prevent>

      <div v-show="signInError">
        <p v-show="signInError === 'CredentialsSignin'"
           class="error-credentials-signin">
          {{ signInError }}: Please check your credentials! They seem to be wrong.
        </p>
      </div>

      <input type="text"
             name="username"
             id="username"
             placeholder="hint: jsmith"
             v-model="username">

      <input type="password"
             name="password"
             id="password"
             placeholder="hint: hunter2"
             v-model="password">

      <button @click="signInHandler({ username, password })">Login</button>

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

    .error-credentials-signin {
      padding: 1rem;
      background-color: var(--highlight-color);
    }

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