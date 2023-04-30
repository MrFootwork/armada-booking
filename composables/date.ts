import { ref, onMounted, onUnmounted } from 'vue'
import { useLanguage } from '@/store/language'

const languageStore = useLanguage()

export default function useDate(objDate: Date) {
	const weekday = objDate.toLocaleDateString(languageStore.preferred, {
		weekday: 'short',
	})

	const date = objDate.toLocaleDateString(languageStore.preferred, {
		dateStyle: 'long',
	})

	const dateISO = objDate.toISOString().substring(0, 10)

	// routing to slot page requires normal time
	const time = objDate.toLocaleTimeString('ro-ro', {
		hour: 'numeric',
		minute: '2-digit',
	})

	const dateStart = (dateToReset: Date) => {
		const { year, month, day } = {
			year: dateToReset.getFullYear(),
			month: dateToReset.getMonth(),
			day: dateToReset.getDate(),
		}

		const dateTransformed = new Date()
		dateTransformed.setFullYear(year)
		dateTransformed.setMonth(month)
		dateTransformed.setDate(day)
		dateTransformed.setHours(0)
		dateTransformed.setMinutes(0)
		dateTransformed.setSeconds(0)
		dateTransformed.setMilliseconds(0)
		// dateTransformed.setUTCFullYear(year)
		// dateTransformed.setUTCMonth(month)
		// dateTransformed.setUTCDate(day)
		// dateTransformed.setUTCHours(0)
		// dateTransformed.setUTCMinutes(0)
		// dateTransformed.setUTCSeconds(0)
		// dateTransformed.setUTCMilliseconds(0)

		return dateTransformed
	}
	return { weekday, date, time, dateISO, dateStart }
}
