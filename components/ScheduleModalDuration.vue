<script setup lang="ts">
	import { useSelection } from '@/store/selection'
	import { useDaysStore } from '@/store/bookingDays'

	// FIXME default end: missing implementation of global settings
	const HOUR_END_DEFAULT = 20

	const props = defineProps<{
		showModal: boolean
	}>()

	const emit = defineEmits(['toggle-modal'])

	// selection store
	const selectionStore = useSelection()
	const { day, gym, court, slot, hourStart } = storeToRefs(selectionStore)
	const { setEndByDuration } = selectionStore

	// days
	const dayStore = useDaysStore()

	// local state
	const duration = ref(1)

	// set input to maximal allowed duration,
	// if it exceeds the maximum
	watch(
		() => props.showModal,
		(newValue, _) => {
			const showModal = Boolean(newValue)
			const lastDurationExceedsMaximum = duration.value > longestDuration.value
			if (showModal && lastDurationExceedsMaximum)
				duration.value = longestDuration.value
		}
	)

	// FIXME determine startToNextSlot
	const longestDuration = computed(() => {
		const startToGymEnd = (gym.value?.end ?? HOUR_END_DEFAULT) - hourStart.value
		const startToNextSlot = (() => {
			if (court.value?.slots.length) {
				// start of next slot - start of this slot
				console.log('sibling slots: ', court.value?.slots)
				// console.log(
				// 	'start of first sibling slot: ',
				// 	court.value?.slots[0].start?.getHours() ?? 0
				// )
				return 1
			}
			return 1
		})()
		return Math.max(startToGymEnd, startToNextSlot)
	})

	const confirmReservation = async () => {
		const dayId = day.value!.id
		const gymId = gym.value!.id
		const courtId = court.value!.id
		const start = hourStart.value

		const end = setEndByDuration(duration.value)

		const queryObject = {
			dayId,
			gymId,
			courtId,
			start,
			end,
			...(Boolean(slot.value) && { slotId: slot.value?.id }),
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
					<div class="wrapper input element">
						<!-- FIXME show alternative text if slotID exists -->
						<label for="duration-input">Duration</label>
						<input
							id="duration-input"
							type="number"
							min="1"
							:max="longestDuration"
							v-model="duration"
						/>
					</div>

					<button class="confirm booking" @click="confirmReservation">
						Confirm Duration
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

			background-color: var(--card-color-secondary);
			border-radius: 0.8rem;
			@include buttonShadow();

			.wrapper.modal.body {
				.wrapper.input.element {
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
