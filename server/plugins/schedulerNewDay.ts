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
			console.log(
				'🚀 ~ file: schedulerNewDay.ts:18 ~ .run ~ { today, lastDay } :',
				{ today, lastDay }
			)
			// get days on DB
			const { out: daysOnDB } = await $fetch('/api/days', {
				method: 'GET',
				params: { from: today.toISOString(), to: lastDay.toISOString() },
			})

			// determine missing days of the week
			const missingDays = getMissingDays(daysOnDB, today, lastDay)
			console.log(
				'🚀 ~ file: schedulerNewDay.ts:29 ~ .run ~ missingDays:',
				missingDays
			)

			// generate new day for each missing day
		})
		.everySeconds(15)
	// .cron('1 0 * * *', 'Europe/Bucharest')

	// create as many tasks as you want here
}
