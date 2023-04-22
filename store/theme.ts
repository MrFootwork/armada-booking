import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTheme = defineStore('theme', () => {
	// state
	const current = ref<'light' | 'dark'>('light')

	// getters (computed())
	const isDark = computed(() => current.value === 'dark')

	// actions
	function toggleTheme() {
		// is <html class="light"> ?
		if (document.documentElement.classList.contains('light')) {
			document.documentElement.classList.remove('light')
			document.documentElement.classList.add('dark')
			current.value = 'dark'
			// is <html class="dark"> ?
		} else if (document.documentElement.classList.contains('dark')) {
			document.documentElement.classList.remove('dark')
			document.documentElement.classList.add('light')
			current.value = 'light'
		} else {
			// in the initial state check the preferred theme
			if (
				window.matchMedia &&
				window.matchMedia('(prefers-color-scheme: dark)').matches
			) {
				document.documentElement.classList.add('dark')
				current.value = 'dark'
			} else {
				document.documentElement.classList.add('light')
				current.value = 'light'
			}
		}
	}

	return { current, isDark, toggleTheme }
})
