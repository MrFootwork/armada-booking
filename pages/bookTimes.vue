<script setup lang="ts">
const today_0 = new Date();
let today_1 = new Date()
today_1.setDate(today_0.getDate() + 1)
let today_2 = new Date()
today_2.setDate(today_1.getDate() + 1)
let today_3 = new Date()
today_3.setDate(today_2.getDate() + 1)
let today_4 = new Date()
today_4.setDate(today_3.getDate() + 1)
let today_5 = new Date()
today_5.setDate(today_4.getDate() + 1)
let today_6 = new Date()
today_6.setDate(today_5.getDate() + 1)

const days = [
  {
    date: today_0.toString()
  },
  {
    date: today_1.getDate()
  }
]

</script>

<template>
  <div>
    {{ days }}
  </div>
</template>

<style scoped lang="scss">

</style>