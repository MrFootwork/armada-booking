<script setup lang="ts">
import { Day } from '@/model/TDay.model'
import { useDate } from '@/composables/date'

const props = defineProps<{
  bookingDay: Day
}>()

</script>

<template>
  <div>

    <div class="header">
      <span class="weekday"> {{ useDate(bookingDay.date).weekday }}</span>
      <h3 class="date">{{ useDate(bookingDay.date).date }}</h3>
      <img src="icons8-rain-cloud.png" alt="weather" class="weather">
    </div>

    <div class="halls wrapper" v-for="hall in bookingDay.halls">
      {{ hall.name }}
    </div>

  </div>
</template>

<style scoped lang="scss">
.header {
  border-radius: calc($round-corner / 2);

  padding: 1rem;
  width: 90vw;
  max-width: 600px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: row;

  background-color: $card-color;
  box-shadow:
    3px 3px 10px 2px #111,
    -1px -1px 10px -1px #666;

  .weekday {
    border-radius: calc($round-corner / 3);
    padding: .3rem;
    width: 2.5rem;

    text-align: center;

    background-color: #555;
  }

  .date {
    margin: 0;
  }

  .weather {
    margin: 0;
    width: 2rem;
    color: white;
  }
}
</style>