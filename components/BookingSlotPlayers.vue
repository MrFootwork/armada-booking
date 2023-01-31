<script setup lang="ts">
import { Day } from '@/model/TDay.model'

defineProps<{
  slot: Day['halls'][number]['slots'][number]
}>()
</script>

<template>
  <div>
    this shows the players who booked this slot
    <div>{{ slot.hall }}</div>
    <div>{{ slot.limit }}</div>
    <div v-for="player in slot.players" class="player">
      {{ player.name }}
      <div v-for="friend in player.friends" class="friends">
        {{ friend.name }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.player {
  .friends {
    text-indent: 1rem;
  }
}
</style>