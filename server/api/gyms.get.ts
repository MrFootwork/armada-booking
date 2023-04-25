import { MongoClient } from 'mongodb'

export default defineEventHandler(async event => {
	console.log('server is hit to get gyms')
	const gymsRaw = await fetchGyms()
	console.table(gymsRaw)
	const gymsTransformed = gymsRaw?.map(gym => {
		gym.id = gym._id
		delete gym._id
		return gym
	})
	console.table(gymsRaw)

	return {
		api: 'gyms.get',
		in: '',
		out: gymsTransformed,
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
