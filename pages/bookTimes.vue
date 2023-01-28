<script setup lang="ts">
import Calendar from '@/model/MCalendar.model'

const calendar = new Calendar()

</script>

<template>
  <div class="wrapper">
    <NuxtLayout name="weekdays">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style scoped lang="scss">
.wrapper {}
</style>