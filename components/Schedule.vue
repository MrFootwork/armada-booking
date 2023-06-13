<script setup lang="ts">
	import useDate from '@/composables/date'

	import { useDaysStore } from '@/store/bookingDays'
	import { useLanguage } from '@/store/language'
	import { useSelection } from '@/store/selection'

	import { Slot } from '@/model/TSlot.model'

	/*******************************
	 *        booking data
	 *******************************/
	// language
	const languageStore = useLanguage()
	const { preferred } = storeToRefs(languageStore)

	// days
	const dayStore = useDaysStore()
	const { fetchDays, addSlot } = dayStore

	// selection
	const selectionStore = useSelection()
	const {
		day: currentDay,
		gym: currentGym,
		court: currentCourt,
		slot: currentSlot,
		hourStart,
		hourEnd,
	} = storeToRefs(selectionStore)
	const { setSlotID, setStart, setEnd } = selectionStore

	// slots
	const currentSlots = computed(() => {
		if (currentCourt.value) {
			return currentCourt.value.slots
		}
	})

	// duration dialog
	const showDurationModal = ref(false)

	function toggleDurationModal() {
		showDurationModal.value = !showDurationModal.value
	}

	/*******************************
	 *        calendar view
	 *******************************/
	const FIRST_HOUR_DEFAULT = 8
	const LAST_HOUR_DEFAULT = 22

	const hourFirst = computed(
		() => currentGym.value?.start ?? FIRST_HOUR_DEFAULT
	)
	const hourLast = computed(() => currentGym.value?.end ?? LAST_HOUR_DEFAULT)
	const hourCount = computed(() => hourLast.value - hourFirst.value)

	const hours = computed(() => {
		return Array.from(
			{ length: hourCount.value }, // +1 for additional border
			(_, i) => i + hourFirst.value // values are mapped to the hour values
		)
	})

	const gridHours = computed(() => {
		return [...hours.value, hours.value.length + hourFirst.value]
	})

	// grid coordinates columns: wrapper slots
	const COLUMN_FIRST_PLAYER = 2
	const wrapperSlots = ref<HTMLElement | null>(null)

	let currentSlotsElements: HTMLDivElement[] = []

	function slotsDelete() {
		while (wrapperSlots.value?.lastElementChild) {
			wrapperSlots.value?.removeChild(wrapperSlots.value?.lastElementChild)
		}
		currentSlotsElements = []
	}

	function slotsFreeCreate() {
		// determine booked times
		// TODO turn into objects instead of arrays
		const bookedTimes: [Slot['id'], number, number, Slot['player']][] = (() => {
			return (
				currentSlots.value?.map(slot => {
					return [
						slot.id,
						useDate(new Date(slot.start)).romanian.getHours(),
						useDate(new Date(slot.end)).romanian.getHours(),
						slot.player,
					]
				}) || []
			)
		})()

		// loop through rows (= each hour)
		for (let i = 0; i < hours.value.length; i++) {
			const hour = hours.value[i]
			const gridRow = i + 1
			let currentSlotId: Slot['id'] | undefined = undefined

			// determine column to add free slot
			let gridColumn: number | null = COLUMN_FIRST_PLAYER
			let playersAtThisHour = 0

			// there are at least one reservation at this hour
			const hourHasReservation = bookedTimes.some(bookedSlot => {
				const [slotId, start, end, players] = bookedSlot

				const hourOverlapsSlot = start <= hour && hour < end

				if (!hourOverlapsSlot) return false

				// console.log('slot: ', start, end)

				playersAtThisHour = players.length
				currentSlotId = slotId
				return true
			})

			// less than 4 reservations are already made at this hour
			const hourHasFreeSlots = playersAtThisHour < 4

			// don't enter (free) slot creation, if slot is full
			if (!hourHasFreeSlots) continue

			/*****************************
			 * 			Slot Creation
			 ****************************/
			// slot and content
			const slotElement = document.createElement('div')
			slotElement.setAttribute('class', 'slot free')
			slotElement.textContent = `➕`
			// add click listener
			slotElement.addEventListener('click', openDurationModal)
			// slot placement
			gridColumn += playersAtThisHour
			slotElement.style.gridRow = `${gridRow} / span 1`
			slotElement.style.gridColumn = `${gridColumn} / span ${
				4 - playersAtThisHour
			}`

			// add slot to slot array
			currentSlotsElements.push(slotElement)

			async function openDurationModal() {
				// set hourStart of selection store
				setStart(hour)
				// slotID pushed to api adds player, no slotID creates new slot
				if (hourHasReservation && currentSlotId) setSlotID(currentSlotId)
				if (!hourHasReservation || !currentSlotId) setSlotID(null)

				// open modal
				showDurationModal.value = true
			}
		}
	}

	function slotsBookedCreate() {
		if (currentSlots.value) {
			for (let slot = 0; slot < currentSlots.value.length; slot++) {
				for (
					let player = 0;
					player < currentSlots.value[slot].player.length;
					player++
				) {
					const currentSlot = currentSlots.value[slot]

					const startDate = new Date(currentSlot.start)
					const endDate = new Date(currentSlot.end)

					// pretend browser is in romanian timezone
					const startDateInRomania = useDate(startDate).romanian
					const endDateInRomania = useDate(endDate).romanian

					// grid starts at 1, not 0 => +1
					const start = startDateInRomania.getHours() - hourFirst.value + 1
					const duration =
						endDateInRomania.getHours() - startDateInRomania.getHours()

					// create slot and its content
					const slotElement = document.createElement('div')
					slotElement.setAttribute('class', 'slot booked')
					slotElement.textContent = `${currentSlot.player[player].name}`
					slotElement.setAttribute('data-slot-id', currentSlot.id)

					// testing content
					slotElement.title = `slot hourIndex: ${currentSlot.hourIndex}
slot start local: ${startDate.toLocaleTimeString(preferred.value, {
						hour: 'numeric',
						timeZone: 'Europe/Bucharest',
					})}
slot start ISO: ${startDate.toISOString()}
slot end local: ${endDate.toLocaleTimeString(preferred.value, {
						hour: 'numeric',
						timeZone: 'Europe/Bucharest',
					})}
slot end ISO: ${endDate.toISOString()}
slot id: ${currentSlot.id}
player id: ${currentSlot.player[player].id}
player name: ${currentSlot.player[player].name}
player organizer: ${currentSlot.player[player].bookedBy}`

					// FIXME add click listener for editing and deletion

					// slot placement
					slotElement.style.gridColumn = `${player + COLUMN_FIRST_PLAYER}`
					slotElement.style.gridRow = `${start} / span ${duration}`

					// add slot to slot array
					currentSlotsElements.push(slotElement)
				}
			}
		} else {
			console.warn('no slots available')
		}
	}

	function slotsAppend() {
		currentSlotsElements?.forEach(slotElement => {
			wrapperSlots.value?.appendChild(slotElement)
		})
	}

	onBeforeMount(() => {
		if (!currentSlots.value) {
			console.warn('Before Mount: No slots available')
			return
		}

		slotsBookedCreate()
		slotsFreeCreate()
		slotsAppend()
	})

	onUpdated(() => {
		if (!currentSlots.value) {
			console.warn('Update: No slots available')
			return
		}

		slotsDelete()
		slotsBookedCreate()
		slotsFreeCreate()
		slotsAppend()
	})
