import { getServerSession } from '#auth'

// FIXME implement server auth check here
// https://sidebase.io/nuxt-auth/server-side/session-access-and-route-protection#server-middleware
export default eventHandler(async event => {
	const session = await getServerSession(event)
	console.log('this is middleware/auth.ts speaking')
})
