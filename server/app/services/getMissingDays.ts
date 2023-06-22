import type { Day } from '@/model/TDay.model.ts'

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24

export default function getMissingDays(
	daysOnDB: Day[],
	firstDay: Date,
	lastDay: Date
) {
	const dayDifference = Math.abs(lastDay - firstDay)
	const weekRange = Math.ceil(dayDifference / DAY_IN_MILLISECONDS)

	// build array of 0hour days from firstDay to lastDay
	const daysComplete = Array.from({ length: weekRange }, (_, i) => {
		return new Date(firstDay.getTime() + i * DAY_IN_MILLISECONDS)
	})
	console.log(
		'🚀 ~ file: getMissingDays.ts:17 ~ daysComplete ~ daysComplete:',
		daysComplete
	)

	const missingDays: Day[] = []
	console.log('🚀 ~ file: getMissingDays.ts:23 ~ missingDays:', missingDays)

	// loop through array
	// if current day is not in daysOnServer => push day to missingDays
	daysComplete.forEach(day => {
		const dayFound = daysOnDB.find(dbDay => {
			return new Date(dbDay.date).getTime() === day.getTime()
		})
		console.log(
			'🚀 ~ file: getMissingDays.ts:31 ~ dayFound ~ dayFound:',
			dayFound
		)

		if (dayFound) return
		missingDays.push(day)
	})

	// FIXME remove eslint-plugin-import
	// I thought eslint needs this to show me mistyped function name errors

	console.log('🚀 ~ file: getMissingDays.ts:19 ~ missingDays:', missingDays)

	return missingDays
}
