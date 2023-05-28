<script setup lang="ts">
import { useDaysStore } from '@/store/bookingDays'
import { useLanguage } from '@/store/language'

import { Day } from '@/model/TDay.model'
import { Gym } from '@/model/TGym.model'
import { Court } from '@/model/TCourt.model'
import { Slot } from '@/model/TSlot.model'

const props = defineProps<{
  currentDay: Day['date'],
  gymId: Gym['id'],
  courtId: Court['id'],
}>()

/*******************************
 *        booking data
 *******************************/
// language
const languageStore = useLanguage()
const { preferred } = storeToRefs(languageStore)

// days
const dayStore = useDaysStore()
const { days } = storeToRefs(dayStore)
const { fetchDays, addSlot } = dayStore

// gym
const currentGym = computed(() => {
  return days.value
    .find(day => day.date.getDate() === props.currentDay.getDate())
    ?.gyms.find(gym => gym.id === props.gymId)
})

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

// duration dialog
const showDurationModal = ref(false)
function toggleDurationModal() {
  showDurationModal.value = !showDurationModal.value
  console.log('toggling duration modal to ', showDurationModal.value);
}

/*******************************
 *        calendar view
 *******************************/
const hourFirstDefault = 8
const hourLastDefault = 22

const hourFirst = computed(() => currentGym.value?.start || hourFirstDefault)
const hourLast = computed(() => currentGym.value?.end || hourLastDefault)
const hourCount = computed(() => hourLast.value - hourFirst.value)

const hours = computed(() => {
  return Array.from(
    { length: hourCount.value + 1 },    // +1 for additional border
    (_, i) => i + hourFirst.value      // values are mapped to the hour values
  )
})

// duration modal
const selectedHour = ref(0)
const selectedDuration = ref(1)

function setDuration(inputDuration: number) {
  selectedDuration.value = inputDuration
  console.log('duration set to ', selectedDuration.value);
}

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

function slotsFreeCreate() {
  // determine booked times
  // TODO turn into objects instead of arrays
  const bookedTimes: [
    Slot['id'],
    number,
    number,
    Slot['player']
  ][] = (() => {
    return currentSlots.value?.map(slot => {
      return [
        slot.id,
        new Date(slot.start).getHours(),
        new Date(slot.end).getHours(),
        slot.player
      ]
    }) || []
  })()

  // loop through rows (= each hour)
  for (let i = 0; i < hours.value.length; i++) {
    const hour = hours.value[i];
    const gridRow = i + 1
    let currentSlotId: Slot['id'] | undefined = undefined

    // determine column to add free slot
    let gridColumn: number | null = columnFirstPlayer
    let playersAtThisHour = 0

    // there are at least one reservation at this hour
    const hourHasReservation = bookedTimes.some(bookedSlot => {
      const [slotId, start, end, players] = bookedSlot

      const hourOverlapsSlot = start <= hour && hour < end

      if (hourOverlapsSlot) {
        playersAtThisHour = players.length
        currentSlotId = slotId
      }

      return hourOverlapsSlot
    })

    // less than 4 reservations are already made at this hour
    const hourHasFreeSlots = playersAtThisHour < 4

    // determine next free column 
    if (hourHasReservation && hourHasFreeSlots) gridColumn += playersAtThisHour

    if (hourHasFreeSlots) {
      // create slot and its content
      const slotElement = document.createElement("div")
      slotElement.setAttribute("class", "slot free")
      slotElement.textContent = `➕`
      // add click listener
      slotElement.addEventListener("click", bookSlotOnClick)
      // slot placement
      slotElement.style.gridColumn = `${gridColumn} / span ${4 - playersAtThisHour}`
      slotElement.style.gridRow = `${gridRow} / span 1`
      // add slot to slot array
      currentSlotsElements.push(slotElement)
    }

    // FIXME open modal to ask for duration
    // use templatePromise to wait for input from duration modal
    // https://vueuse.org/core/createTemplatePromise/#createtemplatepromise
    async function bookSlotOnClick() {
      // reset modal values
      selectedDuration.value = 1

      const currentDay = days.value.find(day =>
        day.date.getDate() === props.currentDay.getDate()
      )
      const dayId = currentDay!.id
      const gymId = props.gymId
      const courtId = props.courtId
      const start = hour

      selectedHour.value = hour
      showDurationModal.value = true

      // FIXME await for input? see link above
      const end = hour + 1

      const queryObject = {
        dayId, gymId, courtId, start, end,
        ...(hourHasReservation && { slotId: currentSlotId })
      }
      console.log('query from component: ', queryObject);

      // const response = await addSlot(queryObject)
      // console.log('addSlot response: ', response);

      // TODO fetch only the one updated day and replace days with it
      await fetchDays(new Date())
      console.log('updated days fetched');
    }
  }
}

function slotsBookedCreate() {
  if (currentSlots.value) {
    for (let slot = 0; slot < currentSlots.value.length; slot++) {
      for (let player = 0; player < currentSlots.value[slot].player.length; player++) {
        const currentSlot = currentSlots.value[slot]

        console.log('Rendering Slots in local Timezone: ',
          Intl.DateTimeFormat().resolvedOptions().timeZone);

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
        slot start local: ${startDate.toLocaleTimeString(
          preferred.value,
          {
            hour: 'numeric',
            timeZone: 'Europe/Bucharest'
          }
        )} 
        slot start ISO: ${currentSlot.start} 
        slot end local: ${endDate.toLocaleTimeString(
          preferred.value,
          {
            hour: 'numeric',
            timeZone: 'Europe/Bucharest'
          }
        )} 
        slot end ISO: ${currentSlot.end} 
        slot id: ${currentSlot.id} 
        player id: ${currentSlot.player[player].id} 
        player name: ${currentSlot.player[player].name} 
        player organizer: ${currentSlot.player[player].bookedBy}`

        // FIXME add click listener for editing and deletion

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

    <button @click="showDurationModal = true">Toggle Duration Modal</button>

    <ScheduleModalDuration v-show="showDurationModal"
                           :show-modal="showDurationModal"
                           :slot-start="selectedHour"
                           :gym-end="currentGym?.end"
                           @toggle-modal="toggleDurationModal"
                           @confirm-duration="setDuration" />

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

    &:hover,
    &:focus {
      opacity: 75%;
    }

    // TODO firefox needs touchstart/-end animation
    // :active seems to only work in Chrome.
    &:active {
      opacity: 75%;
      transition: opacity 0.5s;
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