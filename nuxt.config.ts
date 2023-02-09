// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			title: 'Armada App',
			meta: [
				{ name: 'description', content: 'Booking App for Armada Badminton.' },
			],
			link: [
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0',
				},
			],
		},
	},
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
	css: [
		'normalize.css/normalize.css',
		'@/assets/css/colors.css',
		'@/assets/css/basic.css',
	],
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
	build: {
		rollupOptions: {
			external: true,
		},
	},
})
