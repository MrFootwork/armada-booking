<template>
  <div>
    <span>{{ loadingText }}</span>
  </div>
</template>

<script setup lang="ts">

const loadingText = ref('loading')

onMounted(() => {

  setInterval(() => {
    if (loadingText.value.includes('...')) return loadingText.value = 'loading'
    loadingText.value += '.'
  }, 500)

  setTimeout(() => {
    navigateTo('/login')
  }, 4000)
})
</script>

<style lang="scss">
body {
  background-color: $background-color;
  color: $font-color;
  @import url('https://fonts.googleapis.com/css2?family=Cabin&display=swap');
  font-family: 'Cabin', sans-serif;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

}
</style>

<style scoped lang="scss">
div {
  width: 5rem;

  span {
    color: $font-color;
  }
}
</style>