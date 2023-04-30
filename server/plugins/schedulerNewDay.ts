import { useScheduler } from '#scheduler'
import say from '@/server/app/services/say'

// https://github.com/jurassicjs/nuxt-scheduler
// FIXME use cron() method to set timezone to Bukarest
export default defineNitroPlugin(() => {
	// startScheduler()
	console.log('scheduler is activeted ⏱')
})

function startScheduler() {
	const scheduler = useScheduler()

	scheduler
		.run(() => {
			say('cool beans! I run once a second! 😀')
		})
		.everySecond()

	// create as many tasks as you want here
}
