<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    this works 🎉
    <p> Selected Weekday: {{ $route.params.weekday }}</p>
  </div>
</template>

<style scoped>

</style>