import { MongoClient } from 'mongodb'

export default defineEventHandler(async event => {
	// if (!event.context.auth)
	// 	return { error: 'Unauthorized', message: 'User is not authenticated' }

	const query = getQuery(event)
	const users = await fetchUsers()

	return {
		api: 'works',
		in: query,
		out: users,
	}
})

// FIXME maybe I can only request the one user...
async function fetchUsers() {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient = new MongoClient(mongoURI)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('security')
		const users = await db.collection('users').find({}).toArray()

		return users
	} catch (e) {
		console.error('Could not read users from database. ', e)
	} finally {
		await mongoClient.close()
	}
}
