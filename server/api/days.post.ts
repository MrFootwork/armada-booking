import { Day } from '@/model/TDay.model'
import { MongoClient } from 'mongodb'

// populates the given day and pushes it to the database
// query parameters, e.g. year=2023&month=1&day=24
// year		{string}	YYYY
// month 	{string}	month 0-based
// day		{string}	day of month
export default defineEventHandler(async event => {
	const { year, month, day } = getQuery(event)

	const newDate = new Date()
	newDate.setUTCFullYear(year)
	newDate.setUTCMonth(month)
	newDate.setUTCDate(day)
	newDate.setUTCHours(0)
	newDate.setUTCMinutes(0)
	newDate.setUTCSeconds(0)
	newDate.setUTCMilliseconds(0)

	const dayInserted = await insertDay(newDate)

	return {
		api: 'days.post',
		in: { newDate },
		out: dayInserted,
	}
})

async function insertDay(newDay: Date) {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('bookings')
		const dayInserted = await db
			.collection('days')
			.insertOne({ date: newDay, gyms: [{ test: 'value' }] })

		return dayInserted
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
	}
}