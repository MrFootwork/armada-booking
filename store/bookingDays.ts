import { ref } from 'vue'
import { Day } from '@/model/TDay.model'
import useDate from '@/composables/date'

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
		const { firstDate, lastDate } = getDateRange()

		// FIXME Test if timezone is really correct
		const queryObject = {
			firstDateYear: firstDate.getFullYear().toString(),
			firstDateMonth: firstDate.getMonth().toString(),
			firstDateDate: firstDate.getDate().toString(),
			lastDateYear: lastDate.getFullYear().toString(),
			lastDateMonth: lastDate.getMonth().toString(),
			lastDateDate: lastDate.getDate().toString(),
		}

		const { data, error } = await useFetch(
			`/api/days?${new URLSearchParams(queryObject).toString()}`,
			{ method: 'GET' }
		)
		days.value = data.value?.out as Day[]

		// FIXME date transformation mus be done here
		// api gets date types from MongoDB
		// console.log('daysStore: ', typeof days.value[0].date, days.value[0].date)
		return days.value
	}

	function getDateRange() {
		const firstDate = useDate(new Date()).resetTime()
		const lastDate = useDate(new Date()).addDays(6)
		return { firstDate, lastDate }
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
