<script setup lang="ts">

</script>

<template>
  <div class="wrapper">
    <div class="card">
      <span>test</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
div.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  div.card {
    @include cardStyle;

    span {
      color: $font-color;
    }
  }
}
</style>