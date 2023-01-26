// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData:
						'@use "@/assets/scss/_colors.scss" as *; @use "@/assets/scss/_variables.scss" as *;  @use "@/assets/scss/_mixins.scss" as *;',
				},
			},
		},
	},
	css: ['normalize.css/normalize.css'],
})
