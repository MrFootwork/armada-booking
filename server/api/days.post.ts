import { Day } from '@/model/TDay.model'
import { MongoClient } from 'mongodb'

// populates the given day and pushes it to the database
export default defineEventHandler(async event => {
	const query = getQuery(event)
	const body: Day = await readBody(event)
	const dayInserted = await insertDay(body)

	return {
		api: 'days.post',
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
