<script setup lang="ts">
	import { Gym, GymInput } from '@/model/TGym.model'
	// FIXME test gym push, and get all gyms

	const fetchResult = ref()

	const newGym: GymInput = {
		nameCode: 'tonitza',
		nameShort: 'Tonitza',
		place: 'Liceul de Arte Plastice "Nicolae Tonitza"',
		end: 21,
		courts: [],
		courtCount: 3,
	}

	async function addGym(gymToAdd: GymInput) {
		const insertGym = await $fetch('/api/gyms', {
			method: 'POST',
			body: gymToAdd,
		})

		fetchResult.value = insertGym
	}

	async function fetchGyms() {
		const fetchedGyms = await useFetch('/api/gyms', { method: 'GET' })
		fetchResult.value = fetchedGyms.data.value?.out
	}

	async function deleteGym() {
		// determine id of last gym and delete it
		if (!fetchResult.value) await fetchGyms()
		const gymIdLast: Gym['id'] = fetchResult.value.at(-1).id

		const deleteGym = await useFetch('/api/gyms', {
			method: 'DELETE',
			body: { deleteGymWithId: gymIdLast },
		})

		fetchResult.value = deleteGym.data.value?.out
	}
</script>

<template>
	<div class="wrapper">
		<button @click="addGym(newGym)">Add Gym</button>
		<button @click="fetchGyms()">Fetch Gyms</button>
		<button @click="deleteGym()">Delete Gym</button>

		<pre>{{ fetchResult }}</pre>
	</div>
</template>

<style scoped lang="scss">
	.wrapper {
		display: flex;
		flex-flow: column;

		pre {
			background-color: var(--card-color-primary);
			border-radius: 15px;
			padding: 1rem;
		}
	}
</style>
