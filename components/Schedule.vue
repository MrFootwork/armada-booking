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

let hours: number[] = Array.from(
  { length: hourCount.value + 1 },    // +1 for additional border
  (_, i) => i + hourFirstDefault      // values are mapped to the hour values
)

</script>

<template>
  <div class="wrapper schedule">

    <div class="court-selector">

    </div>

    <div class="wrapper hour-grid">
      <div class="hour-grid hour"
           v-for="hour in hours"
           :id="hour.toString()">
        <label for="hour">{{ hour }}:00</label>
      </div>
    </div>

    <div class="wrapper schedule content">
      <div class="schedule hour"
           v-for="hour in hours"
           :id="hour.toString()">
      </div>
    </div>

    <div>{{ hours }}</div>
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
  width: 100%;
  padding: 1rem;

  display: grid;
  grid-template: 10vh 1fr / 10% 1fr;
  gap: .2rem;
  grid-template-areas:
    "court-selector court-selector"
    "hour-grid schedule";

  .court-selector {
    grid-area: court-selector;
    border: 1px solid red;
  }

  .wrapper.hour-grid {
    grid-area: hour-grid;
    border: 1px solid red;

    .hour-grid.hour {
      height: 2rem;
      position: relative;

      display: grid;
      align-items: start;
      justify-content: end;

      label[for=hour] {
        position: absolute;

        justify-self: end;
        top: -.5rem;
      }
    }
  }

  .wrapper.schedule.content {
    grid-area: schedule;
    border: 1px solid red;

    gap: 0;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto-fill, 2rem);
    padding: 0;

    .schedule.hour {
      height: 2rem;
      border-top: 1px solid grey;
    }
  }
}
</style>