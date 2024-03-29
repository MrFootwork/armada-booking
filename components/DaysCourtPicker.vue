<script setup lang="ts">
	import { Day } from '@/model/TDay.model'
	import { useSelection } from '@/store/selection'

	defineProps<{
		gym?: Day['gyms'][number]
		courts?: Day['gyms'][number]['courts']
		currentCourtIndex: number
		layout: string
	}>()

	const emit = defineEmits(['toggle-picker'])

	// selection store
	const { setCourtID } = useSelection()

	function selectCourtAndClose(courtID: string) {
		setCourtID(courtID)
		emit('toggle-picker')
	}
</script>

<template>
	<div class="wrapper">
		<div
			class="court-picker blurry-background"
			@click="$emit('toggle-picker')"
		></div>

		<div class="wrapper court-picker content">
			<button class="wrapper closer" @click="$emit('toggle-picker')">
				<div class="closer background"></div>
				<div class="closer icon ascending"></div>
				<div class="closer icon descending"></div>
			</button>

			<div class="court-picker content" :class="gym?.nameCode">
				<button
					class="court wrapper"
					:class="`court-${court.id}`"
					v-for="(court, i) in courts"
					:key="court.id"
					@click="selectCourtAndClose(court.id)"
				>
					<img
						class="court"
						src="/court.png"
						:id="`court-${court.courtName}`"
					/>
					<label :for="`court-${court.courtName}`">{{ court.courtName }}</label>
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.wrapper {
		position: absolute;

		.court-picker.blurry-background {
			position: fixed;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			backdrop-filter: blur(1px);
			z-index: -1;
		}

		.wrapper.court-picker.content {
			position: relative;
			padding: 1.2rem;
			padding-top: 2.4rem;
			z-index: 1;

			background-color: var(--card-color-secondary);
			border-radius: 0.8rem;
			@include buttonShadow();

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

			.court-picker.content {
				display: grid;

				&.antilopa {
					grid-template: repeat(3, 1fr) / repeat(4, 1fr);
					gap: 0.2rem;
					grid-template-areas:
						'....... court-2 court-5 .......'
						'court-1 court-3 court-6 court-8'
						'....... court-4 court-7 .......';

					@for $i from 1 through 8 {
						button.court.wrapper.court-#{$i} {
							grid-area: court-#{$i};
						}
					}

					@for $i from 2 through 7 {
						button.court.wrapper.court-#{$i} > img.court {
							transform: rotate(180deg);
						}
					}
				}
				&.sun-plaza {
					grid-template: repeat(3, 1fr) / repeat(3, 1fr);
					gap: 0.2rem;
					grid-template-areas:
						'court-6 court-7 court-8'
						'court-4 ....... court-5'
						'court-1 court-2 court-3';

					@for $i from 1 through 8 {
						button.court.wrapper.court-#{$i} {
							grid-area: court-#{$i};
						}
					}
				}

				$court-width: calc(min($dynamic-width, $max-width) / 5);

				&.tonitza {
					grid-template: repeat(2, 1fr) / repeat(2, 1fr);
					gap: 0.2rem;
					grid-template-areas:
						'court-1 court-1'
						'court-2 court-3';

					@for $i from 1 through 3 {
						button.court.wrapper.court-#{$i} {
							grid-area: court-#{$i};
						}
					}

					button.court.wrapper.court-1 {
						& > img.court {
							transform: rotate(180deg);
						}
						& > label {
							width: calc(2 * #{$court-width});
						}
					}
				}

				button.court.wrapper {
					position: relative;

					background: none;
					border: none;
					padding: 0;

					display: grid;
					justify-content: center;
					align-items: center;

					&:hover {
						outline: 0.4rem solid var(--highlight-color);
						border-radius: 0.4rem;
					}

					img.court {
						width: $court-width;
						transform: rotate(90deg);
					}

					label {
						position: absolute;
						width: $court-width;

						color: var(--highlight-color);
						font-size: 2.8rem;
						font-weight: 900;

						cursor: pointer;
					}
				}
			}
		}
	}
</style>
