<script setup lang="ts">
// page behavior 
definePageMeta({
  auth: {
    // guests can access this page
    unauthenticatedOnly: true,
    // logged in users are redirected to
    navigateAuthenticatedTo: '/days',
  }
})

const { signIn } = useAuth()

// input data
const username = ref('')
const password = ref('')
// error message is set in case of any failures during sign-in
// list of possible errors
// https://github.com/nextauthjs/next-auth/blob/aad0b8db0e8a163b3c3ae7dec3e9158e20d368f4/packages/next-auth/src/core/pages/signin.tsx#L4-L19
const signInErrorMessage = ref('')

// FIXME pass credentials to [...] and handle real authentication handler there
const signInHandler = async ({ username, password }: { username: string, password: string }) => {

  const { error, url } = await signIn('credentials', { username, password, redirect: false })

  if (error) {
    signInErrorMessage.value = error
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

      <div v-show="signInErrorMessage">
        <p v-if="signInErrorMessage === 'CredentialsSignin'"
           class="error-credentials-signin">
          Please check your credentials! They seem to be wrong.
          <br><br>Error Code: {{ signInErrorMessage }}
        </p>
        <p v-else
           class="error-credentials-signin">
          Something unexpected happened. Please advise an administrator!
          <br><br>Error Code: {{ signInErrorMessage }}
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
  justify-content: flex-start;
  flex-flow: column;

  height: calc(100vh - 6rem);

  img.logo {
    width: 12rem;
    margin: 3rem;
  }

  form.login {
    @include cardStyle;
    outline: none;

    width: clamp(360px, 50vw, 400px);

    .error-credentials-signin {
      padding: 1rem;
      margin: 0;
      border-radius: .5rem;
      background-color: var(--highlight-color);
      color: $font-color-dark;
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