<script setup lang="ts">
import Calendar from '~~/model/MCalendar.model';
import { Day } from '@/model/TDay.model'

defineProps<{
  day: Date,
  gym: Day['gyms'][number],
  court: Day['gyms'][number]['courts'][number],
}>()

const calendar = new Calendar
</script>

<template>
  <div class="wrapper schedule">
    <header>This is BookingDay.vue</header>
    <!-- <p>{{ calendar }}</p> -->
    <p>{{ day }}</p>
    <p>{{ gym }}</p>
    <p>{{ court }}</p>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  @include appWidth();
}
</style>