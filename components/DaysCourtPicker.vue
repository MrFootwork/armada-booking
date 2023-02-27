<script setup lang="ts">

</script>

<template>
  <div class="wrapper">

    <div class="court-picker blurry-background" @click="$emit('togglePicker')"></div>

    <div class="wrapper court-picker content">
      <div class="wrapper closer">test</div>
      <div class="court-picker content">

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

    // FIXME closer doesn't display
    .wrapper.closer {
      position: relative;
      top: 0;
      right: 0;

      cursor: pointer;

      &::before {
        width: 2rem;
        height: 3rem;
        transform: rotate(45deg);
        background-color: green;
        z-index: 100;
      }

      &::after {}
    }

    .court-picker.content {}
  }
}
</style>