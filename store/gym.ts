import { Gym } from '@/model/TGym.model'

export const useGym = defineStore('gym', () => {
	// state
	const gyms: Gym[] = ref([
		{
			id: '63dfe7d99d49df953437b274',
			nameCode: 'antilopa',
			nameShort: 'Antilopa',
			place: 'Badminton Armada Arena',
			courts: [],
		},
		{
			id: '63e01a8504594f501f829e51',
			nameCode: 'sun-plaza',
			nameShort: 'Sun Plaza',
			place: 'Sala De Sport ELITE',
			courts: [],
		},
	])
	// const gyms = ref([])
	// getters (computed())
	// actions
	async function fetchGyms() {
		const fetchedGyms = await useFetch('/api/gyms', { method: 'GET' })
		gyms.value = await fetchedGyms?.data.value?.out
	}

	return { gyms, fetchGyms }
})
