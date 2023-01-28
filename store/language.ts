import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLanguage = defineStore('language', () => {
	// state
	const language = ref('de-DE')
	// getters (computed())
	// actions
	function setLanguage() {
		language.value = true
	}

	return { language, setLanguage }
})
