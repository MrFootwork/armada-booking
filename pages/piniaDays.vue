<script setup lang="ts">
import { useDaysStore } from '@/store/bookingDays'
import { storeToRefs } from 'pinia'

// usage of the store
const daysStore = useDaysStore()
// reactive store properties
const { days } = storeToRefs(daysStore)
// actions of the store
const { fetchDays, addSlot } = daysStore

const input = ref('default')

// FIXME pull data from database
</script>

<template>
  <div>
    <p>Value in Store: {{ days }}</p>
    <input type="text"
           name="state"
           id="state"
           v-model="input"
           @keyup.enter="addSlot(input)">
    <button @click="addSlot(input)">Save</button>
    <button @click="fetchDays()">Load</button>
  </div>
</template>

<style lang="scss" scoped></style>