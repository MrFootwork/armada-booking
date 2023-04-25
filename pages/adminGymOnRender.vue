<script setup lang="ts">

const fetchResult = ref()

async function fetchGyms() {
  // const fetchedGyms = await $fetch('/api/gyms', { method: 'GET' })
  // fetchResult.value = fetchedGyms
  const fetchedGyms = await useFetch('/api/gyms', { method: 'GET' })
  fetchResult.value = fetchedGyms.data.value?.out

  // type GymsRaw = {
  //   "_id": string
  //   "nameCode": string
  //   "nameShort": string
  //   "place": string
  //   "start": number
  //   "exceptions"?: []
  //   "courts"?: []
  // }

  // const fetchedGyms = await useFetch('/api/gyms', {
  //   method: 'GET',
  //   transform: () => {

  //   }
  // })
}
</script>

<template>
  <div class="wrapper">
    <button @click="fetchGyms()">Fetch Gyms</button>

    <pre>{{ fetchResult }}</pre>
    <span v-if="fetchResult">{{ fetchResult[0].nameShort }}</span>

  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-flow: column;
}
</style>