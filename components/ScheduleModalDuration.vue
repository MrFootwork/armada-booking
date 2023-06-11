<script setup lang="ts">
	import { useSelection } from '@/store/selection'
	import { useDaysStore } from '@/store/bookingDays'

	// FIXME default end: missing implementation of global settings
	const MINIMAL_DURATION = 1
	const HOUR_END_DEFAULT = 22

	const props = defineProps<{
		showModal: boolean
	}>()

	const emit = defineEmits(['toggle-modal'])

	// selection store
	const selectionStore = useSelection()
	const {
		day,
		gym,
		court,
		slot: slotSelected,
		slotSorted,
		hourStart,
	} = storeToRefs(selectionStore)
	const { setEndByDuration } = selectionStore

	// day store
	const dayStore = useDaysStore()

	/*****************************
	 * 		input handling
	 ****************************/
	const slotOverlaps = computed(() => {
		return Boolean(slotSelected.value)
	})

	const duration = ref(MINIMAL_DURATION)

	const longestDuration = computed(() => {
		const NO_RESTRICTION = 99

		// duration of this slot's start to the gym's end
		const startToGymEnd = (gym.value?.end ?? HOUR_END_DEFAULT) - hourStart.value

		// duration of this slot's start to the beginning of the next slot's start
		const startToNextSlot = (() => {
			const modalIsOpened = props.showModal
			const currentCourtHasSlots = court.value?.slots.length ?? 0 > 0

			if (!(modalIsOpened || currentCourtHasSlots)) return NO_RESTRICTION

			const nextSlot = slotSorted.value?.find(
				slot => new Date(slot.start).getHours() > hourStart.value
			)

			if (!nextSlot) return NO_RESTRICTION

			const nextSlotStartHour = new Date(nextSlot.start).getHours()
			const maximalDurationToNextSlot = nextSlotStartHour - hourStart.value

			return maximalDurationToNextSlot
		})()

		// startToNextSlot is 99 if not restricted
		// startToGymEnd is the only restriction in these cases
		return Math.min(startToGymEnd, startToNextSlot)
	})

	// set duration input down to maximal allowed,
	// if maximum is lower
	watch(
		() => props.showModal,
		(newValue, _) => {
			const showModal = Boolean(newValue)
			const lastDurationExceedsMaximum = duration.value > longestDuration.value

			if (showModal && lastDurationExceedsMaximum)
				duration.value = longestDuration.value
		}
	)

	/*****************************
	 * 	request slot addition
	 ****************************/
	const confirmReservation = async () => {
		const dayId = day.value!.id
		const gymId = gym.value!.id
		const courtId = court.value!.id
		const start = hourStart.value

		// input must be between MINIMAL_DURATION and longestDuration
		const durationValidated = (() => {
			if (duration.value < MINIMAL_DURATION) return MINIMAL_DURATION
			return Math.min(duration.value, longestDuration.value)
		})()

		const end = setEndByDuration(durationValidated)

		const queryObject = {
			dayId,
			gymId,
			courtId,
			start,
			end,
			...(slotOverlaps.value && { slotId: slotSelected.value?.id }),
		}

		const response = await dayStore.addSlot(queryObject)

		emit('toggle-modal')

		// TODO fetch only the one updated day and replace days with it
		await dayStore.fetchDays(new Date())
	}
</script>

<template>
	<Transition name="modal">
		<div v-show="showModal" class="wrapper modal component">
			<div
				class="modal-duration blurry-background"
				@click="$emit('toggle-modal')"
			></div>

			<div class="wrapper modal input">
				<button class="wrapper closer" @click="$emit('toggle-modal')">
					<div class="closer background"></div>
					<div class="closer icon ascending"></div>
					<div class="closer icon descending"></div>
				</button>

				<div class="wrapper modal body">
					<div v-if="!slotOverlaps" class="wrapper input element">
						<!-- FIXME better styling -->
						<label for="duration-input">Duration</label>
						<input
							id="duration-input"
							type="number"
							:min="MINIMAL_DURATION"
							:max="longestDuration"
							v-model="duration"
						/>
						<label for="duration-input">Max: {{ longestDuration }}</label>
					</div>

					<div v-else class="wrapper input element">
						<p>
							You wish to play within an existing slot. Do you want to add
							yourself to this slot created by
							<span class="organizer">{{
								slotSelected?.player[0].bookedBy
							}}</span>
							?
						</p>
					</div>

					<button class="confirm booking" @click="confirmReservation">
						Confirm
					</button>
				</div>
			</div>
		</div>
	</Transition>
</template>

<style scoped lang="scss">
	.wrapper.modal.component {
		position: absolute;

		.modal-duration.blurry-background {
			position: fixed;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			backdrop-filter: blur(1px);
			z-index: 1;
		}

		.wrapper.modal.input {
			position: relative;
			padding: 1.2rem;
			padding-top: 2.4rem;
			z-index: 2;
			width: 80%;

			background-color: var(--card-color-secondary);
			border-radius: 0.8rem;
			@include buttonShadow();

			.wrapper.modal.body {
				.wrapper.input.element {
					p {
						// margin: auto;
						span.organizer {
							color: var(--highlight-color);
							font-weight: 1200;
						}
					}
				}

				button.confirm.booking {
					@include buttonStyle();
					@include buttonShadow();

					&:hover,
					&:focus {
						background-color: var(--highlight-color);
						color: var(--button-font-hover);
					}

					&:active {
						background-color: var(--highlight-color);
						color: var(--button-font-hover);
						transform: translateY(2px);
					}
				}
			}

			.wrapper.closer {
				position: absolute;
				top: 1rem;
				right: 2rem;
				z-index: 10;

				border: none;
				padding: 0;
				cursor: pointer;

				display: grid;
				align-items: center;
				justify-content: center;

				filter: drop-shadow(3px 3px 2px var(--ui-shadow-dark));

				.closer.background {
					position: absolute;
					width: 2rem;
					height: 2rem;
					border-radius: 50%;

					transform: translateX(-0.9rem);
				}

				.icon.closer {
					position: absolute;
					width: 0.2rem;
					height: 2rem;
					background-color: var(--font-color);

					&.ascending {
						transform: rotate(45deg);
					}

					&.descending {
						transform: rotate(-45deg);
					}
				}
			}
		}
	}
</style>
