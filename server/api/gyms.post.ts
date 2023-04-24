import { MongoClient } from 'mongodb'

export default defineEventHandler(async event => {
	console.log('server is hit to get gyms')
	// FIXME send body with gym object
	const query = getQuery(event)
	const gyms = await postGym()

	return {
		api: 'gyms.get',
		in: query,
		out: gyms,
	}
})

async function postGym() {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('bookings')

		// FIXME post gym to database
		const dayInserted = await db
			.collection('gyms')
			.insertOne({ date: newDay, gyms: [{ test: 'value' }] })

		return dayInserted
	} catch (e) {
		console.error('Could not create gym on database. ', e)
	} finally {
		await mongoClient.close()
	}
}
