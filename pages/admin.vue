<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const fetchResult = ref()

async function getDays() {
  const fetchedDays = await $fetch('/api/days', { method: 'GET' })
  fetchResult.value = fetchedDays
}

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

    <button @click="getDays()">days.get</button>
    <button @click="deleteDays('all')">days.delete.all</button>
    <!-- BUG delete last doesn't work -->
    <button @click="deleteDays('last')">days.delete.last</button>
    <button @click="addDay(daySelected)">days.put</button>
    <button @click="resetDays()">days.reset</button>

    <VueDatePicker v-model="daySelected"
                   week-numbers="iso"
                   auto-apply
                   :clearable="false"
                   :enable-time-picker="false"
                   disable-month-year-select
                   input-class-name="dp-custom-input" />

    <button @click="daySelected = new Date()">Today</button>
    <br><span>ISO: {{ daySelected.toISOString() }}</span>
    <br><span>String: {{ daySelected.toString() }}</span>
    <br><span>UTC: {{ daySelected.toUTCString() }}</span>

    <pre>{{ fetchResult }}</pre>

  </div>
</template>

<style scoped lang="scss">
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
</style>