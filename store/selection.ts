import { useDaysStore } from './bookingDays'

const COURT_ID_DEFAULT = '1'
const GYM_ID_DEFAULT = '63dfe7d99d49df953437b274'

export const useSelection = defineStore('selection', () => {
	/*****************************
	 * 			Day
	 ****************************/
	// day store
	const { days } = storeToRefs(useDaysStore())
	// state
	const dayID = ref('🍍')
	// getters public
	const day = computed(() => {
		return days.value.find(({ id }) => id === dayID.value)
	})
	// getters private
	const boundary = computed(() => {
		return {
			top: days.value.length - 1,
			bottom: 0,
		}
	})
	// set day selection
	const setDayIDByID = (id: string) => (dayID.value = id)
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

			if (!isSameDay) return false

			dayID.value = currentId
			return true
		})
	}
	// change day selection public
	const setDayNext = () => changeDayIDByDays(1)
	const setDayPrevious = () => changeDayIDByDays(-1)
	// change day selection private
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
	/*****************************
	 * 			Gym
	 ****************************/
	// gym store
	const gymID = ref(GYM_ID_DEFAULT)
	// getters public
	const gym = computed(() => {
		return day.value?.gyms.find(({ id }) => id === gymID.value)
	})
	// set gym selection
	const setGymID = (id: string) => (gymID.value = id)

	/*****************************
	 * 			Court
	 ****************************/
	// court store
	const courtID = ref(COURT_ID_DEFAULT)
	// getters public
	const court = computed(() => {
		return gym.value?.courts.find(({ id }) => id === courtID.value)
	})
	// getters private
	const courtIndex = computed(() => {
		return gym.value?.courts?.findIndex(({ id }) => id === courtID.value)
	})
	// set court selection
	const setCourtID = (id: string) => (courtID.value = id)
	// change court selection public
	const setCourtNext = () => changeCourtIDByCourts(1)
	const setCourtPrevious = () => changeCourtIDByCourts(-1)
	// change court selection private
	const changeCourtIDByCourts = (courtDifference: number = 0) => {
		const isFirst = courtIndex.value === 0
		const isLast = courtIndex.value === gym.value.courts.length - 1
		const changeDownwards = courtDifference < 0
		const changeUpwards = courtDifference > 0

		if ((isFirst && changeDownwards) || (isLast && changeUpwards)) return

		courtID.value = gym.value?.courts[courtIndex.value + courtDifference].id
	}
	// watchers
	// on day change
	watch(dayID, (newID, oldID) => {
		if (newID !== oldID) {
			// gym selection can be preserved
			// reset court selection
			courtID.value = gym.value?.courts[0].id || COURT_ID_DEFAULT
		}
	})
	// on gym change
	watch(gymID, (newID, oldID) => {
		if (newID !== oldID) {
			// reset court selection
			courtID.value = gym.value?.courts[0].id || COURT_ID_DEFAULT
		}
	})

	/*****************************
	 * 			Slot
	 ****************************/
	// store
	const slotID = ref<Slot['id'] | null>(null)
	const hourStart = ref(0)
	const hourEnd = ref(0)

	// getters public
	const slot = computed(() => {
		return court.value?.slots.find(({ id }) => id === slotID.value) || null
	})
	const slotSorted = computed(() => {
		return court.value?.slots.sort((slotA, slotB) => {
			const dateA = new Date(slotA.start)
			const dateB = new Date(slotB.start)
			return dateA.getHours() - dateB.getHours()
		})
	})

	// set store values
	const setSlotID = (id: string | null) => {
		if (!slotID) return (slotID.value = null)
		return (slotID.value = id)
	}
	const setStart = (inputStart: number) => (hourStart.value = inputStart)
	const setEnd = (inputEnd: number) => (hourEnd.value = inputEnd)
	const setEndByDuration = (duration: number) => {
		return (hourEnd.value = hourStart.value + duration)
	}

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

	return {
		day,
		gym,
		court,
		slot,
		slotSorted,
		hourStart,
		hourEnd,
		setDayIDByDate,
		setGymID,
		setCourtID,
		setDayNext,
		setDayPrevious,
		setCourtNext,
		setCourtPrevious,
		setSlotID,
		setStart,
		setEnd,
		setEndByDuration,
		initializeStoreValues,
	}
})
