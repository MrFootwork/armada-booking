// FIXME api endpoint for posting a single specific slot
import { MongoClient, ObjectId } from 'mongodb'
// import replaceId from '@/server/utils/mongo/replaceId'
import { Day } from '@/model/TDay.model'
import { ISODateString } from 'next-auth'
import { isoDateFrom } from '@/server/utils/date/timezone'

export default defineEventHandler(async event => {
	const queryObject = getQuery(event)
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
	day: Date
	start: number
	end: number
	timeZone: 'Europe/Bucharest'
}) {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)
	const targetDate = new Date(queryObject.day)

	console.log('***************************')
	console.log('*       slot.put.ts       *')
	console.log('***************************')
	console.log('query in api: ', queryObject)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('bookings')

		// partial document update
		// https://stackoverflow.com/questions/10290621/how-do-i-partially-update-an-object-in-mongodb-so-the-new-object-will-overlay

		// navigating to array element by identifier instead of index
		// https://stackoverflow.com/a/61919092/13608849

		const query = {
			'_id': new ObjectId(queryObject.dayId),
			'gyms.id': new ObjectId(queryObject.gymId),
		}
		// build slot element
		console.log(
			'server local: ',
			Intl.DateTimeFormat().resolvedOptions().timeZone
		)
		console.log('the day: ', targetDate.toISOString())
		console.log('the offset: ', targetDate.getTimezoneOffset())
		// const offset = targetDate.getTimezoneOffset()
		const offset = getOffset(queryObject.timeZone)

		console.log('offset of: ', queryObject.timeZone, offset)

		const isoOffset = `+${(-offset / 60).toString().padStart(2, '0')}:00`
		// build UTC conform target date times
		const startDate = new Date(
			isoDateFrom(targetDate, queryObject.start, isoOffset)
		)
		const endDate = new Date(
			isoDateFrom(targetDate, queryObject.end, isoOffset)
		)

		console.log('start ', startDate)
		console.log('end ', endDate)

		const slotValue = {
			id: 'xxxx',
			hourIndex: queryObject.start.toString(),
			start: startDate,
			end: endDate,
			bookingDate: new Date(),
			player: [
				{
					id: 'XXX',
					name: '🍍',
					bookedBy: 'XXX',
				},
			],
		}

		console.log('slot value: ', slotValue)

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
