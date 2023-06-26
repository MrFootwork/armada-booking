import { DateTime } from 'luxon'

export const dateTime = () => {
	const now = DateTime.now()
	console.log('😎', now.toString())
}
