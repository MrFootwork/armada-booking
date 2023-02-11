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

    <header>
      <h1>test</h1>
    </header>

    <div class="calendar">
      <BookingDay />
    </div>

  </div>
</template>

<style scoped lang="scss">
.wrapper {

  header {}

  .calendar {}
}
</style>