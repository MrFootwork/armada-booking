import { MongoClient, ObjectId } from 'mongodb'
import { Gym } from '@/model/TGym.model'

export default defineEventHandler(async event => {
	console.log(`server is hit to delete gym`)

	const { deleteGymWithId } = await readBody(event)
	const gymDeleted = await postGym(deleteGymWithId)

	return {
		api: 'gyms.delete',
		in: deleteGymWithId,
		out: gymDeleted,
	}
})

async function postGym(deleteGymWithId) {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('bookings')

		const gymDeleted = await db
			.collection('gyms')
			.deleteOne({ _id: new ObjectId(deleteGymWithId) })

		return gymDeleted
	} catch (e) {
		console.error('Could not delete gym on database. ', e)
	} finally {
		await mongoClient.close()
	}
}
