import { MongoClient } from 'mongodb'
import replaceId from '@/server/utils/mongo/replaceId'

export default defineEventHandler(async event => {
	const query = getQuery(event)
	// const body = await readBody(event)
	const days = await fetchDays()

	// console.table(passwords)

	return {
		api: 'days.get',
		in: query,
		out: days,
	}
})

async function fetchDays() {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('bookings')
		const days = await db.collection('days').find({}).toArray()
		const daysTransformed = replaceId(days)

		return days
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
	}
}
