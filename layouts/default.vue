<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon/lib/svg-icon.vue';
import { mdiBrightness6 } from '@mdi/js';

// dark from vueuse
const isDark = useDark()
const toggleDark = useToggle(isDark)

// authentication
const { status, data, signOut } = useAuth()
const username = data.value?.user?.name?.username as string


function logout() {

  signOut({ callbackUrl: '/login' })

}

</script>

<template>
  <div class="wrapper">

    <nav>

      <button class="theme-toggler"
              @click="toggleDark()">
        <SvgIcon class="icon"
                 type="mdi"
                 :path="mdiBrightness6"></SvgIcon>
      </button>

      <div class="auth-status">
        <p v-show="status === 'unauthenticated'">Please login! 🙏🏻</p>
        <p v-show="status === 'authenticated'">Hi {{ username }} 👋🏻</p>
      </div>

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

    div.auth-status {
      border: none;
      padding: .5rem;
      border-radius: 5px;

      cursor: pointer;

      color: var(--font-color);
      text-align: center;

      background-color: var(--card-color-primary);

      p {
        margin: 0
      }
    }

    // FIXME use login style as SCSS mixin
    // delete this style
    button.logout {
      border: none;
      padding: .5rem;
      border-radius: 5px;

      // width: 100%;
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