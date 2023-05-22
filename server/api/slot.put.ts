// FIXME api endpoint for posting a single specific slot
import { MongoClient } from 'mongodb'
// import replaceId from '@/server/utils/mongo/replaceId'
import { Day } from '@/model/TDay.model'
import { ISODateString } from 'next-auth'

export default defineEventHandler(async event => {
	const queryObject = getQuery(event)
	console.log('api ', queryObject)

	// use queryobject to navigate document on MongoDB
	// update document on MongoDB
	// return updated document

	const slotInserted = await putSlot(queryObject)
	// const slotInserted = 'that worked 🙌🥳🥂🥂'

	return {
		api: 'slot.put',
		in: queryObject,
		out: slotInserted,
	}
})

async function putSlot(queryObject) {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('bookings')

		// const daysFetched = (await db
		// 	.collection('days')
		// 	.find({
		// 		date: {
		// 			$gte: new Date(query.from),
		// 			$lte: new Date(query.to),
		// 		},
		// 	})
		// 	.toArray()) as Day[]

		// const daysIdTransformed = await replaceId(daysFetched)

		// days holds date types
		// return daysIdTransformed
		return 'that worked 🙌🥳🥂🥂'
	} catch (e) {
		console.error('could not put on database. ', e)
	} finally {
		await mongoClient.close()
		console.log('Added new slot to database.')
	}
}
