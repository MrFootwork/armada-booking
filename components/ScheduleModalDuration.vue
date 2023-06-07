<script setup lang="ts">
	import { useSelection } from '@/store/selection'
	import { useDaysStore } from '@/store/bookingDays'

	const HOUR_END_DEFAULT = 20

	const props = defineProps<{
		showModal: boolean
		slotStart: number
	}>()

	// selection store
	const selectionStore = useSelection()
	const { day, gym, court, hourStart, hourEnd } = storeToRefs(selectionStore)

	// days
	const dayStore = useDaysStore()
	const { fetchDays } = dayStore

	const emit = defineEmits(['toggle-modal'])

	const latestHour = ref(HOUR_END_DEFAULT)
	const duration = ref(1)

	// FIXME restrict to minimal value 1
	const longestDuration = computed(() => {
		return latestHour.value - props.slotStart
	})

	onUpdated(() => {
		if (gym.value?.end) return (latestHour.value = gym.value.end)
		latestHour.value = HOUR_END_DEFAULT
	})

	const confirmReservation = async () => {
		const dayId = day.value?.id
		const gymId = gym.value?.id
		const courtId = court.value?.id
		const start = hourStart.value

		const end = 12

		const queryObject = {
			dayId,
			gymId,
			courtId,
			start,
			end,
			// ...(hourHasReservation && { slotId: currentSlotId }),
		}
		console.log('query from component: ', queryObject)

		// FIXME this modal  calls DaysStore.addSlot() and .fetchDays()

		// const response = await addSlot(queryObject)
		// console.log('addSlot response: ', response);

		// TODO fetch only the one updated day and replace days with it
		// await fetchDays(new Date())
		console.log('updated days fetched')
		emit('toggle-modal')
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

				<span>{{ `${slotStart} - ${gym}` }}</span>

				<p>test: {{ day?.id }}</p>

				<div class="wrapper modal body">
					<div class="wrapper input element">
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
