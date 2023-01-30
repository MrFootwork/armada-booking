<script setup lang="ts">
import Calendar from '@/model/MCalendar.model'
import useDate from '@/composables/date'

const calendar = new Calendar();
// const currentSlot = calculator.days.find

const route = useRoute()
const { dayIndex, hallName, start } = route.query
const currentSlot = calendar
  .days[+dayIndex!]
  .halls.find(hall => hall.name === hallName)
  ?.slots.find(slot => useDate(slot.start).time === start)
</script>

<template>
  <div class="slot wrapper">

    <div class="header">
      this is a slot page 🎉🎉🎉 for {{ route.path }}
      <!-- <span class="weekday"> {{ useDate(bookingDay.date).weekday }}</span>
        <h2 class="date">{{ useDate(bookingDay.date).date }}</h2>
        <img src="icons8-rain-cloud.png" alt="weather" class="weather"> -->
    </div>

    <p>dayIndex: {{ dayIndex }}</p>
    <p>hall: {{ hallName }}</p>
    <p>start: {{ start }}</p>
    <p>data: {{ currentSlot }}</p>

    <!-- <p>data: {{ useDate(currentSlot?.slots[0].start).time === start }}</p> -->

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