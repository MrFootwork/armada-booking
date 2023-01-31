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
      <span class="material-symbols-outlined" @click="navigateTo('/days')">
        arrow_back_ios_new
      </span>
      <span class="weekday"> {{ useDate(currentSlot!.start).weekday }}</span>
      <h2 class="date">{{ useDate(currentSlot!.start).date }}</h2>
      <div class="weather wrapper">
        <img :src="'/icons8-rain-cloud.png'" alt="" class="weather">
      </div>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: column;

  @include appWidth();

  .header {
    @include headerStyle();

    .material-symbols-outlined {
      cursor: pointer;
      font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48;

      text-align: left;
      line-height: none;
      text-shadow: 2px 2px 2px #111;
    }

    .weekday {
      border-radius: calc($round-corner / 3);
      padding: .3rem;
      width: 2.5rem;
      margin: auto;

      text-align: center;

      background-color: #555;
      box-shadow:
        2px 2px 4px 0px #222,
        -1px -1px 2px -1px #fff;
    }

    .date {
      margin: 0;
      text-align: center;
      line-height: -10px;
    }

    .weather.wrapper {
      display: flex;
      align-items: center;
      justify-content: end;

      .weather {
        margin: 0;
        width: 2rem;
        color: white;
      }
    }

  }
}
</style>