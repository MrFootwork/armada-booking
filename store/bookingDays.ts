import { ref } from 'vue'
import CalendarSample from '@/model/MCalendarSample.model'
import { Day } from '@/model/TDay.model'

export const useDaysStore = defineStore('days', () => {
	// state
	const days = ref<Day[] | null>(null)

	// getters (computed())
	// actions
	async function fetchDays() {
		// FIXME get days and save them here
		const calendarSample = new CalendarSample()
		days.value = calendarSample.days
	}

	async function addSlot({ day, gym, court, start, end }) {
		// FIXME add new slot to DB
		// if (!days.value) days.value = []
		// days.value.push(input)

		console.log({ day, gym, court, start, end })
	}

	return { days, fetchDays, addSlot }
})
