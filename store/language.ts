import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLanguage = defineStore('language', () => {
	// state
	const preferred = ref('de-DE')
	// getters (computed())
	// actions
	function setLanguage(newLanguage: string) {
		preferred.value = newLanguage
	}

	return { preferred, setLanguage }
})
