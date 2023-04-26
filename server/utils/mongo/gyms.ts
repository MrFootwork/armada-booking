import { MongoClient } from 'mongodb'
import replaceId from '@/server/utils/mongo/replaceId'

export default async function (mongoClient: MongoClient) {
	const db = mongoClient.db('bookings')

	const gyms = await db.collection('gyms').find({}).toArray()

	const gymsTransformed = replaceId(gyms)

	return gymsTransformed
}
