<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon/lib/svg-icon.vue';
import { mdiBrightness6 } from '@mdi/js';

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
      <button @click="toggleDarkMode">
        <SvgIcon class="icon" type="mdi" :path="mdiBrightness6"></SvgIcon>
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
    justify-content: flex-start;

    button {
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
  }
}
</style>