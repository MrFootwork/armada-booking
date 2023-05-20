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
			gyms: [
				{
					id: '63dfe7d99d49df953437b274',
					nameCode: 'test',
					nameShort: 'Antilopa',
					place: 'Badminton Armada Arena Test',
					courts: [],
				},
			],
		},
	]

	// BUG initial data reappears each time
	// when coming back from another day
	const days = ref<Day[]>([])

	// getters
	const currentGym = (props: { currentDay: Date; gymId: string }) => {
		const dayData = days.value.find(
			day => day.date.getDate() === props.currentDay.getDate()
		)

		if (!dayData) throw new Error("first day doesn't exist")

		return dayData.gyms.find(gym => gym.id === props.gymId)!
	}

	// actions
	async function fetchDays(from: Date) {
		const { firstDate, lastDate } = getDateRange(from)

		// working with ISO to keep timezone information
		// 2023-05-03T22:00:00.000Z
		// = Thu May 04 2023 00:00:00 GMT+0200
		const queryObject = {
			from: firstDate.toISOString(),
			to: lastDate.toISOString(),
		}

		const { data, error } = await useFetch(
			`/api/days?${new URLSearchParams(queryObject).toString()}`,
			{ method: 'GET' }
		)

		// fetched data contains ISO dates
		// and must be transformed into JS dates
		const dataTransformed = (data.value?.out as Day[]).map(day => {
			const newDay = day
			newDay.date = useDate(new Date(day.date)).resetTime()
			return newDay
		})

		days.value = dataTransformed as Day[]

		return days.value
	}

	function getDateRange(from: Date) {
		const fromYear = from.getFullYear()
		const fromMonth = from.getMonth()
		const fromDate = from.getDate()

		const firstDate = useDate(
			new Date(fromYear, fromMonth, fromDate)
		).resetTime()

		const lastDate = useDate(new Date(fromYear, fromMonth, fromDate)).addDays(6)

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

	return { days, currentGym, fetchDays, addSlot }
})
