import { MongoClient } from 'mongodb'

export default defineEventHandler(async event => {
	const query = getQuery(event)
	const deleteResult = await deleteDays(query.option)

	return {
		api: 'days.delete',
		in: query,
		out: deleteResult,
	}
})

async function deleteDays(option) {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient = new MongoClient(mongoURI)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('bookings')
		let deleteResult

		if (option === 'all')
			deleteResult = await db.collection('days').deleteMany({})
		// BUG doesn't work
		if (option === 'last')
			deleteResult = await db.collection('days').deleteOne({}, {})

		return deleteResult
		// return 'just kidding....'
	} catch (e) {
		console.error('Could not delete days database. ', e)
	} finally {
		await mongoClient.close()
	}
}
