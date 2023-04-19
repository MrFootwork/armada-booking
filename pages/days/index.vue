<script setup lang="ts">
import { useLanguage } from '@/store/language'
import Datepicker from 'vue3-datepicker'

import { Day } from '@/model/TDay.model'
import { useDaysStore } from '@/store/bookingDays'

// importing from 'date-fns/locale' would throw error in production after authenticating
// https://github.com/nuxt/nuxt/issues/13591
import { en, de, ro, zhCN } from 'date-fns/locale/index.js'
// TODO remove TS error
// https://github.com/date-fns/date-fns/issues/2964#issuecomment-1409736680

import SvgIcon from '@jamescoyle/vue-icon/lib/svg-icon.vue'
import { mdiMenuLeft, mdiMenuRight } from '@mdi/js'

// icon size
const iconSize = 30

// language
const languageStore = useLanguage()
const { setLanguage } = languageStore

// days
const daysStore = useDaysStore()
const { days } = storeToRefs(daysStore)
const { fetchDays, addSlot } = daysStore

const gyms: Day['gyms'] = [
	{
		id: '63dfe7d99d49df953437b274',
		name: 'Antilopa',
		place: 'Badminton Armada Arena',
		courts: [],
	},
	{
		id: '63e01a8504594f501f829e51',
		name: 'Sun Plaza',
		place: 'Sala De Sport ELITE',
		courts: [],
	},
]

onMounted(() => {

	if (languageStore.wasSet) return
	setLanguage(navigator.language)

})

onBeforeMount(() => {

	if (!days.value) fetchDays()

})
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
// reset court, if new day is selected
watch(daySelected, (newDay, oldDay) => {
	if (newDay.getDay() !== oldDay.getDay()) selectCourt(0)
})

const lowerLimit: Date = new Date(today)
const upperLimit: Date = new Date(today.setDate(today.getDate() + 6))

function increaseDay() {
	if (daySelected.value >= upperLimit) return

	selectCourt(0)

	daySelected.value.setDate(daySelected.value.getDate() + 1)
	daySelected.value = new Date(daySelected.value)
}

function decreaseDay() {
	if (daySelected.value <= lowerLimit) return

	selectCourt(0)

	daySelected.value.setDate(daySelected.value.getDate() - 1)
	daySelected.value = new Date(daySelected.value)
}

// FIXME must translate imported languages from 'date-fns/locale' from useLanguage() store

/*******************************
 *
 *        gym picker
 *
 *******************************/
const gymSelected = ref(gyms[0])

// BUG gym change must set court to 1
watch(gymSelected, (newGym, oldGym) => {
	if (newGym.id !== oldGym.id) selectCourt(0)
})

/*******************************
 *
 *        court picker
 *
 *******************************/
const showCourtPicker = ref(false)

const courtLayout = ''

// FIXME fallback empty array
const courts = computed(() => {

	const courts =
		daysStore?.days
			?.find(day => day.date.getDate() === daySelected.value.getDate())
			?.gyms.find(gym => gym.id === gymSelected.value.id)?.courts || []

	return courts
})

const courtsNames = computed(() => {
	return courts.value.map(court => court.courtName)
})

const courtSelected = ref(courts.value[0])
// initialization after Pinia store useDaysStore is loaded
onBeforeMount(() => {

	courtSelected.value = courts.value[0]

})

