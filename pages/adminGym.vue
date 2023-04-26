<script setup lang="ts">
import { GymInput } from '@/model/TGym.model'
// FIXME test gym push, and get all gyms

const fetchResult = ref()

const newGym: GymInput = {
  nameShort: 'New Gym',
  nameCode: 'new-gym',
  place: 'That New Gym Place'
}

async function addGym(gymToAdd: GymInput) {
  const insertGym = await $fetch('/api/gyms', {
    method: 'POST',
    body: gymToAdd
  })

  fetchResult.value = insertGym
}

async function fetchGyms() {
  // const fetchedGyms = await $fetch('/api/gyms', { method: 'GET' })
  // fetchResult.value = fetchedGyms
  const fetchedGyms = await useFetch('/api/gyms', { method: 'GET' })
  fetchResult.value = fetchedGyms.data.value?.out
}

</script>

<template>
  <div class="wrapper">
    <button @click="addGym(newGym)">Add Gym</button>
    <button @click="fetchGyms()">Fetch Gyms</button>

    <pre>{{ fetchResult }}</pre>

  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-flow: column;
}
</style>