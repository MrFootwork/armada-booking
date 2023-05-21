// FIXME api endpoint for posting a single specific slot

export default defineEventHandler(async event => {
	// receive queryobject from days store
	// {
	// 	dayId,
	// 	gymId,
	// 	courtId,
	// 	start,
	// 	end,
	// }: {
	// 	dayId: string
	// 	gymId: Day['gyms'][number]['id']
	// 	courtId: Day['gyms'][number]['courts'][number]['id']
	// 	start: number
	// 	end: number
	// }
	const queryObject = getQuery(event)
	console.log('api ', queryObject)
	// const slotInserted = await insertDay(newDate)
	const slotInserted = 'that worked 🙌🥳🥂🥂'

	return {
		api: 'slot.put',
		in: queryObject,
		out: slotInserted,
	}
})
