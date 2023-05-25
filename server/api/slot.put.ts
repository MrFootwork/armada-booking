// FIXME api endpoint for posting a single specific slot
import { MongoClient, ObjectId } from 'mongodb'
// import replaceId from '@/server/utils/mongo/replaceId'
import { Day } from '@/model/TDay.model'
import { Slot } from '@/model/TSlot.model'
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

async function putSlot(query: {
	dayId: Day['id']
	gymId: Day['gyms'][number]['id']
	courtId: Day['gyms'][number]['courts'][number]['id']
	day: Date
	start: number
	end: number
	timeZone: 'Europe/Bucharest'
	slotId?: Slot['id']
}) {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)
	const targetDate = new Date(query.day)
	const playerJoinsSlot = new Boolean(query.slotId).valueOf()

	console.log('***************************')
	console.log('*       slot.put.ts       *')
	console.log('***************************')
	console.log('playerJoinsSlot ', playerJoinsSlot, query.slotId)
	console.log('query in api: ', query)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('bookings')

		// build slot element
		const offset = getOffset(query.timeZone)
		const isoOffset = `+${(-offset / 60).toString().padStart(2, '0')}:00`
		// build UTC conform target date times
		const startDate = new Date(isoDateFrom(targetDate, query.start, isoOffset))
		const endDate = new Date(isoDateFrom(targetDate, query.end, isoOffset))

		// courtId is 1-based
		const courtIndex = query.courtId - 1

		// FIXME read user name and create player object
		// navigate to court and push slot with player
		if (!playerJoinsSlot) {
			var slotValue: Slot = {
				id: new ObjectId(),
				hourIndex: query.start.toString(),
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
		}

		// navigate to slot and push additional player
		if (playerJoinsSlot) {
			// FIXME determine player id of organizer
			var playerValue: Slot['player'][number] = {
				id: '1234567890',
				name: '🍊',
				bookedBy: 'XXX',
			}

			// dayDocument is not really type Day
			// certain IDs are not string but ObjectId instead
			const dayDocument: Day = await db.collection('days').findOne(
				{
					'_id': new ObjectId(query.dayId),
					'gyms.id': new ObjectId(query.gymId),
				},
				{ projection: { 'gyms.$': 1 } }
			)

			const courtsDocument = dayDocument.gyms.find(
				gym => gym.id.toString() === query.gymId
			).courts

			var slotIndex = courtsDocument
				?.find(court => court.id === query.courtId)
				.slots.findIndex(slot => slot.id.toString() === query.slotId)
		}

		const updateQuery = {
			'_id': new ObjectId(query.dayId),
			'gyms.id': new ObjectId(query.gymId),
		}
		//build the path property for slot/player navigation
		const pathProperty =
			`gyms.$.courts.${courtIndex}.slots` +
			(playerJoinsSlot ? `.${slotIndex}.player` : '')
		// putting them together for mongo's push command
		let keyValueObject: Slot | Slot['player'][number] = {}
		keyValueObject[pathProperty] = slotValue || playerValue

		const pushCommand = { $push: keyValueObject }

		const dayUpdated = await db
			.collection('days')
			.updateOne(updateQuery, pushCommand)

		console.log('Added new slot/player to database.')

		return dayUpdated
	} catch (e) {
		console.error('Could not update day on database. ', '\n', e)
		throw new Error(e)
	} finally {
		await mongoClient.close()
	}
}
