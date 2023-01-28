import { ref, onMounted, onUnmounted } from 'vue'
import { useLanguage } from '@/store/language'

const preferredLanguage = useLanguage().preferred

// by convention, composable function names start with "use"
export function useDate(date: Date) {
	const weekday = date.toLocaleDateString('de-DE', { weekday: 'short' })

	return { weekday }
}
