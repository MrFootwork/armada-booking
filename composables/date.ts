import { ref, onMounted, onUnmounted } from 'vue'
import { useLanguage } from '@/store/language'

const languageStore = useLanguage()

export function useDate(objDate: Date) {
	const weekday = objDate.toLocaleDateString(languageStore.preferred, {
		weekday: 'short',
	})
	const date = objDate.toLocaleDateString(languageStore.preferred, {
		dateStyle: 'long',
	})

	return { weekday, date }
}
