import { RuntimeConfig } from 'nuxt/schema'
import { fetchGyms } from '@/server/utils/mongo/gyms'
import { useScheduler } from '#scheduler'
import currentWeekInRomania from '../app/services/todayDateInRomania.ts'
import getMissingDays from '../app/services/getMissingDays.ts'

const inDevelopment = useRuntimeConfig().nodeEnvironment === 'development'
const TIME_ZONE = 'Europe/Bucharest'

export default defineNitroPlugin(() => {
	if (!inDevelopment) fillWeekWithDays()
	// fillWeekWithDays()
	console.log('scheduler is activeted ⏱')
})

function fillWeekWithDays() {
	const scheduler = useScheduler()

	// FIXME implement this scheduler
	scheduler
		.run(async () => {
			console.log('Time Test')
			const now = new Date()
			const offset = getOffset(TIME_ZONE)
			const isoOffset = `+${(-offset / 60).toString().padStart(2, '0')}:00`
			// build UTC conform target date times

			// BUG🐞

			const { today, lastDay } = currentWeekInRomania()
			const todayCorrect = new Date(isoDateFrom(today, 0, isoOffset))
			const lastDayCorrect = new Date(isoDateFrom(lastDay, 0, isoOffset))
			// get days on DB
			// const { out: daysOnDB } = await $fetch('/api/days', {
			// 	method: 'GET',
			// 	params: { from: today.toISOString(), to: lastDay.toISOString() },
			// })
			const { out: daysOnDB } = await $fetch('/api/days', {
				method: 'GET',
				params: {
					from: todayCorrect.toISOString(),
					to: lastDayCorrect.toISOString(),
				},
			})

			// determine missing days of the week
			const missingDays = getMissingDays(daysOnDB, today, lastDay)
			if (!missingDays) return

			// loop through missingDays and generate new day
			missingDays.forEach(async missingDay => {
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
		.everySeconds(15)
	// .cron('28 16 * * *', timezone)
	// .cron('1 0 * * *', timezone)
}
