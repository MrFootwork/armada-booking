<script setup lang="ts">
import { useDaysStore } from '@/store/bookingDays'
import { Day } from '@/model/TDay.model'
import { Gym } from '@/model/TGym.model'
import { Court } from '@/model/TCourt.model';

const props = defineProps<{
  currentDay: Day['date'],
  gymId: Gym['id'],
  courtId: Court['id'],
}>()

// days
const dayStore = useDaysStore()
const { currentCourt, currentGym, currentCourts } = dayStore

const currGym = currentGym({
  currentDay: props.currentDay,
  gymId: props.gymId
})

const currCourt = currentCourt(props)

// const currCourts = currentCourts({
//   currentDay: props.currentDay,
//   gymId: props.gymId
// })

/*******************************
 *
 *        calendar view
 *
 *******************************/
const hourFirstDefault = 8
const hourLastDefault = 23

const hourFirst = computed(() => currGym.start || hourFirstDefault)
const hourLast = computed(() => currGym.end || hourLastDefault)
const hourCount = computed(() => hourLast.value - hourFirst.value)

let hours: number[] = Array.from(
  { length: hourCount.value + 1 },    // +1 for additional border
  (_, i) => i + hourFirstDefault      // values are mapped to the hour values
)

// grid coordinates columns: wrapper slots
const columnFirstPlayer = 2
const wrapperSlots = ref<HTMLElement | null>(null)

const currentSlots = computed(() => {
  console.log('currentSlots: ', currCourt.slots);
  return currCourt.slots
})

let currentSlotsElements: HTMLDivElement[] = [];

function slotsDelete() {
  while (wrapperSlots.value?.lastElementChild) {
    wrapperSlots.value?.removeChild(wrapperSlots.value?.lastElementChild);
  }
  currentSlotsElements = []
}

function slotsCreate() {
  for (let slot = 0; slot < currentSlots.value!.length; slot++) {
    for (let player = 0; player < currentSlots.value![slot].player.length; player++) {
      const start = currentSlots.value![slot].start.getHours() - hourFirst.value + 1
      const duration = currentSlots.value![slot].end.getHours() - currentSlots.value![slot].start.getHours()

      const slotElement = document.createElement("div")
      slotElement.setAttribute("class", "slot")
      slotElement.textContent = `${currentSlots.value![slot].player[player].name}`
      slotElement.style.gridColumn = `${player + columnFirstPlayer}`
      slotElement.style.gridRow = `${start} / span ${duration}`
      currentSlotsElements.push(slotElement)
    }
  }
}

function slotsAppend() {
  currentSlotsElements?.forEach(slotElement => {
    wrapperSlots.value?.appendChild(slotElement)
  })
}

onMounted(() => {
  slotsCreate()
  slotsAppend()
})

onUpdated(() => {
  slotsDelete()
  slotsCreate()
  slotsAppend()
})
</script>

<template>
  <div class="wrapper schedule">

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
      </div>

    </div>

  </div>
</template>

<style lang="scss">
.slot {
  color: white;
  background-color: var(--highlight-color);

  text-indent: .5rem;
  padding-top: .5rem;

  border-radius: 5px;
  box-shadow:
    2px 2px 8px -2px var(--card-shadow-dark),
    -2px -2px 6px -3px var(--card-shadow-light);
}
</style>

<style scoped lang="scss">
.wrapper.schedule {
  width: 100%;

  display: grid;
  grid-template: 1fr / 10% 1fr;
  gap: .2rem;
  grid-template-areas:
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

    .schedule.hour {
      height: 2rem;
      border-top: 1px solid grey;
    }

    .wrapper.slots {
      position: absolute;
      top: 0;
      width: 100%;

      display: grid;
      column-gap: 1%;
      grid-template-columns: .5rem repeat(4, 1fr) .5rem;
      grid-template-rows: repeat(13, $hour-height);
      padding: 0;
    }
  }
}
</style>