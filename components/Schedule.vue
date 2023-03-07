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
    .days.find(day => day.date.getDate() === props.currentDay.getDate())
    ?.gyms.find(gym => gym.id === props.gymId)
    ?.courts.find(court => court.id === props.courtId)
})

const courts = computed(() => {
  return calendar
    .days.find(day => day.date.getDate() === props.currentDay.getDate())!
    .gyms.find(gym => gym.id === props.gymId)!
    .courts
})

const currGym = computed(() => {
  return calendar
    .days.find(day => day.date.getDate() === props.currentDay.getDate())!
    .gyms.find(gym => gym.id === props.gymId)!
})

/*******************************
 *
 *        calendar view
 *
 *******************************/
const hourFirstDefault = 8
const hourLastDefault = 23

const hourFirst = computed(() => currGym.value.start || hourFirstDefault)
const hourLast = computed(() => currGym.value.end || hourLastDefault)
const hourCount = computed(() => hourLast.value - hourFirst.value)

</script>

<template>
  <div class="wrapper schedule">

    <div class="court-selector">

    </div>

    <div class="hour-grid">

    </div>

    <div class="schedule content">

    </div>

    <div class="test">
      <h1>Props</h1>
      <p>currentDay: {{ currentDay }}</p>
      <p>gymID: {{ gymId }}</p>
      <p>courtID: {{ courtId }}</p>
      <h1>Court Info</h1>
      <p>{{ currCourt }}</p>
      <p>{{ courts.map(court => court.courtName) }}</p>
    </div>

  </div>
</template>

<style scoped lang="scss">
.wrapper.schedule {
  @include appWidth();
  padding: 1rem;

  .court-selector {}

  .hour-grid {}

  .schedule.content {}
}
</style>