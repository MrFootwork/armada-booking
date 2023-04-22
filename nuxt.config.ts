// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		mongoURI: process.env.MONGODB_URI,
	},
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
	// transpile date-fns: production build would always throw following error
	// Directory import '/opt/render/project/src/.output/server/node_modules/date-fns/locale'
	// is not supported resolving ES modules imported from
	// /opt/render/project/src/.output/server/chunks/app/_nuxt/index-87dca981.mjs
	// Did you mean to import date-fns/locale/index.js?
	// solution: https://github.com/nuxt/nuxt/issues/13995
	build: {
		transpile: ['date-fns', '@vuepic/vue-datepicker'],
	},
	modules: ['@pinia/nuxt', '@sidebase/nuxt-auth'],
	pinia: {
		autoImports: [
			// automatically imports `defineStore`
			'defineStore', // import { defineStore } from 'pinia'
			['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
			'storeToRefs',
		],
	},
	// preset for deploying
	// https://v3.nuxtjs.org/guide/deploy/presets/
	auth: {
		origin: process.env.ORIGIN,
		enableGlobalAppMiddleware: true,
	},
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
	// avoiding [Vue warn]: Hydration node mismatch:
	// https://github.com/nuxt/nuxt/issues/12266
	ssr: process.env.NODE_ENV !== 'development',
})
