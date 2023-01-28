import { ref, onMounted, onUnmounted } from 'vue'
import { useLanguage } from '@/store/language'

const languageStore = useLanguage()

export function useDate(date: Date) {
	const weekday = date.toLocaleDateString(languageStore.preferred, {
		weekday: 'short',
	})

	return { weekday }
}
