import { fetchGyms } from '@/server/utils/mongo/gyms'
import { useScheduler } from '#scheduler'
import currentWeekInRomania from '../app/services/todayDateInRomania.ts'
import getMissingDays from '../app/services/getMissingDays.ts'

export default defineNitroPlugin(() => {
	fillWeekWithDays()
	console.log('scheduler is activeted ⏱')
})

function fillWeekWithDays() {
	const scheduler = useScheduler()

	// FIXME implement this scheduler
	scheduler
		.run(async () => {
			const { today, lastDay } = currentWeekInRomania()

			// get days on DB
			const { out: daysOnDB } = await $fetch('/api/days', {
				method: 'GET',
				params: { from: today.toISOString(), to: lastDay.toISOString() },
			})

			// determine missing days of the week
			const missingDays = getMissingDays(daysOnDB, today, lastDay)

			// loop through missingDays and generate new day
			// FIXME use for..of loop instead of forEach()

			missingDays.forEach(async missingDay => {
				console.log(
					'🚀 ~ file: schedulerNewDay.ts:30 ~ missingDays.forEach ~ date:',
					date
				)
				const year = missingDay.date.getFullYear().toString()
				const month = missingDay.date.getMonth().toString()
				const day = missingDay.date.getDate().toString()

				const dateComponents = { year, month, day }

				const insertedDay = await $fetch(
					`/api/days?${new URLSearchParams(dateComponents).toString()}`,
					{ method: 'POST' }
				)
			})
		})
		.everySeconds(15)
	// .cron('1 0 * * *', 'Europe/Bucharest')

	// create as many tasks as you want here
}
