// FIXME api endpoint for posting a single specific slot
import { MongoClient, ObjectId } from 'mongodb'
// import replaceId from '@/server/utils/mongo/replaceId'
import { Day } from '@/model/TDay.model'
import { ISODateString } from 'next-auth'

export default defineEventHandler(async event => {
	const queryObject = getQuery(event)

	console.log('slot.put query: ', queryObject)

	// use queryobject to navigate document on MongoDB
	// update document on MongoDB
	// return updated document

	const slotInserted = await putSlot(queryObject)

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

		// partial document update
		// https://stackoverflow.com/questions/10290621/how-do-i-partially-update-an-object-in-mongodb-so-the-new-object-will-overlay
		const query = { _id: new ObjectId(queryObject.dayId) }
		const newValue = { $set: { newKey: '🐷' } }

		const dayUpdated = await db
			.collection('days')
			.updateOne(query, newValue, function (err, res) {
				if (err) throw err
				console.log('1 document updated')
			})

		console.log('Added new slot to database.')

		return dayUpdated
	} catch (e) {
		console.error('Could not update day on database. ', '\n', e)
		throw new Error(e)
	} finally {
		await mongoClient.close()
	}
}
