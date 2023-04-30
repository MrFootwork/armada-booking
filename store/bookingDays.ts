import { ref } from 'vue'
import CalendarSample from '@/model/MCalendarSample.model'
import { Day } from '@/model/TDay.model'

export const useDaysStore = defineStore('days', () => {
	// state
	// initiated minimal data for days page to render
	const daysInitial = [
		{
			id: 'initial day',
			date: new Date(),
			gyms: [],
		},
	]
	const days = ref<Day[]>(daysInitial)

	// getters (computed())
	// actions
	async function fetchDays() {
		const fetchedDays = await useFetch('/api/days', { method: 'GET' })
		days.value = fetchedDays.data.value?.out as Day[]
		// this would work. But I prefer this transformation
		// to be done in in the API handler days.get.ts
		// days.value[0].date = new Date(days.value[0].date)
		console.log('daysStore: ', days.value[0].date)
		return days.value
	}

	async function addSlot({
		day,
		gymId,
		courtId,
		start,
		end,
	}: {
		day: Date
		gymId: Day['gyms'][number]['id']
		courtId: Day['gyms'][number]['courts'][number]['id']
		start: number
		end: number
	}) {
		// FIXME add new slot to DB
		if (true) {
			alert('not ready, yet.')
			return
		}

		const isDay = (storeDay: Date) => storeDay.date.getDate() === day.getDate()
		const isGym = (storeGym: Day['gyms'][number]) => storeGym.id === gymId
		const isCourt = (storeCourt: Day['gyms'][number]['courts'][number]) =>
			storeCourt.id === courtId

		const daysIndex = days?.value?.findIndex(isDay)
		const daysElement = days?.value?.find(isDay)

		const gymsIndex = daysElement?.gyms.findIndex(isGym)
		const gymsElement = daysElement?.gyms.find(isGym)

		const courtsIndex = gymsElement?.courts.findIndex(isCourt)
		const courtsElement = gymsElement?.courts.find(isCourt)

		console.log('day: ', daysIndex, daysElement)
		console.log('gym: ', gymsIndex, gymsElement)
		console.log('court: ', courtsIndex, courtsElement)

		// push to days
	}

	return { days, fetchDays, addSlot }
})
