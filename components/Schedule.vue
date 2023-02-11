<script setup lang="ts">
import { Day } from '@/model/TDay.model'
import Calendar from '~~/model/MCalendar.model';

const calendar = new Calendar
</script>

<template>
  <div class="wrapper">
    <header>This is BookingDay.vue</header>
    <p>{{ calendar }}</p>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  @include appWidth();
}
</style>