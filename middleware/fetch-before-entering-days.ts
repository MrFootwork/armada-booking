import { useDaysStore } from '~~/store/bookingDays'
import { useGym } from '~~/store/gym'

export default defineNuxtRouteMiddleware(async to => {
	// if (to.params.id === '1') {
	// 	return abortNavigation()
	// }
	// if (to.path !== '/') {
	// 	return navigateTo('/')
	// }

	const gymStore = useGym()
	const { gyms } = storeToRefs(gymStore)
	const { fetchGyms } = gymStore

	const daysStore = useDaysStore()
	const { days } = storeToRefs(daysStore)
	const { fetchDays } = daysStore

	if (to.path === '/days') {
		console.log('entering /days route')
		await fetchGyms()
		await fetchDays(new Date())
		console.log(days.value)
		return
	}

	// FIXME load via middleware doesn't work
	// workaround: load store data on page load
})
