import { Day } from '@/model/TDay.model'
import { Court } from '@/model/TCourt.model'
import { MongoClient } from 'mongodb'
import fetchGyms from '@/server/utils/mongo/gyms'
import { dateComponentToJSDate } from '@/server/utils/typeConversions/date'

let needSlots = false

// populates the given day and pushes it to the database
// query parameters, e.g. year=2023&month=1&day=24
// @param	{string}	year	YYYY
// @param {string}	month	month 0-based
// @param	{string}	day		day of month
// @return {api, in out}	api object
export default defineEventHandler(async event => {
	const queryObject = getQuery(event)
	const { year, month, day, withSample } = queryObject

	needSlots = withSample === 'true'

	const newDate = dateComponentToJSDate({ year, month, day })

	const dayInserted = await insertDay(newDate)

	return {
		api: 'days.post',
		in: queryObject,
		out: dayInserted,
	}
})

async function insertDay(newDay: Date) {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient: MongoClient = new MongoClient(mongoURI)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('bookings')

		const gyms = await fetchGyms(mongoClient)

		const gymsWithCourts = gyms.map(gym => {
			// create a gym copy with its courts
			const gymWithCourts = gym
			for (let i = 1; i <= gym.courtCount; i++) {
				const newCourt = {
					id: i,
					courtName: i,
					slots: [],
				}

				// add random slots
				if (needSlots) {
					const randomSlotData = (() => {
						const playerNames = ['Martin', 'Paula', 'John', 'Freddy']

						const start = Math.floor(Math.random() * 10) + 8
						const end = start + Math.floor(Math.random() * 3)
						const bookingDate = Math.floor(Math.random() * 24)
						const playerName = playerNames[Math.floor(Math.random() * 4)]

						return {
							start,
							end,
							bookingDate,
							playerName,
						}
					})()

					newCourt.slots.push({
						id: '0001',
						hourIndex: 8,
						start: new Date(
							newDay.getFullYear(),
							newDay.getMonth(),
							newDay.getDate(),
							randomSlotData.start
						),
						end: new Date(
							newDay.getFullYear(),
							newDay.getMonth(),
							newDay.getDate(),
							randomSlotData.end
						),
						bookingDate: new Date(
							newDay.getFullYear(),
							newDay.getMonth(),
							newDay.getDate() - 5,
							randomSlotData.bookingDate.get
						),
						player: [
							{
								id: '123',
								name: randomSlotData.playerName,
								bookedBy: '123',
							},
						],
					})
				}

				gymWithCourts.courts.push(newCourt)
			}

			return gymWithCourts
		})

		const dayInserted = await db
			.collection('days')
			.insertOne({ date: newDay, gyms: gymsWithCourts })

		return dayInserted

		function getCourtWithSlots(courtId: number) {}
	} catch (e) {
		console.error('Could not create day on database. ', e)
	} finally {
		await mongoClient.close()
	}
}
