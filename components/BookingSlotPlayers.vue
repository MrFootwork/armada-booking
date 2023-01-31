<script setup lang="ts">
import { Day } from '@/model/TDay.model'

defineProps<{
  slot: Day['halls'][number]['slots'][number]
}>()
</script>

<template>
  <ul class="list">
    <li v-for="player in slot.players" class="player">
      <span :class="{ withdrawn: !player.active }">{{ player.name }}</span>
    <li v-for="friend in player.friends" class="player friends">
      <span :class="{ withdrawn: !friend.active }">{{ friend.name }}</span>
    </li>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.list {
  padding: 0;

  .player {
    margin: 1rem;
    list-style: none;

    .friends {
      text-indent: .6rem;
      list-style: '+';
      font-size: 1.75rem;
    }
  }
}

span {
  font-size: 1.75rem;

  &.withdrawn {
    text-decoration: line-through;
    color: #666;
  }
}
</style>