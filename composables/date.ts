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
	const time = objDate.toLocaleTimeString(languageStore.preferred, {
		hour: 'numeric',
		minute: '2-digit',
	})
	return { weekday, date, time, dateISO }
}
