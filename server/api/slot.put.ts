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
		}

		// navigate to slot and push additional player
		if (playerJoinsSlot) {
			var playerValue: Slot['player'][number] = {
				id: '1234567890',
				name: '🍊',
				bookedBy: 'XXX',
			}

			// FIXME get gym index from bookingDays
			// FIXME fetch slot data
			// FIXME return only slot array
			// https://stackoverflow.com/questions/65924661/how-to-get-only-part-of-document-in-mongodb-with-node-js
			const dayDocument: Day = await db.collection('days').findOne(
				{
					'_id': new ObjectId(queryObject.dayId),
					'gyms.id': new ObjectId(queryObject.gymId),
				},
				{ projection: { 'gyms.$': 1 } }
			)

			// const courtsDocument = dayDocument.gyms[0].courts
			const courtsDocument = dayDocument.gyms.find(
				gym => gym.id.toString() === queryObject.gymId
			).courts

			var slotIndex = courtsDocument
				?.find(court => {
					console.log('court.id ', court.id)
					console.log('queryObject.courtId ', queryObject.courtId)
					console.log('match? ', court.id === queryObject.courtId)
					return court.id === queryObject.courtId
				})
				.slots.findIndex(slot => {
					console.log('slot.id ', slot.id)
					console.log('queryObject.slotId ', queryObject.slotId)
					console.log('match? ', slot.id === queryObject.slotId)
					return slot.id.toString() === queryObject.slotId
				})

			const slotDocument = courtsDocument?.find(
				court => court.id === queryObject.courtId
			).slots

			console.log('dayDocument: ', dayDocument)
			console.log('courtsDocument: ', courtsDocument)
			console.log('slotIndex: ', slotIndex)
			console.log('slotDocument: ', slotDocument)
		}
		// query gym
		// nested arrays can't be queried because the path
		// can't contain more than one $.
		const query = {
			'_id': new ObjectId(queryObject.dayId),
			'gyms.id': new ObjectId(queryObject.gymId),
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
