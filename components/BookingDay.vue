<script setup lang="ts">
import { Day } from '@/model/TDay.model'
import useDate from '@/composables/date'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiWeatherPartlyRainy } from '@mdi/js';

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
        <SvgIcon class="icon" type="mdi" :path="mdiWeatherPartlyRainy"></SvgIcon>
      </div>
    </div>

    <!-- TODO add timeline -->
    <div class="halls wrapper" v-for="gym in bookingDay.gyms">
      <h3 class="halls title"> {{ gym.name }}</h3>
      <div class="time-slots wrapper">
        <!-- <BookingDaySlot v-for="slot in gym.slots" :slot-time="slot" :day-index="dayIndex" /> -->
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

      background-color: var(--label-color);
      @include weekdayShadow();
    }

    .date {
      margin: 0;
      text-align: center;
      line-height: -10px;
    }

    .weather.wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .weather {
        margin: 0;
        width: 2rem;
        color: var(--font-color);
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
    }
  }

}
</style>