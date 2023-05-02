import { MongoClient } from 'mongodb'
import replaceId from '@/server/utils/mongo/replaceId'
import { dateISOToFullISO } from '@/server/utils/typeConversions/date'
import { Day } from '@/model/TDay.model'
import { ISODateString } from 'next-auth'

export default defineEventHandler(async event => {
	const query = getQuery(event)

	// FIXME transform query dates and give them to MongoDB
	// required format: ISo Date
	const days = await fetchDaysFromDB(query)

	return {
		api: 'days.get',
		in: query,
		out: days,
	}
})

async function fetchDaysFromDB(query: {
	to: ISODateString
	from: ISODateString
}) {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('bookings')

		console.log('query before fetch: ', query)

		// FIXME query must be ISO string
		const daysFetched = (await db
			.collection('days')
			.find({
				// working in MongoDB Atlas: 
				// {date: { $gte: ISODate("2023-05-02") }}
				// date: { $lte: dateISOToFullISO(query.to) },
				date: { $gte: {new Date(query.to)} },
			})
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
