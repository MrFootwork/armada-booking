import { Day } from '@/model/TDay.model'
import { MongoClient } from 'mongodb'
import fetchGyms from '@/server/utils/mongo/gyms'

// populates the given day and pushes it to the database
// query parameters, e.g. year=2023&month=1&day=24
// @param	{string}	year	YYYY
// @param {string}	month	month 0-based
// @param	{string}	day		day of month
// @return {api, in out}	api object
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

		const gyms = await fetchGyms(mongoClient)

		// FIXME read courts and populate Day object

		// FIXME build whole day object and save it on DB
		const dayInserted = await db
			.collection('days')
			.insertOne({ date: newDay, gyms })

		return dayInserted
	} catch (e) {
		console.error('Could not create day on database. ', e)
	} finally {
		await mongoClient.close()
	}
}
