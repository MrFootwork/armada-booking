import { useDaysStore } from './bookingDays'

export const useSelection = defineStore('selection', () => {
	// state
	const dayID = ref('🍍')
	const gymID = ref('🍎')
	const courtID = ref('🍌')
	const hourStart = ref(0)
	const hourEnd = ref(0)
	// day store
	const { days } = storeToRefs(useDaysStore())

	// getters (computed())
	const day = computed(() => {
		return days.value.find(day => {
			return day.id === dayID.value
		})
	})

	// actions
	const setDayIDByID = (id: string) => {
		dayID.value = id
	}
	const setDayIDByDate = (inputDate: Date) => {
		const [year, month, date] = [
			inputDate.getUTCFullYear(),
			inputDate.getUTCMonth(),
			inputDate.getUTCDate(),
		]

		days.value.find(({ id: currentId, date: currentDate }) => {
			const [currentYear, currentMonth, currentDay] = [
				currentDate.getFullYear(),
				currentDate.getMonth(),
				currentDate.getDate(),
			]

			const isSameDay =
				currentYear === year && currentMonth === month && currentDay === date

			if (isSameDay) dayID.value = currentId
			return isSameDay
		})
	}
	const setGymId = (id: string) => {
		gymID.value = id
	}
	const setCourtId = (id: string) => {
		courtID.value = id
	}
	const setStart = (inputStart: number) => {
		hourStart.value = inputStart
	}
	const setEnd = (inputEnd: number) => {
		hourEnd.value = inputEnd
	}

	return {
		dayID,
		gymID,
		courtID,
		hourStart,
		hourEnd,
		setDayIDByDate,
	}
})