const courtIndex = computed(() => {
	return courtsNames.value.indexOf(courtSelected?.value?.courtName) || 0
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

function selectCourt(index: number) {
	courtSelected.value = courts.value[index]
}
</script>

<template>
	<div class="wrapper day-page">
		<form class="wrapper selectors"
					@submit.prevent>
			<div class="selector date-picker">
				<label for="date">Date</label>

				<div class="wrapper buttons">
					<button class="left">
						<SvgIcon class="icon left"
										 type="mdi"
										 :path="mdiMenuLeft"
										 :size="iconSize"
										 @click="decreaseDay"></SvgIcon>
					</button>

					<Datepicker :class="'datepicker-input'"
											v-model="daySelected"
											:locale="en"
											:lower-limit="lowerLimit"
											:upper-limit="upperLimit" />
					<!-- TODO try out better date picker -->
					<!-- https://vue3datepicker.com/ -->
					<button class="right">
						<SvgIcon class="icon right"
										 type="mdi"
										 :path="mdiMenuRight"
										 :size="iconSize"
										 @click="increaseDay"></SvgIcon>
					</button>
				</div>
			</div>

			<div class="selector gym-picker">
				<label for="gyms">Gym</label>
				<select class="gym-picker"
								name="gyms"
								id="gyms"
								v-model="gymSelected">
					<option v-for="(gym, i) in gyms"
									:value="gyms[i]">
						{{ gym.name }}
					</option>
				</select>
			</div>

			<div class="selector court-picker">
				<label for="court">Court</label>

				<div class="wrapper buttons">

					<button class="left">
						<SvgIcon class="icon court left"
										 type="mdi"
										 :path="mdiMenuLeft"
										 :size="iconSize"
										 @click="courtPrevious">
						</SvgIcon>
					</button>

					<input type="button"
								 id="court"
								 :value="courtsNames[courtIndex]"
								 @click="toggleCourtPicker" />

					<button class="right">
						<SvgIcon class="icon court right"
										 type="mdi"
										 :path="mdiMenuRight"
										 :size="iconSize"
										 @click="courtNext">
						</SvgIcon>
					</button>

				</div>

				<DaysCourtPicker v-show="showCourtPicker"
												 class="court-picker component"
												 @toggle-picker="toggleCourtPicker"
												 @select-court="selectCourt"
												 :layout="courtLayout"
												 :gym="gymSelected"
												 :courts="courts"
												 :current-court-index="courtIndex" />

			</div>

			<button @click="addSlot({
				day: daySelected,
				gymId: gymSelected.id,
				courtId: courtSelected.id,
				start: 11,
				end: 12
			})">Add Slot</button>

		</form>

		<div class="hint-wrapper">
			<p class="hint-content">
				{{ gymSelected.name }}: Please select any court and slot and
				register your total playing time.
				<br /><br />You can switch freely while you play.
			</p>
		</div>

		<Schedule :current-day="daySelected"
							:gym-id="gymSelected.id"
							:court-id="courtSelected.id" />

	</div>
</template>

<style lang="scss">
.datepicker-input {
	box-sizing: border-box;
	width: 6rem;
	@include inputHeight();
}
</style>

<style scoped lang="scss">
.wrapper.day-page {
	@include cardStyle();
	@include appWidth();
	padding: 1rem;

	div.hint-wrapper {
		width: 100%;
		padding: .5rem;
		border: .2rem solid var(--font-color);
		border-radius: .3rem;

		p.hint-content {
			margin: 0;
		}
	}

	form.wrapper.selectors {
		width: 100%;

		display: flex;
		align-items: center;
		justify-content: space-evenly;
		flex-wrap: wrap;
		row-gap: 1rem;

		button {
			cursor: pointer;
			background: none;
			@include inputHeight();

			color: var(--font-color);
			border: none;
			border: 1px solid var(--font-color);


			&.left {
				border-radius: 15px 0 0 15px;
			}

			&.right {
				border-radius: 0 15px 15px 0;
			}
		}

		.selector {
			padding: 0.4rem;
		}

		label {
			margin-bottom: 0.5rem;
		}

		.selector.date-picker {
			display: flex;
			align-items: flex-start;
			justify-content: center;
			flex-flow: column;

			--vdp-bg-color: var(--card-color-secondary);
			--vdp-text-color: var(--font-color);
			--vdp-disabled-color: var(--datepicker-disabled-color);
			--vdp-elem-font-size: 0.9rem;

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
				@include inputHeight;
			}
		}

		.selector.court-picker {
			position: relative;
			display: flex;
			align-items: flex-start;
			justify-content: center;
			flex-flow: column;

			.wrapper.buttons {
				display: flex;
				align-items: center;
				justify-content: center;

				input {
					padding: 0 0.6rem;
					border-radius: 0;
					border: none;
					@include inputHeight();
					width: 2rem;
					cursor: pointer;
				}
			}

			.court-picker.component {
				position: fixed;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;

				display: grid;
				align-items: center;
				justify-content: center;

				z-index: 10;
			}
		}
	}
}
</style>
