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
	const time = objDate.toLocaleTimeString(languageStore.preferred, {
		hour: 'numeric',
		minute: '2-digit',
	})
	const slotPath = weekday + time
	return { weekday, date, time, slotPath }
}
