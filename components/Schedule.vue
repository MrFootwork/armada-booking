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

// wrapper slots (grid) coordinates
const startFirstPlayer = 2
const startSecondPlayer = 3
const startThirdPlayer = 4
const startFourthPlayer = 5
const endFourthPlayer = 5

// FIXME display the slots in the right place
const wrapperSlots = ref<HTMLElement | null>(null)
const testSlot = document.createElement("div")
testSlot.textContent = 'This works!'
testSlot.style.backgroundColor = "red"
testSlot.style.gridColumn = "2"
testSlot.style.gridRow = "1 / span 2"

onMounted(() => {
  wrapperSlots.value?.appendChild(testSlot)

})
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

    <div class="wrapper schedule-content">

      <div class="schedule hour"
           v-for="hour in hours"
           ref="hourElements"
           :id="hour.toString()">
      </div>

      <div class="wrapper slots"
           ref="wrapperSlots">
        <div class="test">css test</div>
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

  .wrapper.schedule-content {
    position: relative;
    grid-area: schedule;

    $hour-height: 2rem;

    display: grid;
    gap: 0;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto-fill, $hour-height);
    padding: 0;
    padding-right: 1rem;

    .schedule.hour {
      height: 2rem;
      border-top: 1px solid grey;
    }

    .wrapper.slots {
      position: absolute;
      top: 0;
      width: 100%;

      display: grid;
      gap: 0;
      grid-template-columns: 1rem repeat(4, 1fr) 1rem;
      // grid-template-columns: 1rem 1fr 1fr 1fr 1fr 1rem;
      grid-template-rows: repeat(13, $hour-height);
      padding: 0;
      padding-right: 1rem;

      .test {
        grid-column: 4;
        grid-row: span 4;

        background-color: red;
      }
    }
  }
}
</style>