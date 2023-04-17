import { ref } from 'vue'
import { defineStore } from 'pinia'

// FIXME get current user ID after authentication
export const useLanguage = defineStore('language', () => {
	// state
	const preferred = ref('zh-CH')
	const wasSet = ref(false)
	// getters (computed())
	// actions
	function setLanguage(newLanguage: string) {
		wasSet.value = true
		preferred.value = newLanguage
	}

	return { preferred, wasSet, setLanguage }
})
