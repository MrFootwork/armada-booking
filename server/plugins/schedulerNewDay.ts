import { useScheduler } from '#scheduler'
import todayInRomania from '../app/services/todayDateInRomania.ts'

export default defineNitroPlugin(() => {
	fillWeekWithDays()
	console.log('scheduler is activeted ⏱')
})

function fillWeekWithDays() {
	const scheduler = useScheduler()

	scheduler
		.run(() => {
			const todayRomanianDate = todayInRomania()
			console.log('today: ', todayRomanianDate)

			// FIXME implement this scheduler

			// get days
			// determine missing days of the week
			// call days.post for each missing day
		})
		.everySeconds(5)
	// .cron('3 0 * * *', 'Europe/Bucharest')

	// create as many tasks as you want here
}
