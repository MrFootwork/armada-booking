<script setup lang="ts">
	// FIXME store data doesn't load on middleware
	// definePageMeta({
	//   middleware: 'fetch-before-entering-days'
	// });

	import VueDatePicker from '@vuepic/vue-datepicker'
	import '@vuepic/vue-datepicker/dist/main.css'

	import { useLanguage } from '@/store/language'
	import { useGym } from '@/store/gym'
	import { useDaysStore } from '@/store/bookingDays'
	import { useSelection } from '@/store/selection'

	import SvgIcon from '@jamescoyle/vue-icon/lib/svg-icon.vue'
	import { mdiMenuLeft, mdiMenuRight, mdiMenuDown, mdiMenuUp } from '@mdi/js'

	import useDate from '@/composables/date'

	// icon size
	const iconSize = 30

	// dark (e.g. for date picker)
	const isDark = useDark()

	// language
	const languageStore = useLanguage()
	const { setLanguage } = languageStore

	// gyms
	const gymStore = useGym()
	const { gyms } = storeToRefs(gymStore)
	const { fetchGyms } = gymStore

	// days
	const dayStore = useDaysStore()
	const { days } = storeToRefs(dayStore)
	const { fetchDays, addSlot } = dayStore

	// selection
	const selectionStore = useSelection()

	const {
		day: selectedDay,
		gym: selectedGym,
		court: selectedCourt,
	} = storeToRefs(selectionStore)

	const {
		initializeStoreValues: initializeSelectionStore,
		setDayIDByDate,
		setDayNext,
		setDayPrevious,
		setGymID,
		setCourtNext,
		setCourtPrevious,
	} = selectionStore

	onBeforeMount(async () => {
		if (languageStore.wasSet) return
		setLanguage(navigator.language)

		try {
			const fetchingDays = await fetchDays(new Date())
			const fetchingGyms = await fetchGyms()
			Promise.all([fetchingDays, fetchingGyms]).then(() => {
				initializeSelectionStore()
			})
		} catch (e) {
			alert("Couldn't fetch database. Please ask for support!")
		}
	})

	/*******************************
	 *
	 *        date picker
	 *
	 *******************************/
	const today = new Date()
	const todayYear = today.getFullYear()
	const todayMonth = today.getMonth()
	const todayDay = today.getDate()

	const inputDay = ref(new Date())

	const onDatePick = (pickerDate: Date) => {
		console.log(
			'date picked: ',
			inputDay.value.toISOString(),
			pickerDate.toISOString()
		)
		inputDay.value = new Date(pickerDate)
		setDayIDByDate(inputDay.value)
	}

	// date picker value can be changed by arrow buttons (via store actions)
	watch(
		() => selectedDay.value?.date,
		date => (inputDay.value = new Date(date!.toISOString()))
	)

	// TODO today, lowerLimit and upperLimit should adjust at 24:00
	const lowerLimit: Date = new Date(todayYear, todayMonth, todayDay)
	const upperLimit = useDate(new Date()).addDays()

	// datepicker functions
	// For demo purposes disables the next 2 days from the current date
	const disabledDates = (date: Date) => {
		return date < lowerLimit || upperLimit < date
	}

	// BUG tomorrow: 1 === 31 + 1 = 32
	// if tomorrow is 1st of month, it won't be recognized
	// date format for datepicker display
	const inputDateFormat = (date: Date) => {
		// if today is Saturday = 6, Sa + 1 would be 7
		// Sunday can only be 0
		let tomorrowDay = today.getDay() + 1 >= 7 ? 0 : today.getDay() + 1

		if (date.getDay() === today.getDay()) return 'Today'
		if (date.getDay() === tomorrowDay) return 'Tomorrow'

		let weekDay = new Intl.DateTimeFormat('en-us', {
			weekday: 'long',
		}).format(date)

		return `${weekDay}`
	}

	/*******************************
	 *
	 *        gym picker
	 *
	 *******************************/
	const gymIDSelected = ref('63dfe7d99d49df953437b274')

	function onSelectChange() {
		setGymID(gymIDSelected.value)
	}

	// FIXME external change of gym must also change input display

	/*******************************
	 *
	 *        court picker
	 *
	 *******************************/
	const showCourtPicker = ref(false)

	const courtLayout = ''

	const courts = computed(() => {
		return (
			selectedGym.value?.courts || [
				{
					id: 'initial court',
					courtName: '❌ no data',
					slots: [],
				},
			]
		)
	})

	function toggleCourtPicker() {
		showCourtPicker.value = !showCourtPicker.value
	}

	// gym hint, e.g. any announcements for players
	// TODO use @formkit/auto-animate for expand/collapse
	// https://auto-animate.formkit.com/#usage-vue
	const [showGymHint, toggleGymHint] = useToggle()

	onBeforeMount(() => {
		console.log(
			'Rendering Slots in local Timezone: ',
			Intl.DateTimeFormat().resolvedOptions().timeZone
		)
	})
</script>

