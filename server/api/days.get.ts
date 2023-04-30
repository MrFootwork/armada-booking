import { MongoClient } from 'mongodb'
import replaceId from '@/server/utils/mongo/replaceId'

export default defineEventHandler(async event => {
	// FIXME receive body with a range of dates to fetch
	// const query = getQuery(event)
	const days = await fetchDaysFromDB()

	const daysInitial = [
		{
			id: 'initial day',
			date: new Date(),
			gyms: [],
		},
	]

	console.log(days)
	console.log('this works')

	return {
		api: 'days.get',
		in: query,
		out: daysInitial,
	}
})

async function fetchDaysFromDB() {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('bookings')
		// const daysFetched = (await db.collection('days').find({}).toArray()) as Day[]
		console.log('who is this?')
		// BUG Somehow this doesn't work
		// const daysIdTransformed = await replaceId(daysFetched)

		// FIXME transformation: all dates must be turned to Date type
		// const daysDateTransformed = await daysIdTransformed!.map(day => {
		// 	// day.date = new Date(day.date)
		// 	day.date = 'test'
		// 	console.log('API days.get: ', typeof day.date)
		// 	return day
		// })

		return { id: 'blabla', date: new Date(), gyms: [{ test: 'value' }] }
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
	}
}
