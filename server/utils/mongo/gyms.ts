import { MongoClient } from 'mongodb'
import replaceId from '@/server/utils/mongo/replaceId'
import { Gym } from '@/model/TGym.model'

export default async function (mongoClient: MongoClient) {
	const db = mongoClient.db('bookings')
	const gyms = await db.collection('gyms').find({}).toArray()
	const gymsTransformed = replaceId(gyms)

	return gymsTransformed as Gym[]
}
