<script setup lang="ts">
import { Day } from '@/model/TDay.model'
import useDate from '@/composables/date'

defineProps<{
  slotTime: Day['halls'][number]['slots'][number]
}>()
</script>

<template>
  <div>
    {{ useDate(slotTime.start).time }} - {{ useDate(slotTime.end).time }}
  </div>
</template>

<style scoped lang="scss">

</style>