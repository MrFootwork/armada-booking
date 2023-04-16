<script setup lang="ts">
import { useDays } from '@/store/bookingDays'

const daysStore = useDays()
const { setState } = daysStore

const input = ref('default')

// FIXME pull data from database
</script>

<template>
  <div>
    <p>Value in Store: {{ daysStore.anyState }}</p>
    <input type="text"
           name="state"
           id="state"
           v-model="input">
    <button @click="setState(input)">Save</button>
  </div>
</template>

<style lang="scss" scoped></style>