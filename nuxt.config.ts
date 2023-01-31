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
	modules: ['@pinia/nuxt'],
	// preset for deploying
	// https://v3.nuxtjs.org/guide/deploy/presets/
	nitro: {
		preset: 'node-server',
	},
	// https://render.com/docs/deploy-nuxtjs
	server: {
		host: '0.0.0.0',
	},
})
