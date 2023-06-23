import { RuntimeConfig } from 'nuxt/schema'
import { fetchGyms } from '@/server/utils/mongo/gyms'
import { useScheduler } from '#scheduler'
import currentWeekInRomania from '../app/services/todayDateInRomania.ts'
import getMissingDays from '../app/services/getMissingDays.ts'

const inDevelopment = useRuntimeConfig().nodeEnvironment === 'development'
const timeZone = 'Europe/Bucharest'

export default defineNitroPlugin(() => {
	// if (!inDevelopment) fillWeekWithDays()
	fillWeekWithDays()
	console.log('scheduler is activeted ⏱')
})

function fillWeekWithDays() {
	const scheduler = useScheduler()

	// FIXME implement this scheduler
	scheduler
		.run(async () => {
			console.log('Time Test')
			const now = new Date()
			console.log('🚀 ~ file: schedulerNewDay.ts:22 ~ .run ~ now:', now)

			const offset = getOffset(timeZone)
			console.log(
				'🚀 ~ file: schedulerNewDay.ts:26 ~ scheduler.run ~ offset:',
				offset
			)
			const isoOffset = `+${(-offset / 60).toString().padStart(2, '0')}:00`
			// build UTC conform target date times

			// BUG🐞

			const { today, lastDay } = currentWeekInRomania()
			console.log(
				'🚀 ~ file: schedulerNewDay.ts:38 ~ .run ~ today, lastDay:',
				today,
				lastDay
			)

			const todayCorrect = new Date(isoDateFrom(today, 0, isoOffset))
			console.log(
				'🚀 ~ file: schedulerNewDay.ts:40 ~ .run ~ todayCorrect:',
				todayCorrect
			)
			const lastDayCorrect = new Date(isoDateFrom(lastDay, 0, isoOffset))
			console.log(
				'🚀 ~ file: schedulerNewDay.ts:42 ~ .run ~ lastDayCorrect:',
				lastDayCorrect
			)

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
			console.log(
				'🚀 ~ file: schedulerNewDay.ts:40 ~ .run ~ missingDays:',
				missingDays
			)

			if (!missingDays) return

			// loop through missingDays and generate new day
			missingDays.forEach(async missingDay => {
				console.log(
					'🚀 ~ file: schedulerNewDay.ts:49 ~ missingDays.forEach ~ missingDay:',
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
				console.log(
					'🚀 ~ file: schedulerNewDay.ts:66 ~ .run ~ insertedDay:',
					insertedDay
				)
			})
		})
		.everySeconds(15)
	// .cron('28 16 * * *', timezone)
	// .cron('1 0 * * *', timezone)
}
