import { MongoClient } from 'mongodb'

export default defineEventHandler(async event => {
	const query = getQuery(event)
	const body = await readBody(event)
	const dayInserted = await insertDay(body)

	return {
		api: 'days.put',
		in: body,
		out: dayInserted,
	}
})

async function insertDay(newDay) {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('bookings')
		const dayInserted = await db.collection('days').insertOne(newDay)

		return dayInserted
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
	}
}
