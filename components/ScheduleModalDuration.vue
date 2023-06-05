<script setup lang="ts">
	import { Gym } from '@/model/TGym.model'

	const defaultEndHour = 20

	const props = defineProps<{
		showModal: boolean
		slotStart: number
		gymEnd: Gym['end']
	}>()

	const emit = defineEmits(['toggle-modal', 'confirm-duration'])

	const latestHour = ref(defaultEndHour)
	const duration = ref(1)

	// FIXME restrict to minimal value 1
	const longestDuration = computed(() => {
		return latestHour.value - props.slotStart
	})

	onUpdated(() => {
		if (props.gymEnd) return (latestHour.value = props.gymEnd)
		latestHour.value = defaultEndHour
	})

	function confirmDuration() {
		emit('confirm-duration', duration)
	}
</script>

<template>
	<Transition name="modal">
		<div v-show="showModal" class="wrapper modal component">
			<div
				class="modal-duration blurry-background"
				@click="$emit('toggle-modal')"
			>
				🍍 {{ showModal }}
			</div>

			<div class="wrapper modal input">
				<button class="wrapper closer" @click="$emit('toggle-modal')">
					<div class="closer background"></div>
					<div class="closer icon ascending"></div>
					<div class="closer icon descending"></div>
				</button>

				<span>{{ `${slotStart} - ${gymEnd}` }}</span>

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

					<button class="confirm booking" @click="confirmDuration">
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
					@include buttonStlye();
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
