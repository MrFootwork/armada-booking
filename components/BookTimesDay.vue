<script setup lang="ts">
import { Day } from '@/model/TDay.model'
import { useLanguage } from '@/store/language'
import { useDate } from '@/composables/date'

const props = defineProps<{
  bookingDay: Day
}>()

const preferredLanguage = useLanguage().preferred

console.log(props.bookingDay);

</script>

<template>
  <div>

    <div class="header">
      <span class="weekday"> {{ useDate(bookingDay.date).weekday }}</span>
      <h3>{{ bookingDay.date.toLocaleDateString() }}</h3>
    </div>

    <div class="halls wrapper" v-for="hall in bookingDay.halls">
      {{ hall.name }}
    </div>

  </div>
</template>

<style scoped lang="scss">

</style>