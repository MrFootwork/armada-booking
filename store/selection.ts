import { useDaysStore } from './bookingDays'

const COURT_ID_DEFAULT = '1'
const GYM_ID_DEFAULT = '63dfe7d99d49df953437b274'

export const useSelection = defineStore('selection', () => {
	// state
	const dayID = ref('🍍')
	const gymID = ref(GYM_ID_DEFAULT)
	const courtID = ref(COURT_ID_DEFAULT)
	const hourStart = ref(0)
	const hourEnd = ref(0)
	// day store
	const { days } = storeToRefs(useDaysStore())

	// getters public
	const day = computed(() => {
		return days.value.find(({ id }) => id === dayID.value)
	})

	const gym = computed(() => {
		return day.value?.gyms.find(({ id }) => id === gymID.value)
	})

	const court = computed(() => {
		return gym.value?.courts.find(({ id }) => id === courtID.value)
	})

	// getters private
	const courtIndex = computed(() => {
		return gym.value?.courts?.findIndex(({ id }) => id === courtID.value)
	})

	const boundary = computed(() => {
		return {
			top: days.value.length - 1,
			bottom: 0,
		}
	})

	/*****************************
	 * 			Actions
	 ****************************/
	const initializeStoreValues = () => {
		const initialDay = days.value[0]
		const initialGym = initialDay.gyms[0]
		const initialCourt = initialGym.courts[0]

		dayID.value = initialDay.id
		gymID.value = initialGym.id
		courtID.value = initialCourt.id
	}

	// change state by ID
	const setDayIDByID = (id: string) => (dayID.value = id)
	const setGymID = (id: string) => (gymID.value = id)
	const setCourtID = (id: string) => (courtID.value = id)
	// set start and end
	const setStart = (inputStart: number) => (hourStart.value = inputStart)
	const setEnd = (inputEnd: number) => (hourEnd.value = inputEnd)

	const setDayIDByDate = (inputDate: Date) => {
		const [year, month, date] = [
			inputDate.getFullYear(),
			inputDate.getMonth(),
			inputDate.getDate(),
		]

		days.value.find(({ id: currentId, date: currentDate }, i) => {
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

	// change court selection
	const setCourtNext = () => changeCourtIDByCourts(1)
	const setCourtPrevious = () => changeCourtIDByCourts(-1)

	// change day selection
	const setDayNext = () => changeDayIDByDays(1)
	const setDayPrevious = () => changeDayIDByDays(-1)

	// private methods
	const changeCourtIDByCourts = (courtDifference: number = 0) => {
		const isFirst = courtIndex.value === 0
		const isLast = courtIndex.value === gym.value.courts.length - 1
		const changeDownwards = courtDifference < 0
		const changeUpwards = courtDifference > 0

		if ((isFirst && changeDownwards) || (isLast && changeUpwards)) return

		courtID.value = gym.value?.courts[courtIndex.value + courtDifference].id
	}

	const changeDayIDByDays = (dayDifference: number = 0) => {
		if (!dayDifference) return

		const currentDayIndex = days.value.findIndex(
			({ date }) =>
				date.getMonth() === day.value.date.getMonth() &&
				date.getDate() === day.value.date.getDate()
		)

		const topOrBottomIndex =
			dayDifference > 0 ? boundary.value.top : boundary.value.bottom
		// check if current index is already at the boundary
		if (currentDayIndex === topOrBottomIndex) return

		dayID.value = days.value[currentDayIndex + dayDifference].id
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
		setDayNext,
		setDayPrevious,
		setCourtNext,
		setCourtPrevious,
		initializeStoreValues,
	}
})
