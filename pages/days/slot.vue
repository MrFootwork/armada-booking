<script setup lang="ts">

import Calendar from '@/model/MCalendar.model'
import useDate from '@/composables/date'
import useSlot from '@/composables/slot'

// data
const calendar = new Calendar();
// route params
const route = useRoute()
const { dayIndex, hallName, start } = route.query

const currentSlot = calendar
  .days[+dayIndex!]
  .halls.find(hall => hall.name === hallName)
  ?.slots.find(slot => useDate(slot.start).time === start)

// calculate free seats
const freeSeats = useSlot(currentSlot!).seatsFree
const freeSeatCaption = computed(() => {
  if (freeSeats === 0) return 'booked out'
  if (freeSeats === 1) return 'One spot left'
  return `${freeSeats} free seats`
})

</script>

<template>
  <div class="slot wrapper">

    <div class="header wrapper">

      <div class="header">
        <button class="go-back-button" @click="navigateTo('/days')">
          <span class="material-symbols-outlined">
            arrow_back_ios_new
          </span>
        </button>
        <span class="weekday"> {{ useDate(currentSlot!.start).weekday }}</span>
        <h2 class="date">{{ useDate(currentSlot!.start).date }}</h2>
        <div class="weather wrapper">
          <img :src="'/icons8-rain-cloud.png'" alt="" class="weather">
        </div>
      </div>

      <div class="sub-header">
        <div class="sub-header-item ">
          <span class=" slot-time">{{
            `${useDate(currentSlot!.start).time}-${useDate(currentSlot!.end).time}` }}
          </span>
        </div>
        <div class="sub-header-item">
          <h3 class=" hall-name">{{ currentSlot?.hall }}</h3>
        </div>
        <div class="sub-header-item">
          <span class="hall-limit" :class="{ full: freeSeats === 0 }">{{ freeSeatCaption }}</span>
        </div>
      </div>

    </div>

    <BookingSlotPlayers :slot="currentSlot!" />

</div>
</template>

<style scoped lang="scss">
.slot.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: column;

  @include appWidth();

  .header.wrapper {
    margin-bottom: 1rem;

    .header {
      @include headerStyle();
      border-radius: calc($round-corner / 2) calc($round-corner / 2) 0 0;

      .go-back-button {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        background: none;
        border: none;

        &:hover,
        &:active {
          background-color: $card-color-secondary-light;
          border-radius: $round-corner-small;
        }

        &:hover {
          box-shadow:
            2px 2px 4px 0px #222,
            -1px -1px 2px -1px #fff;
        }

        &:active {
          transform: translateY(2px);
          box-shadow:
            2px 2px 4px -1px #222,
            -1px -1px 2px -2px #fff;
        }

        .material-symbols-outlined {
          font-variation-settings:
            'FILL' 0,
            'wght' 400,
            'GRAD' 0,
            'opsz' 48;

          text-align: left;
          line-height: none;
          color: white;
          text-shadow: 2px 2px 2px #111;
        }
      }

      .weekday {
        border-radius: calc($round-corner / 3);
        padding: .3rem;
        width: 2.5rem;
        margin: auto;

        text-align: center;

        background-color: $label-color;
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
        justify-content: flex-end;

        .weather {
          margin: 0;
          width: 2rem;
          color: white;
        }
      }
    }

    .sub-header {
      @include headerStyle();

      // overwrite card styles
      margin-top: 0;
      padding: 1.1rem 1.1rem;
      border-radius: 0 0 $round-corner-small $round-corner-small;

      display: grid;
      grid-template-columns: 3fr 5fr 3fr;

      background-color: $label-color;
      box-shadow: none;

      .sub-header-item {
        display: flex;
        justify-content: center;
      }

      .slot-time,
      .hall-name,
      .hall-limit {
        line-height: 0;
        text-align: center;
        vertical-align: middle;
      }

      .slot-time {}

      .hall-name {
        margin: 0;
      }

      .hall-limit {
        color: greenyellow;
        text-shadow: 1px 1px 2px #222;

        &.full {
          color: hsl(0, 100%, 65%);
          font-weight: bold;
          text-shadow: 1px 1px 2px #222;
        }
      }
    }
  }
}
</style>