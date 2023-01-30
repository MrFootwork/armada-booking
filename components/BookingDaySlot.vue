<script setup lang="ts">
import { Day } from '@/model/TDay.model'
import useDate from '@/composables/date'

const props = defineProps<{
  slotTime: Day['halls'][number]['slots'][number]
}>()

const basePath = useRoute().path
// const slotPath = `${basePath}/${useDate(props.slotTime.start).weekday}${props.slotTime.hall}${useDate(props.slotTime.start).time}`
const slotPath = `${basePath}/slot?param1=hi`
const hallAndSlot = props.slotTime.hall + props.slotTime.start

function navigateToSlot() {
  return navigateTo(slotPath)
}

const seatsTaken = props.slotTime.players.length
const seatsFree = props.slotTime.limit - seatsTaken

</script>

<template>
  <div class="button slot" @click="navigateToSlot">
    <label :for="hallAndSlot" class="time">
      {{ useDate(slotTime.start).time }} - {{ useDate(slotTime.end).time }}
    </label>
    <div class="divider"></div>
    <p class="">{{ `${seatsFree} / ${slotTime.limit}` }}</p>
  </div>
</template>

<style scoped lang="scss">
.button.slot {

  border: .5rem solid $card-color;
  border-radius: 1rem;
  margin: 1rem;
  width: 35vw;
  max-width: 15rem;

  text-align: center;

  box-shadow:
    4px 4px 5px -2px #111,
    -2px -2px 7px -4px #ccc;

  label.time {
    display: block;
    box-sizing: content-box;
    padding: 1rem;
    font-size: 1.5rem;
  }

  .divider {
    border: .125rem solid $card-color;

  }

  p {
    margin: 0;
    padding: 1rem;
  }
}
</style>