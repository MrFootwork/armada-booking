<script setup lang="ts">
import Calendar from '@/model/MCalendar.model'

const calendar = new Calendar()
const localeOptionsWeekday = { weekday: 'short' }
</script>

<template>
  <div>
    <slot />
    <nav class="weekday">
      <ol>
        <li v-for="day in calendar.days">
          <NuxtLink class="link" :to="day.date.toLocaleDateString('en-US', localeOptionsWeekday)">
            {{ day.date.toLocaleDateString('en-US', localeOptionsWeekday) }}
          </NuxtLink>
        </li>
      </ol>
    </nav>
  </div>
</template>

<style scoped lang="scss">
nav.weekday {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;

  ol {
    list-style: none;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;

    padding: 0;
    padding-bottom: 1rem;

    li {
      a {
        box-sizing: border-box;
        width: 2.5rem;
        padding: .5rem 1rem;

        text-align: center;
        color: $font-color;
        text-decoration: none;

        background-color: $card-color;
        border-radius: 10px;

        box-shadow:
          2px 2px 10px 4px #111,
          -2px -2px 10px -4px #aaa;
      }
    }
  }
}
</style>