import { ref } from 'vue'
import { Day } from '@/model/TDay.model'
import useDate from '~~/composables/date'

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
	async function fetchDays(from: Date) {
		console.log('store from: ', from)
		const { firstDate, lastDate } = getDateRange(from)
		console.log('store range: ', { firstDate, lastDate })

		// FIXME reset times of both dates before ISO creation

		const queryObject = {
			from: useDate(firstDate).dateISO,
			to: useDate(lastDate).dateISO,
		}
		console.log('store queryObject: ', queryObject)

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

	function getDateRange(from: Date) {
		const fromYear = from.getFullYear()
		const fromMonth = from.getMonth()
		const fromDate = from.getDate()

		const firstDate = useDate(
			new Date(fromYear, fromMonth, fromDate)
		).resetTime()

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
