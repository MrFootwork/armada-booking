import { MongoClient } from 'mongodb'
import replaceId from '@/server/utils/mongo/replaceId'

export default defineEventHandler(async event => {
	// FIXME receive body with a range of dates to fetch
	console.log('***********************')
	console.log('* Data Fetch starts')
	console.log('***********************')

	const query = getQuery(event)
	const days = await fetchDaysFromDB()

	console.log('days were fetched')
	console.log('api type: ', typeof days[0].date)

	return {
		api: 'days.get',
		in: query,
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
		console.log('fetched from MongoDB')

		const daysIdTransformed = await replaceId(daysFetched)
		console.log('ID replaced')

		const daysDateTransformed = await daysIdTransformed!.map(day => {
			day.date = new Date(day.date)
			return day
		})
		// FIXME test if Date methods are available
		// terminal shows type object
		// but UI shows type string
		console.log('dates transformed')

		return daysDateTransformed
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
	}
}
