<script setup lang="ts">
import { Day } from '@/model/TDay.model'

defineProps<{
  bookingDay: Day,
  dayIndex: number
}>()

</script>

<template>
  <div>
    <header>test</header>
    <p>{{ bookingDay.date }}</p>
    <p>{{ dayIndex }}</p>
  </div>
</template>

<style scoped lang="scss">

</style>