<script setup lang="ts">
import { Day } from '@/model/TDay.model'
import useDate from '@/composables/date'

defineProps<{
  bookingDay: Day,
  dayIndex: number
}>()

</script>

<template>
  <div class="wrapper day">

    <div class="header">
      <div></div>
      <span class="weekday"> {{ useDate(bookingDay.date).weekday }}</span>
      <h2 class="date">{{ useDate(bookingDay.date).date }}</h2>
      <!-- TODO add dynamic weather icon -->
      <!-- https://openweathermap.org/guide -->
      <div class="weather wrapper">
        <img :src="'/icons8-rain-cloud.png'" alt="weather" class="weather">
      </div>
    </div>

    <!-- TODO add timeline -->
    <div class="halls wrapper" v-for="hall in bookingDay.halls">
      <h3 class="halls title"> {{ hall.name }}</h3>
      <div class="time-slots wrapper">
        <BookingDaySlot v-for="slot in hall.slots" :slot-time="slot" :day-index="dayIndex" />
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.wrapper.day {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: column;

  .header {
    @include headerStyle();

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

  .halls {
    &.wrapper {}

    &.title {
      text-align: center;
      font-size: 1.2rem;
    }

    .time-slots.wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: wrap;
      // @include appWidth();
    }
  }

}
</style>