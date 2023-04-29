import { MongoClient } from 'mongodb'
import replaceId from '@/server/utils/mongo/replaceId'

export default defineEventHandler(async event => {
	const query = getQuery(event)
	const days = await fetchDays()

	console.log(days)

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

		// FIXME transformation: all dates must be turned to Date type
		daysTransformed?.map(day => {
			day.date = new Date(day.date)
			console.log(typeof day.date)
		})

		return daysTransformed
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
	}
}
