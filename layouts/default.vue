<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon/lib/svg-icon.vue';
import { mdiBrightness6 } from '@mdi/js';

// authentication
const { signOut } = useAuth()

function logout() {

  signOut({ callbackUrl: '/login' })

}

// FIXME put this into composable and add it to a layout button
function toggleDarkMode() {

  if (document.documentElement.classList.contains("light")) {

    document.documentElement.classList.remove("light")
    document.documentElement.classList.add("dark")

  } else if (document.documentElement.classList.contains("dark")) {

    document.documentElement.classList.remove("dark")
    document.documentElement.classList.add("light")

  } else {

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {

      document.documentElement.classList.add("dark")

    } else {

      document.documentElement.classList.add("light")

    }
  }
}

onBeforeMount(() => {

  toggleDarkMode()

})
</script>

<template>
  <div class="wrapper">

    <nav>

      <button class="theme-toggler"
              @click="toggleDarkMode">
        <SvgIcon class="icon"
                 type="mdi"
                 :path="mdiBrightness6"></SvgIcon>
      </button>

      <p class="auth-status">
        this is auth
      </p>

      <button class="logout"
              @click="logout">
        Logout
      </button>

    </nav>

    <slot />

  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  nav {
    @include appWidth();

    display: flex;
    align-items: center;
    justify-content: space-around;

    button.theme-toggler {
      border-radius: 50%;
      width: 3rem;
      aspect-ratio: 1 / 1;

      background-color: var(--card-color-primary);
      border: none;
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        color: var(--font-color);
      }
    }

    p.auth-status {
      border: none;
      padding: .5rem;
      border-radius: 5px;

      width: 100%;
      cursor: pointer;

      color: var(--font-color);
      text-align: center;

      background-color: var(--card-color-primary);
      @include buttonShadow();

      // different from login style
      width: 30%;
    }

    // FIXME use login style as SCSS mixin
    // delete this style
    button.logout {
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

      // different from login style
      width: 30%;
    }
  }
}
</style>