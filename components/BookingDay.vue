<script setup lang="ts">
import { Day } from '@/model/TDay.model'
import useDate from '@/composables/date'

const props = defineProps<{
  bookingDay: Day
}>()

</script>

<template>
  <div>

    <div class="header">
      <span class="weekday"> {{ useDate(bookingDay.date).weekday }}</span>
      <h2 class="date">{{ useDate(bookingDay.date).date }}</h2>
      <img src="icons8-rain-cloud.png" alt="weather" class="weather">
    </div>

    <!-- TODO add timeline -->
    <div class="halls wrapper" v-for="hall in bookingDay.halls">
      <h3 class="halls title"> {{ hall.name }}</h3>
      <div class="time-slots wrapper">
        <BookingDaySlot v-for="slot in hall.slots" :slot-time="slot" />
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.header {
  border-radius: calc($round-corner / 2);

  padding: 1rem;
  margin-top: 1rem;
  width: 90vw;
  max-width: 600px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: row;

  background-color: $card-color;
  box-shadow:
    3px 3px 10px 2px #111,
    -1px -1px 6px -1px #999;

  .weekday {
    border-radius: calc($round-corner / 3);
    padding: .3rem;
    width: 2.5rem;

    text-align: center;

    background-color: #555;
    box-shadow:
      2px 2px 4px 0px #222,
      -1px -1px 2px -1px #fff;
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

.halls {
  &.wrapper {}

  &.title {
    text-align: center;
  }

  .time-slots.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: wrap
  }
}
</style>