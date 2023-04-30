import { MongoClient } from 'mongodb'
import replaceId from '@/server/utils/mongo/replaceId'
import { Day } from '@/model/TDay.model'

export default defineEventHandler(async event => {
	// FIXME receive body with a range of dates to fetch
	const requestBody = await readBody(event)
	console.log('requestBody: ', requestBody)
	const days = await fetchDaysFromDB()

	return {
		api: 'days.get',
		in: requestBody,
		out: days,
	}
})

async function fetchDaysFromDB() {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('bookings')

		const daysFetched = (await db
			.collection('days')
			.find({})
			.toArray()) as Day[]

		const daysIdTransformed = await replaceId(daysFetched)

		// days holds date types
		return daysIdTransformed
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
	}
}
