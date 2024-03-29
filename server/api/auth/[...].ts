import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'
import { MongoClient } from 'mongodb'

export default NuxtAuthHandler({
	pages: {
		// Change the default behavior to use `/login` as the path for the sign-in page
		signIn: '/login',
	},
	// secret needed to run nuxt-auth in production mode (used to encrypt data)
	secret: useRuntimeConfig().nuxtSecret,
	session: {
		// 1 day
		maxAge: 1 * 24 * 60 * 60,
	},
	// useSecureCookies: false,
	// development doesn't use these cookie settings and auth would stop working
	...(useRuntimeConfig().nodeEnvironment !== 'development' && {
		cookies: {
			sessionToken: {
				name: `__Secure-next-auth.session-token`,
				options: {
					httpOnly: true,
					sameSite: 'none',
					path: '/',
					secure: true,
				},
			},
			callbackUrl: {
				name: `__Secure-next-auth.callback-url`,
				options: {
					httpOnly: true,
					sameSite: 'none',
					path: '/',
					secure: true,
				},
			},
			csrfToken: {
				name: `__Host-next-auth.csrf-token`,
				options: {
					httpOnly: true,
					sameSite: 'none',
					path: '/',
					secure: true,
				},
			},
		},
	}),
	// BUG first load from sleeping server creates second token
	// Workaround: user must wait 2 days => set token expiration to 2 days
	// TODO doc says I need these callbacks for adding custom data to session data
	// these callbacks are never called... find out why!
	// currently, session is { user: { name, email }, expires }}
	// callbacks: {
	// 	// Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
	// 	async jwt({ token, user }) {
	// 		console.log('jwt callback: ', user)
	// 		const isSignIn = user ? true : false
	// 		if (isSignIn) {
	// 			console.log('jwt callback: ', user)
	// 			token.id = user ? user.id || '' : ''
	// 			token.username = user ? (user as any).username || '' : ''
	// 		}
	// 		// return Promise.resolve(token)
	// 		return token
	// 	},
	// 	// Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
	// 	async session({ session, token }) {
	// 		;(session as any).username = token.username
	// 		;(session as any).uid = token.id
	// 		// return Promise.resolve(session)
	// 		return session
	// 	},
	// },
	providers: [
		// @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
		// GithubProvider.default({
		// 	clientId: process.env.GITHUB_CLIENT_ID,
		// 	clientSecret: process.env.GITHUB_CLIENT_SECRET,
		// }),

		// @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
		CredentialsProvider.default({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'Credentials',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			async authorize(credentials: Credential) {
				// find user credentials in db
				const { mongoURI } = useRuntimeConfig()
				const mongoClient = new MongoClient(mongoURI)

				let user = null

				try {
					await mongoClient.connect()
					const db = mongoClient.db('security')
					const foundUsers = await db
						.collection('users')
						.find({
							username: credentials.username,
							password: credentials.password,
						})
						.project({ password: false })
						.toArray()

					if (foundUsers) user = foundUsers[0]
				} catch (e) {
					console.error('Could not read users from database. ', e)
				} finally {
					await mongoClient.close()
				}

				if (!user) {
					// eslint-disable-next-line no-console
					console.error(
						'Warning: Malicious login attempt registered, bad credentials provided'
					)

					// If you return null then an error will be displayed advising the user to check their details.
					return null

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
				// return user
				// Any object returned will be saved in `user` property of the JWT
				// Workaround if I need to pass user data to session
				const customUser = {
					id: user._id.toString(),
					username: user.username,
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
				}

				console.log('auth handler user: ', customUser)

				return {
					name: customUser,
				}
			},
		}),
	],
})
