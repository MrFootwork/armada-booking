import { Gym } from '@/model/TGym.model'

export const useGym = defineStore('gym', () => {
	// state
	const gyms = ref([])
	// getters (computed())
	// actions
	function fetchGyms() {}

	return { gyms, fetchGyms }
})
