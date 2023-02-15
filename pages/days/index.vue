<script setup lang="ts">
import Calendar from '@/model/MCalendar.model'
import { useLanguage } from '@/store/language'
import { Day } from '@/model/TDay.model'
import useDate from '@/composables/date'
import Datepicker from 'vue3-datepicker'
import { de, ro, zhCN } from 'date-fns/locale'
import SvgIcon from '@jamescoyle/vue-icon/lib/svg-icon.vue';
import { mdiMenuLeft, mdiMenuRight } from '@mdi/js';

// language
const languageStore = useLanguage()
const { setLanguage } = languageStore

onMounted(() => {

  if (languageStore.wasSet) return
  setLanguage('zh-TW')
  // setLanguage(navigator.language)

})


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

// date picker
const dummyDate = ref(new Date())
const today = new Date()
const lowerLimit: Date = new Date(today)
const upperLimit: Date = new Date(today.setDate(today.getDate() + 6))


function increaseDay() {
  if (dummyDate.value >= upperLimit) return
  dummyDate.value.setDate(dummyDate.value.getDate() + 1)
  dummyDate.value = new Date(dummyDate.value)
}
function decreaseDay() {
  if (dummyDate.value <= lowerLimit) return
  dummyDate.value.setDate(dummyDate.value.getDate() - 1)
  dummyDate.value = new Date(dummyDate.value)
}

</script>

<template>
  <div class="wrapper day-page">

    <form class="wrapper selectors" @submit.prevent>


      <div class="selector date-picker">

        <button>
          <SvgIcon class="icon left" type="mdi" :path="mdiMenuLeft" @click="decreaseDay"></SvgIcon>
        </button>

        <Datepicker v-model="dummyDate" :locale="zhCN" :lower-limit="lowerLimit" :upper-limit="upperLimit" />
        <!-- TODO try out better date picker -->
        <!-- https://vue3datepicker.com/ -->

        <button>
          <SvgIcon class="icon right" type="mdi" :path="mdiMenuRight" @click="increaseDay"></SvgIcon>
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

    <div>dummyDate: {{ useDate(dummyDate).date }}</div>
    <!-- <Schedule :day="inputDay" :gym="currentGym" :court="currentCourt" /> -->

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

    .selector.date-picker {
      display: flex;
      align-items: center;
      justify-content: center;

      --vdp-bg-color: var(--card-color-secondary);
      --vdp-text-color: var(--font-color);
      --vdp-disabled-color: var(--datepicker-disabled-color);
      --vdp-elem-font-size: .9rem;

      button {
        cursor: pointer;
      }
    }

    .selector.gym-picker {
      display: flex;
      flex-flow: column;
    }

    .selector.court-picker {}

  }

}
</style>