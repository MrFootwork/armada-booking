import { ref } from 'vue'
import { Day } from '@/model/TDay.model'
import { Slot } from '@/model/TSlot.model'
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

	const days = ref<Day[]>([])

	// getters

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

		console.log('query from store: ', queryObject)

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

		days.value = (dataTransformed as Day[]).sort(
			(dayA, dayB) => dayA.date.getTime() - dayB.date.getTime()
		)

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
		dayId,
		gymId,
		courtId,
		start,
		end,
		slotId,
	}: {
		dayId: string
		gymId: Day['gyms'][number]['id']
		courtId: Day['gyms'][number]['courts'][number]['id']
		start: number
		end: number
		slotId?: Slot['id']
	}) {
		// browser always displays Romanian time and api must
		const timeZone = 'Europe/Bucharest'

		// querying as date object led to queryObject.day = '"2023-06-08T21:00:00.000Z"'
		const day = days.value.find(day => day.id === dayId)?.date.toISOString()

		const queryObject = {
			dayId,
			gymId,
			courtId,
			day,
			start,
			end,
			timeZone,
			slotId,
		}

		console.log('query: from store to api', queryObject)

		const { data, error } = await useFetch(`/api/slot`, {
			query: queryObject,
			method: 'PUT',
		})

		if (error.value) {
			console.error('StatusCode: ', error.value.statusCode)
			console.error('Name: ', error.value.name)
			console.error('Message: ', error.value.message)
			console.error('Something went wrong...', error.value.data)
			return error.value.message
		}

		return data.value
	}

	return { days, fetchDays, addSlot }
})
