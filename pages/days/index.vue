<script setup lang="ts">
import Calendar from '@/model/MCalendar.model'
import { useLanguage } from '@/store/language'
import SvgIcon from '@jamescoyle/vue-icon/lib/svg-icon.vue';
import { mdiMenuLeft, mdiMenuRight } from '@mdi/js';
import { Day } from '@/model/TDay.model'

// language
const languageStore = useLanguage()
const { setLanguage } = languageStore

onMounted(() => {

  if (languageStore.wasSet) return
  setLanguage(navigator.language)

})

// dummies
const month = new Date().getMonth()
const day = new Date().getDate()
const currentDay: Date = new Date(2023, month, day)

const currentGym = '111'

const currentCourt = '2'

// model
const calendar = new Calendar()
const gyms: Day['gyms'] = [
  {
    id: '111',
    name: 'Antilopa',
    place: 'Antilopa place',
    courts: []
  },
  {
    id: '222',
    name: 'Sun Plaza',
    place: 'Sun Plaza place',
    courts: []
  }
]

</script>

<template>
  <div class="wrapper day-page">

    <form class="wrapper selectors" @submit.prevent>

      <div class="selector date-picker">

        <button>
          <SvgIcon class="icon left" type="mdi" :path="mdiMenuLeft"></SvgIcon>
        </button>

        <input type="date" name="" id="">

        <button>
          <SvgIcon class="icon right" type="mdi" :path="mdiMenuRight"></SvgIcon>
        </button>

      </div>

      <div class="selector gym-picker">
        <label for="gyms">Choose your gym:</label>
        <select name="gyms" id="gyms">
          <option v-for="gym in gyms" :value="gym.id">{{ gym.name }}</option>
        </select>
      </div>

      <div class="selector court-picker">
        court picker
      </div>

    </form>

    <Schedule :day="currentDay" :gym="currentGym" :court="currentCourt" />

  </div>
</template>

<style scoped lang="scss">
.wrapper.day-page {

  @include cardStyle();
  @include appWidth();

  form.wrapper.selectors {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .selector.date-picker {}

    .selector.gym-picker {
      display: flex;
      flex-flow: column;
    }

    .selector.court-picker {}

  }

}
</style>