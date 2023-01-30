<script setup lang="ts">
import Calculator from '@/model/MCalendar.model'
import { Day } from '@/model/TDay.model'

const calculator = new Calculator();
// const currentSlot: Day['halls'][number]['slots'][number]  = calculator
//   .days
//   .find()

const route = useRoute()
const { daysIndex, hall } = route.query
</script>

<template>
  <div class="slot wrapper">

    <div class="header">
      this is a slot page 🎉🎉🎉 for {{ route.path }}
      <!-- <span class="weekday"> {{ useDate(bookingDay.date).weekday }}</span>
        <h2 class="date">{{ useDate(bookingDay.date).date }}</h2>
        <img src="icons8-rain-cloud.png" alt="weather" class="weather"> -->
    </div>
    date: {{ daysIndex.toString() }}
    hall: {{ hall }}
    <BookingSlotPlayers />

  </div>
</template>

<style scoped lang="scss">
.slot.wrapper {
  @include appWidth();

  .header {
    border-radius: calc($round-corner / 2);

    padding: 1rem;
    margin-top: 1rem;
    @include appWidth();

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
}
</style>