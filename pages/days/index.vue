<script setup lang="ts">
import Calendar from '@/model/MCalendar.model'
import { useLanguage } from '@/store/language'

// language
const languageStore = useLanguage()
const { setLanguage } = languageStore

onMounted(() => {
  if (languageStore.wasSet) return
  setLanguage(navigator.language)
})

// model
const calendar = new Calendar()

</script>

<template>
  <div class="wrapper">
    <BookingDay v-for="(day, i) in calendar.days" :booking-day="day" :day-index="i" />
  </div>
</template>

<style lang="scss">
@include body()
</style>

<style scoped lang="scss">
.wrapper {}
</style>