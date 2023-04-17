import { ref } from 'vue'

export const useDays = defineStore('days', () => {
	// state
	const days = ref([])
	const anyState = ref('this works')

	// getters (computed())
	// actions
	function setState(newState: string) {
		anyState.value = newState
	}

	async function fetchDays() {
		// FIXME get days and save them here
	}

	async function addSlot() {
		// FIXME add new slot to DB
	}

	return { days, anyState, setState }
})
