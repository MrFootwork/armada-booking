import { MongoClient } from 'mongodb'
import replaceId from '@/server/utils/mongo/replaceId'
import { dateISOToFullISO } from '@/server/utils/typeConversions/date'
import { Day } from '@/model/TDay.model'
import { ISODateString } from 'next-auth'

export default defineEventHandler(async event => {
	const query = getQuery(event)
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

		const daysFetched = (await db
			.collection('days')
			.find({
				date: {
					$gte: new Date(query.from),
					$lte: new Date(query.to),
				},
			})
			.toArray()) as Day[]

		// transform mongo's ObjectId to string
		const daysIdTransformed = await replaceId(daysFetched)

		return daysIdTransformed
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
		console.log('days.get: Fetched Days')
	}
}
