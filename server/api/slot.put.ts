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
		const startDate = new Date('2023-05-23T20:00:00.000+03:00')

		/**
		 * Calculates the time difference from timezone to UTC,
		 * e.g. 'Europe/Berlin' with GMT+2 returns -120.
		 * ```
		 * console.log(getOffset("US/Eastern")); // 240
		 * console.log(getOffset("Atlantic/Reykjavik")); // 0
		 * console.log(getOffset("Europe/Berlin")); // -120
		 * console.log(getOffset("Asia/Tokyo")); // -540
		 * ```
		 * From Weihang Jian https://stackoverflow.com/a/64262840/13608849
		 * @param timeZone IANA time zone e.g. ```'Europe/Paris'```
		 * @returns UTC offset in seconds
		 */
		const getOffset = timeZone => {
			const timeZoneName = Intl.DateTimeFormat('ia', {
				timeZoneName: 'shortOffset',
				timeZone,
			})
				.formatToParts()
				.find(i => i.type === 'timeZoneName').value

			const offset = timeZoneName.slice(3)
			if (!offset) return 0

			const matchData = offset.match(/([+-])(\d+)(?::(\d+))?/)
			if (!matchData) throw `cannot parse timezone name: ${timeZoneName}`

			const [, sign, hour, minute] = matchData
			let result = parseInt(hour) * 60
			if (sign === '+') result *= -1
			if (minute) result += parseInt(minute)

			return result
		}

		console.log('date: ', startDate)
		console.log('ISO: ', startDate.toISOString())
		console.log('UTC: ', startDate.toUTCString())
		console.log('local hour: ', startDate.getHours())
		console.log('UTC hour: ', startDate.getUTCHours())
		console.log(
			'Greenwich Time: ',
			startDate.toLocaleString('de-DE', {
				timeZone: 'Etc/Greenwich',
			}),
			getOffset('Etc/Greenwich')
		)
		console.log(
			'London Time: ',
			startDate.toLocaleString('de-DE', {
				timeZone: 'Europe/London',
			}),
			getOffset('Europe/London')
		)
		console.log(
			'German Time: ',
			startDate.toLocaleString('de-DE', {
				timeZone: 'Europe/Berlin',
			}),
			getOffset('Europe/Berlin')
		)
		console.log(
			'Romanian time: ',
			startDate.toLocaleString('de-DE', {
				timeZone: 'Europe/Bucharest',
			}),
			getOffset('Europe/Bucharest')
		)

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
