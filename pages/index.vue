<template>
  <div>
    loading...
  </div>
</template>

<script setup lang="ts">

onMounted(() => {
  setTimeout(() => {
    navigateTo('/login')
  }, 3000)
})
</script>

