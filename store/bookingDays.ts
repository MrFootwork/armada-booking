import { ref } from 'vue'

export const useDaysStore = defineStore('days', () => {
	// state
	const days = ref([])

	// getters (computed())
	// actions
	async function fetchDays() {
		// FIXME get days and save them here
	}

	async function addSlot(input: string) {
		// FIXME add new slot to DB
		days.value.push(input)
	}

	return { days, fetchDays, addSlot }
})
