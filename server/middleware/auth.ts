import { getServerSession } from '#auth'

// https://sidebase.io/nuxt-auth/server-side/session-access-and-route-protection#server-middleware
export default eventHandler(async event => {
	const session = await getServerSession(event)

	// console.log('auth middleware: ', session)

	if (session) {
		// console.table(session.name)
		event.context.auth = true
	}
	if (!session) event.context.auth = false
})
