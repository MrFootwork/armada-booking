import { useDaysStore } from './bookingDays'

const COURT_ID_DEFAULT = '1'

export const useSelection = defineStore('selection', () => {
	// state
	const dayID = ref('🍍')
	const gymID = ref('63dfe7d99d49df953437b274')
	const courtID = ref('1')
	const hourStart = ref(0)
	const hourEnd = ref(0)
	// day store
	const { days } = storeToRefs(useDaysStore())

	// getters (computed())
	const day = computed(() => {
		return days.value.find(({ id }) => id === dayID.value)
	})

	const gym = computed(() => {
		return day.value?.gyms.find(({ id }) => id === gymID.value)
	})

	const court = computed(() => {
		return gym.value?.courts.find(({ id }) => id === courtID.value)
	})

	const courtIndex = computed(() => {
		return gym.value?.courts?.findIndex(({ id }) => id === courtID.value)
	})

	// actions
	const initializeStoreValues = () => {
		const initialDay = days.value[0]
		const initialGym = initialDay.gyms[0]
		const initialCourt = initialGym.courts[0]

		dayID.value = initialDay.id
		gymID.value = initialGym.id
		courtID.value = initialCourt.id
	}

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

	const setGymID = (id: string) => {
		gymID.value = id
	}

	const setCourtID = (id: string) => {
		courtID.value = id
	}

	const setCourtNext = () => {
		const isLast = courtIndex.value === gym.value.courts.length
		if (isLast) return

		courtID.value = gym.value?.courts[courtIndex.value + 1].id
	}

	const setCourtPrevious = () => {
		if (courtIndex.value > 0) {
			courtID.value = gym.value?.courts[courtIndex.value - 1].id
		}
	}

	const setStart = (inputStart: number) => {
		hourStart.value = inputStart
	}

	const setEnd = (inputEnd: number) => {
		hourEnd.value = inputEnd
	}

	/*********************************
	 * 					Watchers
	 ********************************/
	// new day selection
	watch(dayID, (newID, oldID) => {
		if (newID !== oldID) {
			// gym selection can be preserved
			// reset court selection
			courtID.value = gym.value?.courts[0].id || COURT_ID_DEFAULT
		}
	})
	// new gym selection
	watch(gymID, (newID, oldID) => {
		if (newID !== oldID) {
			// reset court selection
			courtID.value = gym.value?.courts[0].id || COURT_ID_DEFAULT
		}
	})

	return {
		day,
		gym,
		court,
		setDayIDByDate,
		setGymID,
		setCourtID,
		setCourtNext,
		setCourtPrevious,
		initializeStoreValues,
	}
})
