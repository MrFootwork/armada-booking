<script setup lang="ts">
import Calendar from '@/model/MCalendar.model'

const calendar = new Calendar()

</script>

<template>
  <div class="wrapper">
    <BookTimesDay v-for="day in calendar.days" :booking-day="day" />
  </div>
</template>

<style scoped lang="scss">
.wrapper {}
</style>