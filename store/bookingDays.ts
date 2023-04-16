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

	return { days, anyState, setState }
})
