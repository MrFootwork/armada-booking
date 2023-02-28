<script setup lang="ts">

</script>

<template>
  <div class="wrapper">

    <div class="court-picker blurry-background" @click="$emit('togglePicker')"></div>

    <div class="wrapper court-picker content">

      <button class="wrapper closer" @click="$emit('togglePicker')">
        <div class="closer background"> </div>
        <div class="closer icon ascending"></div>
        <div class="closer icon descending"></div>
      </button>

      <div class="court-picker content">
        <img class="court" src="/court.png" alt="">
        <img class="court" src="/court.png" alt="">
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.wrapper {
  position: relative;

  .court-picker.blurry-background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    backdrop-filter: blur(1px);
    z-index: -1;
  }

  .wrapper.court-picker.content {
    position: relative;
    width: clamp(10rem, 50vw, 30rem);
    height: 20rem;
    padding: 1rem;
    z-index: 1;

    background-color: var(--card-color-secondary);
    border-radius: .8rem;
    @include buttonShadow();

    .wrapper.closer {
      position: absolute;
      top: 1rem;
      right: 2rem;
      z-index: 10;

      border: none;
      padding: 0;
      cursor: pointer;

      display: grid;
      align-items: center;
      justify-content: center;

      filter: drop-shadow(3px 3px 2px var(--ui-shadow-dark));

      .closer.background {
        position: absolute;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;

        transform: translateX(-.9rem);
      }

      .icon.closer {
        position: absolute;
        width: .2rem;
        height: 2rem;
        background-color: var(--font-color);

        &.ascending {
          transform: rotate(45deg);
        }

        &.descending {
          transform: rotate(-45deg);
        }
      }
    }

    .court-picker.content {
      display: grid;
      grid-template-columns: 1fr 1fr;

      .court {
        width: 8rem;
        aspect-ratio: 1/1;
        transform: rotate(90deg);
      }
    }
  }
}
</style>