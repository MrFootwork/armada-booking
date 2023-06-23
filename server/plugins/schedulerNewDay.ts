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

			if (!missingDays) return

			// loop through missingDays and generate new day
			missingDays.forEach(async missingDay => {
				console.log(
					'🚀 ~ file: schedulerNewDay.ts:30 ~ missingDays.forEach ~ missingDay.date:',
					missingDay
				)

				const year = missingDay.getFullYear().toString()
				const month = missingDay.getMonth().toString()
				const day = missingDay.getDate().toString()

				const dateComponents = { year, month, day }

				const insertedDay = await $fetch(
					`/api/days?${new URLSearchParams(dateComponents).toString()}`,
					{ method: 'POST' }
				)
			})
		})
		.cron('5 * * * *', 'Europe/Bucharest')
	// .cron('1 0 * * *', 'Europe/Bucharest')
	// .everySeconds(15)

	// create as many tasks as you want here
}
