<script setup lang="ts">

const loadingText = ref('loading')

onMounted(() => {

  setInterval(() => {
    if (loadingText.value.includes('...')) return loadingText.value = 'loading'
    loadingText.value += '.'
  }, 500)

  setTimeout(() => {
    navigateTo('/login')
  }, 2000)
})
</script>

<template>
  <div>
    <span>{{ loadingText }}</span>
  </div>
</template>

<style lang="scss">
@include body()
</style>

<style scoped lang="scss">
div {
  width: 5rem;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: var(--font-color);
  }
}
</style>