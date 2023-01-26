<template>
  <div>
    <span>loading...</span>
  </div>
</template>

<script setup lang="ts">

onMounted(() => {
  setTimeout(() => {
    navigateTo('/login')
  }, 3000)
})
</script>

<style lang="scss">
body {
  background-color: $background-color;
}
</style>

<style scoped lang="scss">
div {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  span {
    color: $font-color;
  }
}
</style>