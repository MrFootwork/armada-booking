<script setup lang="ts">
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

async function addDay() {
  const newDay = {
    test1: 'value1',
    test2: 'value2'
  }
  const insertedDay = await $fetch('/api/days', { method: 'PUT', body: newDay })
  fetchResult.value = insertedDay
}

async function resetDays() {
  // await $fetch('/api/days', { method: 'DELETE' })
  const fetchedDays = await $fetch('/api/days', { method: 'PUT' })
  fetchResult.value = fetchedDays
}

</script>

<template>
  <div>

    <button @click="getDays()">days.get</button>
    <button @click="deleteDays('all')">days.delete.all</button>
    <!-- BUG delete last doesn't work -->
    <!-- <button @click="deleteDays('last')">days.delete.last</button> -->
    <button @click="addDay()">days.put</button>
    <button @click="resetDays()">days.reset</button>

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