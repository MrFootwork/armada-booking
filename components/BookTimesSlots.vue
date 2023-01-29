<script setup lang="ts">
import { Day } from '@/model/TDay.model'
import useDate from '@/composables/date'

const props = defineProps<{
  slotTime: Day['halls'][number]['slots'][number]
}>()

console.log(useDate(props.slotTime.start).slotPath);

const basePath = useRoute().path
const slotPath = `${basePath}/${useDate(props.slotTime.start).slotPath}`
</script>

<template>
  <div>
    {{ slotPath }}
    <NuxtLink :to="slotPath">
      {{ useDate(slotTime.start).time }} - {{ useDate(slotTime.end).time }}
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">

</style>