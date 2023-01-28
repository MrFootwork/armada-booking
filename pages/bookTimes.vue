<script setup lang="ts">
import Calendar from '@/model/MCalendar.model'

const calendar = new Calendar()

</script>

<template>
  <div>
    <BookTimesDay v-for="day in calendar.days" :booking-day="day" />
  </div>
</template>

<style lang="scss">
@include body()
</style>

<style scoped lang="scss">

</style>