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

// FIXME accept optional slot id
async function putSlot(queryObject: {
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
	const targetDate = new Date(queryObject.day)
	const playerJoinsSlot = new Boolean(queryObject.slotId).valueOf()

	console.log('***************************')
	console.log('*       slot.put.ts       *')
	console.log('***************************')
	console.log('playerJoinsSlot ', playerJoinsSlot, queryObject.slotId)
	console.log('query in api: ', queryObject)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('bookings')

		// build slot element
		const offset = getOffset(queryObject.timeZone)
		const isoOffset = `+${(-offset / 60).toString().padStart(2, '0')}:00`
		// build UTC conform target date times
		const startDate = new Date(
			isoDateFrom(targetDate, queryObject.start, isoOffset)
		)
		const endDate = new Date(
			isoDateFrom(targetDate, queryObject.end, isoOffset)
		)

		// courtId is 1-based
		const courtIndex = queryObject.courtId - 1

		// navigate to court and push slot with player
		if (!playerJoinsSlot) {
			var slotValue: Slot = {
				id: new ObjectId(),
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

			// FIXME if player wants to join existing slot,
			// navigate to slot and only push additional player
			var pathProperty = `gyms.$.courts.${courtIndex}.slots`
		}

		// navigate to slot and push additional player
		if (playerJoinsSlot) {
			var playerValue: Slot['player'][number] = {
				id: '1234567890',
				name: '🍋',
				bookedBy: 'XXX',
			}

			// FIXME fetch slot data and determine slot index
			const slotIndex = 0

			var pathProperty = `gyms.$.courts.${courtIndex}.slots.${slotIndex}.player`
		}

		const query = {
			'_id': new ObjectId(queryObject.dayId),
			'gyms.id': new ObjectId(queryObject.gymId),
		}

		// FIXME create type union of slot and player
		// build navigation to slots array
		let keyValueObject = {}
		keyValueObject[pathProperty] = slotValue || playerValue

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
