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
		// FIXME use timezone.ts to create correct offset
		return new Date(firstDay.getTime() + i * DAY_IN_MILLISECONDS)
	})
	console.log(
		'🚀 ~ file: getMissingDays.ts:17 ~ daysComplete ~ daysComplete:',
		daysComplete
	)

	const missingDays: Date[] = []

	// BUG🐞 prod server keeps adding days, although they exist
	// loop through array
	// if current day is not in daysOnDB => push day to missingDays
	daysComplete.forEach(day => {
		console.log('🚀 ~ file: getMissingDays.ts:27 ~ day:', day)

		const dayFound = daysOnDB.find(dbDay => {
			console.log(
				'🚀 ~ file: getMissingDays.ts:30 ~ dayFound ~ new Date(dbDay.date).getTime():',
				dbDay.date,
				new Date(dbDay.date).getTime() === day.getTime()
			)

			return new Date(dbDay.date).getTime() === day.getTime()
		})

		if (dayFound) return
		missingDays.push(day)
	})

	// FIXME remove eslint-plugin-import
	// I thought eslint needs this to show me mistyped function name errors

	console.log('🚀 ~ file: getMissingDays.ts:34 ~ missingDays:', missingDays)

	return missingDays
}
