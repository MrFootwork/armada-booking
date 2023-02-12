<script setup lang="ts">
import Calendar from '~~/model/MCalendar.model';

defineProps<{
  day: Date,
  gym: string,
  court: string
}>()

const calendar = new Calendar
</script>

<template>
  <div class="wrapper schedule">
    <header>This is BookingDay.vue</header>
    <p>{{ calendar }}</p>
    <p>{{ day }}</p>
    <p>{{ gym }}</p>
    <p>{{ court }}</p>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  @include appWidth();
}
</style>