</script>

<template>
	<div class="wrapper schedule">
		<ScheduleModalDuration
			v-show="showDurationModal"
			:show-modal="showDurationModal"
			@toggle-modal="toggleDurationModal"
		/>

		<div class="wrapper hour-grid">
			<div
				class="hour-grid hour"
				v-for="hour in gridHours"
				:key="hour.toString()"
				:id="hour.toString()"
			>
				<label for="hour">{{ hour }}:00</label>
			</div>
		</div>

		<div class="wrapper schedule-content">
			<div
				class="schedule hour"
				v-for="hour in hours"
				ref="hourElements"
				:key="hour.toString()"
				:id="hour.toString()"
			></div>

			<div class="wrapper slots" ref="wrapperSlots"></div>
		</div>
	</div>
</template>

<style lang="scss">
	.slot {
		color: var(--font-color-light);
		background-color: var(--highlight-color);

		margin: 1px 0;

		text-indent: 0.5rem;
		padding-top: 0.5rem;

		border-radius: 5px;
		box-shadow: 2px 2px 8px -2px var(--card-shadow-dark),
			-2px -2px 6px -3px var(--card-shadow-light);

		&.booked {
			opacity: 95%;
		}

		&.free {
			cursor: pointer;
			opacity: 0;

			&:hover,
			&:focus {
				opacity: 75%;
			}

			// TODO firefox needs touchstart/-end animation
			// :active seems to only work in Chrome.
			&:active {
				opacity: 75%;
				transition: opacity 0.5s;
			}
		}
	}
</style>

<style scoped lang="scss">
	.wrapper.schedule {
		width: 100%;

		display: grid;
		grid-template: 1fr / 10% 1fr;
		gap: 0.2rem;
		grid-template-areas: 'hour-grid schedule';

		$hour-height: 2rem;

		.wrapper.hour-grid {
			grid-area: hour-grid;

			.hour-grid.hour {
				height: $hour-height;
				position: relative;

				display: grid;
				align-items: start;
				justify-content: end;

				label[for='hour'] {
					position: absolute;

					justify-self: end;
					top: -0.5rem;
				}
			}
		}

		.wrapper.schedule-content {
			position: relative;
			grid-area: schedule;

			display: grid;
			gap: 0;
			grid-template-columns: 1fr;
			grid-template-rows: repeat(auto-fill, $hour-height);
			padding: 0;

			.schedule.hour {
				height: $hour-height;
				border-top: 1px solid grey;

				// grid .schedule-content fills up one more element
				// => last hour row is actually 2nd last row
				&:nth-last-child(2) {
					border-bottom: 1px solid grey;
				}

				&:hover,
				&:focus {
					border: 1px solid red;
				}
			}

			.wrapper.slots {
				position: absolute;
				top: 0;
				width: 100%;

				display: grid;
				gap: 0 1%;
				grid-template-columns: 0.5rem repeat(4, 1fr) 0.5rem;
				grid-template-rows: repeat(13, $hour-height);
				padding: 0;
			}
		}
	}
</style>