<template>
	<div class="wrapper day-page">
		<form class="wrapper selectors" @submit.prevent>
			<div class="selector date-picker">
				<label for="date">Date</label>

				<div class="wrapper buttons">
					<button class="left">
						<SvgIcon
							class="icon left"
							type="mdi"
							:path="mdiMenuLeft"
							:size="iconSize"
							@click="setDayPrevious"
						></SvgIcon>
					</button>

					<VueDatePicker
						:model-value="inputDay"
						@update:model-value="onDatePick"
						:disabled-dates="disabledDates"
						week-numbers="iso"
						auto-apply
						:locale="languageStore.preferred"
						:format="inputDateFormat"
						:dark="isDark"
						:clearable="false"
						:enable-time-picker="false"
						input-class-name="dp-custom-input"
					/>

					<button class="right">
						<SvgIcon
							class="icon right"
							type="mdi"
							:path="mdiMenuRight"
							:size="iconSize"
							@click="setDayNext"
						></SvgIcon>
					</button>
				</div>
			</div>

			<!-- TODO change background color on theme change -->
			<div class="selector gym-picker">
				<label for="gyms">Gym</label>
				<select
					class="gym-picker"
					name="gyms"
					id="gyms"
					v-model="gymIDSelected"
					@change="onSelectChange"
				>
					<!-- TODO cursor: pointer for options-->
					<option v-for="gym in gyms" :value="gym.id" :key="gym.id">
						{{ gym.nameShort }}
					</option>
				</select>
			</div>

			<div class="selector court-picker">
				<label for="court">Court</label>

				<div class="wrapper buttons">
					<button class="left">
						<SvgIcon
							class="icon court left"
							type="mdi"
							:path="mdiMenuLeft"
							:size="iconSize"
							@click="setCourtPrevious"
						>
						</SvgIcon>
					</button>

					<input
						type="button"
						id="court"
						:value="selectedCourt?.courtName"
						@click="toggleCourtPicker"
					/>

					<button class="right">
						<SvgIcon
							class="icon court right"
							type="mdi"
							:path="mdiMenuRight"
							:size="iconSize"
							@click="setCourtNext"
						>
						</SvgIcon>
					</button>
				</div>

				<DaysCourtPicker
					v-show="showCourtPicker"
					class="court-picker component"
					@toggle-picker="toggleCourtPicker"
					:layout="courtLayout"
					:gym="selectedGym"
					:courts="courts"
					:current-court-index="Number(selectedCourt?.id)"
				/>
			</div>
		</form>

		<div class="hint-wrapper" @click="toggleGymHint()">
			<h4 class="hint-content head">
				<span v-show="!showGymHint">
					<SvgIcon class="icon down" type="mdi" :path="mdiMenuDown"></SvgIcon>
				</span>

				<span v-show="showGymHint">
					<SvgIcon class="icon up" type="mdi" :path="mdiMenuUp"></SvgIcon>
				</span>

				{{ selectedGym?.place }}
			</h4>
			<p v-show="showGymHint" class="hint-content body">
				Please select any court and slot and register your total playing time.
				<br /><br />You can switch freely while you play in the gym.
			</p>
		</div>

		<Schedule
			v-show="
				days.length && selectedDay?.gyms.length && selectedGym && selectedGym.id
			"
		/>
	</div>
</template>

<style lang="scss">
	:root {
		--dp-button-icon-height: 40px;
		--dp-input-padding: 0;
	}

	.dp__theme_dark,
	.dp__theme_light {
		--dp-primary-color: var(--highlight-color);
	}

	.dp__theme_dark {
		--dp-background-color: hsl(240, 10%, 35%);
		--dp-secondary-color: hsl(240, 10%, 45%);
	}

	.dp__theme_light {
		--dp-background-color: hsl(240, 10%, 93%);
		--dp-secondary-color: hsl(240, 10%, 80%);
	}

	.dp-custom-input {
		@include inputHeight();
		width: 8rem;
		border: 0;
		border-top: 1px solid var(--font-color);
		border-bottom: 1px solid var(--font-color);

		border-radius: 0;

		color: var(--font-color);

		&:hover,
		&:focus {
			border-top: 1px solid var(--font-color);
			border-bottom: 1px solid var(--font-color);
		}
	}
</style>

<style scoped lang="scss">
	.wrapper.day-page {
		@include cardStyle();
		@include appWidth();
		padding: 1rem;

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
					cursor: pointer;
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
						border-top: 1px solid var(--font-color);
						border-bottom: 1px solid var(--font-color);
						@include inputHeight();
						width: 2.5rem;
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

		div.hint-wrapper {
			cursor: pointer;
			padding: 0.8rem;

			width: 100%;
			border: 0.2rem solid var(--font-color);
			border-radius: 0.3rem;

			@include unselectable();

			.hint-content {
				margin: 0;
				line-height: normal;

				&.head {
					.icon {
						transform: translate(0, 0.3rem);
					}
				}

				&.body {
					padding: 0.4rem;
					margin: 0.3rem 0;
				}
			}
		}
	}
</style>
