<script setup lang="ts">
import Calendar from '~~/model/MCalendar.model';
import { Day } from '@/model/TDay.model'

// FIXME read gym and court from day
// gym and court should be filtered in this component
const props = defineProps<{
  currentDay: Date,
  gymId: Day['gyms'][number]['id'],
  courtId: Day['gyms'][number]['courts'][number]['id'],
}>()

const calendar = new Calendar

const currCourt = computed(() => {
  console.log(props.currentDay);
  return calendar.days.filter(day => day.date.getDate() === props.currentDay.getDate())
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