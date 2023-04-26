import { MongoClient } from 'mongodb'
import fetchGyms from '@/server/utils/mongo/gyms'

// FIXME add logger, so I can see who fetches what data when
export default defineEventHandler(async event => {
	console.log('server is hit to get gyms')

	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)

	try {
		await mongoClient.connect()

		const gyms = await fetchGyms(mongoClient)

		return {
			api: 'gyms.get',
			in: '',
			out: gyms,
		}
	} catch (e) {
		console.error('could not retrieve gyms from database. ', e)
	} finally {
		await mongoClient.close()
	}
})
