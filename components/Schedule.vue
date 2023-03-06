<script setup lang="ts">
import Calendar from '~~/model/MCalendar.model';
import { Day } from '@/model/TDay.model'

const props = defineProps<{
  currentDay: Date,
  gymId: Day['gyms'][number]['id'],
  courtId: Day['gyms'][number]['courts'][number]['id'],
}>()

// FIXME make calendar a pinia store
const calendar = new Calendar

const currCourt = computed(() => {
  return calendar
    .days.filter(day => day.date.getDate() === props.currentDay.getDate())[0]
    .gyms.filter(gym => gym.id === props.gymId)[0]
    .courts.filter(court => court.id === props.courtId)[0]
})

</script>

<template>
  <div class="wrapper schedule">

    <h1>Props</h1>
    <p>currentDay: {{ currentDay }}</p>
    <p>gymID: {{ gymId }}</p>
    <p>courtID: {{ courtId }}</p>

    <h1>Court Info</h1>
    <p>{{ currCourt }}</p>

  </div>
</template>

<style scoped lang="scss">
.wrapper {
  @include appWidth();
  padding: 1rem;
}
</style>