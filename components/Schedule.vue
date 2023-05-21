<script setup lang="ts">
import { useDaysStore } from '@/store/bookingDays'
import { useLanguage } from '@/store/language'

import { Day } from '@/model/TDay.model'
import { Gym } from '@/model/TGym.model'
import { Court } from '@/model/TCourt.model';

const props = defineProps<{
  currentDay: Day['date'],
  gymId: Gym['id'],
  courtId: Court['id'],
}>()

/*******************************
 *        booking data
 *******************************/
// days
const dayStore = useDaysStore()
const { days } = storeToRefs(dayStore)
const { currentGym } = dayStore

// days
const languageStore = useLanguage()
const { preferred } = storeToRefs(languageStore)

// gym
let currGym: Gym = {
  id: 'not found',
  nameCode: 'not found',
  nameShort: 'not found',
  place: 'not found',
  courtCount: 0
}

try {
  currGym = currentGym({
    currentDay: props.currentDay,
    gymId: props.gymId
  })
} catch (e) {
  console.error(e);
}

// court
const currentCourt = computed<Court>(() => {
  const fallbackCourt = {
    id: 'fallback court',
    courtName: 'fallback court',
    slots: []
  }

  return days.value
    .find(day => day.date.getDate() === props.currentDay.getDate())
    ?.gyms.find(gym => gym.id === props.gymId)
    ?.courts?.find(court => court.id === props.courtId) || fallbackCourt
})

// slots
const currentSlots = computed(() => {
  if (currentCourt.value) {
    return currentCourt.value.slots
  }
})

/*******************************
 *        calendar view
 *******************************/
const hourFirstDefault = 8
const hourLastDefault = 22

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



let currentSlotsElements: HTMLDivElement[] = [];

function slotsDelete() {
  while (wrapperSlots.value?.lastElementChild) {
    wrapperSlots.value?.removeChild(wrapperSlots.value?.lastElementChild);
  }
  currentSlotsElements = []
}

// FIXME create array for clickable hour elements
// currently this function creates only the first element as free slot
function slotsFreeCreate() {
  console.log('*********************');
  console.log('* Create free slots *');
  console.log('*********************');
  console.log('hours ', hours);
  // console.log('currentSlots ', currentSlots.value);

  // determine booked times
  const bookedTimes: [number, number][] = (() => {
    return currentSlots.value?.map(slot => {
      return [new Date(slot.start).getHours(), new Date(slot.end).getHours()]
    }) || []
  })()

  // loop through rows
  for (let i = 0; i < hours.length; i++) {
    const hour = hours[i];
    const gridRow = i + 1

    // determine column to add free slot
    const hourIsBooked = bookedTimes.some(bookedSlot => {
      const [start, end] = bookedSlot
      // console.log(start, hour, end);
      return start <= hour && hour < end
    })

    console.log('hourIsBooked: ', hour, hourIsBooked);


    // place free slot accordingly


  }

  // create slot and its content
  const slotElement = document.createElement("div")
  slotElement.setAttribute("class", "slot free")
  slotElement.textContent = `➕`

  // slot placement
  slotElement.style.gridColumn = `${0 + columnFirstPlayer}`
  slotElement.style.gridRow = `${1} / span 1`
  // slotElement.style.gridColumn = `${firstFreePlayer + columnFirstPlayer}`
  // slotElement.style.gridRow = `${rowHour} / span 1`

  // add slot to slot array
  currentSlotsElements.push(slotElement)

}

function slotsBookedCreate() {
  if (currentSlots.value) {
    for (let slot = 0; slot < currentSlots.value.length; slot++) {
      for (let player = 0; player < currentSlots.value[slot].player.length; player++) {
        const currentSlot = currentSlots.value[slot]

        const startDate = new Date(currentSlot.start)
        const endDate = new Date(currentSlot.end)

        const start = startDate.getHours() - hourFirst.value + 1
        const duration = endDate.getHours() - startDate.getHours()

        // create slot and its content
        const slotElement = document.createElement("div")
        slotElement.setAttribute("class", "slot booked")
        slotElement.textContent = `${currentSlot.player[player].name}`
        slotElement.title = `
        slot hourIndex: ${currentSlot.hourIndex} 
        slot start: ${startDate.toLocaleTimeString(
          preferred.value,
          {
            hour: 'numeric',
            timeZone: 'Europe/Bucharest'
          }
        )} 
        slot end: ${currentSlot.end} 
        slot id: ${currentSlot.id} 
        player id: ${currentSlot.player[player].id} 
        player name: ${currentSlot.player[player].name} 
        player organizer: ${currentSlot.player[player].bookedBy}`

        // slot placement
        slotElement.style.gridColumn = `${player + columnFirstPlayer}`
        slotElement.style.gridRow = `${start} / span ${duration}`

        // add slot to slot array
        currentSlotsElements.push(slotElement)
      }
    }
  } else {
    alert('no slots available')
  }
}

function slotsAppend() {
  currentSlotsElements?.forEach(slotElement => {
    wrapperSlots.value?.appendChild(slotElement)
  })
}

onMounted(() => {
  slotsBookedCreate()
  slotsFreeCreate()
  slotsAppend()
})

onUpdated(() => {
  slotsDelete()
  slotsBookedCreate()
  slotsFreeCreate()
  slotsAppend()
})
</script>

<template>
  <div class="wrapper schedule">

    <div class="wrapper hour-grid">

      <div class="hour-grid hour"
           v-for="hour in hours"
           :key="hour.toString()"
           :id="hour.toString()">
        <label for="hour">{{ hour }}:00</label>
      </div>

    </div>

    <div class="wrapper schedule-content">

      <div class="schedule hour"
           v-for="hour in hours"
           ref="hourElements"
           :key="hour.toString()"
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

  margin: 1px 0;

  text-indent: .5rem;
  padding-top: .5rem;

  border-radius: 5px;
  box-shadow:
    2px 2px 8px -2px var(--card-shadow-dark),
    -2px -2px 6px -3px var(--card-shadow-light);

  &.booked {
    opacity: 95%;
  }

  &.free {
    cursor: pointer;
    opacity: 0;

    &:hover {
      opacity: 75%;
    }
  }
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

      &:hover,
      &:focus {
        border: 1px solid red;
      }
    }

    .wrapper.slots {
      position: absolute;
      top: 0;
      width: 100%;

      display: grid;
      gap: 0 1%;
      grid-template-columns: .5rem repeat(4, 1fr) .5rem;
      grid-template-rows: repeat(13, $hour-height);
      padding: 0;


    }
  }
}
</style>