<script setup lang="ts">
import { Day } from '@/model/TDay.model'

const props = defineProps<{
  bookingDay: Day
}>()


console.log(props.bookingDay);

</script>

<template>
  <div>

    <div class="header">
      <span class="weekday">{{ bookingDay.date.toLocaleDateString('de-DE', { weekday: 'short' }) }}</span>
      <h3>{{ bookingDay.date.toLocaleDateString() }}</h3>
    </div>

    <div class="halls wrapper" v-for="hall in bookingDay.halls">
      {{ hall.name }}
    </div>

  </div>
</template>

<style scoped lang="scss">

</style>