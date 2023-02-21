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

  // TEST
  setLanguage('zh-TW')
  // FIXME Prod
  // setLanguage(navigator.language)

})

// model
const calendar = ref(new Calendar())

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

/*******************************
 *  
 *        date picker
 * 
 *******************************/
const today = new Date()
const year = today.getFullYear()
const month = today.getMonth()
const day = today.getDate()

const daySelected = ref(new Date(year, month, day))

const lowerLimit: Date = new Date(today)
const upperLimit: Date = new Date(today.setDate(today.getDate() + 6))

function increaseDay() {

  if (daySelected.value >= upperLimit) return

  daySelected.value.setDate(daySelected.value.getDate() + 1)
  daySelected.value = new Date(daySelected.value)
}

function decreaseDay() {

  if (daySelected.value <= lowerLimit) return

  daySelected.value.setDate(daySelected.value.getDate() - 1)
  daySelected.value = new Date(daySelected.value)
}

/*******************************
 *  
 *        gym picker
 * 
 *******************************/
const gymSelected = ref(gyms[0])

/*******************************
 *  
 *        court picker
 * 
 *******************************/
const showCourtPicker = ref(false)

// FIXME fallback empty array
const courts = computed(() => {

  const courts = calendar.value.days
    .find(day => day.date.getDate() === daySelected.value.getDate())
    ?.gyms
    .find(gym => gym.id === gymSelected.value.id)
    ?.courts || []

  return courts

})

const courtsNames = computed(() => {

  return courts.value.map(court => court.courtName)

})

const courtSelected = ref(courts.value[0])

const courtIndex = computed(() => {

  return courtsNames.value.indexOf(courtSelected.value.courtName) || 0

})

function toggleCourtPicker() {

  showCourtPicker.value = !showCourtPicker.value

}

function courtPrevious() {

  const currentCourt = courtIndex.value
  const previousCourt = currentCourt - 1

  if (currentCourt > 0) {
    courtSelected.value = courts.value[previousCourt]
  }

}

function courtNext() {

  const currentCourt = courtIndex.value
  const nextCourt = currentCourt + 1

  if (nextCourt < courts.value.length) {
    courtSelected.value = courts.value[nextCourt]
  }

}

</script>

<template>
  <div class="wrapper day-page">

    <form class="wrapper selectors" @submit.prevent>

      <div class="selector date-picker">

        <label for="date">Date</label>

        <div class="wrapper buttons">

          <button>
            <SvgIcon class="icon left" type="mdi" :path="mdiMenuLeft" @click="decreaseDay"></SvgIcon>
          </button>

          <Datepicker :class="'datepicker-input'" v-model="daySelected" :locale="zhCN" :lower-limit="lowerLimit"
            :upper-limit="upperLimit" />
          <!-- TODO try out better date picker -->
          <!-- https://vue3datepicker.com/ -->
          <button>
            <SvgIcon class="icon right" type="mdi" :path="mdiMenuRight" @click="increaseDay"></SvgIcon>
          </button>

        </div>

      </div>

      <div class="selector gym-picker">
        <label for="gyms">Gym</label>
        <select class="gym-picker" name="gyms" id="gyms" v-model="gymSelected">
          <option v-for="(gym, i) in gyms" :value="gyms[i]">{{ gym.name }}</option>
        </select>
      </div>

      <div class="selector court-picker">

        <label for="court">Court</label>

        <div class="wrapper buttons">

          <button>
            <SvgIcon class="icon court left" type="mdi" :path="mdiMenuLeft" @click="courtPrevious"></SvgIcon>
          </button>

          <input type="button" id="court" :value="courtsNames[courtIndex]" @click="toggleCourtPicker">

          <button>
            <SvgIcon class="icon court right" type="mdi" :path="mdiMenuRight" @click="courtNext"></SvgIcon>
          </button>

        </div>

        <DaysCourtPicker v-if="showCourtPicker" class="court-picker component" />

      </div>

    </form>

    <div>{{ courts }}</div>

    <div>dummyDate: {{ useDate(daySelected).date }}</div>
    <!-- <Schedule :day="inputDay" :gym="currentGym" :court="currentCourt" /> -->
    <div>
      Selection
      <div>Date {{ daySelected }}</div>
      <div>Gym {{ gymSelected }}</div>
      <div>Court {{ courtSelected }}</div>
    </div>
  </div>
</template>

<style>
.datepicker-input {
  width: 6rem;
}
</style>

<style scoped lang="scss">
.wrapper.day-page {

  @include cardStyle();
  @include appWidth();

  form.wrapper.selectors {
    width: 100%;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;


    button {
      cursor: pointer;
    }

    .selector {
      padding: .4rem;
    }

    .selector.date-picker {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-flow: column;

      --vdp-bg-color: var(--card-color-secondary);
      --vdp-text-color: var(--font-color);
      --vdp-disabled-color: var(--datepicker-disabled-color);
      --vdp-elem-font-size: .9rem;



      .wrapper.buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: row;
      }
    }

    .selector.gym-picker {
      display: flex;
      flex-flow: column;

      select.gym-picker {
        width: auto;
      }
    }

    .selector.court-picker {
      position: relative;

      .wrapper.buttons {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .court-picker.component {
        position: absolute;
        right: 0;
      }
    }

  }

}
</style>