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
				// create court boilerplate
				const newCourt = {
					id: i,
					courtName: i,
					slots: [],
				}

				// add random slots
				if (needSlots) {
					console.log('Gym Data ', gym)

					const defaultStartHour = 8
					const defaultEndHour = 20

					let startingHourAllowed = gym.start || defaultStartHour
					let durationAllowed =
						(gym.end || defaultEndHour) - startingHourAllowed

					let slotCount = 1

					// keep adding random slots
					while (durationAllowed > 4) {
						const randomSlotData = (() => {
							const playerNames = ['Martin', 'Paula', 'John', 'Freddy']
							const maximalSlotDistance = 3
							const maximalSessionLength = 4

							// slots start maximal 3h from previous sessions
							const start =
								Math.floor(Math.random() * maximalSlotDistance) +
								startingHourAllowed

							// slot ends at least one hour after start
							const end =
								start + Math.floor(Math.random() * maximalSessionLength + 1)

							const bookingDate = Math.floor(Math.random() * 24)

							// reset starting hour for next random slot
							startingHourAllowed = end
							durationAllowed =
								(gym.end || defaultEndHour) - startingHourAllowed

							const playerName = () =>
								playerNames[Math.floor(Math.random() * playerNames.length)]

							return {
								start,
								end,
								bookingDate,
								playerName,
							}
						})()

						// add more players to that slot
						const playerCountToAdd = Math.floor(Math.random() * 4)

						let randomPlayers = [
							{
								id: '123',
								name: randomSlotData.playerName(),
								bookedBy: '123',
							},
						]

						for (let i = 0; i < playerCountToAdd; i++) {
							const newPlayer = {
								id: `${i}${i}${i}`,
								name: randomSlotData.playerName(),
								bookedBy: randomPlayers[0].id,
							}
							randomPlayers.push(newPlayer)
						}

						// push randomized slots into court
						const randomBookingOffsetByDays = Math.floor(Math.random() * -4)

						// BUG? hourIndex doesn't match start time
						newCourt.slots.push({
							id: `${String(slotCount).padStart(4, '0')}`,
							hourIndex: randomSlotData.start,
							start: newDateAtHour(randomSlotData.start),
							end: newDateAtHour(randomSlotData.end),
							bookingDate: newDateAtHour(
								randomSlotData.bookingDate,
								randomBookingOffsetByDays
							),
							player: randomPlayers,
						})
					}

					/**
					 *
					 * @param {number} hour hour as number
					 * @param {number} dayOffset (optional) offset for day of date
					 * @returns Date with given hour and day offset
					 */
					function newDateAtHour(hour: number, dayOffset: number = 0) {
						return new Date(
							newDay.getFullYear(),
							newDay.getMonth(),
							newDay.getDate() + dayOffset,
							hour
						)
					}
				}

				// push freshly created court into courts
				gymWithCourts.courts.push(newCourt)
			}

			return gymWithCourts
		})

		const dayInserted = await db
			.collection('days')
			.insertOne({ date: newDay, gyms: gymsWithCourts })

		return dayInserted
	} catch (e) {
		console.error('Could not create day on database. ', e)
	} finally {
		await mongoClient.close()
		console.log(`day created${needSlots ? ' with random slots' : ''}`)
	}
}
