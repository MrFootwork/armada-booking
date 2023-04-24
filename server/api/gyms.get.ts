import { MongoClient } from 'mongodb'

export default defineEventHandler(async event => {
	console.log('server is hit to get gyms')
	const gyms = await fetchGyms()

	return {
		api: 'gyms.get',
		in: '',
		out: gyms,
	}
})

async function fetchGyms() {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('bookings')
		const gyms = await db.collection('gyms').find({}).toArray()

		return gyms
	} catch (e) {
		console.error('could not retrieve gyms from database. ', e)
	} finally {
		await mongoClient.close()
	}
}
