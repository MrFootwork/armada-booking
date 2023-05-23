<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useDaysStore } from '@/store/bookingDays'
import useDate from '@/composables/date'

const fetchResult = ref()

// days
const dayStore = useDaysStore()
const { days } = storeToRefs(dayStore)
const { fetchDays, addSlot } = dayStore

async function getDays(from: Date) {
  fetchResult.value = await fetchDays(from)
}

// FIXME delete one day or all days
async function deleteDays(option: 'last' | 'all') {
  const url = `/api/days?option=${option}`
  const deleteResult = await $fetch(url, { method: 'DELETE' })

  fetchResult.value = deleteResult
}

async function addDay(newDate: Date) {
  const year = newDate.getFullYear().toString()
  const month = newDate.getMonth().toString()
  const day = newDate.getDate().toString()

  const dateComponents = { year, month, day }

  const insertedDay = await $fetch(
    `/api/days?${new URLSearchParams(dateComponents).toString()}`,
    { method: 'POST' })

  fetchResult.value = insertedDay
}

// FIXME provide path to slot array
const addSlotInStore = async () => {
  const dayId = days.value[0].id
  const gymId = days.value[0].gyms[0].id
  const courtId = '1'
  const start = 20
  const end = 22

  const queryObject = { dayId, gymId, courtId, start, end }
  console.log(queryObject);

  const response = await addSlot(queryObject)
  fetchResult.value = response

  await fetchDays(new Date())

  console.log('updated day: ', days.value);
}

async function addDayWithSample(newDate: Date) {
  const year = newDate.getFullYear().toString()
  const month = newDate.getMonth().toString()
  const day = newDate.getDate().toString()
  const withSample = new Boolean(true).toString()

  const dateComponents = { year, month, day, withSample }

  const insertedDay = await $fetch(
    `/api/days?${new URLSearchParams(dateComponents).toString()}`,
    { method: 'POST' })

  fetchResult.value = insertedDay
}

const today = new Date()
const year = today.getFullYear()
const month = today.getMonth()
const day = today.getDate()
const daySelected = ref(new Date(year, month, day))

async function resetDays() {
  // await $fetch('/api/days', { method: 'DELETE' })
  const fetchedDays = await $fetch('/api/days', { method: 'POST' })

  fetchResult.value = fetchedDays
}

</script>

<template>
  <div>
    <button @click="getDays(daySelected)">days.get</button>
    <button @click="addDay(daySelected)">days.post</button>
    <button @click="addDayWithSample(daySelected)">days.post with sample</button>
    <button @click="deleteDays('all')">days.delete.all</button>
    <button @click="resetDays()">days.reset</button>
    <button @click="addSlotInStore()"
            style=" background-color: orangered; 
                    color: white">
      slot.post
    </button>

    <VueDatePicker v-model="daySelected"
                   week-numbers="iso"
                   auto-apply
                   :clearable="false"
                   :enable-time-picker="false"
                   disable-month-year-select
                   input-class-name="dp-custom-input" />

    <button @click="daySelected = new Date()">Today</button>

    <br><span>JS Date: {{ daySelected }}</span>
    <br><span>ISO: {{ daySelected.toISOString() }}</span>
    <br><span>String: {{ daySelected.toString() }}</span>
    <br><span>UTC: {{ daySelected.toUTCString() }}</span>
    <br><span>useDate().resetTime(): {{ useDate(daySelected).resetTime() }}</span>

    <div class="days-wrapper">
      <div class="day-item"
           v-for="day in days">
        {{ day.date.toLocaleString('de-DE', { dateStyle: 'long', timeStyle: 'short' }) }}
        <!-- <br> {{ day.date }} -->
        <br> {{ day.date.toISOString() }}
        <br>{{ day.id }}
        <br> type: {{ typeof day.date }}
      </div>
    </div>

    <pre>{{ fetchResult }}</pre>

  </div>
</template>

<style scoped lang="scss">
div.days-wrapper {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;

  div.day-item {
    @include buttonShadow;
    background-color: $card-color-secondary-light;
    border-radius: 10px;
    padding: 1rem;

  }

}

button {
  border: none;
  padding: .5rem;
  margin: .5rem;
  border-radius: 5px;

  cursor: pointer;

  color: var(--font-color);
  text-align: center;

  background-color: var(--card-color-primary);
  @include buttonShadow();

  &:hover,
  &:focus {
    background-color: var(--highlight-color);
    color: var(--button-font-hover);
  }

  &:active {
    background-color: var(--highlight-color);
    color: var(--button-font-hover);
    transform: translateY(2px);
  }
}

pre {
  background-color: var(--card-color-primary);
  border-radius: 15px;
  padding: 1rem;
}
</style>