import { Gym } from '@/model/TGym.model'

export const useGym = defineStore('gym', () => {
	// state
	// days page reads id of initial gym
	const gymsInitial = [
		{
			id: '63dfe7d99d49df953437b274',
			nameCode: 'test',
			nameShort: 'Antilopa',
			place: 'Badminton Armada Arena Test',
			courts: [],
		},
	]
	const gyms: Gym[] = ref(gymsInitial)
	// getters (computed())
	// actions
	async function fetchGyms() {
		const fetchedGyms = await useFetch('/api/gyms', { method: 'GET' })
		gyms.value = fetchedGyms?.data.value?.out
	}

	return { gyms, fetchGyms }
})
