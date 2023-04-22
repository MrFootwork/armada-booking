import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTheme = defineStore('theme', () => {
	// state
	const current = ref<'light' | 'dark'>('light')
	// getters (computed())
	const isDark = computed(() => current.value === 'dark')
	// actions
	function toggleTheme() {
		if (isDark) current.value = 'light'
		if (!isDark) current.value = 'dark'
	}

	return { current, toggleTheme }
})
