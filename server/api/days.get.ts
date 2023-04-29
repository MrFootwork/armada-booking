import { MongoClient } from 'mongodb'
import replaceId from '@/server/utils/mongo/replaceId'

export default defineEventHandler(async event => {
	const query = getQuery(event)
	const days = await fetchDaysFromDB()

	console.log(days)
	console.log('this works')

	return {
		api: 'days.get',
		in: query,
		out: days,
	}
})

async function fetchDaysFromDB() {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)

	await mongoClient.connect()
	const db = mongoClient.db('bookings')
	const daysFetched = (await db.collection('days').find({}).toArray()) as Day[]
	console.log('who is this?')
	// BUG Somehow this doesn't work
	const daysIdTransformed = await replaceId(daysFetched)

	// FIXME transformation: all dates must be turned to Date type
	const daysDateTransformed = await daysIdTransformed!.map(day => {
		// day.date = new Date(day.date)
		day.date = 'test'
		console.log('API days.get: ', typeof day.date)
		return day
	})

	try {
		return daysDateTransformed
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
	}
}
