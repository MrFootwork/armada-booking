// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		mongoURI: process.env.MONGODB_URI,
		nuxtSecret: process.env.NUXT_SECRET,
		nodeEnvironment: process.env.NODE_ENV,
	},
	typescript: {
		strict: true,
	},
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			title: 'Armada Booking',
			meta: [
				{ name: 'description', content: 'Booking App for Armada Badminton.' },
			],
			link: [
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0',
				},
				{
					rel: 'icon',
					type: 'image/png',
					href: '/logo-small.png',
				},
			],
		},
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
						@use "@/assets/scss/_colors.scss" as *;
						@use "@/assets/scss/_variables.scss" as *;  
					 	@use "@/assets/scss/_mixins.scss" as *;`,
				},
			},
		},
	},
	css: [
		'normalize.css/normalize.css',
		'@/assets/css/colors.css',
		'@/assets/css/basic.css',
	],
	build: {
		transpile: ['@vuepic/vue-datepicker'],
	},
	modules: [
		'@pinia/nuxt',
		'@sidebase/nuxt-auth',
		'@vueuse/nuxt',
		'nuxt-scheduler',
		'@nuxt/devtools',
	],
	pinia: {
		autoImports: [
			// automatically imports `defineStore`
			'defineStore', // import { defineStore } from 'pinia'
			['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
			'storeToRefs',
		],
	},
	auth: {
		origin: process.env.ORIGIN,
		enableGlobalAppMiddleware: true,
	},
	// preset for deploying
	// https://nuxt.com/docs/getting-started/deployment#presets
	nitro: {
		preset: 'node-server',
	},
	// https://render.com/docs/deploy-nuxtjs
	server: {
		host: '0.0.0.0',
	},
	build: {
		// this allows to debug nuxt in VS Code
		extend(config, ctx) {
			if (ctx.isDev) {
				config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
			}
		},
		rollupOptions: {
			external: true,
		},
	},
	// avoiding [Vue warn]: Hydration node mismatch:
	// https://github.com/nuxt/nuxt/issues/12266
	// ssr: process.env.NODE_ENV !== 'development',
	ssr: false,
})
