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

async function putSlot(queryObject: {
	dayId: Day['id']
	gymId: Day['gyms'][number]['id']
	courtId: Day['gyms'][number]['courts'][number]['id']
	start: number
	end: number
}) {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)

	console.log('query in api: ', queryObject)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('bookings')

		// partial document update
		// https://stackoverflow.com/questions/10290621/how-do-i-partially-update-an-object-in-mongodb-so-the-new-object-will-overlay

		// navigating to array element by identifier instead of index
		// https://stackoverflow.com/a/61919092/13608849

		// full featured solution in development
		const query = {
			'_id': new ObjectId(queryObject.dayId),
			'gyms.id': new ObjectId(queryObject.gymId),
		}
		// build slot element
		// FIXME convert start and end to date objects
		// consider timezones, read
		// https://stackoverflow.com/questions/15141762/how-to-initialize-a-javascript-date-to-a-particular-time-zone
		const slotValue = {
			id: 'xxxx',
			hourIndex: queryObject.start.toString(),
			start: '2023-05-22T08:00:00.000Z',
			end: '2023-05-22T11:00:00.000Z',
			bookingDate: new Date(),
			player: [
				{
					id: 'XXX',
					name: 'Slot Maker',
					bookedBy: 'XXX',
				},
			],
		}
		// courtId is 1-based
		const courtIndex = queryObject.courtId - 1
		const pathProperty = `gyms.$.courts.${courtIndex}.slots`
		// build navigation to slots array
		let keyValueObject = {}
		keyValueObject[pathProperty] = slotValue

		const pushCommand = { $push: keyValueObject }

		const dayUpdated = await db
			.collection('days')
			.updateOne(query, pushCommand, function (err, res) {
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
