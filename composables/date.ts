import { ISODateString } from 'next-auth'
import { ref, onMounted, onUnmounted } from 'vue'
import { useLanguage } from '@/store/language'

const languageStore = useLanguage()
// milliseconds of one day
const VALUE_OF_ONE_DAY = 24 * 60 * 60 * 1000
const DAYS_VISIBLE_RANGE = 6

export default function useDate(objDate: Date = new Date()) {
	// 'en-US': Mon, Tues, ...
	const weekday = objDate.toLocaleDateString(languageStore.preferred, {
		weekday: 'short',
	})

	// 'en-US': May 1, 2023
	const date = objDate.toLocaleDateString(languageStore.preferred, {
		dateStyle: 'long',
	})

	// 2023-04-30
	const dateISO = objDate.toISOString().substring(0, 10)

	// routing to slot page requires normal time
	// 22:53
	const time = objDate.toLocaleTimeString('ro-ro', {
		hour: 'numeric',
		minute: '2-digit',
	})

	const romanian = new Date(
		objDate.toLocaleString('en-US', {
			timeZone: 'Europe/Bucharest',
		})
	)

	/**
	 * Returns a date object given to useDate()
	 * with the time set to 0 since midnight.
	 * @returns {Date}
	 */
	const resetTime = () => {
		const { year, month, day } = {
			year: objDate.getFullYear(),
			month: objDate.getMonth(),
			day: objDate.getDate(),
		}

		// FIXME test if this time also is saved on mongoDB
		const dateTransformed = new Date()
		dateTransformed.setFullYear(year)
		dateTransformed.setMonth(month)
		dateTransformed.setDate(day)
		dateTransformed.setHours(0)
		dateTransformed.setMinutes(0)
		dateTransformed.setSeconds(0)
		dateTransformed.setMilliseconds(0)

		return dateTransformed
	}

	/**
	 * Calculates a valid ISO Date from just the dateISO
	 * @param dateISO e.g. 2024-05-01
	 * @returns e.g. 2024-05-01T22:00:00.000Z
	 */
	const dateISOToFullISO = (
		dateISO: ISODateString = objDate.toISOString().substring(0, 10)
	) => {
		const dateYear = dateISO.substring(0, 3)
		const dateMonth = dateISO.substring(5, 6)
		const dateDay = dateISO.substring(8, 9)
		return new Date(dateYear, dateMonth, dateDay).toISOString()
	}

	/**
	 * Calculates a date object by a given amount of days apart
	 * from a date given to useDate().
	 * @param {number} dayCountToAdd	Amount of days to added to a given date
	 * @returns	{Date}
	 */
	const addDays = (dayCountToAdd: number = DAYS_VISIBLE_RANGE) => {
		let datePlusDays = new Date(
			objDate.valueOf() + dayCountToAdd * VALUE_OF_ONE_DAY
		)

		datePlusDays.setHours(0)
		datePlusDays.setMinutes(0)
		datePlusDays.setSeconds(0)
		datePlusDays.setMilliseconds(0)

		return datePlusDays
	}
	return {
		weekday,
		date,
		time,
		dateISO,
		romanian,
		resetTime,
		addDays,
		dateISOToFullISO,
	}
}
