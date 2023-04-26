import { MongoClient } from 'mongodb'
import { GymInput } from '@/model/TGym.model'

export default defineEventHandler(async event => {
	console.log('server is hit to post gyms')

	const body: GymInput = await readBody(event)
	const gyms = await postGym(body)

	return {
		api: 'gyms.get',
		in: body,
		out: gyms,
	}
})

async function postGym(newGym) {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('bookings')

		// FIXME post gym to database
		const gymInserted = await db.collection('gyms').insertOne({ ...newGym })

		return gymInserted
	} catch (e) {
		console.error('Could not create gym on database. ', e)
	} finally {
		await mongoClient.close()
	}
}
