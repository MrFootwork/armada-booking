// FIXME implement get user api logic here
import { MongoClient } from 'mongodb'

export default defineEventHandler(async event => {
	console.log('server is hit to get days')
	const query = getQuery(event)
	// const body = await readBody(event)
	const days = await fetchUsers()

	// console.table(passwords)

	return {
		api: 'works',
		in: query,
		out: days,
	}
})

async function fetchUsers() {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)

	try {
		await mongoClient.connect()
		// FIXME make the right db query
		const db = mongoClient.db('bookings')
		const days = await db.collection('users').find({}).toArray()

		return days
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
	}
}
