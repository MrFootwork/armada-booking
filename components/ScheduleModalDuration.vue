<script setup lang="ts">

defineEmits(['toggle-modal'])

</script>

<template>
  <div class="wrapper">

    <div class="modal-duration blurry-background"
         @click="$emit('toggle-modal')">🍍</div>

    <div class="wrapper court-picker content">



    </div>

  </div>
</template>

<style scoped lang="scss">
.wrapper {
  position: absolute;

  // FIXME try Teleport
  .modal-duration.blurry-background {
    // position: fixed;
    // top: 0;
    // left: 0;
    // height: 100%;
    // width: 100%;
    // backdrop-filter: blur(1px);
    // z-index: 1;
  }
}
</style>