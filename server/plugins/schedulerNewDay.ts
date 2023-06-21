import { fetchGyms } from '@/server/utils/mongo/gyms'
import { useScheduler } from '#scheduler'
import currentWeekInRomania from '../app/services/todayDateInRomania.ts'

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
				'🚀 ~ file: schedulerNewDay.ts:17 ~ .run ~ today, lastDay:',
				today,
				lastDay
			)

			// get days
			// FIXME api needs queryObject {from, to} as URLSearchParams

			// build queryObject {from, to} and pass as query
			const response = await $fetch('/api/days', {
				method: 'GET',
				params: { from: today.toISOString(), to: lastDay.toISOString() },
			})
			console.log(
				'🚀 ~ file: schedulerNewDay.ts:31 ~ .run ~ response:',
				response
			)

			// const response = await $fetch('/api/days', { method: 'GET' })
			const fetchDays = response.out
			console.log(
				'🚀 ~ file: schedulerNewDay.ts:38 ~ .run ~ fetchDays:',
				fetchDays
			)

			// determine missing days of the week

			// call days.post for each missing day
		})
		.everySeconds(15)
	// .cron('1 0 * * *', 'Europe/Bucharest')

	// create as many tasks as you want here
}
