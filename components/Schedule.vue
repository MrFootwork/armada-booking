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

const currGym = computed(() => {
  return calendar
    .days.filter(day => day.date.getDate() === props.currentDay.getDate())[0]
    .gyms.filter(gym => gym.id === props.gymId)[0]
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

    <h1>Props</h1>
    <p>currentDay: {{ currentDay }}</p>
    <p>gymID: {{ gymId }}</p>
    <p>courtID: {{ courtId }}</p>

    <h1>Court Info</h1>
    <p>{{ currCourt }}</p>
    <p>{{ hourFirst }}</p>
    <p>{{ hourLast }}</p>
    <p>{{ hourCount }}</p>


  </div>
</template>

<style scoped lang="scss">
.wrapper {
  @include appWidth();
  padding: 1rem;
}
</style>